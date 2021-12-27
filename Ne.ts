import {i22TT} from './AllTranslete';
import {text} from 'stream/consumers';
import {redFile} from './helpful';

/*
 * TODO: Документация использования
 * TODO: Переопределение базового шаблона
 *
 * */

const yaml = require('js-yaml');
const fs = require('fs');

/* Имя файла с конфигурациями */
export const CONFIG_FILE_NAME: string = 'i22TT.conf.yaml';
/* Доступные языки */
export let AVAILABLE_LANG_SET = new Set(['ru', 'en', 'japan', 'uk']);
export const AVAILABLE_LANG_ARR = Array.from(AVAILABLE_LANG_SET);
export type TYPE_AVAILABLE_LANG = typeof AVAILABLE_LANG_ARR[number];

/* Типы данных */
export type IFindTextFromTranslate = Array<{
	hash_int: number;
	text: string;
	id: number;
}>;

export interface IFindIdComponent {
	id_components: number;
	base_lange: string;
}

export interface i22TTJson {
	id_components: number;
	base_lange: string;
	words: {
		[key: number]: [string, number, {[key: string]: string}];
	};
}

export interface IFileConf {
	// Основной язык
	base_lang: string;
	// Доступные языки
	available_lang: Array<{
		// Название языка
		[key in TYPE_AVAILABLE_LANG]: {
			// Шрифты для языка
			fonts?: Array<string>;
		};
	}>;
}

export class i22TT_Json {
	// Создаем переменную с достпуными языками
	public static base_arr_lange: {[key: string]: string};
	// Создаем переменную с базавым языком
	public static base_lang: string;
	// Данные о компаненте
	public component: IFindIdComponent;
	// Список слов
	public arr_text_translete: IFindTextFromTranslate;
	//  Имя текущего файла
	public file_name: string;
	// Результат
	public i22TT_json: string;

	constructor(file_name: string) {
		// Получам кофигурации из файла
		if (!i22TT_Json.base_arr_lange || !i22TT_Json.base_lang) {
			i22TT_Json.getConfig();
		}
		this.file_name = file_name;
		// Читаем исходный файл
		let text_file: string = redFile(this.file_name);
		// Получить `ID` компанента
		this.component = i22TT_Json.FindIdComponent(text_file, file_name);
		// Поиск слов для перевода
		this.arr_text_translete = i22TT_Json.FindTextFromTranslate(
			text_file,
			file_name,
		);
		// Создаем `JSON`
		this.i22TT_json = i22TT_Json.buildJson(
			this.component,
			this.arr_text_translete,
		);
	}

	/* Прочитать конфигурации из файла и сохранить их в переменные */
	public static getConfig(path_file_name_config?: string) {
		// Читаем файл с конфигурациями
		const resConf = i22TT_Json.redConfig(path_file_name_config);
		if (resConf) {
			i22TT_Json.base_arr_lange = resConf['base_arr_lange'];
			i22TT_Json.base_lang = resConf['base_lang'];
		}
	}

	/*  Поиск  ID компонента в текста */
	public static FindIdComponent(
		text_component: string,
		file_name?: string,
	): IFindIdComponent {
		let res: RegExpMatchArray | null = text_component.match(
			/i22TT.id_components[\s]*\((?<id_components>\d+)\s*(,\s*['"`]+(?<base_lange>[\w\d]+)['"`]+)*\)/,
		);
		// console.log(res)
		if (res && res.length >= 2 && res.groups) {
			return {
				id_components: Number(res.groups['id_components']),
				base_lange: res.groups['base_lange']
					? res.groups['base_lange']
					: i22TT_Json.base_lang,
			};
		} else {
			throw `ID компанента ${file_name} не найден`;
		}
	}

	/* Поиск слов в тексте */
	public static FindTextFromTranslate(
		text_find: string,
		file_name?: string,
	): IFindTextFromTranslate {
		let tmp: IterableIterator<RegExpMatchArray> = text_find.matchAll(
			/i22TT.get[\s]*\("*(?<text>[а-яА-Яa-zA-Z0-9 ]+)"*,*[\s]*(?<id>\d*)\)/g,
		);
		let res: IFindTextFromTranslate = [];
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
		if (!res) {
			throw `В компаненте ${file_name} Слов не найдено`;
		}
		return res;
	}

	/* Создать `JSON i22TT` из данных компанента */
	public static buildJson(
		component: IFindIdComponent,
		arr_text_translete: IFindTextFromTranslate,
	): string {
		// Проверка воходных данных
		if (!arr_text_translete || !component) {
			throw `Неверные аргументы "arr_text_translete" "component"`;
		}
		// Создаем часть рузультрующего объекта
		let obj_words: Pick<i22TTJson, 'words'> = {words: {}};
		for (const _x of arr_text_translete) {
			obj_words['words'][_x['hash_int']] = [
				_x['text'],
				_x['id'],
				{
					...i22TT_Json.base_arr_lange,
					...{[i22TT_Json.base_lang]: _x['text']},
				},
			];
		}
		// Создаем полноценный обьект
		const res_json: i22TTJson = {
			id_components: component['id_components'],
			base_lange: component['base_lange'],
			...obj_words,
		};
		return JSON.stringify(res_json, null, 2);
	}

	/* Запись `JSON` в компанент */
	public static writeJson(json: string, file_name: string): void {
		let in_text_file: string = redFile(file_name);
		let in_format_text_file = in_text_file.replace(
			/\/\* @i22TT_MapTranslate\n-{22}\n[\w\W]+-{22}\n@ENDi22TT_MapTranslate\n\*\//g,
			'',
		);
		const out_format_text_file = `
${in_format_text_file}
/*
@i22TT_MapTranslate
----------------------
${json}
----------------------
@ENDi22TT_MapTranslate
*/`;
		fs.writeFileSync(file_name, out_format_text_file);
	}

	/* Чтени файла с конфигурациями */
	private static redConfig(
		path_file_name_config: string = CONFIG_FILE_NAME,
	): {base_arr_lange: {[key: string]: string}; base_lang: string} | null {
		/*	Првоеряем коректность конфигурации */
		function valid_json_conf(text: IFileConf | null): boolean {
			if (text_config) {
				// Првоеряем наличие и тип ключей
				if (
					text_config['base_lang'] !== undefined &&
					typeof text_config['base_lang'] == 'string' &&
					text_config['available_lang'] !== undefined &&
					typeof text_config['available_lang'] == 'object'
				) {
					// Проверяем языки
					for (const _x in text_config['available_lang']) {
						// Проверяем доступен ли указанный язык
						if (!AVAILABLE_LANG_SET.has(_x)) {
							throw `'${_x}' не допустимый язык`;
						}
						// Првоеряем правильно ли указано имя ключа
						if (text_config['available_lang'][_x]['fonts'] === undefined) {
							throw `'${_x}' не верный ключ "fonts"`;
						}
					}
					return true;
				}
			}
			return false;
		}

		// Получаем данные из файла с конфигурациями
		let text_config: IFileConf | null;
		try {
			text_config = yaml.load(redFile(path_file_name_config));
		} catch (e) {
			console.log(e);
			return null;
		}
		// Првоеряем коректность данных
		if (valid_json_conf(text_config)) {
			// console.log(text_config)
			// Формируем `base_arr_lange`
			let base_arr_lange: {[key: string]: string} = {};
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
}

if (require.main === module) {
	if (process.argv.length >= 2) {
		console.log(process.argv[2]);
		const res = new i22TT_Json(process.argv[2]);
		console.log(res.i22TT_json);
	}
}
