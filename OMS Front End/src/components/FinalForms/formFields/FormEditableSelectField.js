import React from 'react';
const Label = React.lazy(() => import('../ui/label/Label'));
const ValidationText = React.lazy(() => import('../ui/validation/ValidationText'));
const EditableDropdown = React.lazy(() => import('../ui/inputs/editableDropdown/EditableDropdown'));

const FormEditableSelectField = ({
    keyId,
    dataField,
    labelName,
    name,
    type,
    value,
    error,
    formSetting,
    formData,
    overRideProps,
    isRequired,
    fieldSetting,
    onChange,
    onValidation,
    onBlur,
    ...otherProps
}) => {

    const handleInputChange = (e, fieldType, selectedValue) => {
        if (onChange) {
            if (fieldType === "input") {
                onChange(dataField, { text: e.target.value, isNew: true });
            } else if (fieldType === "dropdown") {
                onChange(dataField, selectedValue.value);
            }
        }
    };
   
    const handleOnBlur = () => {
        onBlur(dataField)
      };
    return (
        <>
            <div className="input-label-part">

            {labelName && labelName !== "" && (
          <Label labelName={labelName} isRequired={isRequired} htmlFor={name}/>
        )}
        {fieldSetting?.subTitle ?
          <div className={`"section-title" `}>
            <h5>{fieldSetting.subTitle}</h5>
          </div>
          : ""}
                <EditableDropdown
                    name={name}
                    options={fieldSetting?.options}
                    dataField={dataField}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    value={value}
                    placeholder={fieldSetting.placeholder}
                    isText={otherProps.isText}
                    {...otherProps}
                />
            </div>
            <ValidationText error={error || ""} />
        </>
    )
}

export default FormEditableSelectField