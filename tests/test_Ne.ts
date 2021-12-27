// @ts-ignore
import assert from "assert";
import * as _ from "lodash";
import { i22TT_Json, IFileConf, IFindIdComponent } from "../Ne"
import { redFile } from "../helpful";

const fs = require('fs')
const path = require("path");


function test_writeJson() {
	const try_text : string = `

`
	fs.writeFileSync(`${__dirname}/Compant_test.tsx`, try_text);
	const res = new i22TT_Json(`${__dirname}/Compant_test.tsx`)
	i22TT_Json.writeJson(res.i22TT_json, `${__dirname}/Compant_test.tsx`)
}

/* Проверяем коректность получения конфигураций из файла */
function test_getConfig() {
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
			// console.log(i22TT_Json.base_arr_lange)
			// console.log(i22TT_Json.base_lang)
			// Проверям коректность данных
			assert.equal(_.isEqual(i22TT_Json.base_arr_lange, _base_arr_lange), true)
			assert.equal(_.isEqual(i22TT_Json.base_lang, _base_lang), true)
		})
}

/* Проверка поиска `id` компанента */
function test_FindIdComponent() {
	/* Перебираем все конфигурации и компаненты */
	_.zipWith(
		[
			`${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
			`${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
			`${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
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
		], [
			{id_components: 22, base_lange: 'ru'},
			{id_components: 33, base_lange: "en"},
			{id_components: 265, base_lange: 'japan'},
			{id_components: 3265, base_lange: 'japan'},
		]
		]
		, function (_path_conf : string, _try_text_arr : Array<{ id_components : number, base_lange : string }>,) {
			/* Обновялем конфигурации */
			i22TT_Json.getConfig(_path_conf);
			/* Ищем данные о компаненте */
			_.zipWith([
					`${__dirname}/test_data/test_component/Compant_1.tsx`,
					`${__dirname}/test_data/test_component/Compant_2.tsx`,
					`${__dirname}/test_data/test_component/Compant_3.tsx`,
					`${__dirname}/test_data/test_component/Compant_4.tsx`,
				],
				_try_text_arr,
				function (_path_comp : string, _try_text : { id_components : number, base_lange : string }) {
					// Результат функции
					const res_fun : IFindIdComponent = i22TT_Json.FindIdComponent(redFile(_path_comp), _path_comp)
					// console.log(_path_conf, _path_comp, res_fun)
					assert.equal(_.isEqual(res_fun, _try_text), true, "Компанент не найден")
				})
		}
	)
}

/* Нахождения слов */
function test_FindTextFromTranslate() {
	/* Перебираем все конфигурации и компаненты */
	_.zipWith(
		[
			`${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
			`${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
			`${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
		],
		function (_path_conf : string,) {
			/* Обновялем конфигурации */
			i22TT_Json.getConfig(_path_conf);
			/* Ищем данные о компаненте */
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
					const res = i22TT_Json.FindTextFromTranslate(redFile(_path_comp), _path_comp)
					// fs.appendFileSync("tmp.json", JSON.stringify(res))
					// console.log(_path_conf, _path_comp, res)
					assert.equal(_.isEqual(res, _try_text), true, "")
				})
		}
	)
	
	
}


/* Проверка сборки */
function test_buildJson() {
	_.zipWith(
		[
			`${__dirname}/test_data/test_conf/i22TT_1.conf.yaml`,
			`${__dirname}/test_data/test_conf/i22TT_2.conf.yaml`,
			`${__dirname}/test_data/test_conf/i22TT_3.conf.yaml`,
		],
		JSON.parse(redFile(`${__dirname}/test_data/data_test_FindIdComponent.json`))
		, function (_path_conf : string, _try_text_arr : Array<IFileConf>,) {
			/* Обновялем конфигурации */
			i22TT_Json.getConfig(_path_conf);
			/* Ищем данные о компаненте */
			_.zipWith([
					`${__dirname}/test_data/test_component/Compant_1.tsx`,
					`${__dirname}/test_data/test_component/Compant_2.tsx`,
					`${__dirname}/test_data/test_component/Compant_3.tsx`,
					`${__dirname}/test_data/test_component/Compant_4.tsx`,
				],
				_try_text_arr,
				function (_path_comp : string, _try_text : IFileConf) {
					// Тестовый набор данных
					const tes_FindTextFromTranslate = i22TT_Json.FindTextFromTranslate(redFile(_path_comp), _path_comp)
					// Тестовый набор данных
					const test_FindIdComponent = i22TT_Json.FindIdComponent(redFile(_path_comp), _path_comp)
					// Верный ответ
					const res = i22TT_Json.buildJson(test_FindIdComponent, tes_FindTextFromTranslate)
					console.log(_path_conf, _path_comp, res)
					assert.equal(_.isEqual(JSON.parse(res), _try_text), true, "")
					
				})
		}
	)
	
	
}


function Test_Ne() {
	test_getConfig()
	test_FindIdComponent()
	test_FindTextFromTranslate()
	test_buildJson()
	test_writeJson()
}

if (require.main === module) {
	Test_Ne()
	console.log("Test_Ne END")
}

