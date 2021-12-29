const fs = require('fs')

/* Чтение фала */
export function readFile(file_name : string) : string {
	try {
		return fs.readFileSync(file_name, 'utf8');
	} catch (e) {
		throw `Ошибка чтения файла:\n${e}`
	}
}

export type T_parseArgsTerminal = {
	node : string;
	other : Array<string>;
	self_path : string;
}

