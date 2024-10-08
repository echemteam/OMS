import React, { useCallback } from "react";
import PropTypes from "prop-types";
import debounce from 'lodash/debounce';

const PhoneInput = React.lazy(() => import("../ui/inputs/phoneInput/PhoneInput.js"));
const Label = React.lazy(() => import('../ui/label/Label'));
const ValidationText = React.lazy(() => import('../ui/validation/ValidationText.js'));

const FormPhoneInputField = ({
    labelName,
    name,
    onChange,
    onValidation,
    dataField,
    error,
    formSetting,
    fieldSetting,
    overRideProps,
    onBlure,
    ...inputProps
}) => {

    console.log(fieldSetting?.defaultCountry);

    const debouncedOnChange = useCallback(
        debounce((dataField, value) => {
            onChange(dataField, value);
        }, fieldSetting?.debounceTime || 10),
        [onChange]
    );

    const handleInputChange = (value) => {
        if (onChange) {
            debouncedOnChange(dataField, value);
        };
    }

    const handleOnBlur = () => {
        onBlure(dataField);
    };

    return (
        <>
            <div className="input-field-sec phone-input">
                {inputProps.hasMainTitle &&
                    <div className="section-title">
                        <h5>{inputProps.hasMainTitle}</h5>
                    </div>
                }
                <div className="input-label-part">
                    {labelName && (<Label labelName={labelName} htmlFor={name} />)}
                    <PhoneInput
                        {...inputProps}
                        onChange={handleInputChange}
                        onBlur={handleOnBlur}
                        isDisable={formSetting?.isViewOnly || inputProps?.isDisable || overRideProps?.isDisable}
                        defaultCountry={fieldSetting?.defaultCountry}
                    />
                    <ValidationText error={error || ""} />
                </div>
            </div>
        </>
    );
};

FormPhoneInputField.propTypes = {
    labelName: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlure: PropTypes.func,
    onValidation: PropTypes.func,
    dataField: PropTypes.string.isRequired,
    error: PropTypes.string,
    formSetting: PropTypes.shape({
        isViewOnly: PropTypes.bool
    }),
    overRideProps: PropTypes.shape({
        isDisable: PropTypes.bool
    }),
    inputProps: PropTypes.shape({
        hasMainTitle: PropTypes.string,
        isDisable: PropTypes.bool
    })
};

export default FormPhoneInputField;
