const expressrouter = require("express").Router();
const documentcontroller = require("../../controller/documents/index");
//document routers
expressrouter
	.route("/user/get")
	.get((req, res, next) => documentcontroller.getdocuments(req, res, next));
expressrouter
	.route("/user/update")
	.post((req, res, next) => documentcontroller.updatedocuments(req, res, next));

module.exports = expressrouter;