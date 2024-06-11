/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PropTypes from 'prop-types';
import FormFields from "./formField";
import { getValidationRules } from "../../utils/Validation/GetValidationRule";
import { ValidateAll, Validate } from "../../utils/Validation/Validation";

const FormCreator = forwardRef((props, ref) => {
  const [formData, setFormData] = useState(props.config.initialState);
  const [validState, setValidState] = useState({
    isValid: true,
    error: {},
  });
  const [validationRules, setValidationRules] = useState({});

  useEffect(() => {
    if (props.config.formSetting && props.config.formSetting.isViewOnly) {
      const valRule = getValidationRules(props.config.formFields);
      setValidationRules(valRule);
      return;
    }
    const valRule = getValidationRules(props.config.formFields);
    setValidationRules(valRule);
  }, [props.config]);

  // reset the initial state 
  useEffect(() => {
    setFormData(props.config.initialState);
    setValidState({
      isValid: true,
      error: {},
    });

    return () => {

    }
  }, [props.config.initialState]);

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
    const validation = ValidateAll(formData, validationRules);
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

  // const handleFormFieldChange = (fieldName,value) => {

  //   if(props.onFormFieldValueChange)
  //   {
  //      props.onFormFieldValueChange(updatedData)
  //   }
  // };

  const handleOnValidateField = (dataField) => {

    let validationObj = { ...validState }
    // const valRule = getValidationRules(props.formFields);
    if (validationRules[dataField]) {
      let validation = Validate(formData, validationRules, dataField);
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

  return (
    // <MinMaxLengthValidatorContextProvider>
    <>
      {props.config.formFields ? (
        <FormFields
          fields={props.config.formFields}
          formData={formData}
          validState={validState}
          onActionChange={onActionHandle}
          onFormStateChange={handleStateChange}
          // onFormFieldChange={handleFormFieldChange}
          onUpdateValidation={handleOnValidateField}
          formSetting={props.config.formSetting}
        />
      ) : (
        <div>No fields configured</div>
      )}
    </>
    // </MinMaxLengthValidatorContextProvider>
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