import { i22TT } from './AllTranslete';
import { text } from 'stream/consumers';
import { readFile } from './helpful';

/*
 * TODO: Документация использования
 * */

const yaml = require('js-yaml');
const fs = require('fs');
const argsTerminal = require('yargs').argv;

/* Имя файла с конфигурациями */
export const CONFIG_FILE_NAME : string = 'i22TT.conf.yaml';
/* Доступные языки */
// export let AVAILABLE_LANG_SET = new Set(['ru', 'en', 'japan', 'uk']);
// export const AVAILABLE_LANG_ARR = Array.from(AVAILABLE_LANG_SET);
// export type TYPE_AVAILABLE_LANG = typeof AVAILABLE_LANG_ARR[number];
/* Типы данных */
export type IFindTextFromTranslate = Array<{
	hash_int : number;
	text : string;
	id : number;
}>;

export type TReadConfig = { base_arr_lange : { [key : string] : string }; base_lang : string } | null

export interface IFindIdComponent {
	id_components : number;
	base_lange : string;
}

export interface i22TTJson {
	id_components : number;
	base_lange : string;
	words : {
		[key : number] : [string, number, { [key : string] : string }];
	};
}

export interface IFileConf {
	// Основной язык
	base_lang : string;
	// Доступные языки
	available_lang : T_available_lang
}

type T_available_lang = Array<{
	// Название языка
	[key : string] : {
		// Шрифты для языка
		fonts? : Array<string>;
	};
}>;

export class i22TT_Json {
	// Создаем переменную с доступными языками
	public base_arr_lange : { [key : string] : string };
	// Создаем переменную с базовым языком
	public base_lang : string;
	//  Имя файла с конфигурациями
	public file_conf : string;
	
	constructor(config_file_name : string) {
		// TODO: Создать проверку того что файл с расширением `yaml` / `yml`
		this.file_conf = config_file_name;
		// Устанавливаем конфигурации класса из файла
		const res : { base_arr_lange : { [p : string] : string }; base_lang : string } = this._initConfig()
		this.base_arr_lange = res["base_arr_lange"]
		this.base_lang = res["base_lang"]
	}
	
	/* Запись `JSON` в компонент */
	public static writeJsonFile(file_name : string, json : string) : void {
		
		fs.writeFileSync(file_name, json);
	}
	
	public run(component_file_name : string) : string {
		// Получаем текст компонента
		const text_component : string = readFile(component_file_name);
		// Получить `ID` из текста компонента
		const setting_component : IFindIdComponent = this._FindIdComponent(
			text_component,
			component_file_name
		);
		// Получить слова из текста компонента
		const arr_text_translete : IFindTextFromTranslate = this._FindTextFromTranslate(
			text_component,
			component_file_name
		);
		// Создаем сырой `JSON`
		const raw_json_translete : string = this._buildJson(
			setting_component,
			arr_text_translete,
		);
		// Преобразовываем `json` для записи в файл
		return this._formatJsonFromWriteFile(component_file_name, raw_json_translete)
	}
	
	protected _formatJsonFromWriteFile(component_file_name : string, raw_json_translete : string) : string {
		let in_text_file : string = readFile(component_file_name);
		let in_format_text_file = in_text_file.replace(
			/\/\*@i22TT_MapTranslate\n[\s\w\W]+@ENDi22TT_MapTranslate\*\//g,
			'',
		);
		return `
${in_format_text_file}
/*@i22TT_MapTranslate
----------------------
${raw_json_translete}
----------------------
@ENDi22TT_MapTranslate*/`;
	}
	
	/* Создать `JSON i22TT` из данных компонента */
	protected _buildJson(
		setting_component : IFindIdComponent,
		arr_text_translete : IFindTextFromTranslate,
	) : string {
		
		const create_body = () : Pick<i22TTJson, 'words'> => {
			// Создаем часть результирующего объекта
			let _body : Pick<i22TTJson, 'words'> = {words: {}};
			for (const _x of arr_text_translete) {
				_body['words'][_x['hash_int']] = [
					_x['text'],
					_x['id'],
					{
						...this.base_arr_lange,
						...{[setting_component['base_lange']]: _x['text']},
					},
				];
			}
			return _body
		}
		
		// Создаем полноценный объект
		const res_json : i22TTJson = {
			id_components: setting_component['id_components'],
			base_lange: setting_component['base_lange']!,
			...create_body(),
		};
		return JSON.stringify(res_json, null, 2);
	}
	
