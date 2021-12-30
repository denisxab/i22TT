import { i22TT } from '../AllTranslete';
import { readFile } from '../helpful';

/*
 * TODO: Документация использования
 * TODO: Создание общего файла с карами перевода со всех компонентов
 * */

const yaml = require('js-yaml');
const fs = require('fs');
const argsTerminal = require('yargs').argv;
const path = require('path')


export type T_DictTextTransleteComponent = {
	[key : string] : [string, string]
};

export type T_Config = { base_arr_lange : { [key : string] : string }; base_lang : string } | null

export type T_SettingsComponent = {
	id_components : number;
	base_lange : string;
}

export type T_Mapi22TTJson = {
	id_components : number;
	base_lange : string;
	words : T_i22Json_word
}
type T_i22Json_word = { [key : string] : T_i22Json_word_val; }
type T_i22Json_word_val = [string, string, { [key : string] : string }]

export type T_FileConfig = {
	// Основной язык
	base_lang : string;
	// Доступные языки
	available_lang : T_AvailableLang
}

type T_AvailableLang = Array<{
	// Название языка
	[key : string] : {
		// Шрифты для языка
		fonts? : Array<string>;
	};
}>;


/* Имя файла с конфигурациями */
export const CONFIG_FILE_NAME : string = 'i22TT.conf.yaml';


export class i22TT_Json {
	
	// Создаем переменную с доступными языками
	public base_arr_lange : { [key : string] : string };
	// Создаем переменную с базовым языком
	public base_lang : string;
	//  Имя файла с конфигурациями
	public file_conf : string;
	
	constructor(config_file_name : string) {
		// Проверка расширения формата конфигурации
		if (path.extname(config_file_name).search(/ya*ml/) === -1) {
			throw `Неверное расширение файла: ${config_file_name}`
		}
		this.file_conf = config_file_name;
		// Устанавливаем конфигурации класса из файла
		const res : { base_arr_lange : { [p : string] : string }; base_lang : string } = this._initConfig()
		this.base_arr_lange = res["base_arr_lange"]
		this.base_lang = res["base_lang"]
	}
	
	/* Запуск скрипта */
	public run(component_file_name : string) : string {
		/*
		 * 0. Чтение и парсинг конфигурации                                     >(Конструктор())
		 * 1. Чтение текста и парсинг настроек компонента                       >(this._FindIdComponent())
		 * 2. Форматирование вызова функции `i22TT.get` в тексте компонента     >(this._formatTextTranslate())
		 *  2.1. В конце каждой итерации нужно формировать объект со словами    >(obj_text_translete)
		 * 3. Получить карту перевода компонента и десериализовать из `json`    >(this._find_i22TT_MapTranslate())
		 *  if False: создать новую карту                                       >(this._buildNewMap())
		 *  if True: объединить данные из текущего компонента с данными в карте >(this._mergeMap())
		 *      - не трогать слова с одинаковым хешем
		 *      - добавлять новые слова в карту
		 *      - не добавлять бесхозные хеш
		 * 4. Собрать детали компонента воедино                                 >(this._formatJsonFromWriteFile)
		 */
		
		// 1.
		const text_component : string = readFile(component_file_name);
		const setting_component : T_SettingsComponent = this._FindSettingsComponent(
			text_component,
			component_file_name
		);
		// 2. и 2.1
		const {obj_text_translete_component, new_text_component} = this._FindTextTranslate_FormatCallFunction(
			text_component,
			component_file_name
		);
		// 3.
		const map_translate_component : T_Mapi22TTJson | null = this._FindMapTranslate(new_text_component)
		let raw_json_map_translete_component : string = ''
		// 3. if True
		if (map_translate_component) {
			raw_json_map_translete_component = this._MergeMap(
				map_translate_component,
				setting_component,
				obj_text_translete_component,
			)
		}
		// 3. if False
		else {
			raw_json_map_translete_component = this._BuildNewMap(
				setting_component,
				obj_text_translete_component,
			);
		}
		// 4.
		return this._AssembleComponent(new_text_component, raw_json_map_translete_component)
	}
	
