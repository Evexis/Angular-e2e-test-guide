import { MongoCollection } from '../../mongo/mongo';

class Mongo {
    private collectionUsers = 'Users';
    private collectionUsersDetails = 'UsersDetails';
    private collectionSchedule = 'Schedule';
    mongoSchedule: MongoCollection;
    mongoUsersDetails: MongoCollection;
    mongoUsers: MongoCollection;

    constructor(url: string) {
        this.mongoUsers = new MongoCollection(url, this.collectionUsers);
        this.mongoUsersDetails = new MongoCollection(url, this.collectionUsersDetails);
        this.mongoSchedule = new MongoCollection(url, this.collectionSchedule);
    }
}

export const mongo = new Mongo('mongodb://localhost:27017/DoktorkiDB');