	/* Прочитать конфигурации из файла и сохранить их в переменные */
	protected _initConfig() : { base_arr_lange : { [p : string] : string }; base_lang : string } {
		// Читаем файл с конфигурациями
		const resConf : TReadConfig = this._redConfig();
		if (resConf) {
			return {base_arr_lange: resConf['base_arr_lange'], base_lang: resConf['base_lang']}
		}
		else {
			throw `Неверные данные конфигурации ${this.file_conf}`
		}
	}
	
	/* Читаем файла с конфигурациями */
	protected _redConfig() : TReadConfig {
		/*	Проверяем корректность конфигурации */
		const valid_json_conf = (_text_config : IFileConf | null) : boolean => {
			
			
			if (_text_config) {
				const base_lang : string = String(_text_config['base_lang'])
				const available_lang : T_available_lang = _text_config['available_lang']
				// Проверяем что базовый язык добавлен в доступные языки
				// @ts-ignore
				if (available_lang[base_lang]) {
					// Проверяем языки
					for (const _x in _text_config['available_lang']) {
						// Проверяем правильно ли указано имя ключа
						if (
							_text_config['available_lang'][_x]['fonts'] ===
							undefined
						) {
							throw `'${_x}' не верный ключ "fonts"`;
						}
					}
					return true;
				}
				else {
					throw `Файл '${this.file_conf}': Базовый язык '${base_lang}' не добавлен в разрешённые(available_lang) языки`
				}
			}
			return false;
		}
		
		// Получаем данные из файла с конфигурациями
		let text_config : IFileConf | null;
		try {
			text_config = yaml.load(readFile(this.file_conf));
		} catch (e) {
			console.log(e);
			return null;
		}
		// Проверяем корректность данных
		if (valid_json_conf(text_config)) {
			// Формируем `base_arr_lange`
			let base_arr_lange : { [key : string] : string } = {};
			for (const _x in text_config!['available_lang']) {
				base_arr_lange[_x] = '';
			}
			return {
				base_lang: text_config!['base_lang'],
				base_arr_lange: base_arr_lange,
			};
		}
		return null;
	}
	
	/*  Поиск ID компонента в текста */
	protected _FindIdComponent(
		text_component : string,
		component_file_name : string,
	) : IFindIdComponent {
		let res : RegExpMatchArray | null = text_component.match(
			/i22TT.id_components[\s]*\((?<id_components>\d+)\s*(,\s*['"`]+(?<base_lange>[\w\d]+)['"`]+)*\)/,
		);
		// console.log(res)
		if (res && res.length >= 2 && res.groups) {
			return {
				id_components: Number(res.groups['id_components']),
				base_lange: res.groups['base_lange']
					? res.groups['base_lange']
					: this.base_lang,
			};
		}
		else {
			throw `ID компонента ${component_file_name} не найден`;
		}
	}
	
	/* Поиск слов в тексте */
	protected _FindTextFromTranslate(
		text_find : string,
		component_file_name : string,
	) : IFindTextFromTranslate {
		let tmp : IterableIterator<RegExpMatchArray> = text_find.matchAll(
			/i22TT.get[\s]*\("*(?<text>[а-яА-Яa-zA-Z0-9 ]+)"*,*[\s]*(?<id>\d*)\)/g,
		);
		let res : IFindTextFromTranslate = [];
		// @ts-ignore
		for (let {groups} of tmp) {
			if (groups) {
				res.push({
					hash_int: i22TT.hash(groups['text'], Number(groups['id'])),
					text: groups['text'],
					id: Number(groups['id']) > 1 ? Number(groups['id']) : 1,
				});
			}
		}
		if (res.length === 0) {
			throw `В компоненте ${component_file_name} Слов не найдено`;
		}
		return res;
	}
}


function verificationArgs(argsTerminal : any) {
	/*
	 * --conf =  Путь к файлу с конфигурациями
	 * --save = Сохранить результат в текущий компонент
	 * --component = Переопределить компонент
	 * --no_output = Не отображать результат в консоль
	 */
	
	// Путь к файлу с конфигурациями
	const conf : string = argsTerminal['conf'] ? argsTerminal['conf'] : CONFIG_FILE_NAME
	// Путь к компоненту
	const component : string = argsTerminal['component'] ? argsTerminal['component'] : argsTerminal['_'][0]
	// Нужно ли сохранять результат в текущий компонент
	const isSave : boolean = argsTerminal['save']
	// Нужно ли выводить данные в терминал
	const isOutput : boolean = !argsTerminal["no_output"]
	
	// Логика
	const i22TT = new i22TT_Json(conf);
	const res = i22TT.run(component)
	if (isOutput) {
		console.log(res)
	}
	if (isSave) {
		fs.writeFileSync(component, res)
	}
	
}

if (require.main === module) {
	console.log(argsTerminal)
	if (argsTerminal) {
		verificationArgs(argsTerminal)
	}
}
