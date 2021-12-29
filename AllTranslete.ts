class i22TT {
	/* Класс для перевода текста
	 *  */
	
	/* Список с доступными `ASCII` символами */
	private static readonly ASCII_TABLE : Array<string> = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M",]
	/* Длинна списка `ASCII_TABLE` */
	private static readonly LEN_ASCII_TABLE : number = i22TT.ASCII_TABLE.length
	private static readonly MAX_LEN : number = 1000000000
	
	/* Алгоритм быстрого получения хеша ключа */
	public static hash(in_text_translate : string, id_text : number) : number {
		// console.log("[hash]\t", in_text_translate, id_text)
		// Получить хеш число
		let hash_number : number = 0
		for (const _x of in_text_translate) {
			hash_number = hash_number - _x.charCodeAt(0) - id_text
		}
		hash_number = (hash_number * -1) % i22TT.MAX_LEN
		// console.log("\t Hash int: ", hash_number)
		// Преобразовать хеш число в `ASCII` строку
		// const res_hash_arr : Array<string> | string = []
		// let mode_res : number = 0
		// while (hash_number > 1) {
		// 	mode_res = hash_number % this.LEN_ASCII_TABLE ^ 0
		// 	res_hash_arr.push(this.ASCII_TABLE[mode_res])
		// 	hash_number /= this.LEN_ASCII_TABLE
		// }
		// const res_hash_str = res_hash_arr.join('')
		// console.log("\t Hash str: ", res_hash_str)
		return hash_number
	}
	
	/* Получаем текст из `JSX`, и ищем перевод из словаря, который мы получим от сервера */
	public static get(in_text_translate : string, id_text : number = 1) : string {
		console.log("ТЕКСТ ДЛЯ ПЕРЕВОДА: ", in_text_translate, "\nID ТЕКСТА: ", id_text)
		return in_text_translate
	}
	
	/* Переопределить логику функции `get` */
	public static _change_fun_get() : void {
		console.log("Переключение функции")
		// i22TT.get = i22TT.__get
	}
	
	/* Указать id компонента */
	public static id_components(id_components : number, base_lang : string) : void {
		/* Получим ID используемого компонента */
		console.log("ID COMPONENT: ", id_components)
		console.log("Base lang: ", base_lang)
	}
	
	private static __get(in_text_translate : string, id_text : number = 1) : number {
		console.log("__get")
		return i22TT.hash(in_text_translate, id_text)
	}
	
}


export { i22TT }



