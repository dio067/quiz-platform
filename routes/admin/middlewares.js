import { validationResult } from "express-validator";

export default {
	handleErrors(templateFunc, dataCb) {
		return async (req, res, next) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				let data = {};
				if (dataCb) {
					data = await dataCb(req);
				}
				return res.send(templateFunc({ errors, ...data }));
			}

			next();
		};
	},
	requireAuth(req, res, next) {
		if (!req.session.userId) {
			return res.redirect("/admin/signin");
		}

		next();
	},
};
