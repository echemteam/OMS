import React from 'react'

const Dropdown = React.lazy(() => import('../ui/inputs/dropdown/DropDown'));
const Label = React.lazy(() => import('../ui/label/Label'));
const ValidationText = React.lazy(() => import('../ui/validation/ValidationText.js'))


const FormSelectField = ({
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
  fieldActions,
  ...otherProps
}) => {



  const handleChange = (selectedOption) => {
    if (onChange) {
      if (fieldSetting?.isMultiSelect) {
        const selectedValues = selectedOption.map((option) => option.value);
        onChange(dataField, selectedValues)
      }
      else {
        onChange(dataField, selectedOption);
        fieldActions && fieldActions('DDL_CHANGED', dataField, selectedOption);
      }
    }
  }

  const handleOnBlur = () => {
    if (onValidation) {
      onValidation(dataField)
    }
  }

  return (
    <div className='dropdown-label'>
      {console.log('otherProps', otherProps)}
      {console.log('fieldActions', fieldActions)}
      <div className='input-label-part'>
        {labelName && labelName !== "" && (
          <Label labelName={labelName} isRequired={isRequired} />
        )}
        {fieldSetting?.subTittle ?
          <div className={`"section-title" `}>
            <h5>{fieldSetting.subTittle}</h5>
          </div>
          : ""}
        <Dropdown
          isInputField
          placeholder={fieldSetting.placeholder}
          onChange={handleChange}
          onBlur={handleOnBlur}
          options={fieldSetting?.options}
          value={value}
          isMultiSelect={fieldSetting?.isMultiSelect}
          // isDisabled={formSetting?.isViewOnly || selectFormFieldProps?.isDisable || overRideProps?.isDisable}
          isDisabled={formSetting?.isViewOnly || (overRideProps?.isDisable !== false && fieldSetting?.isDisable) || false}
          {...otherProps}
        />
      </div>
      <ValidationText error={error || ""} />
    </div>
  )
}

export default FormSelectField;