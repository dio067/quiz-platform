import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/admin/auth.js";
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRouter);
app.listen(4000, () => {
	console.log("listening");
});
