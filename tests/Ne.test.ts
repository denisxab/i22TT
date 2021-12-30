import * as _ from "lodash";
import { i22TT_Json, T_SettingsComponent, T_Config } from "../pull_data _from_component/pull_data";
import { readFile } from "../helpful";

const fs = require('fs');


class TEST_i22TT_Json extends i22TT_Json {
	
	/*	public formatJsonFromWriteFile(text_component : string, raw_json_translete : string) : string {
	 return this._formatJsonFromWriteFile(text_component, raw_json_translete)
	 
	 }*/
	
	/*	public buildJson(setting_component : IFindIdComponent,
	 arr_text_translete : IFindTextFromTranslate, component_file_name : string,) : string {
	 return this._buildJson(setting_component, arr_text_translete, component_file_name)
	 
	 }*/
	
	public initConfig() : { base_arr_lange : { [p : string] : string }; base_lang : string } {
		return this._initConfig()
		
	}
	
	public redConfig() : T_Config {
		return this._redConfig()
		
	}
	
	public FindIdComponent(text_component : string,
	                       component_file_name : string,) : T_SettingsComponent {
		return this._FindSettingsComponent(text_component, component_file_name)
		
	}
	
	/*	public FindTextFromTranslate(text_find : string,
	 component_file_name : string,) : IFindTextFromTranslate {
	 return this._FindTextFromTranslate(text_find, component_file_name)
	 }*/
}

let obj_i22TT : TEST_i22TT_Json | undefined


