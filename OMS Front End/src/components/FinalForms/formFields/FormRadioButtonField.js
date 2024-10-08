import React from "react";

const RadioButton = React.lazy(() => import("../ui/inputs/radioButton/RadioButton"));

const Label = React.lazy(() => import('../ui/label/Label'));
const ValidationText = React.lazy(() => import('../ui/validation/ValidationText.js'))

const FormRadioButtonField = ({
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
    onBlure,
    ...otherProps
}) => {

    const handleRadioChange = (event) => {
        if (onChange) {
            onChange(dataField, event.target.value);
        }
    };

    const handleOnBlur = () => {
        onBlure(dataField)
      };
    return (
        <>
            {/* <div className="input-field-sec"> */}
            {fieldSetting?.subTittle ?
                <div className={`"section-title" `}>
                    <h5>{fieldSetting.subTittle}</h5>
                </div>
                : ""}
                <div className="input-label-part">
                    {labelName && labelName !== "" && <Label labelName={labelName} for={name} />}
                    <RadioButton
                        name={name}
                        onChange={handleRadioChange}
                        onBlur={handleOnBlur}
                        dataField={dataField}
                        error={error}
                        formSetting={formSetting}
                        options={fieldSetting?.options}
                        value={value?value:fieldSetting?.defaultOption}
                        isDisable={formSetting?.isViewOnly || fieldSetting?.isDisable || overRideProps?.isDisable}

                        {...fieldSetting}
                    />
                </div>
                <ValidationText error={error || ""} />
            {/* </div> */}
        </>
    );
};

export default FormRadioButtonField;
