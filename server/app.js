import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import teamMembersRouter from './routes/teamMembers';
import projectsRouter from './routes/projects';
import { fileURLToPath } from 'url';
import DatabaseFilter from './database/databaseFilter';

const __dirname = fileURLToPath(import.meta.url);
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', DatabaseFilter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/teamMembers', teamMembersRouter);
app.use('/projects', projectsRouter);

export default app;