/*
 describe("Тест с конфигурациями, `initConfig` `redConfig`", () => {
 // Эта функция будет вызваться каждый раз при функции теста
 beforeEach(() => {
 obj_i22TT = undefined
 })
 
 test("Чтение конфигурации из файла, и корректная установка настроек для класса", () => {
 _.zipWith([
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
 ],
 [
 {ru: "", en: "", uk: "", japan: ""},
 {ru: "", en: "", uk: "", japan: ""},
 {ru: "", japan: ""},
 ],
 [
 "ru", "en", "japan",
 ], function (_path : string, _base_arr_lange : { [key : string] : string }, _base_lang : string) {
 obj_i22TT = new TEST_i22TT_Json(_path)
 // Проверяем корректность данных
 expect(obj_i22TT.base_arr_lange).toEqual(_base_arr_lange)
 expect(obj_i22TT.base_lang).toEqual(_base_lang)
 })
 })
 
 test("Проверка возникновения ошибки при некорректной конфигурации", () => {
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1_False_.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_3_False_.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_6_False_.conf.yaml`,
 ],
 [
 /Файл[\w\W]+Базовый язык 'неверный язык' не добавлен в разрешённые\(available_lang\) язык/,
 /Некорректное оформление YAML файла:[\w\W]+YAMLException[\w\W]+/,
 /Неверные данные конфигурации[\w\W]+/,
 ],
 function (_input, _out) {
 try {
 new TEST_i22TT_Json(_input)
 } catch (e) {
 expect(e).toMatch(_out)
 }
 })
 })
 
 test("Проверка реакции на некорректное оформление", () => {
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_2_False_.conf.yaml`,
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
 "tsqqdest.yml",
 ],
 [
 /Неверное расширение файла: test.txt/,
 /Неверное расширение файла: tds1est.csv/,
 /Неверное расширение файла: tsqqdest.mp3/,
 /./,
 /./,
 ]
 ,
 function (_input, _out) {
 try {
 obj_i22TT = new TEST_i22TT_Json(_input)
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
 } catch (e) {
 expect(e).toMatch(_out)
 }
 })
 })
 })
 
 
 describe("Проверка `FindIdComponent`", () => {
 
 // Эта функция будет вызваться каждый раз при функции теста
 beforeEach(() => {
 obj_i22TT = undefined
 })
 
 test("Проверка нахождения id и базового языка у компонента", () => {
 
 
 /!* Перебираем все конфигурации и компоненты *!/
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
 // `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
 ],
 [[
 {id_components: 22, base_lange: 'ru'},
 {id_components: 33, base_lange: "en"},
 {id_components: 265, base_lange: 'ru'},
 {id_components: 3265, base_lange: 'ru'},
 ], [
 {id_components: 22, base_lange: 'ru'},
 {id_components: 33, base_lange: "en"},
 {id_components: 265, base_lange: 'en'},
 {id_components: 3265, base_lange: 'en'},
 ]
 ]
 , function (_path_conf : string, _try_text_arr : Array<{ id_components : number, base_lange : string }>,) {
 /!* Ищем данные о компоненте *!/
 _.zipWith([
 `${__dirname}/test_data/test_component/Compant_1.tsx`,
 `${__dirname}/test_data/test_component/Compant_2.tsx`,
 `${__dirname}/test_data/test_component/Compant_3.tsx`,
 `${__dirname}/test_data/test_component/Compant_4.tsx`,
 ],
 _try_text_arr,
 function (_path_comp : string, _try_text : { id_components : number, base_lange : string }) {
 /!* Обновляем конфигурации *!/
 obj_i22TT = new TEST_i22TT_Json(_path_conf)
 const res_fun : IFindIdComponent = obj_i22TT.FindIdComponent(readFile(_path_comp), _path_comp)
 // console.log(_path_conf, _path_comp, res_fun)
 expect(res_fun).toEqual(_try_text)
 })
 }
 )
 
 })
 
 test("Проверка случая когда не указан `id` компонента", () => {
 /!* Перебираем все конфигурации и компоненты *!/
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
 ],
 function (_path_conf : string,) {
 _.zipWith(
 [
 `${__dirname}/test_data/test_component/Compant_1_False.tsx`,
 ],
 [
 /Настройки компонента[\w\W]+не найден:[\w\W]+Убедитесь в том что вы указали id компонента, и имя языка\(на английском без пробелов\)/
 ],
 function (_path_comp, _out) {
 obj_i22TT = new TEST_i22TT_Json(_path_conf)
 try {
 obj_i22TT!.FindIdComponent(readFile(_path_comp), _path_comp)
 } catch (e) {
 expect(e).toMatch(_out)
 }
 })
 }
 )
 }
 )
 
 test("Случай когда базовый язык компонента не находиться в списке допустимых языков конфигурации", () => {
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_4.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_5.conf.yaml`,
 ],
 
 [`
 Ошибка настройки компонента ${__dirname}/test_data/test_component/Compant_5.tsx:
 Язык который вы указали в компоненте - "Russuan_Moskow"  неразрешен в конфигурациях
 ${__dirname}/test_data/test_conf/i22TT_1.conf.yaml
 Если вы хотите использовать этот язык, то добавите его в конфигурации
 `,
 "",
 ""
 ],
 
 function (_path_conf : string, _out : string) {
 _.zipWith(
 [
 `${__dirname}/test_data/test_component/Compant_5.tsx`,
 ],
 function (_path_comp : string) {
 /!* Обновляем конфигурации *!/
 obj_i22TT = new TEST_i22TT_Json(_path_conf)
 try {
 obj_i22TT!.FindIdComponent(readFile(_path_comp), _path_comp)
 } catch (e) {
 expect(e).toEqual(_out)
 }
 })
 }
 )
 })
 
 })
 
 describe("Проверка `FindTextFromTranslate`", () => {
 // Эта функция будет вызваться каждый раз при функции теста
 beforeEach(() => {
 obj_i22TT = undefined
 })
 
 test("Проверяем нахождения текста для перевода в компоненте", () => {
 /!* Перебираем все конфигурации и компоненты *!/
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
 ],
 function (_path_conf : string,) {
 /!* Ищем данные о компоненты *!/
 _.zipWith(
 [
 `${__dirname}/test_data/test_component/Compant_1.tsx`,
 `${__dirname}/test_data/test_component/Compant_2.tsx`,
 `${__dirname}/test_data/test_component/Compant_3.tsx`,
 `${__dirname}/test_data/test_component/Compant_4.tsx`,
 ],
 [[
 {text: 'Приветмир 2', id: 1, hash_int: 9798},
 {text: 'Приветмир1', id: 1, hash_int: 9765},
 {text: 'Приветмир 3', id: 1, hash_int: 9799},
 {text: 'Привет мир4', id: 1, hash_int: 9800},
 {text: 'Привет мир64', id: 1, hash_int: 9854},
 {text: 'Привет мир45', id: 62, hash_int: 10597},
 {text: 'День мир5', id: 1, hash_int: 7643}
 ], [
 {hash_int: 615, text: 'hellp 2', id: 1},
 {hash_int: 971, text: 'asdsd dads', id: 1},
 {hash_int: 1055, text: '21323asadasd 3', id: 1},
 {hash_int: 1417, text: 'qDQWsdQWSDqw dWS', id: 1},
 {hash_int: 1006, text: 'DWQDwsd dQWD', id: 1},
 {hash_int: 857, text: 'SDW sd', id: 62},
 {hash_int: 4492, text: 'sadqwd23ad мqdир5', id: 1}
 ]
 , [
 {text: 'Приветмир 2', id: 1, hash_int: 9798},
 {text: 'Приветмир1', id: 1, hash_int: 9765},
 {text: 'Приветмир 3', id: 1, hash_int: 9799},
 {text: 'Привет мир4', id: 1, hash_int: 9800},
 {text: 'Привет мир64', id: 1, hash_int: 9854},
 {text: 'Привет мир45', id: 62, hash_int: 10597},
 {text: 'День мир5', id: 1, hash_int: 7643}
 ], [
 {text: 'Приветмир 2', id: 1, hash_int: 9798},
 {text: 'Приветмир1', id: 1, hash_int: 9765},
 {text: 'Приветмир 3', id: 1, hash_int: 9799},
 {text: 'Привет мир4', id: 1, hash_int: 9800},
 {text: 'Привет мир64', id: 1, hash_int: 9854},
 {text: 'Привет мир45', id: 62, hash_int: 10597},
 {text: 'День мир5', id: 1, hash_int: 7643}
 ]],
 function (_path_comp : string, _try_text : Array<{ text : string, id : number, hash_int : number }>) {
 /!* Обновляем конфигурации *!/
 obj_i22TT = new TEST_i22TT_Json(_path_conf)
 const res = obj_i22TT.FindTextFromTranslate(readFile(_path_comp), _path_comp)
 // fs.appendFileSync("tmp.json", JSON.stringify(res))
 // console.log(_path_conf, _path_comp, res)
 expect(res).toEqual(_try_text)
 })
 }
 )
 
 })
 
 test("Проверяем случай когда функция `i22TT.get` вызвана но слово для перевода не указанно", () => {
 
 
 /!* Перебираем все конфигурации и компоненты *!/
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
 ],
 function (_path_conf : string,) {
 /!* Обновляем конфигурации *!/
 
 /!* Ищем данные о компоненты *!/
 _.zipWith(
 [
 `${__dirname}/test_data/test_component/Compant_2_False.tsx`,
 ],
 [`В компоненте ${__dirname}/test_data/test_component/Compant_2_False.tsx Слов не найдено`],
 function (_path_comp : string, _out : string) {
 obj_i22TT = new TEST_i22TT_Json(_path_conf)
 expect(() => obj_i22TT!.FindTextFromTranslate(readFile(_path_comp), _path_comp)).toThrow(_out)
 })
 }
 )
 
 })
 })
 
 
 describe("Проверка сборки в `JSON` `buildJson`", () => {
 
 // Эта функция будет вызваться каждый раз при функции теста
 beforeEach(() => {
 obj_i22TT = undefined
 })
 
 test("Проверка `buildJson` ", () => {
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
 // `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
 ],
 JSON.parse(readFile(`${__dirname}/test_data/data_test_FindIdComponent.json`))
 , function (_path_conf : string, _try_text_arr : Array<IFileConf>,) {
 /!* Ищем данные о компоненте *!/
 _.zipWith([
 `${__dirname}/test_data/test_component/Compant_1.tsx`,
 `${__dirname}/test_data/test_component/Compant_2.tsx`,
 `${__dirname}/test_data/test_component/Compant_3.tsx`,
 `${__dirname}/test_data/test_component/Compant_4.tsx`,
 ],
 _try_text_arr,
 function (_path_comp : string, _try_text : IFileConf) {
 /!* Обновляем конфигурации *!/
 obj_i22TT = new TEST_i22TT_Json(_path_conf)
 // Тестовый набор данных
 const tes_FindTextFromTranslate = obj_i22TT.FindTextFromTranslate(readFile(_path_comp), _path_comp)
 // Тестовый набор данных
 const test_FindIdComponent = obj_i22TT.FindIdComponent(readFile(_path_comp), _path_comp)
 // Верный ответ
 const res = obj_i22TT.buildJson(test_FindIdComponent, tes_FindTextFromTranslate, _path_conf)
 // console.log(_path_conf, _path_comp, res)
 // console.log(JSON.parse(res))
 expect(JSON.parse(res)).toEqual(_try_text)
 })
 }
 )
 
 function writeNewData() {
 let tmp : any[] = []
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
 // `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
 ],
 
 function (_path_conf : string) {
 
 tmp.push([])
 /!* Ищем данные о компоненте *!/
 _.zipWith([
 `${__dirname}/test_data/test_component/Compant_1.tsx`,
 `${__dirname}/test_data/test_component/Compant_2.tsx`,
 `${__dirname}/test_data/test_component/Compant_3.tsx`,
 `${__dirname}/test_data/test_component/Compant_4.tsx`,
 ],
 
 function (_path_comp : string) {
 /!* Обновляем конфигурации *!/
 obj_i22TT = new TEST_i22TT_Json(_path_conf)
 // Тестовый набор данных
 const tes_FindTextFromTranslate = obj_i22TT.FindTextFromTranslate(readFile(_path_comp), _path_comp)
 // Тестовый набор данных
 const test_FindIdComponent = obj_i22TT.FindIdComponent(readFile(_path_comp), _path_comp)
 // Верный ответ
 const res = obj_i22TT.buildJson(test_FindIdComponent, tes_FindTextFromTranslate, _path_conf)
 // console.log(_path_conf, _path_comp, res)
 // console.log(JSON.parse(res))
 tmp[tmp.length - 1].push(JSON.parse(res))
 // expect(JSON.parse(res)).toEqual(_try_text)
 })
 }
 )
 fs.writeFileSync("/home/denis/WebstormProjects/i22TT/tests/test_data/data_test_FindIdComponent.json", JSON.stringify(tmp))
 }
 })
 
 
 test("Проверка высчитывания и создания хеша", () => {
 _.zipWith(
 [
 `${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
 `${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
 ],
 [
 
 [[]], [[]]
 ],
 function (_path_conf, _try_text_arr) {
 _.zipWith(
 [
 `${__dirname}/test_data/test_component/Compant_1.tsx`,
 `${__dirname}/test_data/test_component/Compant_2.tsx`,
 `${__dirname}/test_data/test_component/Compant_3.tsx`,
 `${__dirname}/test_data/test_component/Compant_4.tsx`,
 ],
 _try_text_arr,
 function (_path_comp, _out) {
 obj_i22TT = new TEST_i22TT_Json(_path_conf)
 const res : string = obj_i22TT.run(_path_comp)
 console.log(res)
 // expect(res).toEqual(readFile(`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_${tmp}.tsx`))
 })
 })
 })
 
 })
 */


