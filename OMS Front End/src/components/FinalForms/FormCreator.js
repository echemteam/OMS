import React, { forwardRef, useEffect, useImperativeHandle, useState, useMemo } from "react";
import PropTypes from 'prop-types';

import FormFields from "./formField";
import { getValidationRules } from "../../utils/Validation/GetValidationRule";
import { ValidateAll, Validate } from "../../utils/Validation/Validation";

const FormCreator = forwardRef(({
  initialState,
  config,
  onFormDataChange,
  onColumnChange,
  onFieldBlur,
  onActionChange,
  onSubmit,
  ...otherProps
}, ref) => {
  const { formFields, section, formSetting, initialState: configInitialState } = config;

  const [formData, setFormData] = useState(initialState);
  const [validState, setValidState] = useState({
    isValid: true,
    error: {},
  });
  const validationRules = useMemo(() => getValidationRules(section), [section]);

  useEffect(() => {
    setFormData(configInitialState);
    setValidState({
      isValid: true,
      error: {},
    });
  }, [configInitialState]);

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      const validation = handleValidation();
      return validation.isValid ? formData : null;
    },
    getFormDataWithoutValidation: () => {
      return formData;
    }
  }), [formData, validState, validationRules]);


  const handleValidation = () => {
    const validation = ValidateAll(formData, validationRules);
    setValidState(validation);
    return validation;
  };


  const isValidForm = () => {
    const validation = ValidateAll(formData, validationRules);
    setValidState(validation);
    return validation.isValid;
  };


  const handleStateChange = (updatedData) => {
    setFormData(updatedData);
    onFormDataChange?.(updatedData);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const validation = handleValidation();
      if (validation.isValid) {
        onSubmit?.();
      }
    }
  };


  const handleOnValidateField = (dataField) => {
    const validation = validationRules[dataField] ? Validate(formData, validationRules, dataField) : null;
    if (!validation) return;

    const validationObj = { ...validState };
    if (!validation.isValid) {
      validationObj.error[dataField] = validation.error[dataField];
      validationObj.isValid = false;
    } else {
      delete validationObj.error[dataField];
      validationObj.isValid = Object.keys(validationObj.error).length === 0;
    }
    setValidState(validationObj);
  };


  return section ? (

    <React.Suspense>
      <FormFields
        sections={section}
        fields={formFields}
        formData={formData ? formData : {}}
        validState={validState}
        onFormStateChange={handleStateChange}
        onUpdateValidation={handleOnValidateField}
        onFieldBlur={onFieldBlur}
        onFormFieldChange={onColumnChange}
        formSetting={formSetting}
        fieldValiadtionRules={validationRules}
        {...otherProps}  // Pass down other props to FormFields
      />
    </React.Suspense>
  ) : (
    <div>No fields configured</div>
  );

});

FormCreator.propTypes = {
  initialState: PropTypes.object,
  config: PropTypes.shape({
    formFields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        label: PropTypes.string,
        value: PropTypes.any,
      })
    ),
    formSetting: PropTypes.shape({
      isViewOnly: PropTypes.bool,
    }),
    initialState: PropTypes.object,
  }).isRequired,
  onFormDataChange: PropTypes.func,
  onColumnChange: PropTypes.func,
  onFieldBlur: PropTypes.func,
};


export default React.memo(FormCreator);