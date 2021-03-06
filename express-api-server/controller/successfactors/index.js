const successfactorsservice = require("../../service/successfactors/index.js")();
const dbClass = require("sap-hdbext-promisfied");

module.exports = {
	getuser: async (req, res) => {
		try {
			const payload = req.query;
			let db = new dbClass(req.db);
			let response = await successfactorsservice.getuser({
				payload,
				db
			});

			if (response) {
				if (response.length == 0) response = response
				
				res.type("application/json").status(200).send({
					status: "200",
					result: response
				});
			} else {
				res.type("application/json").status(400).send({
					status: "400",
					result: response
				})
			}

		} catch (error) {
			req.logger.error(` Error for ${req.logger.getTenantId()} at admin/action/successfactors/getuser ${error}`);
			res.type("applcation/json").status(500).send({
				status: "500",
				error: error
			});
		}
	}
}