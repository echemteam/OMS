import React, { Suspense } from 'react'

const Dropdown = React.lazy(() => import('../../ui/customdropdown/Dropdown'));
const Label = React.lazy(() => import('../../ui/label/Label'));
const ValidationText = React.lazy(() => import('../../ui/inputs/validation/ValidationText.js'))


const FormCustomSelectField = ({
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
  fieldActions,
  overRideProps,
  isRequired,
  dropDownSettings,
  inputButtonGroup,
  ...selectFormFieldProps
}) => {

  const handleChange = (selectedOption) => {
    if (onChange) {
      const value = isMultiSelect ? selectedOption.map((option) => option.value) : selectedOption;
      onChange(dataField, value);
    
      if (fieldActions && selectFormFieldProps?.isEnableOnChange) {
        fieldActions('DDL_CHANGED', dataField, selectedOption);
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
          <Label labelName={labelName} isRequired={isRequired} />
        )}
        {selectFormFieldProps.hasMainTitle ?
          <div className="section-title">
            <h5>{selectFormFieldProps.hasMainTitle}</h5>
          </div>
          : ""}
        <Suspense fallback={<div>Loading...</div>}>
          <Dropdown
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleOnBlur}
            options={options}
            value={value}
            isMultiSelect={isMultiSelect}
            isDisabled={formSetting?.isViewOnly || selectFormFieldProps?.isDisable || overRideProps?.isDisable}
            dropDownSettings={dropDownSettings}
            inputButtonGroup={inputButtonGroup}
            {...selectFormFieldProps}
          />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ValidationText error={error || ""} />
      </Suspense>
    </>
  )
}

export default FormCustomSelectField;