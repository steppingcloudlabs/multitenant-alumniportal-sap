const uuid = require("uuid");
const utils = require("../../utils/database/index.js")();
module.exports = () => {
	const getuser = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
			    const schema = await utils.currentSchema({db})
				console.log(schema)
				const limit = payload.limit == undefined ? 10 : payload.limit
				const offset = payload.offset == undefined ? 0 : payload.offset
				const query = 
					`SELECT "CREATEDAT", "CREATEDBY","MODIFIEDAT","MODIFIEDBY","ID","FIRSTNAME","LASTNAME","USERID" FROM "${schema}"."SCLABS_ALUMNIPORTAL_PERSONALINFORMATION_ADMIN_HR_PERSONALINFORMATION" rows limit ${limit} offset ${offset}`
			    const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			}
			 catch (error) {
				reject(error);
			}
		});
	};

	const createuser = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
			    const schema = await utils.currentSchema({db});
				const createdat = new Date().toISOString();
				const createdby = "admin";
				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();;
				const id = uuid();
				const firstname = payload.firstname;
		        const lastname= payload.lastname;
			    const userid = payload.userid;
			    const query = `SELECT * FROM "${schema}"."SCLABS_ALUMNIPORTAL_PERSONALINFORMATION_ADMIN_HR_PERSONALINFORMATION"  WHERE USERID ='${userid}'`
				const statement = await db.preparePromisified(query);
				const results = await db.statementExecPromisified(statement, [])
				if (results.length == 0) {
				const query1 =
					`INSERT INTO "${schema}"."SCLABS_ALUMNIPORTAL_PERSONALINFORMATION_ADMIN_HR_PERSONALINFORMATION" VALUES(
					'${createdat}',
					'${createdby}',
					'${modifiedat}',
					'${modifiedby}',
					'${id}',	
					'${firstname}',
					'${lastname}',
					'${userid}'
				)`
				const statement1 = await db.preparePromisified(query1)
				const results1 = await db.statementExecPromisified(statement1, [])
				resolve(results1);
				}
				else{
					resolve("user id exists");
				}
			}
			catch (error) {
				reject(error);
			}
		});
	};

	const deleteuser = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
				const schema = await utils.currentSchema({db})
				const query = `DELETE FROM "${schema}"."SCLABS_ALUMNIPORTAL_PERSONALINFORMATION_ADMIN_HR_PERSONALINFORMATION"  WHERE USERID = '${payload.userid}'`
				const statement = await db.preparePromisified(query);
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			} catch (error) {
				reject(error);
			}
		});
	};

	return {
		createuser,
		getuser,
		deleteuser,
	};

};