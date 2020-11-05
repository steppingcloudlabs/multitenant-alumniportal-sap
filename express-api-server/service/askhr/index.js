const uuid = require("uuid");
const util = require("../../utils/index.js")
const utils = require("../../utils/database/index.js")();
module.exports = () => {
	const createticket = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
				const {
					userid,
					title,
					escalation,
					resolved,
					escalationmanager
				} = payload.payload;

				const schema = await utils.currentSchema({
					db
				})

				const createdat = new Date().toISOString();
				const createdby = "user";
				const modifiedby = "user";
				const modifiedat = new Date().toISOString();
				const id = uuid();
				const query =
					`INSERT INTO "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" VALUES(
					'${createdat}'/*CREATEDAT <TIMESTAMP>*/,
					'${createdby}'/*CREATEDBY <NVARCHAR(255)>*/,
					'${modifiedat}'/*MODIFIEDAT <TIMESTAMP>*/,
					'${modifiedby}'/*MODIFIEDBY <NVARCHAR(255)>*/,
					'${id}'/*ID <NVARCHAR(36)>*/,
					'${userid}'/*USERID <NVARCHAR(5000)>*/,
					'${title}'/*TITLE <NVARCHAR(5000)>*/,
					${escalation}/*ESCLATION <BOOLEAN>*/,
					${resolved}/*RESOLVED <BOOLEAN>*/,
					'${escalationmanager}'/*ESCLATATIONMANAGER <NVARCHAR(5000)>*/
						)`
				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			} catch (error) {
				reject(error);
			}
		});
	};
	const getticket = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
				const {
					ticketid
				} = payload;
				const schema = await utils.currentSchema({
					db
				})
				const limit = payload.limit == undefined ? 10 : payload.limit
				const offset = payload.offset == undefined ? 0 : payload.offset
				const query =
					`SELECT * FROM ${schema}."SCLABS_ALUMNIPORTAL_TICKET_TICKET" WHERE ID = '${ticketid}' ORDER BY MODIFIEDAT DESC limit ${limit} offset ${offset}`
				console.log(query)
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
		return new Promise(async(resolve, reject) => {
			try {

				const schema = await utils.currentSchema({
					db
				})

				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();

				const query =
					`UPDATE "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET"
					SET "TITLE" = CASE
								WHEN '${payload.payload.title}'!= 'undefined' THEN '${payload.payload.title}'
								ELSE (select "TITLE" FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" where "ID"='${payload.payload.id}')
								END,
					   "ESCLATION" = CASE
								WHEN  ${payload.payload.escalation}!= 'undefined' THEN  ${payload.payload.escalation}
								ELSE (select "ESCLATION" FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" where "ID"='${payload.payload.id}')
								END,
						"RESOLVED" = case
								WHEN ${payload.payload.resolved}!= 'undefined' THEN ${payload.payload.resolved}
								ELSE (select "RESOLVED" FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" where "ID"='${payload.payload.id}')
								END,
						"ESCLATATIONMANAGER" = case
								WHEN '${payload.payload.escalationmanager}'!= 'undefined' THEN '${payload.payload.escalationmanager}'
								ELSE (select "ESCLATATIONMANAGER" FROM "${schema}"."SCLABS_ALUMNIPORTAL_TICKET_TICKET" where "ID"='${payload.payload.id}')
								END,
						
						"MODIFIEDBY" = '${modifiedby}',
					    "MODIFIEDAT" = '${modifiedat}'
					where
					"ID" = '${payload.payload.id}'`
				console.log(query)
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
		return new Promise(async(resolve, reject) => {
			try {
				const {
					ticketid
				} = payload.payload;

				const schema = await utils.currentSchema({
					db
				})
				const query = `DELETE FROM ${schema}."SCLABS_ALUMNIPORTAL_TICKET_TICKET" WHERE ID = '${ticketid}' `

				const statement = await db.preparePromisified(query);
				const result = await db.statementExecPromisified(statement, []);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	};

	const createmessage = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
				const {
					message,
					ticketid,
					usertype
				} = payload.payload;
				console.log(payload.payload)
				const schema = await utils.currentSchema({
					db
				})
				const createdat = new Date().toISOString();
				const createdby = "user";
				const modifiedby = usertype;
				const modifiedat = new Date().toISOString();
				const id = uuid();
				const query =
					`INSERT INTO "${schema}"."SCLABS_ALUMNIPORTAL_MESSAGES_MESSAGES" VALUES(
	'${createdat}'/*CREATEDAT <TIMESTAMP>*/,
	'${createdby}'/*CREATEDBY <NVARCHAR(255)>*/,
	'${modifiedat}'/*MODIFIEDAT <TIMESTAMP>*/,
	'${modifiedby}'/*MODIFIEDBY <NVARCHAR(255)>*/,
	'${id}'/*ID <NVARCHAR(36)>*/,
	'${usertype}'/*USERTYPE <NVARCHAR(5000)>*/,
	'${message}'/*MESSAGE <NVARCHAR(5000)>*/,
	'${ticketid}'/*TICKETID <NVARCHAR(36)>*/
)`
				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			} catch (error) {
				reject(error);
			}
		});
	};
	const getmessage = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
				const {
					ticketid
				} = payload;
				const schema = await utils.currentSchema({
					db
				})
				const limit = payload.limit == undefined ? 10 : payload.limit
				const offset = payload.offset == undefined ? 0 : payload.offset
				const query =
					`SELECT * FROM ${schema}."SCLABS_ALUMNIPORTAL_MESSAGES_MESSAGES" WHERE TICKETID = '${ticketid}' ORDER BY MODIFIEDAT DESC limit ${limit} offset ${offset}`
				console.log(query)
				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				resolve(results);
			} catch (error) {
				console.log(error)
				reject(error);
			}
		});
	};

	const updatemessage = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
				resolve("FUNCTIONALITY NOT AVAILABLE");
			} catch (error) {
				reject(error);
			}
		});
	};

	const deletemessage = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
				const {
					ticketid
				} = payload.paylaod;
				const createdat = new Date().toISOString();
				const createdby = usertype;
				const modifiedby = usertype;
				const modifiedat = new Date().toISOString();
				const id = uuid();
				const schema = await utils.currentSchema({
					db
				})
				const query = `DELETE FROM ${schema}."SCLABS_ALUMNIPORTAL_MESSAGES_MESSAGES" WHERE ID == ${ticketid} `
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
		return new Promise(async(resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				});
				const createdat = new Date().toISOString();
				const createdby = "admin";
				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();;
				const id = uuid();
				const firstname = payload.payload.firstname;
				const lastname = payload.payload.lastname;
				const email = payload.payload.email;
				const levelmanager = payload.payload.levelmanager;
				const query = `SELECT * FROM "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER"  WHERE USERID ='${email}'`
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
					'${levelmanager}'
				)`
					const statement1 = await db.preparePromisified(query1)
					const results1 = await db.statementExecPromisified(statement1, [])
					resolve(results1);
				} else {
					resolve("userid exists")
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
		return new Promise(async(resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				})
				const limit = payload.limit == undefined ? 10 : payload.limit
				const offset = payload.offset == undefined ? 0 : payload.offset
				const query =
					`SELECT * FROM "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER" rows limit ${limit} offset ${offset}`
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
		return new Promise(async(resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				})
				const limit = payload.limit == undefined ? 10 : payload.limit
				const offset = payload.offset == undefined ? 0 : payload.offset
				const query =
					`SELECT * from ${schema}.SCLABS_ALUMNIPORTAL_TICKET_TICKET "EMAIL" = '${payload.email}' ORDER BY CREATEDAT DESC rows limit ${limit} offset ${offset}`
				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])

				resolve(results);
			} catch (error) {
				reject(error);
			}
		});
	};
	const updatemanager = ({
		payload,
		db
	}) => {
		return new Promise(async(resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				});
				const modifiedby = "admin";
				const modifiedat = new Date().toISOString();
				const query =
					`UPDATE "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER"
				     SET "LEVELMANAGER" = CASE 
					     WHEN '${payload.levelmanager}' != 'undefined' THEN '${payload.levelmanager}'
				      	 ELSE (select "LEVELMANAGER" FROM "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER" where "USERID"='${payload.userid}')
					     END,
					     "MODIFIEDBY" = '${modifiedby}',
    				     "MODIFIEDAT" = '${modifiedat}'
    				where
    				"USERID" = '${payload.userid}'`
				const statement = await db.preparePromisified(query)
				const results = await db.statementExecPromisified(statement, [])
				console.log(results);
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
		return new Promise(async(resolve, reject) => {
			try {
				const schema = await utils.currentSchema({
					db
				})
				const query = `DELETE FROM "${schema}"."SCLABS_ALUMNIPORTAL_MANAGER_MANAGER"  WHERE USERID = '${payload.userid}'`
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
		createmessage,
		updatemessage,
		getmessage,
		deletemessage,
		createmanager,
		updatemanager,
		getmanager,
		deletemanager,
		getmanagerprofile
	};
}