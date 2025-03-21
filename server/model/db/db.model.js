const mysql = require("mysql");
const config = require("../../config/config.js");

let pool = mysql.createPool ( {
	ConnectionLimit  : 10,
	host: config.HOST,
	user: config.USER,
	password: config.PASSWORD,
	database: config.DB
})

module.exports = class Db {
	table = "";
	fields = [];
    updateFields = []

	constructor() {}
	end() {}

	async dosql(cSql) {
		try {
			await this.query(cSql);
			return {result: "success"}
		} catch (e) {
			return {result: "error", error: e.message}
		}
	}

	async insert(cSql) {
		try {
			let result = await this.query(cSql);
			return {result: "success", id: result.insertId}
		} catch (e) {
			return {result: "error", error: e.message}
		}
	}

	async select(cSql) {
		try {
			return await this.query(cSql);
		} catch (e) {
			return null;
		}
	}

	query(cSql) {
		return new Promise((resolve, reject) => {
			pool.getConnection(async (err, connection) => {
				if(err) reject(err);
				resolve(await this.do_query(connection, cSql))
			})
		})
	}

	do_query(connection, cSql) {
		return new Promise((resolve, reject) => {
			connection.query(cSql, (error, results, fields) => {
				connection.release()
				if(error) reject(error)
				resolve(results)
			})
		})
	}

	async selectRow(cSql) {
		let result = await this.select(cSql);
		if (!result.length) return null;
		return result[0]
	}

	async selectVal(cSql, defref) {
		let result = await this.select(cSql);
		if (!result.length) return defref || null;
		return result[0][Object.keys(result[0])[0]];
	}

	async selectArrayVal(cSql) {
		let result = await this.select(cSql);
		if (!result.length) return [];
		return result.map(res => res[Object.keys(res)[0]]);
	}


	getJSON(obj) {
		let json = JSON.stringify(obj)
		json = json.replace(/'/g, '\'').replace(/\\t/g, ' ').replace(/\"/g, '\\\"')
		return json
	}

	getForUpdate(data) {
		let str = ["updated_at = NOW()"];
		for (let key in data) {
			if (this.updateFields.includes(key)) {
				if(data[key] === null) str.push(`${key} = NULL`)
				else
					switch (typeof (data[key])) {
						case "number":
							str.push(`${key} = ${data[key]}`);
							break;
						case "object":
							if(data[key].type === 'now') str.push(`${key} = NOW()`);
							else str.push(`${key} = '${this.getJSON(data[key])}'`);
							break;
						case "undefined":
							str.push(`${key} = NULL`)
							break;
						case "boolean":
							str.push(`${key} = ${data[key] === true ? 1 : 0}`);
							break;
						default:
							str.push(`${key} = '${data[key]}'`);
					}
			}
		}
		return str.join(",")
	}

	getForInsert(data) {
		let value = []
		this.fields.forEach(fld => {
			if (data[fld] === null) {
                                value.push('NULL');
                        }
			else
				switch (typeof (data[fld])) {
					case "number":
						value.push(`${data[fld]}`);
						break;
					case "object":
						value.push(`'${this.getJSON(data[fld])}'`);
						break;
					case "undefined":
                                                if(fld === "created_at" || fld === "updated_at") value.push("NOW()");
                                                else value.push("NULL")
						break;
					case "boolean":
						value.push(`${data[fld] === true ? 1 : 0}`);
						break;
					default:
						if (data[fld] === "NOW()") value.push(data[fld])
						else value.push(`'${data[fld]}'`)
				}
		})
		return {
			fields: this.fields.join(","),
			values: value.join(","),
		}
	}

	async doUpdate(data) {
		let updates = this.getForUpdate(data)
		let ret = await this.dosql(`UPDATE ${this.table} SET ${updates} WHERE id = ${data.id}`);

		if (ret.result === "error") return ret
		ret.id = data.id
		return ret
	}

	async doInsert(data) {
		let inserts = this.getForInsert(data)
		if (inserts) return await this.insert(`INSERT ${this.table} (${inserts.fields}) VALUES (${inserts.values})`);
		return {result: "error", error: 'Пустое выражение'}
	}

	async saveRow(data) {
		if (data.id) {
			return await this.doUpdate(data)
		} else {
			return await this.doInsert(data)
		}
	}

        async removeRow(id) {
                await this.dosql(`DELETE FROM ${this.table} WHERE id = ${id}`);
                return {status: "ok"};
        }

	async getRow(id) { return await this.selectRow(`SELECT * FROM ${this.table} WHERE id = ${id}`); }

	getUser(id) {
		return this.selectRow(`SELECT * FROM users WHERE id = '${id}'`);
	}

        getByID(id) {
                return this.selectRow(`SELECT * FROM ${this.table} WHERE id = '${id}'`);
        }

	getUserByEmail(email) {
		return this.selectRow(`SELECT * FROM users WHERE email = '${email}'`);
	}

	async getUserByToken(token) {
		let user_id = await this.selectVal(`SELECT user_id FROM tokens WHERE token = '${token}'`);
		if (!user_id) return null;
		return this.getUser(user_id);
	}

	saveDataUser(id, family, name, oth, prof, school, region, town) {
		let update = `family = '${family}', name = '${name}', oth = '${oth}', school = '${school}', town = '${town}'`;
		if (prof) update += `, prof = '${prof}'`;
		if (region) update += `, region = '${region}'`;
		return this.select(`UPDATE users SET ${update} WHERE id = '${id}'`);
	}

	async saveToken(token, user_id) {
		await this.dosql(`DELETE FROM tokens WHERE user_id = ${user_id}`);
		return this.dosql(`INSERT INTO tokens VALUES (NULL, ${user_id}, '${token}')`);
	}

	clearToken(user_id) {
		return this.dosql(`DELETE FROM tokens WHERE user_id = ${user_id}`);
	}

	checkConfirm(id) {
		return this.selectRow(`SELECT *, (date > (NOW() - INTERVAL 6 HOUR)) as bTime FROM users WHERE password LIKE '%${id}'`);
	}

	updateCreateData(id) {
		return this.insert(`UPDATE users
                                    SET date = NOW()
                                    WHERE id = ${id}`);
	}

	getIdByName(name, id) { return null }

	async getUnicumName(name, id, data) {
		let append = 1
		let nm = name
		while(await this.getIdByName(nm, id, data) !== null) {
			nm = name + "_" + append++
		}
		return nm
	}

        dateFormatSave(dateStr) {
                let date
                if (dateStr) {
                        if(typeof dateStr === 'string') {
                                //if(!dateStr) return ""
                                date = this.dateDate(dateStr)
                        } else {
                                date = dateStr
                        }
                } else {
                        return ""
                }

                let dd = date.getDate();
                let mm = date.getMonth() + 1; //January is 0!
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                return `${date.getFullYear()}-${mm}-${dd}`;
        }

        setHardFilter(hard_filters) {
                let where = []
                for (let key in hard_filters) {
                        switch (key) {
                                case "id":
                                        if (parseInt(hard_filters.id || "0") !== 0)
                                                where.push(`(${this.table}.id = ${hard_filters.id})`);
                                        break;
                        }
                }
                return where;
        }

        setFilter(custom_filters) {
                let where = []
                for (let key in custom_filters) {
                        switch (key) {
                                case "name":
                                        if(custom_filters.name !== "")
                                                where.push(`(${this.table}.name LIKE '%${custom_filters.name}%')`);
                                        break;

                                case "id":
                                        if (parseInt(custom_filters.id || "0") !== 0)
                                                where.push(`(${this.table}.id = ${custom_filters.id})`);
                                        break;

                                case "inn":
                                        if (custom_filters.inn !== "")
                                                where.push(`(${this.table}.inn = ${custom_filters.inn})`);
                                        break;
                        }
                }
                return where;
        }

        showList_Fields() { return "*" }
        showList_Join() { return "" }
        showList_Order(request) { return request.sort[0] ? `ORDER BY ${request.sort[0].field} ${request.sort[0].direction}` : '' }
        async showList(request) {
                let cWhere = ""
                let where = []

                if (request.hard_filters) where = this.setHardFilter(request.hard_filters)

                if (request.custom_filters) {
                        where = this.setFilter(request.custom_filters)
                        if (!where.length) return {records: [], total: 0}
                }

                if(where.length) cWhere = "WHERE " + where.join(" AND ", where)

                let cFields = this.showList_Fields()
                let cJoins = this.showList_Join()

                let order = this.showList_Order(request)
                let limit = (request.offset || request.limit) ? `LIMIT ${request.offset}, ${request.limit}` : ""

                let records = await this.select(`SELECT ${cFields} FROM ${this.table} ${cJoins} ${cWhere} ${order} ${limit}`)
                return {records, total: await this.selectVal(`SELECT COUNT(*) FROM ${this.table} ${cJoins}  ${cWhere} `), sql : `SELECT ${cFields} FROM ${this.table} ${cJoins} ${cWhere} ${order} ${limit}`}
        }

        getList() {
                return this.select(`SELECT id, name FROM ${this.table}`)
        }

        async faker() {
                let count = Math.floor(Math.random() * 10)
                let data = await this.createFakerRowData()
                let rows = await fakerRU.helpers.multiple(() => this.createFakerRow(data), {count});
                for(let i = 0; i < count; i++) {
                        await this.doInsert(rows[i])
                }
        }

        createFakerRowData() { return {} }
        createFakerRow(data) { return {} }
}
