const uuid = require("uuid");
const util = require("../../utils/index.js")
const utils = require("../../utils/database/index.js")();
module.exports = () => {
	/*
	SERVICE FUNCTIONS FOR NEWS 
	
	REPONSIBILITY: HAMZA
	*/
	const viewdocuments = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				})

				// TODO: add pagination using [to, from] clauses in statement.
				const LIMIT = payload.LIMIT == undefined ? 10 : payload.LIMIT
				const offset = payload.OFFSET == undefined ? 0 : payload.OFFSET

				const statement = await db.preparePromisified(
					`SELECT * FROM "${schema}"."SCLABS_ALUMNIPORTAL_DOCUMENTS_DOCUMENTS" where "USERID"='${payload.USERID}'`
				)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);

			} catch (error) {
				reject(error);
			}
		});
	};

	const createdocuments = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {

				const schema = await utils.currentSchema({
					db
				})
				const createdat = new Date().toISOString();
				const createdby = "admin";
				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();
				const ID = uuid();
				const document_ = util[payload.payload.FILENAME];
				const file_name = util[payload.payload.FILENAME];
				const stream = payload.payload.FILE;
				const userid = payload.payload.USERID
				const statement = await db.preparePromisified(
					`INSERT INTO "${schema}"."SCLABS_ALUMNIPORTAL_DOCUMENTS_DOCUMENTS" VALUES(
						'${createdat}',
						'${createdby}',
						'${modifiedat}',
						'${modifiedby}',
						'${ID}',
						'${stream}',
						'${userid}',
						'${file_name}')`)

				const results = await db.statementExecPromisified(statement, [])

				resolve(results);
			} catch (error) {
				reject(error);
			}
		});
	};

	const updatedocuments = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				})
				const createdat = new Date().toISOString();
				const createdby = "admin";
				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();
				const date = new Date().toISOString();
				const ID = uuid();
				const statement = await db.preparePromisified(
					`UPDATE "${schema}"."SCLABS_ALUMNIPORTAL_DOCUMENTS_DOCUMENTS"
					SET "STREAM" = CASE 
					WHEN '${payload.payload.file}' != 'undefined' THEN '${payload.payload.file}'
					ELSE (select "STREAM" FROM "${schema}"."SCLABS_ALUMNIPORTAL_DOCUMENTS_DOCUMENTS" where "USERID"='${payload.payload.USERID}')
					END,
					"MODIFIEDBY" = '${modifiedby}',
    				"MODIFIEDAT" = '${modifiedat}'
    				where
    				"USERID" = '${payload.payload.USERID}'`
				)

				const results = await db.statementExecPromisified(statement, [])
				resolve(results)

			} catch (error) {
				reject(error);
			}
		});
	};

	const deletedocuments = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {

				const schema = await utils.currentSchema({
					db
				})
				const statement = await db.preparePromisified(
					`DELETE FROM "${schema}"."SCLABS_ALUMNIPORTAL_DOCUMENTS_DOCUMENTS"  WHERE ID = '${payload.payload.ID}'`
				)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);

			} catch (error) {
				reject(error);
			}
		});
	};
	const statusdocuments = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {

				const schema = await utils.currentSchema({
					db
				})

				// TODO: add pagination using [to, from] clauses in statement.
				const LIMIT = payload.LIMIT == undefined ? 10 : payload.LIMIT
				const offset = payload.OFFSET == undefined ? 0 : payload.OFFSET

				const statement = await db.preparePromisified(
					`SELECT "FILENAME" FROM "${schema}"."SCLABS_ALUMNIPORTAL_DOCUMENTS_DOCUMENTS" where "USERID"='${payload.USERID}'`
				)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);

			} catch (error) {
				reject(error);
			}
		});
	};

	return {
		viewdocuments,
		createdocuments,
		updatedocuments,
		deletedocuments,
		statusdocuments
	};

};