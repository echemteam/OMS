import React, { Suspense } from 'react'
import PropTypes from 'prop-types';
const Dropdown = React.lazy(() => import('../../ui/dropdown/DropDrown'));
const Label = React.lazy(() => import('../../ui/label/Label'));
const ValidationText = React.lazy(() => import('../../ui/inputs/validation/ValidationText.js'))


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
  overRideProps,
  isRequired,
  inputButtonGroup,
  handleInputGroupButton,
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
            inputButtonGroup={inputButtonGroup}
            handleInputGroupButton={handleInputGroupButton}
            {...selectFormFieldProps}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  })),
  onChange: PropTypes.func,
  dataField: PropTypes.string,
  labelName: PropTypes.string,
  placeholder: PropTypes.string,
  formSetting: PropTypes.shape({
    isViewOnly: PropTypes.bool
  }),
  isMultiSelect: PropTypes.bool,
  onValidation: PropTypes.func,
  fieldSetting: PropTypes.object,
  fieldActions: PropTypes.func,
  overRideProps: PropTypes.shape({
    isDisable: PropTypes.bool
  }),
  isRequired: PropTypes.bool,
  inputButtonGroup: PropTypes.array,
  handleInputGroupButton: PropTypes.func,
  selectFormFieldProps: PropTypes.object
};

export default FormSelectField;