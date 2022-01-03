import { i22TT } from './AllTranslete';
import { readFile } from './helpful';

/*
 * TODO: Документация использования
 *
 * TODO: Создание общего файла с картами перевода со всех компонентов
 * TODO: Сделать возможным указание папки в которой нужно найти укатанные расширения и создать карты
 *
 * */

const yaml = require('js-yaml');
const fs = require('fs');
const argsTerminal = require('yargs').argv;
const path = require('path')


export type T_DictTextTransleteComponent = {
	[key : string] : [string, number]
};

export type T_Config = { base_arr_lange : { [key : string] : string }; base_lang : string } | null

export type T_SettingsComponent = {
	id_component : number;
	base_lang : string;
}

export type T_Mapi22TTJson = {
	[id_component : number] : T_Mapi22TTJson_context
}
type T_Mapi22TTJson_context = {
	base_lang : string;
	words : T_i22Json_word;
}
type T_i22Json_word = { [key : string] : T_i22Json_word_val; }
type T_i22Json_word_val = [string, number, { [key : string] : string }]

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
export const CONFIG_FILE_NAME : string = './i22TT.conf.yaml';


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
		const res : { base_arr_lange : { [p : string] : string }; base_lang : string } = this._InitConfig()
		this.base_arr_lange = res["base_arr_lange"]
		this.base_lang = res["base_lang"]
	}
	
	public MargeComponentMap(...names_components : Array<string>) : string {
		/*
		 * 1. Прочитать файл с компонентом
		 * 2. Получить карту перевода
		 *   if True:
		 *       Распарсить карту и добавить данные в общий массив
		 *   if False:
		 *       Вызвать ошибку
		 * 3. Объединить карты в один `JSON`
		 * */
		
		// Переменная для информативного вывода в случае ошибки одинаковых `id` у компонентов
		let path_map_component : { [key : number] : string } = {}
		let arr_text_component : T_Mapi22TTJson = {}
		let tmp : T_Mapi22TTJson | null = null
		names_components.map((path) => {
				// 1.
				tmp = this._FindMapTranslate(readFile(path))
				// if False:
				if (!tmp) {
					throw `Карта перевода не найдена: [${path}]`
				}
				// if False:
				if (arr_text_component[Number(Object.keys(tmp)[0])] !== undefined) {
					throw `У компонентов [${path}]===[${path_map_component[Number(Object.keys(tmp)[0])]}] одинаковые id [${Object.keys(tmp)[0]}]`
				}
				path_map_component[Number(Object.keys(tmp)[0])] = path
				//	3.
				arr_text_component = Object.assign(arr_text_component, tmp);
			}
		)
		return JSON.stringify(arr_text_component, null, 2)
	}
	
	/* Запуск скрипта */
	public run(component_file_name : string) : string {
		/*
		 * 0. Чтение и парсинг конфигурации                                     >(Конструктор())
		 * 1. Чтение текста и парсинг настроек компонента                       >(this._FindSettingsComponent())
		 * 2. Форматирование вызова функции `i22TT.get` в тексте компонента     >(this._FindTextTranslate_FormatCallFunction())
		 *  2.1. В конце каждой итерации нужно формировать объект со словами    >(obj_text_translete)
		 * 3. Получить карту перевода компонента и десериализовать из `json`    >(this.map_translate_component())
		 *  if False: создать новую карту                                       >(this._BuildNewMap())
		 *  if True: объединить данные из текущего компонента с данными в карте >(this._MergeMap())
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
		if (map_translate_component && Object.keys(map_translate_component)[0]) {
			raw_json_map_translete_component = this._MergeMap(
				// @ts-ignore
				map_translate_component[Object.keys(map_translate_component)[0]],
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
		map_translate_component : T_Mapi22TTJson_context,
		setting_component : T_SettingsComponent,
		obj_text_translete : T_DictTextTransleteComponent,) : string {
		let new_words : T_i22Json_word = {}
		for (const _x in obj_text_translete) {
			// Если нет объекта то создаем его
			if (map_translate_component["words"][_x] === undefined) {
				new_words[_x] = this.__createWords_i22TT(_x, obj_text_translete, setting_component)
			}
			// Если он есть, то добавляем существующий объект без изменений
			else {
				new_words[_x] = map_translate_component["words"][_x]
			}
		}
		// Обновляем объект со словами
		map_translate_component["words"] = new_words
		map_translate_component["base_lang"] = setting_component["base_lang"]
		return JSON.stringify({[setting_component["id_component"]]: map_translate_component}, null, 2)
	}
	
	/* Поиск карты перевода в компоненте */
	protected _FindMapTranslate(text_component : string) : T_Mapi22TTJson | null {
		let in_format_text_file = text_component.matchAll(
			/\/\*@i22TT_MapTranslate\n\s*-{22}\s*(?<content>[\s\w\W]+)\s*-{22}\s*@ENDi22TT_MapTranslate\*\//g,
		);
		let res = in_format_text_file.next().value
		if (res) {
			return JSON.parse(res.groups["content"])
		}
		return null
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
			/i22TT.get\s*\(\s*['"`](?<text>.*|\n*)['"`]\s*,*\s*(?<id>\d*)\s*,*\s*(?<hash>\d*)\s*\)/g,
		)
		
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
						/*
						 * text.replace = Для экранирования символов `\n\t` чтобы их можно было найти в тексте
						 * */
						`i22TT.get\\s*\\(\\s*['"\`]${text.replace("\\","\\\\")}['"\`]\\s*,*\\s*${groups["id"]}\\s*,*\\s*${groups["hash"]}\\s*\\)`, "g"),
					`i22TT.get(\`${text}\`,${id},${hash})`,
				)
				obj_text_translete[hash] = [text, Number(id),];
			}
			// Проверить
			// in_text_file.matchAll(new RegExp(`i22TT.get[\\s]*\\(['"\`](?<text>${text})['"\`],*[\\s]*(?<id>${id}),*(?<hash>${hash})\\)`,'g'))
		}
		// Если массив со словами пустой
		if (Object.keys(obj_text_translete).length == 0) {
			throw `В компоненте ${component_file_name} Слов не найдено`;
		}
		return {"new_text_component": text_component, "obj_text_translete_component": obj_text_translete}
	}
	
	/* Собрать компонент по частям */
	protected _AssembleComponent(new_text_component : string, raw_json_translete : string) : string {
		new_text_component = new_text_component.replace(
			/\s*\/\*@i22TT_MapTranslate\n[\s\w\W]+@ENDi22TT_MapTranslate\*\//g,
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
		const create_body = () : { words : T_i22Json_word } => {
			// Создаем часть результирующего объекта
			let _body : T_i22Json_word = {};
			for (const _x in obj_text_translete) {
				_body[_x] = this.__createWords_i22TT(_x, obj_text_translete, setting_component)
			}
			return {words: _body}
		}
		// Создаем полноценный объект
		const res_json : T_Mapi22TTJson = {
			[setting_component['id_component']]:
				{
					base_lang: setting_component['base_lang'],
					...create_body(),
					
				}
		}
		return JSON.stringify(res_json, null, 2);
	}
	
	/* Прочитать конфигурации из файла и сохранить их в переменные */
	protected _InitConfig() : { base_arr_lange : { [p : string] : string }; base_lang : string } {
		// Читаем файл с конфигурациями
		const resConf : T_Config = this._ReadConfig();
		if (resConf) {
			return {base_arr_lange: resConf['base_arr_lange'], base_lang: resConf['base_lang']}
		}
		else {
			throw `Неверные данные конфигурации ${this.file_conf}`
		}
	}
	
	/* Читаем файла с конфигурациями */
	protected _ReadConfig() : T_Config {
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
			/i22TT.id_component\s*\((?<id_component>\d+)\s*(,\s*['"`]+(?<base_lang>[\w\d]+)['"`]+)*\)/,
		);
		// console.log(res)
		if (res && res.length >= 2 && res.groups && res.groups['id_component']) {
			// Получаем язык из компонента или берем из конфигурации.
			const lang_component : string = res.groups['base_lang'] ? res.groups['base_lang'] : this.base_lang
			// Если переопределяющий язык в компоненте, допустим в конфигурациях.
			if (this.base_arr_lange[lang_component] !== undefined) {
				return {
					id_component: Number(res.groups['id_component']),
					base_lang: lang_component,
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
	protected __createWords_i22TT(
		key_ : string,
		obj_text_translete : T_DictTextTransleteComponent,
		setting_component : T_SettingsComponent,
	) : T_i22Json_word_val {
		return [
			obj_text_translete[key_][0],
			obj_text_translete[key_][1],
			{
				...this.base_arr_lange,
				...{[setting_component['base_lang']]: obj_text_translete[key_][0]},
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
