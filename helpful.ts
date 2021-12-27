const fs = require('fs')

/* Чтение фала */
export function redFile(file_name : string) : string {
	return fs.readFileSync(file_name, 'utf8');
}

