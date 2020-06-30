const PLATE_SYMBOLS_TOTAL = 6;
const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;

function regexValidateOnlyLetters(string)
{
    let temp = (/^[a-zA-Z]+$/).test(string);
    return temp;
};

function lettersAreAllNonDigits(str){
    for(let i=0; i<str.length; i++){
        if( isNaN(parseInt(str[i])) === false  || regexValidateOnlyLetters(str[i]) === false) {
            return false;
        }
    }

    return true;
};

exports.validateRequestName = function(validatedBody, name, next)
{
    let error = {};
    
    if(name.length >= OWNER_NAME_MIN_LENGTH && name.length <= OWNER_NAME_MAX_LENGTH){
        if(regexValidateOnlyLetters(name)){
            validatedBody.name = name;
            return validatedBody;
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

};

exports.validateRequestPlate = function(validatedBody, plate, next)
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
            return validatedBody;
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
};
