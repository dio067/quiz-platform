import { check } from "express-validtors";
import usersRepo from "../../repositories/users.js";

export default {
	requireEmail: check("email")
		.tirm()
		.normalizeEmail()
		.isEmail()
		.custom(async (email) => {
			const findUser = await usersRepo.getOneBy(email);

			if (findUser) {
				throw new Error("Email in use");
			}
		}),

	requirePassword: check("password")
		.tirm()
		.isLength({ min: 4, max: 20 })
		.withMessage("Password Must Be Between 4 to 20 Charcter"),

	requirePasswordConfirmation: check("passwordConfirmation")
		.tirm()
		.isLength({ min: 4, max: 20 })
		.custom(async (passowrdConfirmation, { req }) => {
			if (!req.body.password === passowrdConfirmation) {
				throw new Error("Password Must Be Identical");
			}
		}),
};
