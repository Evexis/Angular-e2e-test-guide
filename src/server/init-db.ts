import { ObjectId } from 'mongodb';

export async function initDB(mongoUsers, mongoUsersDetails, mongoSchedule) {
    await Promise.all([
        mongoUsers.drop(),
        mongoUsersDetails.drop(),
        mongoSchedule.drop()
    ]);
    const result = await Promise.all([
        mongoUsers.insertElements([
            {
                "login": "admin",
                "password": "admin",
                "role": "admin"
            },
            {
                "_id": new Object("59afe927b0161155c8f105f2"),
                "login": "doctor",
                "password": "doctor",
                "role": "doctor"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f4"),
                "login": "doktorek",
                "password": "prawilny",
                "role": "doctor"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f5"),
                "login": "doktorBezUprawnien",
                "password": "jakRowerzystaBezUprawnien",
                "role": "doctor"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f6"),
                "login": "Brooke",
                "password": "1234",
                "role": "doctor"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f7"),
                "login": "elekarz",
                "password": "@als",
                "role": "doctor"
            },
            {
                 "_id" : new ObjectId("59afe927b0161155c8f105f8"),
                "login": "monicaC",
                "password": "anteny",
                "role": "doctor"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f9"),
                "login": "eve63",
                "password": "eve63",
                "role": "doctor"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105fa"),
                "login": "pawelKrakow",
                "password": "wawel",
                "role": "doctor"
            },
            {
                 "_id" : new ObjectId("59afe927b0161155c8f105fb"),
                "login": "leo_z_tarnowa",
                "password": "ananas@66",
                "role": "doctor"
            },
            {
                 "_id" : new ObjectId("59afe927b0161155c8f105fc"),
                "login": "doktorro",
                "password": "paprykarz_szczecisnski",
                "role": "doctor"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105fd"),
                "login": "medicziKasia",
                "password": "traktor77",
                "role": "doctor"
            },
            {
                "_id": new ObjectId("59afa368d5a0c31db44b572f"),
                "login": "lolek",
                "password": "bolek",
                "role": "doctor"
            },
            {
                "_id": new ObjectId("59afe927b0161155c8f105f3"),
                "login": "patient",
                "password": "patient",
                "role": "patient"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105ff"),
                "login": "wpiszLogin",
                "password": "admin",
                "role": "patient"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10600"),
                "login": "synJacka",
                "password": "admin",
                "role": "patient"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10601"),
                "login": "Hulk",
                "password": "admin",
                "role": "patient"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10602"),
                "login": "SpeedyGonzales",
                "password": "admin",
                "role": "patient"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10603"),
                "login": "Mark",
                "password": "admin",
                "role": "patient"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10604"),
                "login": "Robinio",
                "password": "admin",
                "role": "patient"
            },
            {
                 "_id" : new ObjectId("59afe927b0161155c8f10605"),
                "login": "Jess",
                "password": "admin",
                "role": "patient"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10606"),
                "login": "Heisenberg",
                "password": "Werner",
                "role": "patient"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10607"),
                "login": "Jesse",
                "password": "admin",
                "role": "patient"
            }
        ]),
        mongoUsersDetails.insertElements([
            {
                "_id": new ObjectId("59afe927b0161155c8f105f3"),
                "role": "patient",
                "login": "patient",
                "firstName": "Leopold",
                "lastName": "Staff",
                "gender": "male",
                'age': 80,
                'phone': "+48 666253442",
                'email': "b.f.staff@yahoo.lol",
                'address': {
                    'street': 'Dluga',
                    'postcode': '32-549',
                    'city': 'Cracow'
                },
                "PESEL": "77082410610"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105ff"),
                "role": "patient",
                "login": "wpiszLogin",
                "firstName": "Zygfryd",
                "lastName": "Siwonogi",
                "gender": "male",
                'age': 41,
                'phone': "124324235",
                'email': "mail@mainNa5minut.pl",
                'address': {
                    'street': 'Wroclawska',
                    'postcode': '32-501',
                    'city': 'Cracow'
                },
                "PESEL": "02123102319"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10600"),
                "role": "patient",
                "login": "synJacka",
                "firstName": "Skalbimierz",
                "lastName": "Uważny",
                "gender": "male",
                'age': 23,
                'phone': "124524887",
                'email': "skalbimerz.uwazy@gmial.com",
                'address': {
                    'street': 'Dluga',
                    'postcode': '90-541',
                    'city': 'Cracow'
                },
                "PESEL": "82031118433"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10601"),
                "role": "patient",
                "login": "Hulk",
                "firstName": "Bruce",
                "lastName": "Banner",
                "gender": "male",
                'age': 45,
                'phone': "102988392",
                'email': "mark@onet.pl",
                'address': {
                    'street': 'Dluga',
                    'postcode': '32-541',
                    'city': 'Trzebinia'
                },
                "PESEL": "62050211094"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10603"),
                "role": "patient",
                "login": "Mark",
                "firstName": "Marek",
                "lastName": "Markowicz",
                "gender": "male",
                'age': 53,
                'phone': "102988372",
                'email': "hugeandgreen@stark.industries.com",
                'address': {
                    'street': 'Washington',
                    'postcode': '77-040',
                    'city': 'New York'
                },
                "PESEL": "82050218792"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10604"),
                "role": "patient",
                "login": "Robinio",
                "firstName": "Robert",
                "lastName": "Górski",
                "gender": "male",
                'age': 23,
                'phone': "102118372",
                'email': "nnfksjths@o2.com",
                'address': {
                    'street': 'Krasna',
                    'postcode': '39-541',
                    'city': 'Petersburg'
                },
                "PESEL": "93050816835"
            },
            {
                 "_id" : new ObjectId("59afe927b0161155c8f10605"),
                "role": "patient",
                "login": "Jess",
                "firstName": "Justyna",
                "lastName": "Franiewska",
                "gender": "female",
                'age': 65,
                'phone': "118268372",
                'email': "jess_92@gmail.com",
                'address': {
                    'street': 'Dluga',
                    'postcode': '32-249',
                    'city': 'Gdansk'
                },
                "PESEL": "92100308786"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10606"),
                "role": "patient",
                "login": "Heisenberg",
                "firstName": "Walter",
                "lastName": "White",
                "gender": "male",
                'age': 34,
                'phone': "118200372",
                'email': "babyblue@gmail.com",
                'address': {
                    'street': 'Dluga',
                    'postcode': '32-761',
                    'city': 'Poznan'
                },
                "PESEL": "59090719558"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10607"),
                "role": "patient",
                "login": "Jesse",
                "firstName": "Jesse",
                "lastName": "Pinkman",
                "gender": "male",
                'age': 21,
                'phone': "118200372",
                'email': "yeahb_tch@gmail.com",
                'address': {
                    'street': 'Dluga',
                    'postcode': '32-881',
                    'city': 'Warszawa'
                },
                "PESEL": "84091713058"
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f10602"),
                "role": "patient",
                "login": "SpeedyGonzales",
                "firstName": "Wacław",
                "lastName": "Pośpieszny",
                "gender": "male",
                'age': 77,
                'phone': "382910928",
                'email': "hjgfs@interia.eu",
                'address': {
                    'street': 'nieDluga',
                    'postcode': '32-522',
                    'city': 'Cracow'
                },
                "PESEL": "83022114618"
            },
            // ---------------- Doctors --------------///////////////////
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f5"),
                "role": "doctor",
                'PESEL': "83022114618",
                'login': 'doktorBezUprawnien',
                'firstName': 'John',
                'lastName': 'Smith',
                'gender': 'male',
                'age': 37,
                'phone': '+48 123456789',
                'email': 'doktorBezUprawnien@gmail.com',
                'address': {
                    'street': 'Łąkowa 34',
                    'postcode': '39-111',
                    'city': 'Miasto W'
                },
                'specializations': [{'specialization': 'kości'}],
                "workingHours": {
                    "monday": {
                        "start": "18:00",
                        "end": "22:00"
                    },
                    "tuesday": {
                        "start": "07:00",
                        "end": "15:30"
                    },
                    "wednesday": {
                        "start": "06:00",
                        "end": "11:15"
                    },
                    "thursday": {
                        "start": "14:30",
                        "end": "21:00"
                    },
                    "friday": {
                        "start": "06:15",
                        "end": "13:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            },
            {
                "_id": new Object("59afe927b0161155c8f105f2"),
                "role": "doctor",
                'PESEL': "83082112618",
                'login': 'doctor',
                'firstName': 'James',
                'lastName': 'Lovelock',
                'gender': 'male',
                'age': 55,
                'phone': '+48 123465689',
                'email': 'jLovelock@gmail.com',
                'address': {
                    'street': 'Love 66',
                    'postcode': '595-223',
                    'city': 'Paris'
                },
                'specializations': [{'specialization':'logopeda'}],
                "workingHours": {
                    "monday": {
                        "start": "08:00",
                        "end": "14:00"
                    },
                    "tuesday": {
                        "start": "07:30",
                        "end": "15:00"
                    },
                    "wednesday": {
                        "start": "07:00",
                        "end": "18:00"
                    },
                    "thursday": {
                        "start": "12:00",
                        "end": "20:00"
                    },
                    "friday": {
                        "start": "13:00",
                        "end": "21:45"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f4"),
                "role": "doctor",
                'PESEL': "03022134618",
                'login': 'doktorek',
                'firstName': 'Marcus',
                'lastName': 'Will',
                'gender': 'male',
                'age': 32,
                'phone': '+48 773456789',
                'email': 'doktorek@gmail.com',
                'address': {
                    'street': 'Green 123',
                    'postcode': '25-083',
                    'city': 'Masecziuset'
                },
                'specializations': [{'specialization':'od uszów'}],
                "workingHours": {
                    "monday": {
                        "start": "08:00",
                        "end": "16:15"
                    },
                    "tuesday": {
                        "start": "12:30",
                        "end": "17:00"
                    },
                    "wednesday": {
                        "start": "12:00",
                        "end": "16:45"
                    },
                    "thursday": {
                        "start": "09:15",
                        "end": "17:45"
                    },
                    "friday": {
                        "start": "15:00",
                        "end": "22:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f6"),
                "role": "doctor",
                'PESEL': "89022114658",
                'login': 'Brooke',
                'firstName': 'Brooke',
                'lastName': 'Winchester',
                'gender': 'male',
                'age': 81,
                'phone': '+23 322567289',
                'email': 'BrookeDoctor@gmail.com',
                'address': {
                    'street': 'Piernikowa 33',
                    'postcode': '22-083',
                    'city': 'Carcas'
                },
                'specializations': [{'specialization':'internista'}],
                "workingHours": {
                    "monday": {
                        "start": "12:15",
                        "end": "19:15"
                    },
                    "tuesday": {
                        "start": "07:00",
                        "end": "14:30"
                    },
                    "wednesday": {
                        "start": "08:15",
                        "end": "15:15"
                    },
                    "thursday": {
                        "start": "17:45",
                        "end": "22:00"
                    },
                    "friday": {
                        "start": "12:00",
                        "end": "16:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f7"),
                "role": "doctor",
                'PESEL': "99022234688",
                'login': 'elekarz',
                'firstName': 'Tim',
                'lastName': 'Cole',
                'gender': 'male',
                'age': 46,
                'phone': '+11 773452289',
                'email': 'tim-cole@gmail.com',
                'address': {
                    'street': 'Lniana 76',
                    'postcode': '22-445',
                    'city': 'Colorado'
                },
                'specializations': [{'specialization':'alergolog'}],
                "workingHours": {
                "monday": {
                        "start": "08:00",
                        "end": "16:00"
                    },
                    "tuesday": {
                        "start": "07:15",
                        "end": "15:30"
                    },
                    "wednesday": {
                        "start": "06:00",
                        "end": "14:00"
                    },
                    "thursday": {
                        "start": "13:30",
                        "end": "21:30"
                    },
                    "friday": {
                        "start": "16:15",
                        "end": "22:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                } 
            },
            {
                 "_id" : new ObjectId("59afe927b0161155c8f105f8"),
                "role": "doctor",
                'PESEL': "83946114618",
                'login': 'monicaC',
                'firstName': 'Monica',
                'lastName': 'C',
                'gender': 'female',
                'age': 27,
                'phone': '+77 222116789',
                'email': 'monicaC@gmail.com',
                'address': {
                    'street': 'Lukrowa 66',
                    'postcode': '211-7783',
                    'city': 'Toruń'
                },
                'specializations': [{'specialization':'pediatra'}],
                "workingHours": {
                    "monday": {
                        "start": "09:00",
                        "end": "15:00"
                    },
                    "tuesday": {
                        "start": "13:00",
                        "end": "19:30"
                    },
                    "wednesday": {
                        "start": "12:00",
                        "end": "18:15"
                    },
                    "thursday": {
                        "start": "12:30",
                        "end": "21:15"
                    },
                    "friday": {
                        "start": "06:45",
                        "end": "15:15"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }   
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105f9"),
                "role": "doctor",
                'PESEL': "83022993718",
                'login': 'eve63',
                'firstName': 'Eva',
                'lastName': 'Limone',
                'gender': 'female',
                'age': 62,
                'phone': '+48 773456789',
                'email': 'evee@gmail.com',
                'address': {
                    'street': 'Limonkowa 24',
                    'postcode': '35-083',
                    'city': 'Floryda'
                },
                'specializations': [{'specialization':'ginekolog'}],
                "workingHours": {
                    "monday": {
                        "start": "11:00",
                        "end": "18:00"
                    },
                    "tuesday": {
                        "start": "12:00",
                        "end": "17:30"
                    },
                    "wednesday": {
                        "start": "16:00",
                        "end": "21:15"
                    },
                    "thursday": {
                        "start": "13:30",
                        "end": "20:00"
                    },
                    "friday": {
                        "start": "07:00",
                        "end": "15:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }  
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105fa"),
                "role": "doctor",
                'PESEL': "83022029836",
                'login': 'pawelKrakow',
                'firstName': 'Pawel',
                'lastName': 'Kowalski',
                'gender': 'male',
                'age': 37,
                'phone': '+48 123454755',
                'email': 'pawelKrakow@gmail.com',
                'address': {
                    'street': 'Słowackiego 45',
                    'postcode': '30-083',
                    'city': 'Kraków'
                },
                'specializations': [{'specialization':'kardiolog'}],
                "workingHours": {
                    "monday": {
                        "start": "11:00",
                        "end": "15:00"
                    },
                    "tuesday": {
                        "start": "07:00",
                        "end": "15:30"
                    },
                    "wednesday": {
                        "start": "07:15",
                        "end": "15:15"
                    },
                    "thursday": {
                        "start": "13:30",
                        "end": "22:00"
                    },
                    "friday": {
                        "start": "09:00",
                        "end": "14:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            },
            {
                 "_id" : new ObjectId("59afe927b0161155c8f105fb"),
                "role": "doctor",
                'PESEL': "83736514618",
                'login': 'leo_z_tarnowa',
                'firstName': 'Leopold',
                'lastName': 'Brzytwa',
                'gender': 'male',
                'age': 31,
                'phone': '+48 133456789',
                'email': 'leo@gmail.com',
                'address': {
                    'street': 'Ładna 11',
                    'postcode': '35-283',
                    'city': 'Tarnów'
                },
                'specializations': [{'specialization':'kardiolog'}],
                "workingHours": {
                    "monday": {
                        "start": "08:00",
                        "end": "15:00"
                    },
                    "tuesday": {
                        "start": "07:00",
                        "end": "15:30"
                    },
                    "wednesday": {
                        "start": "12:00",
                        "end": "18:15"
                    },
                    "thursday": {
                        "start": "14:30",
                        "end": "21:00"
                    },
                    "friday": {
                        "start": "15:15",
                        "end": "21:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            },
            {
                 "_id" : new ObjectId("59afe927b0161155c8f105fc"),
                "role": "doctor",
                'PESEL': "83000982218",
                'login': 'doktorro',
                'firstName': 'Pedro',
                'lastName': 'El Gonzalez',
                'gender': 'male',
                'age': 49,
                'phone': '+18 773234789',
                'email': 'doktorro@gmail.com',
                'address': {
                    'street': 'Naczosów 23',
                    'postcode': '25-083',
                    'city': 'Cancun'
                },
                'specializations': [{'specialization':'okulista'}, {'specialization':'laryngolog'}],
                "workingHours": {
                    "monday": {
                        "start": "09:00",
                        "end": "14:00"
                    },
                    "tuesday": {
                        "start": "11:00",
                        "end": "17:30"
                    },
                    "wednesday": {
                        "start": "08:15",
                        "end": "14:15"
                    },
                    "thursday": {
                        "start": "14:30",
                        "end": "21:00"
                    },
                    "friday": {
                        "start": "09:00",
                        "end": "13:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            },
            {
                "_id" : new ObjectId("59afe927b0161155c8f105fd"),
                "role": "doctor",
                'PESEL': "11922114618",
                'login': 'medicziKasia',
                'firstName': 'Katarzyna',
                'lastName': 'Medycejska',
                'gender': 'female',
                'age': 39,
                'phone': '+48 73131789',
                'email': 'mediczi@gmail.com',
                'address': {
                    'street': 'Paryska 55',
                    'postcode': '15-0443',
                    'city': 'Florencja'
                },
                'specializations': [{'specialization':'stomatolog'}],
                "workingHours": {
                "monday": {
                        "start": "11:00",
                        "end": "15:00"
                    },
                    "tuesday": {
                        "start": "17:00",
                        "end": "21:30"
                    },
                    "wednesday": {
                        "start": "08:00",
                        "end": "15:15"
                    },
                    "thursday": {
                        "start": "12:30",
                        "end": "18:00"
                    },
                    "friday": {
                        "start": "12:15",
                        "end": "17:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            },
            {
                "_id": new ObjectId("59afa368d5a0c31db44b572f"),
                "role": "doctor",
                'PESEL': "89927114618",
                'login': 'lolek',
                'firstName': 'Leonidas',
                'lastName': 'Włodarczyk',
                'gender': 'male',
                'age': 65,
                'phone': '+18 973346789',
                'email': 'lolek@gmail.com',
                'address': {
                    'street': 'Fiołkowa 13',
                    'postcode': '45-033',
                    'city': 'Gdańsk'
                },
                'specializations': [{'specialization':'chirurg'}, {'specialization':'od uszów'}],
                "workingHours": {
                "monday": {
                        "start": "07:00",
                        "end": "14:00"
                    },
                    "tuesday": {
                        "start": "07:15",
                        "end": "15:30"
                    },
                    "wednesday": {
                        "start": "08:00",
                        "end": "12:15"
                    },
                    "thursday": {
                        "start": "11:30",
                        "end": "16:00"
                    },
                    "friday": {
                        "start": "13:15",
                        "end": "21:00"
                    },
                    "saturday": {
                        "start": "",
                        "end": ""
                    },
                    "sunday": {
                        "start": "",
                        "end": ""
                    }
                }
            }
        ]),
        mongoSchedule.insertElements([
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 31,
                    "hour": "08:00"
                },
                "patient": {
                    "login": "patient",
                    "description": "strzała w kolano"
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 31,
                    "hour": "10:00"
                },
                "patient": {
                    "login": "wpiszLogin",
                    "description": "L4"  
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 1,
                    "hour": "13:30"
                },
                "patient": {
                    "login": "synJacka",
                    "description": "złamałem nogę przez nie uwagę"
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 4,
                    "hour": "09:15"
                },
                "patient": {
                    "login": "Hulk",
                    "description": "napromieniowało mnie"  
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 4,
                    "hour": "09:30"
                },
                "patient": {
                    "login": "Mark",
                    "description": "L4"  
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 4,
                    "hour": "13:45"
                },
                "patient": {
                    "login": "Robinio",
                    "description": "L4"  
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 5,
                    "hour": "11:15"
                },
                "patient": {
                    "login": "Jess",
                    "description": "a tak z nudów"  
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 5,
                    "hour": "09:15"
                },
                "patient": {
                    "login": "Heisenberg",
                    "description": "odbior wynikow badania"  
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 5,
                    "hour": "13:45"
                },
                "patient": {
                    "login": "Jesse",
                    "description": "wypadek przy pracy"  
                }
            },
            {
                "login": "doctor",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 21,
                    "hour": "13:45"
                },
                "patient": {
                    "login": "SpeedyGonzales",
                    "description": "koncza się speed-tabsy doktorze"
                }
            },
            {
                "login": "lolek",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 25,
                    "hour": "13:15"
                },
                "patient": {
                    "login": "Heisenberg",
                    "description": "prześwietlenie ucha"
                }
            },
            {
                "login": "lolek",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 25,
                    "hour": "15:45"
                },
                "patient": {
                    "login": "SpeedyGonzales",
                    "description": "zdjęcie gipsu"
                }
            },
            {
                "login": "lolek",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 24,
                    "hour": "12:45"
                },
                "patient": {
                    "login": "Jesse",
                    "description": "zdjęcie szwów z rozciętego łuku brwiowego"
                }
            },
            {
                "login": "doktorBezUprawnien",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 24,
                    "hour": "18:30"
                },
                "patient": {
                    "login": "Jesse",
                    "description": "sprawdzenie kości czaszki"
                }
            },
            {
                "login": "doktorBezUprawnien",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 24,
                    "hour": "19:15"
                },
                "patient": {
                    "login": "Hulk",
                    "description": "naprawa kości po walce ze złem"
                }
            },
            {
                "login": "doktorBezUprawnien",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 30,
                    "hour": "09:15"
                },
                "patient": {
                    "login": "synJacka",
                    "description": "naprawa całości"
                }
            },
            {
                "login": "Brooke",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 30,
                    "hour": "12:15"
                },
                "patient": {
                    "login": "synJacka",
                    "description": "choroba afrykańska(?)"
                }
            },
            {
                "login": "Brooke",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 31,
                    "hour": "17:45"
                },
                "patient": {
                    "login": "synJacka",
                    "description": "choroba afrykańska(?)"
                }
            },
            {
                "login": "Brooke",
                "date": {
                    "year":2017,
                    "month": 8,
                    "day": 31,
                    "hour": "20:15"
                },
                "patient": {
                    "login": "synJacka",
                    "description": "choroba afrykańska(?)"
                }
            },
            {
                "login": "Brooke",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 4,
                    "hour": "18:30"
                },
                "patient": {
                    "login": "synJacka",
                    "description": "choroba afrykańska(?)"
                }
            },
            {
                "login": "Brooke",
                "date": {
                    "year":2017,
                    "month": 9,
                    "day": 25,
                    "hour": "14:30"
                },
                "patient": {
                    "login": "Jesse",
                    "description": "choroba afrykańska(?)"
                }
            },
        ])
    ]);
    return new Promise(resolve => resolve(result));
}
