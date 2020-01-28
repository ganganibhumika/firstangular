export class ValidationService {

    AMOUNTPOINTRIGHT = 2;
    RATELEFT = 10;
    EIGHT_DIGIT = 10;
    Pos = 0;
    DISCOUNT_DIGIT = 2;

    PATTERN_FOR_EMAIL = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
    PATTERN_FOR_PHONE_NO = '^[0-9]{10,13}$';
    PATTERN_FOR_NUMBER = '^[0-9]*$';
    MESSAGE_FOR_NO_RECORDS_FOUND = 'No Records found.';
    /**registration message */
    FRIST_NAME_IS_REQUIRD = 'Please enter first name.';
    LAST_NAME_IS_REQUIRD = 'Please enter last name.';
    EMAIL_IS_REQUIRD = 'Please enter email.';
    MOBILE_NO_IS_REQUIRD = 'Please enter mobile number.';
    MTR_MANAGER_IS_REQUIRD = 'Please select account manager.';
    COMPANY_TYPE_IS_REQUIRD = 'Please select company type.';
    COMPANY_NAME_IS_REQUIRD = 'Please enter company name.';
    COUNTRY_IS_REQUIRD = 'Please select country.';
    CRRENCY_IS_REQUIRD = 'Please select currency.';
    COMPANY_ADDRESS_IS_REQUIRD = 'Please enter company address.';
    VALID_EMAIL = 'Please enter valid email.';
    VALID_MOBILE_NO = 'Please enter valid mobileno.';

    /** login */
    USER_NAME_IS_REQUIRED = 'Please enter your email.';
    PASSWORD_IS_REQUIRED = 'Please enter password.';

    /**account manager */
    MANAGER_NAME_IS_REQUIRD = 'Please enter manager name.';

    /**site setting */
    SITE_NAME_IS_REQUIRD = 'Please enter site name.';
    CURRENCY_IS_REQUIRD = 'Please enter curreny.';
    OFFER_DISCOUNT_IS_REQUIRD = 'Please enter offer discount.';
    VAID_IS_CURRENCY = 'Please enter valid currency.';
    VAID_IS_OFFER_DISCOUNT = 'Please enter valid offer discount.';

    // template setting
    TEMPLATE_NAME_REQUIRED = 'Please Enter Template Name';
    TEMPLATE_DESCRIPTION_REQUIRED = 'Please Enter Template Description';
    TEMPLATE_STATUS_REQUIRED = 'Please Select Template Status';

    PASSWORD_DOESNOT_MATCH = 'Password and confirm password does not match';
    OLD_PASSWOD_REQUIRED = 'Please enter old password';
    NEW_PASSWOD_REQUIRED = 'Please enter new password';
    CONFIRM_PASSWOD_REQUIRED = 'Please enter confirm password';
    
    REGSITRATION_NO_REQUIRED = 'Please enter Registration No.';
    VAT_NO_REQUIRED = 'Please enter VAT No.';


    checkPasswordStrength(password: string) {
        console.error(password);
        if (!password) {
            return;
        }

        //Regular Expressions.
        var regex = new Array();
        regex.push("[A-Z]"); //Uppercase Alphabet.
        regex.push("[a-z]"); //Lowercase Alphabet.
        regex.push("[0-9]"); //Digit.
        regex.push("[$@$!%*#?&]"); //Special Character.

        var passed = 0;

        //Validate for each Regular Expression.
        for (var i = 0; i < regex.length; i++) {
            if (new RegExp(regex[i]).test(password)) {
                passed++;
            }
        }

        //Validate for length of Password.
        if (passed > 2 && password.length > 8) {
            passed++;
        }

        //Display status.
        var color = "";
        var strength = "";
        switch (passed) {
            case 0:
            case 1:
                strength = "Weak";
                color = "red";
                break;
            case 2:
                strength = "Good";
                color = "darkorange";
                break;
            case 3:
            case 4:
                strength = "Strong";
                color = "green";
                break;
            case 5:
                strength = "Very Strong";
                color = "darkgreen";
                break;
        }
        return { strength: strength, color: color };
    }

    getTextboxValue(getText, event1, eventKeyCode, maximum, decimalPoint) {
        let pattern;
        const name = getText.value;
        if (decimalPoint === 0) {
            pattern = /[0-9]+/;
        } else {
            pattern = /[0-9\+.]/;
        }

        let setLength = maximum;
        let setLen;
        if (name.indexOf('-') !== -1) {
            setLength = maximum + 1;
        } else {
            if (getText.selectionStart || getText.selectionStart === '0') {
                this.Pos = getText.selectionStart;
                if (this.Pos === 0 && name.indexOf('-') === -1 && eventKeyCode === 45) {
                    setLength = maximum + 1;
                } else {
                    setLength = maximum;
                }
            }
        }
        const decimal = decimalPoint + 1;
        const inputChar = String.fromCharCode(eventKeyCode);

        if (eventKeyCode !== 8 && !pattern.test(inputChar)) {
            event1.preventDefault();
        }
        if (eventKeyCode === 46) {
            if (name.indexOf('.') === -1) {
                getText.maxLength = name.length + decimal;
            } else {
                getText.maxLength = setLength;
                if (setLength !== name.length) {
                    getText.maxLength = name.length;
                }
            }
        } else {
            if (name.indexOf('.') === -1) {
                getText.maxLength = setLength;
            } else {
                getText.maxLength = setLength;
                const lengthOfFristIndex = name.split('.')[0].length;
                const lengthOfLatsIndex = name.split('.')[1].length;
                getText.maxLength = lengthOfFristIndex + decimal;
                if (getText.selectionStart || getText.selectionStart === '0') {
                    this.Pos = getText.selectionStart;
                    if (
                        this.Pos <= lengthOfFristIndex &&
                        lengthOfFristIndex <= setLength
                    ) {
                        if (lengthOfFristIndex === setLength) {
                            setLen = lengthOfFristIndex + lengthOfLatsIndex + 1;
                            getText.maxLength = setLen;
                        } else {
                            setLen =
                                name.length -
                                1 +
                                (setLength - lengthOfFristIndex) +
                                (decimal - lengthOfLatsIndex);
                            getText.maxLength = setLen;
                        }
                    }
                }
            }
        }
    }

    checkgetText(textValue, maxLength, decimalPoint) {
        const getText = textValue.value;
        getText && getText.indexOf('.') === 0 ? (textValue.value = 0) : '';
        getText && getText.indexOf('-') !== -1 ? (maxLength = maxLength + 1) : '';
        getText &&
            getText.indexOf('.') !== -1 &&
            getText.split('.')[1].length > decimalPoint
            ? (textValue.value = getText.slice(
                0,
                getText.indexOf('.') + 1 + decimalPoint
            ))
            : '';
        getText && getText.indexOf('.') === -1 && getText.length > maxLength
            ? (textValue.value = getText.slice(0, maxLength))
            : '';
        if (
            getText &&
            getText.split('.')[0].length === 0 &&
            getText.split('.')[1].length !== 0
        ) {
            textValue.value = 0 + getText;
        }
    }

}