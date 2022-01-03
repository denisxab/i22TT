import * as _ from "lodash";
import { i22TT_Json, T_DictTextTransleteComponent, T_SettingsComponent } from "../parse_component";
import { readFile } from "../helpful";

const fs = require('fs');

const TwoZip = <T1, T2, T3>(zip_1 : Array<T1>, zip_2 : Array<T2>, try_arr_arr : Array<Array<T3>>, callback : any) => {
	_.zipWith(
		zip_1,
		try_arr_arr,
		(_zip_1 : T1, try_arr : Array<T3>) => {
			_.zipWith(zip_2, try_arr, (_zip_2 : T2, try_item : T3) => {
					// @ts-ignore
					callback(_zip_1, _zip_2, try_item)
				}
			)
		})
}

class TEST_i22TT_Json extends i22TT_Json {
	
	public buildNewMap(setting_component : T_SettingsComponent, obj_text_translete : T_DictTextTransleteComponent) : string {
		return this._BuildNewMap(setting_component, obj_text_translete)
		
	}
	
	public FindSettingsComponent(text_component : string, component_file_name : string,) : T_SettingsComponent {
		return this._FindSettingsComponent(text_component, component_file_name)
	}
	
	public FindTextTranslate_FormatCallFunction(text_find : string, component_file_name : string,) : {
		new_text_component : string
		obj_text_translete_component : T_DictTextTransleteComponent;
	} {
		return this._FindTextTranslate_FormatCallFunction(text_find, component_file_name)
	}
}

let obj_i22TT : TEST_i22TT_Json | undefined


describe("Финальная проверка `run`", () => {
	// Эта функция будет вызваться каждый раз при функции теста
	beforeEach(() => {
		obj_i22TT = undefined
	})
	
	test("Проверка `run`", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
		]
		// Верные ответы
		let try_arr : string[][] = [
			[
				`/home/denis/WebstormProjects/i22TT/tests/test_data/test_component/component_try/Compant_1.tsx`,
				`/home/denis/WebstormProjects/i22TT/tests/test_data/test_component/component_try/Compant_2.tsx`,
				`/home/denis/WebstormProjects/i22TT/tests/test_data/test_component/component_try/Compant_3.tsx`,
				`/home/denis/WebstormProjects/i22TT/tests/test_data/test_component/component_try/Compant_4.tsx`,
				`/home/denis/WebstormProjects/i22TT/tests/test_data/test_component/component_try/Compant_6.tsx`,
				`/home/denis/WebstormProjects/i22TT/tests/test_data/test_component/component_try/Compant_7.tsx`,
			],
		]
		// Компоненты
		let arr_comp : string[] = [
			`${__dirname}/test_data/test_component/component/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_4.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_6.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_7.tsx`,
		]
		TwoZip<string, string, string>(arr_config, arr_comp, try_arr, (_path_conf : string, _path_comp : string, try_arr : string) => {
			obj_i22TT = new TEST_i22TT_Json(_path_conf)
			const res : string = obj_i22TT.run(_path_comp)
			expect(res).toEqual(readFile(try_arr))
		})
	})
})


