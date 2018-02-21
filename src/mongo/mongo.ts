import { MongoClient, ObjectId } from 'mongodb';
import * as assert from 'assert';



export class MongoCollection {
    private collection;
    constructor (private url: string, collectionName ) {
      MongoClient.connect(this.url).then((db) => {
        this.collection = db.collection(collectionName);
        console.log('Connected successfully to server');
      });
    }

    async insertElements(data) {
      const result = await this.collection.insert(data);
      console.log(`Inserted ${data.length} documents into the collection`);
      return new Promise ((resolve) => resolve(result));
    }

    async showElements( sortParam?, limitParam?: number) {
      const result = await this.collection.find({}).sort(sortParam ? sortParam : { lastName: 1, firstName: 1}).limit(limitParam ? limitParam : 0).toArray();
      return new Promise(resolve => resolve(result));
    }

    async findElement(parameter, sortParam?, limitParam?: number) {
      let result;
      if (parameter._id!=undefined) {
        result = await this.collection.find({_id: ObjectId.createFromHexString(parameter._id)}).sort(sortParam ? sortParam : { lastName: 1, firstName: 1}).limit(limitParam ? limitParam : 0).toArray();
      } else {
        result = await this.collection.find(parameter).sort(sortParam ? sortParam : { lastName: 1, firstName: 1}).limit(limitParam ? limitParam : 0).toArray();
      }
      return new Promise(resolve => resolve(result));
    }

    async findElement2(parameter) {
      const result = await this.collection.find({_id: ObjectId.createFromHexString(parameter)}).toArray();
      return new Promise(resolve => resolve(result));
    }

    async updateElement(parameter) {
      let result;
      if (parameter._id!=undefined) {
        const param = await this.collection.find({_id: ObjectId.createFromHexString(parameter._id)}).toArray();
        result = await this.collection.updateOne(param[0], { $set: {
                login: parameter.login,
                date: {
                    year:  +parameter.date.year,
                    month: +parameter.date.month,
                    day: +parameter.date.day,
                    hour: parameter.date.hour,
                },
                patient: {
                    login: parameter.patient.login,
                    description: parameter.patient.description
                } } });
      } else {
        result = await this.collection.updateOne({login: parameter.login}, { $set: parameter });
      }
      return new Promise(resolve => resolve(result));
    }

    async updateAllElements(parameter) {
      const result = await this.collection.updateMany({login: parameter.login}, { $set: parameter });
      return new Promise(resolve => resolve(result));
    }

    async removeElement(parameter) {
       let result;
      if (parameter._id!=undefined) {
        result = await this.collection.deleteOne({_id: ObjectId.createFromHexString(parameter._id)});
      } else {
        result = await this.collection.deleteOne(parameter);
      }
      return new Promise(resolve => resolve(result));
    }

    async removeAllElements(parameter) {
      const result = await this.collection.deleteMany(parameter);
      return new Promise(resolve => resolve(result));
    }

    drop() {
      this.collection.drop();
      return new Promise(resolve => resolve(true));
    }


}
