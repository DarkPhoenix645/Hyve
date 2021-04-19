import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    defaultPrinterName: String,
    userPriority: {
        type: Number,
        required: true,
        default: 1
    }
});

DataSchema.statics.getData = async function (userId) {
    const data = await this.findOne({ userId });
    if (data) { return data };
    return 'EDoesNotExist';
};

DataSchema.methods.update = async function (userId, printer, priority) {
    const result = await mongoose.model('print_settings')
        .findOneAndUpdate(
            { userId: userId }, 
            { defaultPrinterName: printer, userPriority: priority }, 
            { useFindAndModify: false, new: true }
        );
    if (result === null) {
        const doc = await mongoose.model('print_settings').findOne({ userId: userId });
        if (doc === null) { return 'EDoesNotExist' } 
        else { return 'EUnknown' };
    }
    else { return result };
};

const PrintData = mongoose.model('print_settings', DataSchema);

export default PrintData;