/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PropTypes from 'prop-types';
import FormFields from "./formField";
import { getValidationRules } from "../../utils/Validation/GetValidationRule";
import { ValidateAll, Validate } from "../../utils/Validation/Validation";

const FormCreator = forwardRef((props, ref) => {
  const [formData, setFormData] = useState(props.initialState);
  const [validState, setValidState] = useState({
    isValid: true,
    error: {},
  });
  const [validationRules, setValidationRules] = useState({});

  useEffect(() => {
    if (props.formSetting && props.formSetting.isViewOnly) {
      const valRule = getValidationRules(props.formFields);
      setValidationRules(valRule);
      return;
    }
    const valRule = getValidationRules(props.formFields);
    setValidationRules(valRule);
  }, [props.formFields]);

  // reset the initial state 
  useEffect(() => {
    setFormData(props.initialState);
    setValidState({
      isValid: true,
      error: {},
    });

    return () => {

    }
  }, [props.initialState]);

  useImperativeHandle(
    ref,
    () => {
      return {
        getFormData: () => {
          if (isValidForm())

            return formData;
        },
      };
    },
    [formData, validState, validationRules],
  );

  const isValidForm = () => {
    const validation = ValidateAll(formData, validationRules, props.fieldSettingValue?.minLength, props.fieldSettingValue?.maxLength);
    if (!validation.isValid) {
      setValidState(validation);

    }
    return validation.isValid;
  };

  const handleStateChange = (updatedData) => {
    setFormData(updatedData);
    if (props.onFormDataChange) {
      props.onFormDataChange(updatedData)
    }
  };

  // const handleFormFieldChange = (fieldName, value) => {
  //   if (props.onFormFieldValueChange) {
  //     props.onFormFieldValueChange(fieldName, value)
  //   }
  // };

  const handleOnValidateField = (dataField) => {

    let validationObj = { ...validState }

    if (validationRules[dataField]) {
      let validation = Validate(formData, validationRules, dataField, props.fieldSettingValue?.minLength, props.fieldSettingValue?.maxLength);
      if (!validation.isValid) {

        validationObj.error[dataField] = validation.error[dataField];
        validationObj.isValid = false;
        setValidState(validationObj);
      }
      else {

        if (validationObj.error[dataField]) {
          delete validationObj.error[dataField];
          setValidState(validationObj);

        }

      }
    }
  };

  const onActionHandle = (action, dataField, data) => {
    if (props.onActionChange && props.onActionChange[action]) {
      props.onActionChange[action](data, dataField);
    }
  }

  const onInputChange = (action, dataField, data) => {
    if (props.onInputChange && props.onInputChange[action]) {
      props.onInputChange[action](data, dataField);
    }
  }

  return (
    <>
      {props.formFields ? (
        <FormFields
          fields={props.formFields}
          formData={formData}
          validState={validState}
          onActionChange={onActionHandle}
          onInputChange={onInputChange}
          onFormStateChange={handleStateChange}
          // onFormFieldChange={handleFormFieldChange}
          onUpdateValidation={handleOnValidateField}
          formSetting={props.formSetting}
          handleInputGroupButton={props.handleInputGroupButton}
        />
      ) : (
        <div>No fields configured</div>
      )}
    </>
  );
});

FormCreator.propTypes = {
  name: PropTypes.string,
  initialState: PropTypes.object,
  formFields: PropTypes.array,
  onFormDataChange: PropTypes.func,
  onFormFieldValueChange: PropTypes.func,
};

export default FormCreator;