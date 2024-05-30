import React from 'react'
const Dropdown = React.lazy(() => import('../../dropdown/DropDrown'));
const Label = React.lazy(() => import('../../label/Label'));
const ValidationText = React.lazy(() => import('../validation/ValidationText.js'))


const FormSelectField = ({
  name,
  value,
  error,
  options,
  onChange,
  dataField,
  labelName,
  placeholder,
  formSetting,
  isMultiSelect,
  onValidation,
  fieldSetting,
  ...selectFormFieldProps
}) => {

  const handleChange = (selectedOption) => {
    if (onChange) {
      if (isMultiSelect) {
        const selectedValues = selectedOption.map((option) => option.value);
        onChange(dataField, selectedValues)
      }
      else {
        onChange(dataField, selectedOption)
      }
    }
  }

  const handleOnBlur = () => {
    if (onValidation) {
      onValidation(dataField)
    }
  }

  return (
    <>
      <div className='input-label-part'>
        {labelName && labelName !== "" && (
          <Label labelName={labelName} isRequired={selectFormFieldProps.isRequired} />
        )}
        <Dropdown
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleOnBlur}
          options={options}
          value={value}
          isMultiSelect={isMultiSelect}
          isDisabled={formSetting?.isViewOnly || selectFormFieldProps.isDisabled}
          {...selectFormFieldProps}
        />
      </div>
      <ValidationText error={error || ""} />
    </>
  )
}

export default FormSelectField;