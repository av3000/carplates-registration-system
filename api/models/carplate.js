const mongoose = require("mongoose");
const PLATE_SYMBOLS_TOTAL = 6;
const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;

const carplateSchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true,
        unique: true,
        maxlength: PLATE_SYMBOLS_TOTAL,
        minlength: PLATE_SYMBOLS_TOTAL
    },
    name: {
        type: String,
        required: true,
        maxlength: OWNER_NAME_MAX_LENGTH,
        minlength: OWNER_NAME_MIN_LENGTH
    }
    
}, { timestamps: true });

const Carplate = mongoose.model("Carplate", carplateSchema);

module.exports = Carplate;