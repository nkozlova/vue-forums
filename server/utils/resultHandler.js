const billingError = require("./billingError");
const converter = require('json-2-csv');

const ok = (res, data) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	res.status(200).json(data);
}

const error = (res, er, code = 404) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	let status = code;
	let retdata = {
		result : "error",
		message : er.message||er,
		code : er.code||er
	}

	if(er instanceof billingError) {
		status = er.getStatus();
		retdata.property = er.getProperty();
	}

	res.status(status).json(retdata)
}

const downloadCSV = (res, filename, data) => {
        let csv = converter.json2csv(data, null)
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
}

 module.exports = {ok, error, downloadCSV};
