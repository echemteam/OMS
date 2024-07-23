import React, { useState } from 'react';

// utils.js
export const localStringToNumber = (s) => {
    return Number(String(s).replace(/[^0-9.,-]+/g, ""));
};

export const formatCurrency = (value, currencyCode) => {
    const options = {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    return value.toLocaleString(undefined, options);
};

export const formatPercentage = (value) => {
    const options = {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    return (value / 100).toLocaleString(undefined, options);
};


const Masking = ({ type, currencyCode, maxLength }) => {

    const [value, setValue] = useState('');
    // const currencyCode = currencyCode; // Currency code for Indian Rupee, adjust as needed

    const localStringToNumber = (s) => {
        return Number(String(s).replace(/[^0-9.,-]+/g, ""));
    };

    const handleFocus = (e) => {
        // Convert the value to a number when the input is focused
        setValue(value ? localStringToNumber(value) : '');
    };

    const handleBlur = (e) => {
        const value = e.target.value;
        const options = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        if (type === 'currency') {
            options.style = 'currency';
            options.currency = currencyCode;
            options.currencyDisplay = 'symbol';
            setValue((value || value === 0) ? localStringToNumber(value).toLocaleString(undefined, options) : '');
        } else if (type === 'percent') {
            options.style = 'percent';
            setValue((value || value === 0) ? (localStringToNumber(value) / 100).toLocaleString(undefined, options) : '');
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={value}
                placeholder={type === 'percent' ? '00.00%' : '$00.00'}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                maxLength={maxLength}
                style={{
                    padding: '10px',
                    font: '20px Arial',
                    width: '70%',
                }}
            />

            {/* <InputMask
                value={value}
                onChange={handleChange}
                mask="99.99"
                placeholder="00.00"
                formatChars={{
                    '9': '[0-9]',
                }}
            >
                {(inputProps) => <input {...inputProps} type="text" />}
            </InputMask>
            <br />
            <label>Fl no</label>:
            <InputMask
                mask="9999"
                placeholder="0000"
                formatChars={{
                    '9': '[0-9]',
                }}
            >
                {(inputProps) => <input {...inputProps} type="text" />}
            </InputMask> */}
        </div>
    );
};

export default Masking;
