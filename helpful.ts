const fs = require('fs')

/* Чтение фала */
export function readFile(file_name : string) : string {
	try {
		return fs.readFileSync(file_name, 'utf8');
	} catch (e) {
		throw `Ошибка чтения файла:\n${e}`
	}
}

/* Запись в файл */
export function writeJsonFile(file_name : string, text : string) : void {
	fs.writeFileSync(file_name, text);
}

