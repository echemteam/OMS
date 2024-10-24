import React from "react";
import PropTypes from 'prop-types'; 
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS
const DatePicker = React.lazy(() => import('../../ui/inputs/datePicker/DatePicker'));

const Label = React.lazy(() => import('../../ui/label/Label'));
const ValidationText = React.lazy(() => import('../../ui/inputs/validation/ValidationText.js'))


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
    overRideProps,
    isRequired,
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
                <div className="">
                    <div className="input-label-part">
                        {labelName && labelName !== "" && (
                            <Label labelName={labelName} isRequired={isRequired}  />
                        )}
                    </div>
                    {datePickerProps.hasMainTitle ?
                        <div className="section-title">
                            <h5>{datePickerProps.hasMainTitle}</h5>
                        </div>
                        : ""}
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
                    isDisable={formSetting?.isViewOnly || datePickerProps?.isDisable || overRideProps?.isDisable}
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
    onChange: PropTypes.func,
    onValidation: PropTypes.func,
    dataField: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    selectedDate: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ]),
    error: PropTypes.string,
    formSetting: PropTypes.shape({
        isViewOnly: PropTypes.bool,
    }),
    overRideProps: PropTypes.shape({
        isDisable: PropTypes.bool,
    }),
    isRequired: PropTypes.bool,
    datePickerProps: PropTypes.object, 
};

export default FormDatePickerFields;
