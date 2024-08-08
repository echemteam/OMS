import React from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS
const Label = React.lazy(() => import('../../label/Label'));
const ValidationText = React.lazy(() => import('../validation/ValidationText'));
const DatePicker = React.lazy(() => import('../datePicker/DatePicker'));

const FormDatePickerFields = ({
    labelName,
    name,
    onChange,
    onValidation,
    dataField,
    placeholder,
    selectedDate,
    error,
    formSetting,
    ...datePickerProps
}) => {
    const handleDateChange = (date) => {
        if (onChange) {
            onChange(dataField, date);
        }
    };

    const handleDatePickerBlur = () => {
        if (onValidation) {
            onValidation(dataField)
        }

        // if (onValidation) {
        //     if (!selectedDate && error) {
        //         onValidation(dataField, error);
        //     }
        //     else {
        //         onValidation(dataField, "");
        //     }
        // }
    };

    return (
        <>
            <div className="date-picker-label-part">
                <div className="col-md-12">
                    <div className="input-label-part">
                        {labelName && labelName !== "" && (
                            <Label labelName={labelName} isRequired={datePickerProps.isRequired} />
                        )}
                    </div>
                </div>
                <DatePicker
                    label={labelName}
                    id={name}
                    selected={selectedDate}
                    name={name}
                    placeholder={placeholder}
                    className="datepicker-field"
                    onChange={handleDateChange}
                    onBlur={handleDatePickerBlur}
                    isDisable={formSetting?.isViewOnly || datePickerProps?.isDisable}
                    {...datePickerProps}
                />
            </div>
            <ValidationText error={error || ""} />
        </>
    );
};
FormDatePickerFields.propTypes = {
    labelName: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onValidation: PropTypes.func,
    dataField: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    selectedDate: PropTypes.instanceOf(Date),
    error: PropTypes.string,
    formSetting: PropTypes.shape({
        isViewOnly: PropTypes.bool,
    }),
    ...DatePicker.propTypes,
};
export default FormDatePickerFields;
