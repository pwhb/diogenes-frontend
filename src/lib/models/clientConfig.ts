import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const clientConfigSchema = new Schema({}, { strict: false, timestamps: false });

export default models.ClientConfig || model('ClientConfig', clientConfigSchema);
