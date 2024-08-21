import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
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
      <Suspense fallback={<div>Loading...</div>}>
        <ValidationText error={error || ""} />
      </Suspense>
      </div>
    </>
  )
}
FormSelectField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,  
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any, 
    label: PropTypes.string,
  })),
  onChange: PropTypes.func.isRequired,
  dataField: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  placeholder: PropTypes.string,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool,
  }),
  isMultiSelect: PropTypes.bool,
  onValidation: PropTypes.func,
  fieldSetting: PropTypes.object, 
  fieldActions: PropTypes.func,
};
export default FormSelectField;