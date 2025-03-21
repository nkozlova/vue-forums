const fin = require("../utils/resultHandler");
const Db = require("./db/db.model");

module.exports = class Base {
	createDB() {
		return new Db()
	}

	async result(res, func) {
		try {
			fin.ok(res, await func());
		} catch (e) {
			fin.error(res, e);
		}
	}

	error(res, message) {
        fin.error(res, message, 418)
	}

	async callDBSync(func) {
		let db = this.createDB();
		let ret = await func(db);
		db.end();
		return ret;
	}

	async saveRow(id) {
		return await this.callDBSync(db => db.saveRow(id))
	}

	async removeRow(id) {
		return await this.callDBSync(db => db.removeRow(id))
	}
}
