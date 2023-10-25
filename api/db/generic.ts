const { mongoose } = require("mongoose");

export default class MongoModel {
    model: any;
    constructor(name: string, schema: mongoose.Schema){
        this.model = mongoose.model(name, schema) 
    }
    async byId(id: string): Promise<MongoModel> {
        return await this.model.find({id})
    }
    async byPropertyName(propertyName: string, value: any): Promise<MongoModel> {
        return await this.model.find({propertyName: value})
    }
    async all(){
        return await this.model.find({})
    }
    async _save(content: Object){
        const newEntry = new this.model(content)
        const res = await newEntry.save()
        return res
    }
}
