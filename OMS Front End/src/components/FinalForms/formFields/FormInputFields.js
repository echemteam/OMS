import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';  // Correct import


const Input = React.lazy(() => import('../ui/inputs/input/Input'));
const Label = React.lazy(() => import('../ui/label/Label'));
const ValidationText = React.lazy(() => import('../ui/validation/ValidationText'))

const FormInputFields = ({
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
  fieldActions,
  ...otherProps
}) => {



  //TODO : Vaibhav: passed it isReadonly on override and write the code for it.
  // w


  // const [selectValue, setSelectValue] = useState(value);
  const [selectedFile, setSelectedFile] = useState(null);

  const debouncedOnChange = useCallback(
    debounce((dataField, value) => {
      if (otherProps.exemptBoundarySpaces) {
        value = value.trimStart();
      }
      onChange(dataField, value);
      fieldActions && fieldActions('IP_CHANGED', dataField, value);
    }, fieldSetting?.debounceTime ? fieldSetting?.debounceTime : 10), // Adjust the delay as needed
    [onChange]
  );

  const handleInputChange = (e) => {
    if (onChange) {
      if (e.target.type !== 'file') {
        // setSelectValue(e.target.value);
        setSelectedFile(null)
        let newValue = e.target.value;
        debouncedOnChange(dataField, newValue);
      }
      else if (e.target.files[0]) {
        const fileObj = e.target.files[0];
        setSelectedFile(fileObj)
        onChange(dataField, fileObj);
      }
    }
  };

  const handleOnBlur = () => {
    onBlure(dataField)
  };
  //  isDisable={formSetting?.isViewOnly || (overRideProps?.isDisable !== undefined ? overRideProps?.isDisable : fieldSetting?.isDisable) || false}

  return (
    <div className="input-label-part">
      {labelName && labelName !== "" && <Label labelName={labelName} htmlFor={name} isRequired={isRequired} />}
      {fieldSetting?.subTittle ?
        <div className={`"section-title" `}>
          <h5>{fieldSetting.subTittle}</h5>
        </div>
        : ""}
      <div className="input-top-title">
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          filename={selectedFile}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
          isdisable={formSetting?.isViewOnly || (overRideProps?.isDisable !== undefined ? overRideProps?.isDisable : fieldSetting?.isDisable) || false}
          isreadonly={formSetting?.isReadOnly || (overRideProps?.isReadOnly !== undefined ? overRideProps?.isReadOnly : fieldSetting?.isReadOnly) || false}
          {...fieldSetting}
        />
      </div>
      <ValidationText error={error || ""} />
    </div >
  );
};

FormInputFields.propTypes = {
  dataField: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  error: PropTypes.string,
  formSetting: PropTypes.object,
  formData: PropTypes.object,
  overRideProps: PropTypes.object,
  isRequired: PropTypes.bool,
  fieldSetting: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onValidation: PropTypes.func,
  onBlure: PropTypes.func,
};

export default React.memo(FormInputFields);


