module.exports = class BillingError extends Error {
	constructor(code, property, status) {
		super()
		this.name = "BillingError"

		this.code = code
		this.property = property

                switch(code) {
                        case 1: this.message = "Нет данных"; break;
                        case 2: this.message = "Нет такого программного клиента"; break;
                        case 3: this.message = "Неверный ключ"; break;
                        case 4: this.message = "Ключ не существует"; break;
                        case 5: this.message = "Ключ уже был использован"; break;
                        case 6: this.message = "Ключ был отозван"; break;
                        case 7: this.message = "Ключ не соответствует продукту, который запрашивает"; break;
                        case 8: this.message = "Лицензии не соответствует продукту, который запрашивает"; break;
                        case 9: this.message = "Действие лицензии еще не началось"; break;
                        case 10: this.message = "Лицензия закончилась"; break;
                        case 11: this.message = "Лимит доступов исчерпан"; break;
                        case 12: this.message = "Неверный id доступа"; break;
                        case 13: this.message = "Лицензии не существует"; break;
                        case 101: this.message = "Введен некорректный e-mail или пароль"; break;
                }

		this.status = status

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BillingError)
		} else {
			this.stack = (new Error()).stack
		}
	}

	getStatus() { return this.status||500}
	getProperty() { return this.property}
	getCode() { return this.code}
}
