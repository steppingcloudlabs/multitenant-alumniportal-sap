const uuid = require("uuid");
const util = require("../../utils/index.js")
const utils = require("../../utils/database/index.js")();
module.exports = () => {
	const createticket = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const {
					USERID,
					SUBJECT,
					MESSAGE,
					ESCLATATIONMANAGER
				} = payload.payload;

				const schema = await utils.currentSchema({
					db
				})
				const ESCLATATION = "false"
				const RESOLVED = "false"
				const createdat = new Date().toISOString();
				const createdby = "user";
				const modifiedby = "user";
				const modifiedat = new Date().toISOString();
				const ID = uuid();
				// This query cretes the ticket 
				let query =
					`INSERT INTO "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" VALUES(
					'${createdat}'/*CREATEDAT <TIMESTAMP>*/,
					'${createdby}'/*CREATEDBY <NVARCHAR(255)>*/,
					'${modifiedat}'/*MODIFIEDAT <TIMESTAMP>*/,
					'${modifiedby}'/*MODIFIEDBY <NVARCHAR(255)>*/,
					'${ID}'/*ID <NVARCHAR(36)>*/,
					'${USERID}'/*USERID <NVARCHAR(5000)>*/,
					'${SUBJECT}' /*TITLE <NVARCHAR(5000)>*/ ,
					'${ESCLATATION}'/*ESCLATION <BOOLEAN>*/,
					'${RESOLVED}'/*RESOLVED <BOOLEAN>*/,
					'${ESCLATATIONMANAGER}'/*ESCLATATIONMANAGER <NVARCHAR(5000)>*/
						)`
				let statement = await db.preparePromisified(query)
				let results = await db.statementExecPromisified(statement, [])
				if (results == 1) {
					// this query get the ticketid 
					let query = `SELECT * FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" WHERE CREATEDAT = '${createdat}' AND USERID = '${USERID}')`
					let statement = await db.preparePromisified(query)
					let results = await db.statementExecPromisified(statement, [])
					if (results.length) {
						let TICKETID = results[0].ID
						let USERTYPE = payload.payload.USERTYPE;
						// this query add the message into the ticket 
						query =
							`INSERT INTO "${schema}"."SCLABS_ALUMNIPORTAL_MESSAGES_MESSAGES" VALUES(
							'${createdat}'/*CREATEDAT <TIMESTAMP>*/,
							'${createdby}'/*CREATEDBY <NVARCHAR(255)>*/,
							'${modifiedat}'/*MODIFIEDAT <TIMESTAMP>*/,
							'${modifiedby}'/*MODIFIEDBY <NVARCHAR(255)>*/,
							'${ID}'/*ID <NVARCHAR(36)>*/,
							'${USERTYPE}'/*USERTYPE <NVARCHAR(5000)>*/,
							'${MESSAGE}'/*MESSAGE <NVARCHAR(5000)>*/,
							'${TICKETID}'/*TICKETID <NVARCHAR(36)>*/)`
						let statement = await db.preparePromisified(query)
						let results = await db.statementExecPromisified(statement, [])
						resolve(results);
					} else {
						reject(results)
					}
				} else {
					reject(results);
				}

			} catch (error) {
				reject(error);
			}
		});
	};
	const getticket = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const {
					USERID
				} = payload;
				const schema = await utils.currentSchema({
					db
				})
				const LIMIT = payload.LIMIT == undefined ? 10 : payload.LIMIT
				const offset = payload.OFFSET == undefined ? 0 : payload.OFFSET
				const query =
					`SELECT * FROM ${schema}."SCLABS_ALUMNIPORTAL_TICKET_TICKET" WHERE USERID = '${USERID}' ORDER BY MODIFIEDAT DESC LIMIT ${LIMIT} offset ${offset}`

				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			} catch (error) {
				reject(error);
			}
		});
	};

	const updateticket = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {

				const schema = await utils.currentSchema({
					db
				})

				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();

				const query =
					`UPDATE "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET"
					SET "TITLE" = CASE
								WHEN '${payload.payload.TITLE}'!= 'undefined' THEN '${payload.payload.TITLE}'
								ELSE (select "TITLE" FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" where "ID"='${payload.payload.ID}')
								END,
					   "ESCLATION" = CASE
								WHEN  ${payload.payload.ESCLATATION}!= 'undefined' THEN  ${payload.payload.ESCLATATION}
								ELSE (select "ESCLATION" FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" where "ID"='${payload.payload.ID}')
								END,
						"RESOLVED" = case
								WHEN ${payload.payload.RESOLVED}!= 'undefined' THEN ${payload.payload.RESOLVED}
								ELSE (select "RESOLVED" FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" where "ID"='${payload.payload.ID}')
								END,
						"ESCLATATIONMANAGER" = case
								WHEN '${payload.payload.ESCLATATIONMANAGER}'!= 'undefined' THEN '${payload.payload.ESCLATATIONMANAGER}'
								ELSE (select "ESCLATATIONMANAGER" FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" where "ID"='${payload.payload.ID}')
								END,
						
						"MODIFIEDBY" = '${modifiedby}',
					    "MODIFIEDAT" = '${modifiedat}'
					where
					"ID" = '${payload.payload.ID}'`

				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results)

			} catch (error) {
				reject(error);
			}
		});
	};

	const deleteticket = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const {
					TICKETID
				} = payload.payload;

				const schema = await utils.currentSchema({
					db
				})
				const query = `DELETE FROM ${schema}."SCLABS_ALUMNIPORTAL_TICKET_TICKET" WHERE ID = '${TICKETID}' `

				const statement = await db.preparePromisified(query);
				const result = await db.statementExecPromisified(statement, []);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	};

	const createMESSAGE = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const {
					MESSAGE,
					TICKETID,
					USERTYPE
				} = payload.payload;

				const schema = await utils.currentSchema({
					db
				})
				const createdat = new Date().toISOString();
				const createdby = "user";
				const modifiedby = USERTYPE;
				const modifiedat = new Date().toISOString();
				const ID = uuid();
				const query =
					`INSERT INTO "${schema}"."SCLABS_ALUMNIPORTAL_MESSAGES_MESSAGES" VALUES(
	'${createdat}'/*CREATEDAT <TIMESTAMP>*/,
	'${createdby}'/*CREATEDBY <NVARCHAR(255)>*/,
	'${modifiedat}'/*MODIFIEDAT <TIMESTAMP>*/,
	'${modifiedby}'/*MODIFIEDBY <NVARCHAR(255)>*/,
	'${ID}'/*ID <NVARCHAR(36)>*/,
	'${USERTYPE}'/*USERTYPE <NVARCHAR(5000)>*/,
	'${MESSAGE}'/*MESSAGE <NVARCHAR(5000)>*/,
	'${TICKETID}'/*TICKETID <NVARCHAR(36)>*/
)`
				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			} catch (error) {
				reject(error);
			}
		});
	};
	const getMESSAGE = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const {
					TICKETID
				} = payload;
				const schema = await utils.currentSchema({
					db
				})
				const LIMIT = payload.LIMIT == undefined ? 10 : payload.LIMIT
				const offset = payload.OFFSET == undefined ? 0 : payload.OFFSET
				const query =
					`SELECT * FROM ${schema}."SCLABS_ALUMNIPORTAL_MESSAGES_MESSAGES" WHERE TICKETID = '${TICKETID}' ORDER BY CREATEDAT ASC LIMIT ${LIMIT} offset ${offset}`

				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			} catch (error) {

				reject(error);
			}
		});
	};

	const updateMESSAGE = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				resolve("FUNCTIONALITY NOT AVAILABLE");
			} catch (error) {
				reject(error);
			}
		});
	};

	const deleteMESSAGE = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const {
					TICKETID
				} = payload.paylaod;
				const createdat = new Date().toISOString();
				const createdby = USERTYPE;
				const modifiedby = USERTYPE;
				const modifiedat = new Date().toISOString();
				const ID = uuid();
				const schema = await utils.currentSchema({
					db
				})
				const query = `DELETE FROM ${schema}."SCLABS_ALUMNIPORTAL_MESSAGES_MESSAGES" WHERE ID == ${TICKETID} `
				const statement = await db.preparePromisified(query);
				const result = await db.statementExecPromisified(statement, []);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	};

	const createmanager = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				});
				const createdat = new Date().toISOString();
				const createdby = "admin";
				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();;
				const id = uuid();
				const firstname = payload.payload.FIRSTNAME;
				const lastname = payload.payload.LASTNAME;
				const email = payload.payload.EMAIL;
				const LEVELMANAGER = payload.payload.LEVELMANAGER;
				if (LEVELMANAGER < 1) reject("Level Manager Cannot be less than 1")
				if (LEVELMANAGER > 3) reject("Level Manager Cannot be greater than 3")
				const query = `SELECT * FROM "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER"  WHERE EMAIL ='${email}' or LEVELMANAGER = '${LEVELMANAGER}'`
				const statement = await db.preparePromisified(query);
				const results = await db.statementExecPromisified(statement, [])
				if (results.length == 0) {
					const query1 =
						`INSERT INTO "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER" VALUES(
					'${createdat}',
					'${createdby}',
					'${modifiedat}',
					'${modifiedby}',
					'${id}',	
					'${firstname}',
					'${lastname}',
					'${email}',
					'${LEVELMANAGER}'
				)`
					const statement1 = await db.preparePromisified(query1)
					const results1 = await db.statementExecPromisified(statement1, [])
					resolve(results1);
				} else {
					resolve(" Manager Email or Level Manager exists! use update manager api")
				}

			} catch (error) {
				reject(error);
			}
		});
	};
	const getmanager = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				})
				const LIMIT = payload.LIMIT == undefined ? 10 : payload.LIMIT
				const offset = payload.OFFSET == undefined ? 0 : payload.OFFSET
				const query =
					`SELECT ID, FIRSTNAME, LASTNAME, EMAIL, LEVELMANAGER FROM "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER" rows LIMIT ${LIMIT} offset ${offset}`
				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			} catch (error) {
				reject(error);
			}
		});
	};
	const getmanagerprofile = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				})
				const LIMIT = payload.LIMIT == undefined ? 10 : payload.LIMIT
				const offset = payload.OFFSET == undefined ? 0 : payload.OFFSET
				//get manager level 
				let query = `SELECT "EMAIL", "LEVELMANAGER" FROM "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER" WHERE EMAIL = '${payload.EMAIL}'`
				let statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])

				if (results.length == 1) {
					const query1 = `SELECT * from ${schema}.SCLABS_ALUMNIPORTAL_TICKET_TICKET WHERE ESCLATATIONMANAGER = '${results[0].LEVELMANAGER}' ORDER BY CREATEDAT DESC LIMIT ${LIMIT} OFFSET ${offset}`

					const statement1 = await db.preparePromisified(query1)
					const result = await db.statementExecPromisified(statement1, [])

					resolve(result);
				} else {
					reject(results)
				}
			} catch (error) {
				reject(error);
			}
		});
	};
	const updatemanager = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				});
				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();
				const query =
					`UPDATE "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER"
				     SET "FIRSTNAME" = CASE
					     WHEN '${payload.payload.FIRSTNAME}' != 'undefined'
					     THEN '${payload.payload.FIRSTNAME}'
						 END,
						 "LASTNAME" = CASE
					     WHEN '${payload.payload.LASTNAME}' != 'undefined'
					     THEN '${payload.payload.LASTNAME}'
						 END,
						 "EMAIL" = CASE
						 WHEN '${payload.payload.EMAIL}' != 'undefined'
						 THEN '${payload.payload.EMAIL}'
						 END,
					     "MODIFIEDBY" = '${modifiedby}',
    				     "MODIFIEDAT" = '${modifiedat}'
    				where
    				"LEVELMANAGER" = '${payload.payload.LEVELMANAGER}'
    				`
				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])

				resolve(results)

			} catch (error) {
				reject(error);
			}
		});
	};

	const deletemanager = ({
		payload,
		db
	}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				})
				const query = `DELETE FROM "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER"  WHERE EMAIL = '${payload.payload.EMAIL}'`
				const statement = await db.preparePromisified(query);
				const results = await db.statementExecPromisified(statement, [])
				resolve(results)
			} catch (error) {
				reject(error);
			}
		});
	};
	return {
		createticket,
		updateticket,
		getticket,
		deleteticket,
		createMESSAGE,
		updateMESSAGE,
		getMESSAGE,
		deleteMESSAGE,
		createmanager,
		updatemanager,
		getmanager,
		deletemanager,
		getmanagerprofile
	};
}