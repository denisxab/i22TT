import { getPathComponentFromFolder } from "../helpful";

const fs = require('fs');


describe("Проверяем чтение файлов", () => {
	test("pullPathFromFolder", () => {
		const try_ = [
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_10.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_11.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_12.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_4.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_5.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_6.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_7.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_8.tsx`,
			`${__dirname}/test_data/test_component/Companet_try_json_format/Compant_9.tsx`,
			`${__dirname}/test_data/test_component/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/back/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/back/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/back/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/back/Compant_4.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_4.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_5.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_6.tsx`,
			`${__dirname}/test_data/test_component/component/Compant_7.tsx`,
			`${__dirname}/test_data/test_component/component/test_data/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/component_false/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/component_false/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/component_false/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/component_false/Compant_4.tsx`,
			`${__dirname}/test_data/test_component/component_try/Compant_1.tsx`,
			`${__dirname}/test_data/test_component/component_try/Compant_2.tsx`,
			`${__dirname}/test_data/test_component/component_try/Compant_3.tsx`,
			`${__dirname}/test_data/test_component/component_try/Compant_4.tsx`,
			`${__dirname}/test_data/test_component/component_try/Compant_6.tsx`,
			`${__dirname}/test_data/test_component/component_try/Compant_7.tsx`,
			`${__dirname}/test_data/test_marge/Compant_1.tsx`,
			`${__dirname}/test_data/test_marge/Compant_1_1.tsx`,
			`${__dirname}/test_data/test_marge/Compant_2.tsx`,
			`${__dirname}/test_data/test_marge/Compant_3.tsx`,
			`${__dirname}/test_data/test_marge/Compant_4.tsx`
		]
		const arr_path : Array<string> = [`${__dirname}/test_data`]
		const res = getPathComponentFromFolder(arr_path[0]);
		expect(res).toEqual(try_)
	})
})