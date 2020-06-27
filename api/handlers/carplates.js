const db = require("../models");
const PLATE_SYMBOLS_TOTAL = 6;
const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;

exports.storeCarplate = async function(req, res, next) {
    try {
        let error = {};
        let validatedBody = {};

        if( !req.body.plate || !req.body.name){
            error.message = "All fields are required.";
            error.status = 400;
            return next(error);
        }
        
        validatedBody = validateRequestPlate(validatedBody, req.body.plate, next);
        validatedBody = validateRequestName(validatedBody, req.body.name, next);

        let duplicateCarplate = await db.Carplate.findOne({ "plate": validatedBody.plate });

        if(duplicateCarplate){
            error.message = "Plate numbers are taken.";
            error.status = 400;
            return next(error);
        }

        let carplate = await db.Carplate.create(validatedBody);
        let { id, plate, name, createdAt } = carplate;

        return res.status(200).json({
            id, plate, name, createdAt
        });
    } catch (error) {
        if(error.code === 11000) {
            error.message = "Sorry, creation has failed.";
        }

        return next(error);
    }
};

exports.getCarplate = async function(req, res, next) {
    try {
        let carplate = await db.Carplate.find({ "_id": req.params.carplate_id });
        
        return res.status(200).json(carplate);
    } catch(error) {
        return next(error);
    }
};

exports.deleteCarplate = async function(req, res, next) {
    try {
        console.log(req.params);
        let foundCarplate = await db.Carplate.findById({ "_id": req.params.carplate_id });
        await foundCarplate.remove();

        return res.status(200).json(foundCarplate);
    } catch (error) {
        return next(error);
    }
};

exports.getAllCarplates = async function(req, res, next) {
    try {
        let carplates = await db.Carplate.find().sort({ createdAt: "desc"});

        return res.status(200).json(carplates);
    } catch (error) {
        return next(error);
    }
};

exports.updateCarplate = async function(req, res, next) {
    try {
        console.log("REQUEST BODY: ");
        console.log(req.body);
        let validatedBody = {};
        
        if(req.body.plate) {
            validatedBody = validateRequestPlate(validatedBody, req.body.plate, next);
        }

        if(req.body.name){
            validatedBody = validateRequestName(validatedBody, req.body.name, next);
        }

        console.log("VALIDATED BODY: ")
        console.log(validatedBody);
        let oldCarplate =  await db.Carplate.findById({ "_id": req.params.carplate_id });

        await db.Carplate.findByIdAndUpdate(req.params.carplate_id, {
            plate: validatedBody.plate || oldCarplate.plate,
            name: validatedBody.name || oldCarplate.name
        });

        let updatedCarplate =  await db.Carplate.findById({ "_id": req.params.carplate_id });

        return res.status(200).json( updatedCarplate );
    } catch(error) {
        return next(error);
    }
};

// Helper functions

function regexValidateOnlyLetters(string)
{
    return (/^[a-zA-Z]+$/).test(string);
};

function lettersAreAllNonDigits(str){
    for(let i=0; i<str.length; i++){
        console.log("current: " + str[i] + " and parsed: " + parseInt(str[i]));
        if( isNaN(parseInt(str[i])) === false  || regexValidateOnlyLetters(str[i]) === false) {
            console.log("bad letter")
            return false;
        }
    }

    return true;
};

function validateRequestName(validatedBody, name, next)
{
    let error = {};

    if(name.length >= OWNER_NAME_MIN_LENGTH && name.length <= OWNER_NAME_MAX_LENGTH){
        if(regexValidateOnlyLetters(name)){
            validatedBody.name = name;
        }
        else {
            error.message = "Name must contain only letters.";
            error.status  = 400;
            return next(error);
        }
    }
    else {
        error.message = "Name length has to be from 3 to 30 symbols.";
        error.status  = 400;
        return next(error);
    }

    return validatedBody;
};

function validateRequestPlate(validatedBody, plate, next)
{
    let error = {};

    if(plate.length === PLATE_SYMBOLS_TOTAL) 
    {
        let plateLetters = parseInt( plate.substring(0, 3));
        let plateDigits  = parseInt( plate.substring(3, 6));
        let areLetters = lettersAreAllNonDigits(plate.substring(0, 3));

        if( 
            (!isNaN(plateDigits) && plateDigits.toString().length === 3)
            &&
            (isNaN(plateLetters) && areLetters)
          )
        {   
            validatedBody.plate = plate.substring(0, 3).toUpperCase() + plate.substring(3, 6).toString();
        }
        else {
            error.message = "Plate structure consists of 3 letters and 3 numbers. ex: AAA111 ";
            error.status = 400;
            return next(error);
        }
    }
    else {
        error.message = "Plate length has to be 6 symbols.";
        error.status = 400;
        return next(error);
    }

    return validatedBody;
};