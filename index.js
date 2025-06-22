import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/admin/auth.js";
import quizRouter from "./routes/quizzes.js";
import cookieSession from "cookie-session";
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["kjdkfjsakdlfjskd"],
	})
);
app.use(authRouter);
app.use(quizRouter);
app.listen(4000, () => {
	console.log("listening");
});
