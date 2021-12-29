const fs = require('fs')

/* Чтение фала */
export function readFile(file_name : string) : string {
	return fs.readFileSync(file_name, 'utf8');
}