	/* Объединить карты перевода */
	protected _MergeMap(
		i22TT_map_translate : T_Mapi22TTJson,
		setting_component : T_SettingsComponent,
		obj_text_translete : T_DictTextTransleteComponent,) : string {
		let new_words : T_i22Json_word = {}
		for (const _x in obj_text_translete) {
			// Если нет объекта то создаем его
			if (i22TT_map_translate["words"][_x] === undefined) {
				new_words[_x] = this.__createWords_i22TT(_x, obj_text_translete, setting_component)
			}
			// Если он есть, то добавляем существующий объект без изменений
			else {
				new_words[_x] = i22TT_map_translate["words"][_x]
			}
		}
		// Обновляем объект со словами
		i22TT_map_translate["words"] = new_words
		return JSON.stringify(i22TT_map_translate)
	}
	
	/* Поиск карты перевода в компоненте */
	protected _FindMapTranslate(text_component : string) : T_Mapi22TTJson | null {
		let in_format_text_file = text_component.matchAll(
			/\/\*@i22TT_MapTranslate\n\s*-{22}\s*(?<content>[\s\w\W]+)\s*-{22}\s*@ENDi22TT_MapTranslate\*\//g,
		);
		let res = in_format_text_file.next().value.groups["content"]
		return res ? JSON.parse(res) : null
	}
	
	
	/* Функция для правильного форматирования вызова `i22TT.get` */
	protected _FindTextTranslate_FormatCallFunction(text_component : string, component_file_name : string) : {
		new_text_component : string
		obj_text_translete_component : T_DictTextTransleteComponent;
	} {
		let text : string
		let id : string
		let hash : string
		let groups : { text : string, id : string, hash : string }
		let obj_text_translete : T_DictTextTransleteComponent = {};
		let tmp : IterableIterator<RegExpMatchArray> = text_component.matchAll(
			/i22TT.get[\s]*\([\s]*['"`](?<text>.*|\n*)['"`][\s]*,*[\s]*(?<id>\d*)[\s]*,*[\s]*(?<hash>\d*)[\s]*\)/g,
		)
		if (!tmp) {
			throw `В компоненте ${component_file_name} Слов не найдено`;
		}
		for (const _x of tmp) {
			// @ts-ignore
			groups = _x["groups"]
			if (groups) {
				text = groups["text"]
				id = groups["id"]
				hash = groups["hash"]
				if (!id && !hash) {
					id = '1'
					hash = String(i22TT.hash(text, Number(id)))
				}
				else if (!hash) {
					hash = String(i22TT.hash(text, Number(id)))
				}
				// Правильно ли высчитан хеш ?
				else if (hash != String(i22TT.hash(text, Number(id)))) {
					hash = String(i22TT.hash(text, Number(id)))
				}
				// Вставляем изменение в компонент
				text_component = text_component.replace(new RegExp(
						`i22TT.get[\\s]*\\([\\s]*['"\`]${text}['"\`][\\s]*,*[\\s]*${groups["id"]}[\\s]*,*[\\s]*${groups["hash"]}[\\s]*\\)`),
					`i22TT.get(\`${text}\`,${id},${hash})`,
				)
				obj_text_translete[hash] = [text, id,];
			}
			// Проверить
			// in_text_file.matchAll(new RegExp(`i22TT.get[\\s]*\\(['"\`](?<text>${text})['"\`],*[\\s]*(?<id>${id}),*(?<hash>${hash})\\)`,'g'))
		}
		return {"new_text_component": text_component, "obj_text_translete_component": obj_text_translete}
	}
	
	
	/* Собрать компонент по частям */
	protected _AssembleComponent(new_text_component : string, raw_json_translete : string) : string {
		new_text_component = new_text_component.replace(
			/\/\*@i22TT_MapTranslate\n[\s\w\W]+@ENDi22TT_MapTranslate\*\//g,
			'',
		);
		return `
${new_text_component}
/*@i22TT_MapTranslate
----------------------
${raw_json_translete}
----------------------
@ENDi22TT_MapTranslate*/`.slice(1);
	}
	
	
	/* Создать `JSON i22TT` из данных компонента */
	protected _BuildNewMap(
		setting_component : T_SettingsComponent,
		obj_text_translete : T_DictTextTransleteComponent,
	) : string {
		const create_body = () : Pick<T_Mapi22TTJson, 'words'> => {
			// Создаем часть результирующего объекта
			let _body : Pick<T_Mapi22TTJson, 'words'> = {words: {}};
			for (const _x in obj_text_translete) {
				_body['words'][_x] = this.__createWords_i22TT(_x, obj_text_translete, setting_component)
			}
			return _body
		}
		// Создаем полноценный объект
		const res_json : T_Mapi22TTJson = {
			id_components: setting_component['id_components'],
			base_lange: setting_component['base_lange']!,
			...create_body(),
		};
		return JSON.stringify(res_json, null, 2);
	}
	
	
	/* Прочитать конфигурации из файла и сохранить их в переменные */
	protected _initConfig() : { base_arr_lange : { [p : string] : string }; base_lang : string } {
		// Читаем файл с конфигурациями
		const resConf : T_Config = this._redConfig();
		if (resConf) {
			return {base_arr_lange: resConf['base_arr_lange'], base_lang: resConf['base_lang']}
		}
		else {
			throw `Неверные данные конфигурации ${this.file_conf}`
		}
	}
	
	
	/* Читаем файла с конфигурациями */
	protected _redConfig() : T_Config {
		/*	Проверяем корректность конфигурации */
		const valid_json_conf = (_text_config : T_FileConfig | null) : boolean => {
			if (_text_config) {
				const base_lang : string = String(_text_config['base_lang'])
				const available_lang : T_AvailableLang = _text_config['available_lang']
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
		let text_config : T_FileConfig | null;
		try {
			text_config = yaml.load(readFile(this.file_conf));
		} catch (e) {
			throw `Некорректное оформление YAML файла: "${this.file_conf}" ->${e}`
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
	
	
	/*  Поиск в тексте компонента - ID и базового языка  */
	protected _FindSettingsComponent(
		text_component : string,
		component_file_name : string,
	) : T_SettingsComponent {
		let res : RegExpMatchArray | null = text_component.match(
			/i22TT.id_components[\s]*\((?<id_components>\d+)\s*(,\s*['"`]+(?<base_lange>[\w\d]+)['"`]+)*\)/,
		);
		// console.log(res)
		if (res && res.length >= 2 && res.groups && res.groups['id_components']) {
			// Получаем язык из компонента или берем из конфигурации.
			const lang_component : string = res.groups['base_lange'] ? res.groups['base_lange'] : this.base_lang
			// Если переопределяющий язык в компоненте, допустим в конфигурациях.
			if (this.base_arr_lange[lang_component] !== undefined) {
				return {
					id_components: Number(res.groups['id_components']),
					base_lange: lang_component,
				};
			}
			throw `
			Ошибка настройки компонента ${component_file_name}:
			Язык который вы указали в компоненте - "${lang_component}"  неразрешен в конфигурациях
			${this.file_conf}
			Если вы хотите использовать этот язык, то добавите его в конфигурации
			`
		}
		
		throw `Настройки компонента ${component_file_name} не найден:
		'''
		${JSON.stringify(res, null, 2)}
		'''
		Убедитесь в том что вы указали id компонента, и имя языка(на английском без пробелов)`;
	}
	
	
	/* Создать контент для `T_i22Json_word_val` */
	protected __createWords_i22TT = (
		key_ : string,
		obj_text_translete : T_DictTextTransleteComponent,
		setting_component : T_SettingsComponent,
	) : T_i22Json_word_val => {
		return [
			obj_text_translete[key_][0],
			obj_text_translete[key_][1],
			{
				...this.base_arr_lange,
				...{[setting_component['base_lange']]: obj_text_translete[key_][0]},
			},
		];
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
