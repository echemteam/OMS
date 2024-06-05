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
  fieldActions,
  ...selectFormFieldProps
}) => {

  const handleChange = (selectedOptionValues , selectedOption) => {
      if (onChange) {
          if (isMultiSelect) {
              const selectedValues = selectedOptionValues.map((option) => option.value);
              onChange(dataField, selectedValues)
              if (fieldActions) {
                  fieldActions('DDL_CHANGED', dataField, selectedOption);
                }
          }
          else {
              onChange(dataField, selectedOptionValues)
              if (fieldActions) {
                  fieldActions('DDL_CHANGED', dataField, selectedOptionValues);
                }
          }
      }
  }

  const handleOnBlur = () => {
      if (onValidation) {
          onValidation(dataField);
      }
  };


  return (
      <>
      <div className='input-label-part'>
        {labelName && <Label labelName={labelName} />}
        <Suspense fallback={<div>Loading...</div>}>
          <Dropdown
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleOnBlur}
            options={options}
            value={value}
            isMultiSelect={isMultiSelect}
            isDisabled={formSetting?.isViewOnly || selectFormFieldProps.isDisabled}
            {...selectFormFieldProps}
            dataField={dataField}
          />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ValidationText error={error || ""} />
      </Suspense>
    </>
  )
}

export default FormSelectField;