describe("Финальная проверка `run`", () => {
	
	// Эта функция будет вызваться каждый раз при функции теста
	beforeEach(() => {
		obj_i22TT = undefined
	})
	
	test("Проверка `run`", () => {
		let tmp = 1
		
		_.zipWith(
			[
				`${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
				`${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
				// `${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
			],
			
			// Верные ответы
			[
				JSON.parse(readFile(`${__dirname}/test_data/data_test_FindIdComponent.json`))
			]
			, function (_path_conf : string, _try_text_arr : any,) {
				
				/* Ищем данные о компоненте */
				_.zipWith([
						// `${__dirname}/test_data/test_component/Compant_1.tsx`,
						`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_6.tsx`,
						`${__dirname}/test_data/test_component/Compant_2.tsx`,
						`${__dirname}/test_data/test_component/Compant_3.tsx`,
						`${__dirname}/test_data/test_component/Compant_4.tsx`,
					],
					// Верные ответы
					_try_text_arr,
					function (_path_comp : string, _try_text : any) {
						obj_i22TT = new TEST_i22TT_Json(_path_conf)
						const res : string = obj_i22TT.run(_path_comp)
						expect(res).toEqual(readFile(`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_${tmp}.tsx`))
						// fs.writeFileSync(`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_${tmp}.tsx`, res);
						tmp += 1
					})
			}
		)
		
		
	})
})


