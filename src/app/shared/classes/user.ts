export class User {
    _id: string;
    login: string;
    password: string;
    role: string;
}

export class UserDetails {
    _id: string;
    role = "doctor";
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    PESEL: number;
    gender: string;
    age: number;
    phone: string;
    email: string;
    address = {
        street: '',
        postcode: '',
        city: ''
    }
    workingHours = {
        monday: {
            start: '',
            end: ''
        },
        tuesday: {
            start: '',
            end: ''
        },
        wednesday: {
            start: '',
            end: ''
        },
        thursday: {
            start: '',
            end: ''
        },
        friday: {
            start: '',
            end: ''
        }
    }

        constructor(_id, login, password, firstName, lastName, PESEL, gender, age, phone, email, street, postcode, city) {
        this._id=_id;
        this.login = login;
        this.password = password;
        this.firstName = name;
        this.lastName = name;
        this.PESEL = PESEL;
        this.gender = gender;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.address.street = street;
        this.address.postcode = postcode;
        this.address.city = city;
    }
}