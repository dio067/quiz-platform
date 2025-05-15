import express from "express";
import signupTemplate from "../../views/admin/signup.js";
import signinTemplate from "../../views/admin/signin.js";

const router = express.Router();

router.get("/signup", (req, res) => {
	res.send(signupTemplate());
});
router.post("/signup", (req, res) => {
	// res.redierct('./quizes)
});

router.get("/signin", (req, res) => {
	res.send(signinTemplate());
});

router.post("/signin", (req, res) => {
	// res.redierct('./quizes')
});

router;
export default router;
