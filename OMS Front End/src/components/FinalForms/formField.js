import React, { lazy, useCallback, useState } from "react";
import PropTypes from 'prop-types';

import { FormFieldTypes } from "./libs/data/formFieldType";
import { TextInputType } from "./libs/data/formControlTypes";

const Line = lazy(() => import("./ui/separator/Line"));
const FormMainTitle = lazy(() => import("./ui/formTitle/FormMainTitle"));
const FormSelectField = lazy(() => import("./formFields/FormSelectField"));
const FormInputFields = lazy(() => import("./formFields/FormInputFields.js"));
const FormCKEditorField = lazy(() => import("./formFields/FormCKEditorField"));
const FormCheckboxField = lazy(() => import("./formFields/FormCheckBoxFields"));
const FormTextAreaFields = lazy(() => import("./formFields/FormTextAreaField"));
const FormFileUploadField = lazy(() => import("./formFields/FormFileUploadField"));
const FormDatePickerField = lazy(() => import("./formFields/FormDatePickerField"));
const FormMaskInputField = lazy(() => import("./formFields/FormMaskInputField.js"));
const FormRadioButtonField = lazy(() => import("./formFields/FormRadioButtonField"));
const FormPhoneInputField = lazy(() => import("./formFields/FormPhoneInputField.js"));
const FormEditableSelectField = lazy(() => import("./formFields/FormEditableSelectField"));

const ComponentMap = {
  [FormFieldTypes.INPUT]: FormInputFields,
  [FormFieldTypes.PASSWORD]: FormInputFields,
  [FormFieldTypes.NUMERIC]: FormInputFields,
  [FormFieldTypes.MASKINPUT]: FormMaskInputField,
  [FormFieldTypes.TEXTAREA]: FormTextAreaFields,
  [FormFieldTypes.CHECKBOX]: FormCheckboxField,
  [FormFieldTypes.RADIOBUTTON]: FormRadioButtonField,
  [FormFieldTypes.DATEPICKER]: FormDatePickerField,
  [FormFieldTypes.SELECT]: FormSelectField,
  [FormFieldTypes.TEXTEDITOR]: FormCKEditorField,
  [FormFieldTypes.FILE]: FormFileUploadField,
  [FormFieldTypes.PHONE]: FormPhoneInputField,
  [FormFieldTypes.EDITABLEDROPDOWN]: FormEditableSelectField,
  [FormFieldTypes.SEPARATOR]: Line,
  [FormFieldTypes.MAINFORMTITLE]: FormMainTitle,
};