describe("initConfig / redConfig", () => {
	// Эта функция будет вызваться каждый раз при функции теста
	beforeEach(() => {
		obj_i22TT = undefined
	})
	
	test("Тест чтения файла конфигурации и создания класса", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_2.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_3.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_4.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_5.conf.yaml`,
		]
		// Верные ответы
		let try_arr : any[][] = [
			[[{ru: "", en: "", uk: "", japan: ""}, "ru"]],
			[[{ru: "", en: "", uk: "", japan: ""}, "en"]],
			[[{ru: "", japan: ""}, "japan"]],
			[[{ru: "", en: "", japan: "", uk: "", Russuan_Moskow: ""}, "Russuan_Moskow"]],
			[[{ru: "", en: "", japan: "", uk: "", Russuan_Moskow: ""}, "uk"]],
		]
		// Компоненты
		let arr_comp : string[] = [
			`${__dirname}/test_data/test_component/component/Compant_1.tsx`
		]
		TwoZip<string, string, any>(arr_config, arr_comp, try_arr, (_path_conf : string, _path_comp : string, try_ : any) => {
			obj_i22TT = new TEST_i22TT_Json(_path_conf)
			// Проверяем корректность данных
			expect(obj_i22TT.file_conf).toEqual(_path_conf)
			expect(obj_i22TT.base_arr_lange).toEqual(try_[0])
			expect(obj_i22TT.base_lang).toEqual(try_[1])
		})
	})
	
	test("Проверка возникновения ошибки при некорректной конфигурации", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/false/i22TT_1_False_.conf.yaml`,
			`${__dirname}/test_data/test_conf/false/i22TT_3_False_.conf.yaml`,
			`${__dirname}/test_data/test_conf/false/i22TT_6_False_.conf.yaml`,
			`${__dirname}/test_data/test_conf/false/i22TT_6####_False_.conf.yaml`,
		]
		// Верные ответы
		let try_arr : RegExp[] = [
			/Файл[\w\W]+Базовый язык 'неверный язык' не добавлен в разрешённые\(available_lang\) язык/,
			/Некорректное оформление YAML файла:[\w\W]+YAMLException[\w\W]+/,
			/Неверные данные конфигурации[\w\W]+/,
			/Некорректное оформление YAML файла[\w\W]+/,
		]
		_.zipWith(
			arr_config, try_arr, (_path_conf : string, try_ : RegExp) => {
				try {
					new TEST_i22TT_Json(_path_conf)
					throw "!!!"
				} catch (e) {
					expect(e).toMatch(try_)
				}
			}
		)
	})
	
	test("Проверка реакции на некорректное оформление файла конфигурации", () => {
		_.zipWith(
			[
				`${__dirname}/test_data/test_conf/false/i22TT_2_False_.conf.yaml`,
			],
			[`'uk' не верный ключ "fonts"`],
			
			function (_input, _out) {
				expect(() => new TEST_i22TT_Json(_input)).toThrow(_out)
			})
	})
	
	test("Проверка конструктора `i22TT`, на то чтобы он не допускал файлы неподходящего разрешения", () => {
		_.zipWith(
			[
				"test.txt",
				"tds1est.csv",
				"tsqqdest.mp3",
				"tsdest.yasml",
			],
			[
				/Неверное расширение файла: test.txt/,
				/Неверное расширение файла: tds1est.csv/,
				/Неверное расширение файла: tsqqdest.mp3/,
				/Неверное расширение файла: tsdest.yasml/,
			]
			,
			function (_input, _out) {
				try {
					obj_i22TT = new TEST_i22TT_Json(_input)
					throw "!!!"
				} catch (e) {
					
					expect(e).toMatch(_out)
				}
			})
	})
	
	test("Проверка конструктора `i22TT`, на то чтобы он допускал файлы подходящего разрешения", () => {
		_.zipWith(
			[
				"tsdest.yaml",
				"tsqqdest.yml",
			],
			[
				/Некорректное оформление YAML файла[\w\W]+/,
				/Некорректное оформление YAML файла[\w\W]+/,
			],
			function (_input, _out) {
				try {
					obj_i22TT = new TEST_i22TT_Json(_input)
					throw "!!!"
				} catch (e) {
					expect(e).toMatch(_out)
				}
			})
	})
})


