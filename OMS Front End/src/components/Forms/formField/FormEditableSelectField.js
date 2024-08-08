import React from 'react';
import PropTypes from 'prop-types';
const Label = React.lazy(() => import('../../ui/label/Label'));
const ValidationText = React.lazy(() => import('../../ui/inputs/validation/ValidationText.js'));
const EditableDropdown = React.lazy(() => import('../../ui/inputs/editableDropdown/EditableDropdown'));

const FormEditableSelectField = ({
    labelName,
    name,
    onChange,
    onValidation,
    dataField,
    error,
    value,
    formSetting,
    options,
    placeholder,
    fieldActions,
    isMultiSelect,
  overRideProps,
    ...oteherProps
}) => {

    const handleInputChange = (e, fieldType, selectedValue) => {
        if (onChange) {
            if (fieldType === "input") {
                onChange(dataField, {text:e.target.value,isNew:true});
            } else if (fieldType === "dropdown") {
                onChange(dataField, selectedValue.value);
            }
        }
    };

   

    const handleOnBlur = () => {
        if (onValidation) {
            onValidation(dataField);
        }
    };

    return (
        <>
            <div className="input-label-part">

                {labelName && labelName !== "" && <Label labelName={labelName} for={name} />}
                <EditableDropdown
                    options={options}
                    dataField={dataField}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    value={value}
                    placeholder={placeholder}
                    isText ={oteherProps.isText}
                    {...oteherProps}
                />
            </div>
            <ValidationText error={error || ""} />
        </>
    )
}
FormEditableSelectField.propTypes = {
    labelName: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onValidation: PropTypes.func,
    dataField: PropTypes.string.isRequired,
    error: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object  
    ]),
    formSetting: PropTypes.shape({
        isViewOnly: PropTypes.bool,
    }),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string
        })
    ),
    placeholder: PropTypes.string,
    fieldActions: PropTypes.func,
    isMultiSelect: PropTypes.bool,
    overRideProps: PropTypes.shape({
        isText: PropTypes.bool,
        isDisable: PropTypes.bool
    }),
    oteherProps: PropTypes.object  
};
export default FormEditableSelectField