const FormFields = ({
  sections,
  formData,
  validState,
  onFormStateChange,
  onUpdateValidation,
  formSetting,
  onFormFieldChange,
  onFieldBlur,
  fieldValiadtionRules
}) => {

  const [overRideProps, setOverRideProps] = useState({});

  const handleInputChange = (dataField, value) => {
    let updatedData = { ...formData, [dataField]: value };
    updatedData = stateChangeAction(dataField, updatedData);
    onFormStateChange?.(updatedData);
    onFormFieldChange?.(dataField, updatedData);
  };


  const handleBlure = (dataField) => {
    let updatedData = { ...formData };

    if (onUpdateValidation) {
      onUpdateValidation(dataField);
    }
    onFieldBlur?.(dataField, updatedData);
  };



  const stateChangeAction = (dataField, updatedState) => {

    const formField = memoizedSelectFormField(sections, dataField);

    formField?.changeAction?.resetValue?.forEach(({ dataField, value }) => {
      if (dataField && value) {
        updatedState[dataField] = value;
      }
    });

    if (formField?.changeAction?.resetFieldSetting?.length > 0) {
      let newOverRideProps = { ...overRideProps };

      formField.changeAction.resetFieldSetting.forEach(({ dependancyField: dependancyFields, condition }) => {
        const isConditionMet = condition.type === "=" && updatedState[dataField] === condition.value;

        if (Array.isArray(dependancyFields)) {
          dependancyFields.forEach(({ dataField, updateProps, resetValue }) => {
            if (isConditionMet) {
              newOverRideProps[dataField] = { ...updateProps };
              updatedState[dataField] = resetValue;
            } else {
              delete newOverRideProps[dataField];
            }
          });
        }
      });

      setOverRideProps(newOverRideProps);
    }

    return updatedState;
  };


  const memoizedSelectFormField = useCallback((sections, dataField) => {
    // Helper function to search for a field inside an array of fields
    const searchFields = (fields, dataField) => {
      return fields.find(field => field.dataField === dataField) || null;
    };

    // Iterate through sections
    for (const section of sections) {
      // Search in rowGroup if it exists
      if (section.rowGroup && section.rowGroup.length > 0) {
        for (const rowGroup of section.rowGroup) {
          const foundField = searchFields(rowGroup.fields, dataField); // Search in rowGroup fields
          if (foundField) return foundField;
        }
      }

      // Otherwise, search directly in section fields
      if (section.fields && section.fields.length > 0) {
        const foundField = searchFields(section.fields, dataField);
        if (foundField) return foundField;
      }
    }

    return null; // Return null if the field is not found
  }, [sections])

  const renderField = (field, index) => {
    const { containerCss = "col-md-6" } = field.style || {};
    const isRequired = fieldValiadtionRules?.[field.dataField]?.length > 0;

    const commonProps = {
      keyId: `${field.dataField}_${index}`,
      dataField: field.dataField,
      labelName: field.label,
      name: field.id,
      type: fieldTypeToInputType(field.fieldType),
      value: formData?.[field.dataField] || "",
      error: validState.error[field.dataField] || "",
      formSetting,
      formData,
      changeAction: field.changeAction,
      overRideProps: overRideProps?.[field.dataField],
      isRequired,
      fieldSetting: field.fieldSetting,
      onChange: handleInputChange,
      onValidation: onUpdateValidation,
      onBlur: handleBlure,
    };

    const FieldComponent = ComponentMap[field.fieldType];

    if (!FieldComponent) return null;

    if (field.fieldType === FormFieldTypes.SEPARATOR) {
      return <FieldComponent containerCss={containerCss} />;
    }

    if (field.fieldType === FormFieldTypes.MAINFORMTITLE) {
      return <FieldComponent {...field.fieldSetting} containerCss={containerCss} key={field.dataField + "_" + index} />;
    }

    return (
      <div className={containerCss} key={field.dataField + "_" + index}>
        <FieldComponent {...commonProps} options={field.fieldSetting?.options} key={field.dataField + "_" + index} />
      </div>
    );
  };

  const renderRowGroups = (rowGroups) => {
    return rowGroups.map((rowGroup, index) => {
      const { groupStyle = "col-md-12" } = rowGroup.style || {}; // Move the constant declaration here
      const GroupWrapper = rowGroup.groupWrapper || React.Fragment; // Check if a groupWrapper is provided, fallback to React.Fragment
      const isJSXLiteral = React.isValidElement(GroupWrapper); // Check if it's JSX or a functional component

      return (
        <div key={`rowGroup_${index}`} className={`${groupStyle}`}>
          {isJSXLiteral ? (
            React.cloneElement(GroupWrapper, {}, rowGroup.fields.map(renderField))
          ) : (
            <GroupWrapper>
              {rowGroup.fields.map(renderField)}
            </GroupWrapper>
          )}
        </div>
      );
    });
  };

  const renderSection = (section, index) => {
    const { sectionStyle = "col-md-12" } = section.style || {};
    const Wrapper = section.wrapperTemplate || React.Fragment;
    const isJSXLiteral = React.isValidElement(Wrapper);

    const hasRowGroup = Array.isArray(section.rowGroup);
    const hasFields = Array.isArray(section.fields);

    return (
      <div className={sectionStyle} key={`section_${index}`}>
        {isJSXLiteral ? (
          React.cloneElement(Wrapper, {},
            hasRowGroup ? renderRowGroups(section.rowGroup) : section.fields.map(renderField)
          )
        ) : (
          <Wrapper>
            {hasRowGroup ? renderRowGroups(section.rowGroup) : section.fields.map(renderField)}
          </Wrapper>
        )}
      </div>
    );

  };

  return (
    <>
      {

        sections.map(renderSection)
      }
    </>
  );
};

const fieldTypeToInputType = (fieldtype) => {
  switch (fieldtype) {
    case FormFieldTypes.PASSWORD:
      return TextInputType.PASSWORD;
    case FormFieldTypes.NUMERIC:
      return TextInputType.NUMBER;
    case FormFieldTypes.PHONE:
      return TextInputType.NUMBER;
    case FormFieldTypes.CHECKBOX:
      return TextInputType.CHECKBOX;
    case FormFieldTypes.EDITABLEDROPDOWN:
      return TextInputType.TEXT;
    case FormFieldTypes.DATEPICKER:
      return TextInputType.DATEPICKER;
    case FormFieldTypes.TEXTAREA:
      return TextInputType.TEXT;
    case FormFieldTypes.TEXTEDITOR:
      return TextInputType.TEXT;
    case FormFieldTypes.FILE:
      return TextInputType.FILE;
    case FormFieldTypes.RADIOBUTTON:
      return TextInputType.RADIO;
    default:
      return TextInputType.TEXT;
  }
};
export default FormFields;


FormFields.propTypes = {
  // Array of field objects to render
  sections: PropTypes.array.isRequired,

  // Object containing form data values
  formData: PropTypes.object.isRequired,

  // Object containing validation states
  validState: PropTypes.object.isRequired,

  // Function to handle form state changes
  onFormStateChange: PropTypes.func,

  // Function to handle validation updates
  onUpdateValidation: PropTypes.func,

  // Object with form settings and configurations
  formSetting: PropTypes.object,

  // Function to handle field-specific actions
  onActionChange: PropTypes.func,

  // Function to handle individual form field changes
  onFormFieldChange: PropTypes.func,

  // Function to handle key press events
  onKeyPress: PropTypes.func,
};
