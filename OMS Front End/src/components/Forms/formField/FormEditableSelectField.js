import React from 'react';
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

export default FormEditableSelectField