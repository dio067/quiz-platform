import express from 'express';
import bodyParser from 'body-parser';
import authAdminRouter from './routes/admin/authentication/auth.js';
import authUserRouter from './routes/user/authentication/auth.js';
import quizAdminRouter from './routes/admin/quizzes/quizzes.js';
import quizUserRouter from './routes/user/quizzes/quizzes.js';
import cookieSession from 'cookie-session';
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['kjdkfjsakdlfjskd'],
    })
);
app.use(authUserRouter);
app.use(authAdminRouter);
app.use(quizUserRouter);
app.use(quizAdminRouter);
app.listen(3300, () => {
    console.log('listening..');
});
