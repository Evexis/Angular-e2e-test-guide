import * as express from 'express';
import { mongo } from '../services/data-base-object';
import { ObjectId } from 'mongodb';
import { initDB } from '../init-db';



export async function login (req: express.Request, res: express.Response) {
    console.log(JSON.stringify(req.body));

    const user = await mongo.mongoUsers.findElement({
        login: req.body.login,
        password: req.body.password
    });
    if (user[0] !== undefined) {
        res.status(200).json(user[0]).end();
        console.log('tak');
    }
    else {
        res.json('bledny login lub haslo');
        console.log('nie');
        console.log(user);
    };
}

export async function getUsers(req: express.Request, res: express.Response) {
    try {
        const param = req.param('param') ? { role: req.param('param') } : {};
        const result = await mongo.mongoUsersDetails.findElement(param)
        res.json(result);
    } catch (err) {
        res.send(err);
    }
}

export async function getUser(req: express.Request, res: express.Response) {
    try {
        const result = await mongo.mongoUsersDetails.findElement(req.body);
        res.json(result);
    } catch (err) {
        res.send(err);
    }
}

export async function updateUser(req: express.Request, res: express.Response) {
    try {
        if (req.param('param') === 'doctor') {
            await Promise.all([
                mongo.mongoUsersDetails.updateElement(
                    {
                        login: req.body.login,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        gender: req.body.gender,
                        PESEL: req.body.PESEL,
                        age: req.body.age,
                        phone: req.body.phone,
                        email: req.body.email,
                        address: {
                            street: req.body.address.street,
                            postcode: req.body.address.postcode,
                            city: req.body.address.city
                        },
                        specializations: req.body.specializations,
                        workingHours: {
                            monday: {
                                start: req.body.workingHours.monday.start,
                                end: req.body.workingHours.monday.end
                            },
                            tuesday: {
                                start: req.body.workingHours.tuesday.start,
                                end: req.body.workingHours.tuesday.end
                            },
                            wednesday: {
                                start: req.body.workingHours.wednesday.start,
                                end: req.body.workingHours.wednesday.end
                            },
                            thursday: {
                                start: req.body.workingHours.thursday.start,
                                end: req.body.workingHours.thursday.end
                            },
                            friday: {
                                start: req.body.workingHours.friday.start,
                                end: req.body.workingHours.friday.end
                            }
                        }
                    }
                )
            ]);
        } else if (req.param('param') === 'patient') {
            await Promise.all([
                mongo.mongoUsersDetails.updateElement(
                    {
                        login: req.body.login,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        gender: req.body.gender,
                        PESEL: req.body.PESEL,
                        age: req.body.age,
                        phone: req.body.phone,
                        email: req.body.email,
                        address: {
                            street: req.body.address.street,
                            postcode: req.body.address.postcode,
                            city: req.body.address.city
                        },
                    }
                )
            ]);
        }
        res.status(200).json('Updates');
    } catch (err) {
        res.send(err);
    }
}

export async function deleteUser(req: express.Request, res: express.Response) {
    try {
        const result = await Promise.all([
            mongo.mongoUsersDetails.removeElement({ login: req.param('login') }),
            mongo.mongoUsers.removeElement({ login: req.param('login') })
        ]);
        res.json(result);
    } catch (err) {
        res.send(err);
    }
}

export async function insertUser(req: express.Request, res: express.Response) {
    console.log('recived' + JSON.stringify(req.body));

    try {
        const user = await mongo.mongoUsers.findElement({ login: req.body.login })
        console.log(user);
        if (user[0] !== undefined) {
            res.json(`Login ${req.body.login} is in use!`)
        } else {
            const _id = new ObjectId();
            if (req.param('param') === 'doctor') {
                await Promise.all([
                    mongo.mongoUsers.insertElements([
                        {
                            _id: _id,
                            login: req.body.login,
                            password: req.body.password,
                            role: 'doctor'
                        }
                    ]),
                    mongo.mongoUsersDetails.insertElements([
                        {
                            _id: _id,
                            login: req.body.login,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            role: req.body.role,
                            gender: req.body.gender,
                            PESEL: req.body.PESEL,
                            age: req.body.age,
                            phone: req.body.phone,
                            email: req.body.email,
                            address: {
                                street: req.body.address.street,
                                postcode: req.body.address.postcode,
                                city: req.body.address.city
                            },
                            specializations: req.body.specializations,
                            workingHours: {
                                monday: {
                                    start: req.body.workingHours.monday.start,
                                    end: req.body.workingHours.monday.end
                                },
                                tuesday: {
                                    start: req.body.workingHours.tuesday.start,
                                    end: req.body.workingHours.tuesday.end
                                },
                                wednesday: {
                                    start: req.body.workingHours.wednesday.start,
                                    end: req.body.workingHours.wednesday.end
                                },
                                thursday: {
                                    start: req.body.workingHours.thursday.start,
                                    end: req.body.workingHours.thursday.end
                                },
                                friday: {
                                    start: req.body.workingHours.friday.start,
                                    end: req.body.workingHours.friday.end
                                }
                            }
                        }
                    ])
                ]);
            } else if (req.param('param') === 'patient') {
                await Promise.all([
                    mongo.mongoUsers.insertElements([
                        {
                            _id: _id,
                            login: req.body.login,
                            password: req.body.password,
                            role: 'patient'
                        }
                    ]),
                    mongo.mongoUsersDetails.insertElements([
                        {
                            _id: _id,
                            login: req.body.login,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            role: req.body.role,
                            gender: req.body.gender,
                            PESEL: req.body.PESEL,
                            age: req.body.age,
                            phone: req.body.phone,
                            email: req.body.email,
                            address: {
                                street: req.body.address.street,
                                postcode: req.body.address.postcode,
                                city: req.body.address.city
                            },
                        }
                    ])
                ]);
            }
            res.json('OK')
        }
    } catch (err) {
        res.send(err);
    }
}

export async function getSchedule(req: express.Request, res: express.Response) {
    try {
        const result = await mongo.mongoSchedule.findElement(req.body, { 'date.year': 1, 'date.month': 1, 'date.day': 1, 'date.hour': 1 }, +req.param('param'));
        res.json(result);
    } catch (err) {
        res.send(err);
    }
}

export async function updateSchedule(req: express.Request, res: express.Response) {
    try {
        console.log(req.body)
        const result = await mongo.mongoSchedule.updateElement(req.body);
        res.json(result);
    } catch (err) {
        res.send(err);
    }
}

export async function insertAppointment(req: express.Request, res: express.Response) {
    try {
        const user = await mongo.mongoUsers.findElement({ login: req.body.patient.login });
        if (user[0] !== undefined) {
            await mongo.mongoSchedule.insertElements([
                {
                    login: req.body.login,
                    date: {
                        year: req.body.date.year,
                        month: req.body.date.month,
                        day: req.body.date.day,
                        hour: req.body.date.hour
                    },
                    patient: {
                        login: req.body.patient.login,
                        description: req.body.patient.description
                    }

                }
            ])


            res.json('OK')
        } else {
            res.json(`Login ${req.body.patient.login} does not exist!`)
        }
    } catch (err) {
        res.send(err);
    }
}

export async function deleteAppointment(req: express.Request, res: express.Response) {
    try {
        const result = await Promise.all([
            mongo.mongoSchedule.removeElement({ _id: req.param('param') }),
        ]);
        res.json(result);
    } catch (err) {
        res.send(err);
    }
}

export async function databaseInitialization(req: express.Request, res: express.Response) {
    try {
        const result = await initDB(mongo.mongoUsers, mongo.mongoUsersDetails, mongo.mongoSchedule);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}
