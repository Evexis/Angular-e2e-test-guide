import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as service from './services/services';
/*
 "In general, the rule of thumb is:
 If you’re installing something that you want to use
 in your program, using require('whatever'), then install
 it locally, at the root of your project. If you’re installing
 something that you want to use in your shell, on the command
 line or something, install it globally, so that its binaries
 end up in your PATH environment variable" ~XiaoPeng
*/

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('SERVER'));
// ------------- login   ------------------------------------------------------------------------////////////////////////
app.post('/login', service.login);
// ------------- user  ------------------------------------------------------------------------////////////////////////
app.route('/user-details/:param?')
    .get(service.getUsers)
    .post(service.getUser)
    .put(service.updateUser);
app.delete('/delete-user/:login', service.deleteUser);
app.post('/insert-user/:param', );

// ------------- schedule -----------------------------------------------------------------------////////////////////////
app.route('/schedule/:param')
    .post(service.getSchedule)
    .put(service.updateSchedule);
app.post('/insert-appt', service.insertAppointment);
app.delete('/delete-appt/:param', service.deleteAppointment);
///-----------------DataBase Init path -----------------///
app.get('/init-db', service.databaseInitialization);

app.listen(3000);