describe("FindSettingsComponent", () => {
	// Эта функция будет вызваться каждый раз при функции теста
	beforeEach(() => {
		obj_i22TT = undefined
	})
	
	test("Проверка нахождения id и базового языка у компонента", () => {
		type tmp = Array<Array<{ id_component : number, base_lang : string }>>
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_2.conf.yaml`,
		]
		// Верные ответы
		let try_arr : tmp = [
			[
				{
					id_component: 22,
					base_lang: 'ru',
				},
				{
					id_component: 33,
					base_lang: "en",
				},
				{
					id_component: 265,
					base_lang: 'ru',
				},
				{
					id_component: 3265,
					base_lang: 'ru',
					
				},
			],
			[
				{
					id_component: 22,
					base_lang: "ru",
				},
				{
					id_component: 33,
					base_lang: "en",
					
				},
				{
					id_component: 265,
					base_lang: 'en',
					
				},
				{
					id_component: 3265,
					base_lang: 'en',
					
				},
			]
		]
		// Компоненты
		let arr_comp : string[] = [
			`${__dirname}/test_data/test_component/component/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_4.tsx`,
		]
		TwoZip<any, any, any>(arr_config, arr_comp, try_arr, (
			_path_conf : string,
			_path_comp : string,
			_try_text : tmp) => {
			obj_i22TT = new TEST_i22TT_Json(_path_conf)
			const res_fun : T_SettingsComponent = obj_i22TT.FindSettingsComponent(readFile(_path_comp), _path_comp)
			expect(res_fun).toEqual(_try_text)
		})
		
	})
	
	test("Проверка случая когда не указан `id` компонента", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
		]
		// Верные ответы
		let try_arr : Array<Array<RegExp>> = [
			[
				/Настройки компонента[\w\W]+не найден:[\w\W]+Убедитесь в том что вы указали id компонента, и имя языка\(на английском без пробелов\)/,
				/Настройки компонента[\w\W]+не найден:[\w\W]+Убедитесь в том что вы указали id компонента, и имя языка\(на английском без пробелов\)/
			],
		]
		// Компоненты
		let arr_comp : string[] = [
			`${__dirname}/test_data/test_component/component_false/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/component_false/Compant_2.tsx`,
		]
		TwoZip<string, string, RegExp>(arr_config, arr_comp, try_arr, (
			_path_conf : string,
			_path_comp : string,
			_try_text : RegExp) => {
			obj_i22TT = new TEST_i22TT_Json(_path_conf)
			try {
				obj_i22TT.FindSettingsComponent(readFile(_path_comp), _path_comp)
				throw "!!!"
			} catch (e) {
				expect(e).toMatch(_try_text)
			}
		})
	})
	
	test("Случай когда базовый язык компонента не находиться в списке допустимых языков конфигурации", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_4.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_5.conf.yaml`,
		]
		
		// Верные ответы
		let try_arr : Array<Array<RegExp>> = [[
			/[\w\W]+Ошибка настройки компонента[\w\W]+неразрешен в конфигурациях[\w\W]+/g
		]]
		// Компоненты
		let arr_comp : string[] = [
			`${__dirname}/test_data/test_component/component_false/Compant_3.tsx`,
		]
		TwoZip<string, string, RegExp>(arr_config, arr_comp, try_arr, (
			_path_conf : string,
			_path_comp : string,
			_try_text : RegExp) => {
			obj_i22TT = new TEST_i22TT_Json(_path_conf)
			try {
				obj_i22TT!.FindSettingsComponent(readFile(_path_comp), _path_comp)
			} catch (e) {
				expect(e).toMatch(_try_text)
			}
		})
	})
})


