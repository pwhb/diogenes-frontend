import { Schema, model, models } from 'mongoose'


const clientConfigSchema = new Schema({

}, { strict: false, timestamps: false })

export default models.ClientConfig || model('ClientConfig', clientConfigSchema)