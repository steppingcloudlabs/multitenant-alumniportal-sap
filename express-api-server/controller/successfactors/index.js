const successfactorsservice = require("../../service/successfactors")();
const dbClass = require("sap-hdbext-promisfied");

module.exports = {
	getuser: async(req, res) => {
		try {
			const payload = req.body;
			let db = new dbClass(req.db);
			const response = await successfactorsservice.getuser({
				payload,
				db
			});
			console.log(response);
			if (response) {
				res.type("application/json").status(200).send({
					status: "200",
					result: response
				});
			} else {
				res.type("application/json").status(200).send({
					status: "500",
					result: "Error"

				});
			}

		} catch (error) {
			res.type("applcation/json").status(500).send({
				status: "500",
				error: error
			});
		}
	}
}