describe("FindTextTranslate_FormatCallFunction`", () => {
	// Эта функция будет вызваться каждый раз при функции теста
	beforeEach(() => { obj_i22TT = undefined })
	
	test("Проверяем нахождения текста для перевода в компоненте", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
		]
		// Верные ответы
		let try_arr : Array<Array<T_DictTextTransleteComponent>> = [[
			{
				"3217": [
					"Дом",
					1
				],
				"4410": [
					"Дым и  ",
					1
				],
				"6536": [
					" Паркет ",
					1
				],
				"7652": [
					"День мир5",
					1
				],
				"8811": [
					"День и ноч 3",
					1
				],
				"9811": [
					"Привет мир4",
					1
				],
				"9866": [
					"Привет мир64",
					1
				],
				"10172": [
					" сон и сосны \\t ",
					1
				],
				"10597": [
					"Привет мир45",
					62
				],
				"13060": [
					"Мебель и стены",
					1
				],
				"17450": [
					"Как тут тестить код",
					1
				]
			},
			{
				"622": [
					"hellp 2",
					1
				],
				"857": [
					"SDW sd",
					62
				],
				"981": [
					"asdsd dads",
					1
				],
				"1018": [
					"DWQDwsd dQWD",
					1
				],
				"1069": [
					"21323asadasd 3",
					1
				],
				"1433": [
					"qDQWsdQWSDqw dWS",
					1
				],
				"4509": [
					"sadqwd23ad мqdир5",
					1
				]
			},
			{
				"7598": [
					"День мир",
					1
				],
				"9775": [
					"Приветмир1",
					1
				],
				"9809": [
					"Приветмир 2",
					1
				],
				"9810": [
					"Приветмир 3",
					1
				],
				"9811": [
					"Привет мир4",
					1
				],
				"9866": [
					"Привет мир64",
					1
				],
				"10597": [
					"Привет мир45",
					62
				]
			},
			{
				"7652": [
					"День мир5",
					1
				],
				"9775": [
					"Приветмир1",
					1
				],
				"9809": [
					"Приветмир 2",
					1
				],
				"9810": [
					"Приветмир 3",
					1
				],
				"9811": [
					"Привет мир4",
					1
				],
				"9866": [
					"Привет мир64",
					1
				],
				"10597": [
					"Привет мир45",
					62
				]
			}
		]]
		// Компоненты
		let arr_comp : string[] = [
			`${__dirname}/test_data/test_component/component/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_4.tsx`,
		]
		TwoZip(arr_config, arr_comp, try_arr, (_path_conf : string, _path_comp : string, _try_text : Array<{ text : string, id : number, hash_int : number }>) => {
			obj_i22TT = new TEST_i22TT_Json(_path_conf)
			const {
				obj_text_translete_component,
				new_text_component
			} = obj_i22TT.FindTextTranslate_FormatCallFunction(readFile(_path_comp), _path_comp)
			expect(obj_text_translete_component).toEqual(_try_text)
		})
	})
	
	test("Проверяем случай когда функция `i22TT.get` вызвана но слово для перевода не указанно", () => {
		
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_2.conf.yaml`,
			`${__dirname}/test_data/test_conf/try/i22TT_3.conf.yaml`,
		]
		// Верные ответы
		let try_arr : Array<Array<string>> = [
			[`В компоненте ${__dirname}/test_data/test_component/component_false/Compant_4.tsx Слов не найдено`],
			[`В компоненте ${__dirname}/test_data/test_component/component_false/Compant_4.tsx Слов не найдено`],
			[`В компоненте ${__dirname}/test_data/test_component/component_false/Compant_4.tsx Слов не найдено`],
		]
		let arr_comp : string[] = [
			`${__dirname}/test_data/test_component/component_false/Compant_4.tsx`
		]
		
		TwoZip(arr_config, arr_comp, try_arr, (_path_conf : string, _path_comp : string, try_ : string) => {
			try {
				obj_i22TT = new TEST_i22TT_Json(_path_conf)
				obj_i22TT.FindTextTranslate_FormatCallFunction(readFile(_path_comp), _path_comp)
			} catch (e) {
				expect(e).toEqual(try_)
			}
		})
	})
})


describe("Проверка объединения файлов `MargeComponentMap`", () => {
	
	
	// Эта функция будет вызваться каждый раз при функции теста
	beforeEach(() => {
		obj_i22TT = undefined
	})
	
	test("Корректный вариант объединения компонентов", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
		]
		// Верный ответ
		let try_ : Array<string> = [
			`${__dirname}/test_data/test_marge/try_json.json`
		]
		// Логика
		obj_i22TT = new TEST_i22TT_Json(arr_config[0])
		const res : string = obj_i22TT.MargeComponentMap(
			`${__dirname}/test_data/test_marge/Compant_1.tsx`,
			`${__dirname}/test_data/test_marge/Compant_2.tsx`,
			`${__dirname}/test_data/test_marge/Compant_3.tsx`,
		)
		expect(res).toEqual(readFile(try_[0]))
	})
	
	test("Что если передать компоненты с одинаковыми `id`", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
		]
		// Верный ответ
		let try_ : Array<RegExp> = [
			/У компонентов [\w\W]+Compant_1_1.tsx[\w\W]+===[\w\W]+Compant_1.tsx[\w\W]+ одинаковые id [\w\W]+22[\w\W]+/
		
		]
		// Логика
		obj_i22TT = new TEST_i22TT_Json(arr_config[0])
		try {
			const res : string = obj_i22TT.MargeComponentMap(
				`${__dirname}/test_data/test_marge/Compant_1.tsx`,
				`${__dirname}/test_data/test_marge/Compant_1_1.tsx`,
			)
			throw "!!!"
		} catch (e) {
			expect(e).toMatch(try_[0])
		}
	})
	
	test("Что если передать компонент без карты", () => {
		// Конфигурации
		let arr_config : string[] = [
			`${__dirname}/test_data/test_conf/try/i22TT_1.conf.yaml`,
		]
		// Верный ответ
		let try_ : Array<RegExp> = [
			/Карта перевода не найдена:[\w\W]+/g
		]
		// Логика
		obj_i22TT = new TEST_i22TT_Json(arr_config[0])
		try {
			const res : string = obj_i22TT.MargeComponentMap(
				`${__dirname}/test_data/test_marge/Compant_4.tsx`,
			)
			throw "!!!"
		} catch (e) {
			expect(e).toMatch(try_[0])
		}
	})
})

// describe("buildJson", () => {
//
// 	// Эта функция будет вызваться каждый раз при функции теста
// 	beforeEach(() => {
// 		obj_i22TT = undefined
// 	})
//
// 	test("Проверка `buildJson` ", () => {
//
// 		// Конфигурации
// 		let arr_config : string[] = [
// 			`${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
// 			`${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
// 		]
// 		// Верные ответы
// 		let try_arr : Array<Array<any>> = JSON.parse(readFile(`${__dirname}/test_data/data_test_FindIdComponent.json`))
// 		// Компоненты
// 		let arr_comp : string[] = [
// 			`${__dirname}/test_data/test_component/Compant_1.tsx`,
// 			`${__dirname}/test_data/test_component/Compant_2.tsx`,
// 			`${__dirname}/test_data/test_component/Compant_3.tsx`,
// 			`${__dirname}/test_data/test_component/Compant_4.tsx`,
// 		]
// 		TwoZip(arr_config, arr_comp, try_arr, (_path_conf : string, _path_comp : string, _try_text : Array<{ text : string, id : number, hash_int : number }>) => {
// 			obj_i22TT = new TEST_i22TT_Json(_path_conf)
// 			// Тестовый набор данных
//
// 			const tes_FindTextFromTranslate = obj_i22TT.FindTextTranslate_FormatCallFunction(readFile(_path_comp), _path_comp)
// 			// Тестовый набор данных
// 			const test_FindIdComponent = obj_i22TT.FindSettingsComponent(readFile(_path_comp), _path_comp)
// 			// Верный ответ
// 			const res = obj_i22TT.buildNewMap(test_FindIdComponent, tes_FindTextFromTranslate, _path_conf)
// 			// console.log(_path_conf, _path_comp, res)
// 			// console.log(JSON.parse(res))
// 			expect(JSON.parse(res)).toEqual(_try_text)
//
// 			// 1.
// 			const text_component : string = readFile(component_file_name);
// 			const setting_component : T_SettingsComponent = this._FindSettingsComponent(
// 				text_component,
// 				component_file_name
// 			);
//
// 			// 2. и 2.1
// 			const {obj_text_translete_component, new_text_component} = obj_i22TT.FindTextTranslate_FormatCallFunction(
// 				text_component,
// 				_path_comp
// 			);
// 			// 3.
// 			const map_translate_component : T_Mapi22TTJson | null = this._FindMapTranslate(new_text_component)
// 			let raw_json_map_translete_component : string = ''
// 			// 3. if True
// 			if (map_translate_component) {
// 				raw_json_map_translete_component = this._MergeMap(
// 					map_translate_component[setting_component['id_component']],
// 					setting_component,
// 					obj_text_translete_component,
// 				)
// 			}
// 			// 3. if False
// 			else {
// 				raw_json_map_translete_component = this._BuildNewMap(
// 					setting_component,
// 					obj_text_translete_component,
// 				);
// 			}
// 			// 4.
// 			return this._AssembleComponent(new_text_component, raw_json_map_translete_component)
//
// 		})
//
//
// 		// function writeNewData() {
// 		// 	let tmp : any[] = []
// 		// 	_.zipWith(
// 		// 		[
// 		// 			`${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
// 		// 			`${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
// 		// 			// `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
// 		// 		],
// 		//
// 		// 		function (_path_conf : string) {
// 		//
// 		// 			tmp.push([])
// 		// 			/* Ищем данные о компоненте */
// 		// 			_.zipWith([
// 		// 					`${__dirname}/test_data/test_component/Compant_1.tsx`,
// 		// 					`${__dirname}/test_data/test_component/Compant_2.tsx`,
// 		// 					`${__dirname}/test_data/test_component/Compant_3.tsx`,
// 		// 					`${__dirname}/test_data/test_component/Compant_4.tsx`,
// 		// 				],
// 		//
// 		// 				function (_path_comp : string) {
// 		// 					/* Обновляем конфигурации */
// 		// 					obj_i22TT = new TEST_i22TT_Json(_path_conf)
// 		// 					// Тестовый набор данных
// 		// 					const tes_FindTextFromTranslate = obj_i22TT.FindTextFromTranslate(readFile(_path_comp), _path_comp)
// 		// 					// Тестовый набор данных
// 		// 					const test_FindIdComponent = obj_i22TT.FindIdComponent(readFile(_path_comp), _path_comp)
// 		// 					// Верный ответ
// 		// 					const res = obj_i22TT.buildJson(test_FindIdComponent, tes_FindTextFromTranslate, _path_conf)
// 		// 					// console.log(_path_conf, _path_comp, res)
// 		// 					// console.log(JSON.parse(res))
// 		// 					tmp[tmp.length - 1].push(JSON.parse(res))
// 		// 					// expect(JSON.parse(res)).toEqual(_try_text)
// 		// 				})
// 		// 		}
// 		// 	)
// 		// 	fs.writeFileSync("/home/denis/WebstormProjects/i22TT/tests/test_data/data_test_FindIdComponent.json", JSON.stringify(tmp))
// 		// }
// 	})
//
//
// 	test("Проверка высчитывания и создания хеша", () => {
//
// 		// Конфигурации
// 		let arr_config : string[] = [
// 			`${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
// 			`${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
// 		]
// 		// Верные ответы
// 		let try_arr : Array<Array<any>> = [
//
// 			[[]], [[]]
// 		]
// 		// Компоненты
// 		let arr_comp : string[] = [
// 			`${__dirname}/test_data/test_component/Compant_1.tsx`,
// 			`${__dirname}/test_data/test_component/Compant_2.tsx`,
// 			`${__dirname}/test_data/test_component/Compant_3.tsx`,
// 			`${__dirname}/test_data/test_component/Compant_4.tsx`,
// 		]
//
// 		TwoZip(arr_config, arr_comp, try_arr, (_path_conf : string, _path_comp : string, _try_text : Array<{ text : string, id : number, hash_int : number }>) => {
// 			obj_i22TT = new TEST_i22TT_Json(_path_conf)
// 			const res : string = obj_i22TT.run(_path_comp)
// 			console.log(res)
// 			// expect(res).toEqual(readFile(`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_${tmp}.tsx`))
// 		})
// 	})
// })





