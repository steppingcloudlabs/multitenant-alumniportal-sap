	/* eslint-disable */
	const documentserivce = require("../../service/documents")();
	const dbClass = require("sap-hdbext-promisfied");
	module.exports = {
		// News Controllers
		getdocuments: async (req, res) => {
			try {
				const payload = req.query;
				let db = new dbClass(req.db);
				let response = await documentserivce.viewdocuments({
					payload,
					db
				});
				if (response) {
					if (response.length == 0) response = response;
					else response = response.length > 1 ? response : response[0];
					res.type("application/json").status(200).send({
						status: "200",
						result: response,
					});
				} else {
					res.type("application/json").status(400).send({
						status: "400",
						result: response
					});
				}

			} catch (error) {
				res.type("application/json").status(500).send({
					status: "500",
					error: error
				});
			}

		},

		createdocuments: async (req, res) => {
			try {
				const payload = req.body;
				let db = new dbClass(req.db);
				let response = await documentserivce.createdocuments({
					payload,
					db
				});
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
				res.type("application/json").status(500).send({
					status: "500",
					error: error
				});
			}

		},

		updatedocuments: async (req, res) => {
			try {
				const payload = req.body;
				let db = new dbClass(req.db);
				let response = await documentserivce.updatedocuments({
					payload,
					db
				});
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
				res.type("application/json").status(500).send({
					status: "500",
					error: error
				});
			}

		},

		deletedocuments: async (req, res) => {
			try {

				const payload = req.body;
				let db = new dbClass(req.db);

				let response = await documentserivce.deletedocuments({
					payload,
					db
				});

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
				res.type("application/json").status(200).send({
					status: "400",
					result: "Element Not Found"
				});
			}
		},
		statusdocuments: async (req, res) => {
			try {
				const payload = req.query;
				let db = new dbClass(req.db);
				let response = await documentserivce.statusdocuments({
					payload,
					db


				});
				if (response) {
					res.type("application/json").status(200).send({
						status: "200",
						result: response,
					});
				} else {
					res.type("application/json").status(400).send({
						status: "400",
						result: response
					});
				}

			} catch (error) {
				res.type("application/json").status(500).send({
					status: "500",
					error: error
				});
			}

		},
	}