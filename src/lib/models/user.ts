import mongoose from 'mongoose'

const { Schema, model, models } = mongoose

const userSchema = new Schema({

}, { strict: false, timestamps: false })

export default models.User || model('User', userSchema)