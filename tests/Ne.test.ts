import * as _ from "lodash";
import { i22TT_Json } from "../Ne";


describe("Тест с конфигурациями", () => {
	// Функция будет запущена одина раз (конструктор)
	beforeAll(() => {
	
	})
	// Эта функция будет вызваться каждый раз при функции теста
	beforeEach(() => {
	
	})
	test("Чтение конфигурации из файла, и коректная установка настроек для класса", () => {
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
				// Читаем файл с конфигурациями
				i22TT_Json.getConfig(_path);
				// Проверям коректность данных
				expect(i22TT_Json.base_arr_lange).toEqual(_base_arr_lange)
				expect(i22TT_Json.base_lang).toEqual(_base_lang)
			})
	})
})


// test("Деление", () => {
// 	FindIdComponent
//
// 	expect(4).toEqual(4)
// 	expect(4).toBe(4)
// })
//
// test("Деление", () => {
// 	FindTextFromTranslate
//
// 	expect(4).toEqual(4)
// 	expect(4).toBe(4)
// })
//
// test("Деление", () => {
// 	buildJson
//
// 	expect(4).toEqual(4)
// 	expect(4).toBe(4)
// })
//
// test("Деление", () => {
// 	writeJson
//
// 	expect(4).toEqual(4)
// 	expect(4).toBe(4)
// })