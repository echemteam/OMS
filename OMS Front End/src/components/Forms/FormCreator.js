/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PropTypes from 'prop-types';
import FormFields from "./formField";
import { getValidationRules } from "../../utils/Validation/GetValidationRule";
import { ValidateAll, Validate } from "../../utils/Validation/Validation";
import { FormFieldTypes } from "../../data/formFieldType";

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

  const updateFormData = (data) => {
    const newFromdata = { ...formData, ...data }
    setFormData(newFromdata);
  }

  useImperativeHandle(ref, () => {
    return {
      getFormData: () => {
        if (isValidForm())
          return formData;
      },
      updateFormFieldValue: (data) => {
        updateFormData(data);
      },
      getFormDataWithoutValidation: () => {
        return formData;
      },
    };
  },
    // eslint-disable-next-line
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

  // const handleFormFieldChange = (fieldName, value) => {
  //   if (props.onFormFieldValueChange) {
  //     props.onFormFieldValueChange(fieldName, value)
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

  const onInputChange = (action, dataField, data) => {
    if (props.onInputChange && props.onInputChange[action]) {
      props.onInputChange[action](data, dataField);
    }
  }

  const onDropdownAction = (action, dataField, data) => {
    if (props.onDropdownAction && props.onDropdownAction[action]) {
      props.onDropdownAction[action](data, dataField);
    }
  }

  // const onInputShowInfo = (action, dataField, data) => {
  //   if (props.onInputShowInfo && props.onInputShowInfo[action]) {
  //     props.onInputShowInfo[action](data, dataField);
  //   }
  // }

  // const onInputChange = (action, dataField, data) => {
  //   if (props.onInputChange && props.onInputChange[action]) {
  //     props.onInputChange[action](data, dataField);
  //   }
  // }

  const onCheckBoxHandle = (action, dataField, data) => {
    if (props.onCheckBoxChange && props.onCheckBoxChange[action]) {
      props.onCheckBoxChange[action](data, dataField);
    }
  }

  return (
    <>
      {props.config.formFields ? (
        <FormFields
          fields={props.config.formFields}
          formData={formData}
          validState={validState}
          onActionChange={onActionHandle}
          onCheckBoxChange={onCheckBoxHandle}
          onInputChange={onInputChange}
          onDropdownAction={onDropdownAction}
          // onInputShowInfo={onInputShowInfo}
          onFormStateChange={handleStateChange}
          // onFormFieldChange={handleFormFieldChange}
          onUpdateValidation={handleOnValidateField}
          handleInputGroupButton={props.handleInputGroupButton}
          handleInputShowInfo={props.handleInputShowInfo}
          formSetting={props.config.formSetting}
          fieldValiadtionRules={validationRules}
        />
      ) : (
        <div>No fields configured</div>
      )}
    </>
  );
});

// FormCreator.propTypes = {
//   name: PropTypes.string,
//   initialState: PropTypes.object,
//   formFields: PropTypes.array,
//   onFormDataChange: PropTypes.func,
//   onFormFieldValueChange: PropTypes.func,
// };

FormCreator.propTypes = {
  config: PropTypes.shape({
    initialState: PropTypes.object,
    formFields: PropTypes.arrayOf(
      PropTypes.shape({
        dataField: PropTypes.string.isRequired,
        fieldType: PropTypes.oneOf(Object.values(FormFieldTypes)).isRequired,
        lable: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.any,
        options: PropTypes.array,
        inputButtonGroup: PropTypes.object,
        inputIcon: PropTypes.element,
        fieldSetting: PropTypes.object,
        changeAction: PropTypes.shape({
          resetValue: PropTypes.arrayOf(
            PropTypes.shape({
              dataField: PropTypes.string.isRequired,
              value: PropTypes.any,
            })
          ),
          resetFieldSetting: PropTypes.arrayOf(
            PropTypes.shape({
              dependancyField: PropTypes.arrayOf(
                PropTypes.shape({
                  dataField: PropTypes.string.isRequired,
                  updateProps: PropTypes.object,
                  resetValue: PropTypes.any,
                })
              ),
              condition: PropTypes.shape({
                type: PropTypes.string,
                value: PropTypes.any,
              }).isRequired,
            })
          ),
        }),
      })
    ).isRequired,
    formSetting: PropTypes.shape({
      isViewOnly: PropTypes.bool,
    }),
  }).isRequired,
  onFormDataChange: PropTypes.func,
  onFormFieldValueChange: PropTypes.func,
  onActionChange: PropTypes.object,
  onInputChange: PropTypes.object,
  onCheckBoxChange: PropTypes.object,
  handleInputGroupButton: PropTypes.func,
  handleInputShowInfo: PropTypes.func,
};

export default FormCreator;