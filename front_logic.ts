import { CONFIG_FILE_NAME, i22TT_Json } from "./parse_component";

export function verificationArgs(argsTerminal : any) {
	
	/*
	 * --conf =  Путь к файлу с конфигурациями
	 * --save = Сохранить результат в текущий компонент
	 * --no_output = Не отображать результат в консоль
	 * */
	
	// Путь к файлу с конфигурациями
	const conf : string = argsTerminal['conf'] ? argsTerminal['conf'] : CONFIG_FILE_NAME
	// Нужно ли сохранять результат в текущий компонент
	const isSave : boolean = argsTerminal['save']
	// Нужно ли выводить данные в терминал
	const isOutput : boolean = !argsTerminal["no_output"]
	// Логика
	switch (argsTerminal['_'][0]) {
		case `parse`:
			parse(argsTerminal['component'], conf, isOutput, isSave)
			break
		
		case `merge`:
			merge(argsTerminal['folder'], conf, isOutput, isSave)
			break
	}
}


/* Распарсить компонент */
function parse(component : string, conf : string, isOutput : boolean, isSave : boolean) {
	/*
	 * --component = Переопределить компонент
	 */
	const i22TT = new i22TT_Json(conf);
	const res = i22TT.run(component, isSave)
	if (isOutput) {
		console.log(res)
	}
}


/* Объединить карты перевода */
function merge(folder : string, conf : string, isOutput : boolean, isSave : boolean) {

}