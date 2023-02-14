const {ObjectId} = require ('mongodb')
const { getDatabase } = require('../config/mongoConnection')
const bcrypt = require ('bcrypt')

class User{
    static async find(){
        try {
            let db = getDatabase()
            let userCollection = await db.collection('User')
            let data = await userCollection.find().toArray()
            return data
        } catch (error) {
            console.log(error)
        }
    }
    static async findbypk(id){
        try {
            let db = getDatabase()
            let userCollection = await db.collection('User')
            let data = await userCollection.findOne({
                _id: ObjectId(id)
            })
            return data
        } catch (error) {
            console.log(erorr)
        }
    }
    static async create(userData){
        try {
            let password = bcrypt.hashSync(userData.password,10)
            userData = {
                username: userData.username,
                email: userData.email,
                password,
                role: userData.role,
                phoneNumber: userData.phoneNumber,
                address: userData.address,
                createdAt: new Date()
            }
            let db = getDatabase()
            let userCollection = await db.collection('User')
            let data = await userCollection.insertOne(userData)
            return data
        } catch (error) {
            console.log(error)
        }
    }
    static async delete(id){
        try {
            let db = getDatabase()
            let userCollection = await db.collection('User')
            let data = await userCollection.deleteOne({
                _id: ObjectId(id)
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = User