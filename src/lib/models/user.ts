import { Schema, model, models } from 'mongoose'


const userSchema = new Schema({

}, { strict: false, timestamps: false })

export default models.User || model('User', userSchema)