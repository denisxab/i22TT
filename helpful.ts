const fs = require('fs')
const path = require('path')



/* Чтение фала */
export function readFile(file_name : string) : string {
	try {
		return fs.readFileSync(file_name, 'utf8');
	} catch (e) {
		throw `Ошибка чтения файла:\n${e}`
	}
}

/* Запись в файл */
export function writeFile(file_name : string, text : string) : void {
	fs.writeFileSync(file_name, text);
}


/* Получить файлы указанного расширения из папки */
export const getPathComponentFromFolder = function (folder : string, file_extension : RegExp = /\.js$|jsx$|ts$|tsx$/, files_? : Array<string>) {
	files_ = files_ || [];
	let files = fs.readdirSync(folder);
	for (const i in files) {
		const name = folder + '/' + files[i];
		if (fs.statSync(name).isDirectory()) {
			getPathComponentFromFolder(name, file_extension, files_);
		}
		else {
			// Проверка расширения файла
			if (file_extension.test(path.extname(name)) === true) {
				files_.push(name);
			}
		}
	}
	return files_;
};
