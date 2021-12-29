const fs = require('fs')

/* Чтение фала */
export function readFile(file_name : string) : string {
	return fs.readFileSync(file_name, 'utf8');
}

export type T_parseArgsTerminal = {
	node : string;
	other : Array<string>;
	self_path : string;
}

