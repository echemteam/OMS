import React, { useState } from "react";
import { FormFieldTypes } from "../../data/formFieldType";
import { TextInputType } from "../../data/formControlTypes";
import Line from "../ui/separator/Line";
import FormMainTitle from "../ui/formTitle/FormMainTitle";
import CKEditorField from "./formField/FormCkEditorField";

const FormInputFields = React.lazy(() => import("./formField/FormInputFields"));
const FormSelectField = React.lazy(() => import("./formField/FormSelectField"));
const FormCheckboxField = React.lazy(() =>
  import("./formField/FormCheckBoxFields")
);
const FormDatePickerField = React.lazy(() =>
  import("./formField/FormDatePickerField")
);
const FormRadioButtonField = React.lazy(() =>
  import("./formField/FormRadioButtonField")
);
const FormTextAreaFields = React.lazy(() =>
  import("./formField/FormTextAreaField")
);
const FormTinyEditorField = React.lazy(() =>
  import("./formField/FormTinyEditorField")
);
const FormFileUploadField = React.lazy(() =>
  import("./formField/FormFileUploadField")
);
const FormImageUploadFields = React.lazy(() =>
  import("./formField/FormImageUploadFields")
);
const FormEditableSelectField = React.lazy(() =>
  import("./formField/FormEditableSelectField")
);
const FormCustomSelectField = React.lazy(() =>
  import("./formField/FormCustomSelectField")
);

const FormFields = ({
  fields,
  formData,
  validState,
  onFormStateChange,
  onUpdateValidation,
  formSetting,
  onActionChange,
  onFormFieldChange,
  handleInputGroupButton,
  handleInputShowInfo,
  onInputChange,
  // onInputShowInfo,
  onCheckBoxChange,
  fieldValiadtionRules,
}) => {
  const [overRideProps, setOverRideProps] = useState({});

  const handleInputChange = (dataField, value) => {
    let updatedData = { ...formData, [dataField]: value };
    updatedData = stateChangeAction(dataField, updatedData);
    onFormStateChange && onFormStateChange(updatedData);
    onFormFieldChange && onFormFieldChange(dataField, value);
  };

  const stateChangeAction = (dataField, updatedState) => {
    const formField = selectFormField(dataField);
    if (
      formField.changeAction &&
      formField.changeAction.resetValue &&
      formField.changeAction.resetValue.length > 0
    ) {
      formField.changeAction.resetValue.forEach(function (element) {
        updatedState[element["dataField"]] = element["value"];
      });
    }

    if (
      formField.changeAction &&
      formField.changeAction.resetFieldSetting?.length > 0
    ) {
      var newOverRideProps = { ...overRideProps };
      formField.changeAction.resetFieldSetting.forEach((setting) => {
        const { dependancyField: dependancyFields, condition } = setting;
        if (
          condition.type === "=" &&
          updatedState[dataField] === condition.value
        ) {
          if (Array.isArray(dependancyFields)) {
            // Iterate through each data field
            dependancyFields.forEach((field) => {
              newOverRideProps[field.dataField] = {
                ...field.updateProps,
              };
              updatedState[field.dataField] = field.resetValue;
            });
          }
        } else {
          // Reset the value of newOverRideProps when condition is not met
          if (Array.isArray(dependancyFields)) {
            dependancyFields.forEach((field) => {
              delete newOverRideProps[field.dataField];
            });
          }
        }
      });

      setOverRideProps(newOverRideProps);
    }
    return updatedState;
  };

  const selectFormField = (dataField) => {
    return fields.find((f) => f.dataField === dataField);
  };

  const renderField = (field, index) => {
    const { containerCss } = field?.style || { containerCss: "col-md-6" };
    const isRequired =
      fieldValiadtionRules && fieldValiadtionRules[field.dataField]?.length > 0;
    switch (field.fieldType) {
      case FormFieldTypes.INPUT:
      case FormFieldTypes.PASSWORD:
      case FormFieldTypes.NUMERIC:
        return (
          <div className={containerCss}>
            <FormInputFields
              key={field.dataField}
              dataField={field.dataField}
              labelName={field.lable}
              name={field.id}
              type={fieldTypeToInputType(field.fieldType)}
              value={formData?.[field.dataField] || ""}
              onChange={handleInputChange}
              error={validState.error[field.dataField] || ""}
              onValidation={onUpdateValidation}
              formSetting={formSetting}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              inputButtonGroup={field.inputButtonGroup}
              inputIcon={field.inputIcon}
              handleInputGroupButton={handleInputGroupButton}
              handleInputShowInfo={handleInputShowInfo}
              inputField={onInputChange}
              // inputshowField={onInputShowInfo}
              isRequired={isRequired}
              {...field.fieldSetting}
            />
          </div>
        );

      case FormFieldTypes.TEXTAREA:
        return (
          <div className={containerCss}>
            <FormTextAreaFields
              key={field.dataField}
              dataField={field.dataField}
              labelName={field.lable}
              name={field.id}
              type={fieldTypeToInputType(field.fieldType)}
              value={formData?.[field.dataField] || ""}
              onChange={handleInputChange}
              error={validState.error[field.dataField] || ""}
              onValidation={onUpdateValidation}
              formSetting={formSetting}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              {...field.fieldSetting}
            />
          </div>
        );
      case FormFieldTypes.CHECKBOX:
        // Render a checkbox input
        return (
          <div className={containerCss} key={field.dataField}>
            <FormCheckboxField
              labelName={field.lable}
              dataField={field.dataField}
              type={fieldTypeToInputType(field.fieldType)}
              checked={formData?.[field.dataField] || false}
              name={field.id}
              onChange={handleInputChange}
              onValidation={onUpdateValidation}
              fieldActions={onCheckBoxChange}
              formSetting={formSetting}
              formData={formData}
              error={validState.error[field.dataField] || ""}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              {...field.fieldSetting}
            />
          </div>
        );
      case FormFieldTypes.RADIOBUTTON:
        return (
          <div className={containerCss}>
            <FormRadioButtonField
              key={field.dataField}
              labelName={field.label}
              name={field.id}
              onChange={handleInputChange}
              onValidation={onUpdateValidation}
              dataField={field.dataField}
              selectedOption={formData?.[field.dataField] || ""}
              error={validState.error[field.dataField] || ""}
              formSetting={formSetting}
              options={field.fieldSetting.options}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              {...field.fieldSetting}
            />
          </div>
        );
      case FormFieldTypes.DATEPICKER:
        // Render a checkbox input
        return (
          <div className={containerCss} key={field.dataField}>
            <FormDatePickerField
              labelName={field.lable}
              dataField={field.dataField}
              selectedDate={formData?.[field.dataField] || null} //TODO : Check if datefield value is in proper date format
              name={field.id}
              onChange={handleInputChange}
              onValidation={onUpdateValidation}
              error={validState.error[field.dataField] || ""}
              formSetting={formSetting}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              {...field.fieldSetting}
            />
          </div>
        );
      case FormFieldTypes.SELECT:
        return (
          <div className={containerCss} key={field.dataField}>
            <FormSelectField
              labelName={field.lable}
              dataField={field.dataField}
              selectedOption={field.value}
              options={field.options}
              name={field.id}
              onValidation={onUpdateValidation}
              value={formData?.[field.dataField] || null}
              error={validState.error[field.dataField] || ""}
              onChange={handleInputChange}
              fieldActions={onActionChange}
              formSetting={formSetting}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              inputButtonGroup={field.inputButtonGroup}
              handleInputGroupButton={handleInputGroupButton}
              {...field.fieldSetting}
            />
          </div>
        );
      case FormFieldTypes.TINYEDITOR:
        return (
          <div className={containerCss}>
            <FormTinyEditorField
              key={field.dataField}
              labelName={field.lable}
              dataField={field.dataField}
              name={field.id}
              onValidation={onUpdateValidation}
              value={formData?.[field.dataField] || ""}
              onChange={handleInputChange}
              error={validState.error[field.dataField] || ""}
              formSetting={formSetting}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              {...field.fieldSetting}
            />
          </div>
        );
      case FormFieldTypes.FILE:
        return (
          <div className={containerCss}>
            <FormFileUploadField
              key={field.dataField}
              labelName={field.lable}
              dataField={field.dataField}
              name={field.id}
              onValidation={onUpdateValidation}
              value={formData?.[field.dataField] || ""}
              onChange={handleInputChange}
              error={validState.error[field.dataField] || ""}
              formSetting={formSetting}
              fieldActions={onActionChange}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              fileFormate={field.fileFormate}
              {...field.fieldSetting}
              // isModelOpen={formData.isModelOpen}
            />
          </div>
        );
      case FormFieldTypes.IMAGE:
        return (
          <div className={containerCss}>
            <FormImageUploadFields
              key={field.dataField}
              labelName={field.lable}
              dataField={field.dataField}
              name={field.id}
              onValidation={onUpdateValidation}
              value={formData?.[field.dataField] || ""}
              onChange={handleInputChange}
              error={validState.error[field.dataField] || ""}
              formSetting={formSetting}
              fieldActions={onActionChange}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              fileFormate={field.fileFormate}
              {...field.fieldSetting}
              // isModelOpen={formData.isModelOpen}
            />
          </div>
        );
      case FormFieldTypes.EDITABLEDROPDOWN:
        return (
          <div className={containerCss}>
            <FormEditableSelectField
              key={field.dataField}
              labelName={field.lable}
              dataField={field.dataField}
              name={field.id}
              onValidation={onUpdateValidation}
              value={formData?.[field.dataField] || ""}
              onChange={handleInputChange}
              error={validState.error[field.dataField] || ""}
              formSetting={formSetting}
              fieldActions={onActionChange}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              {...field.fieldSetting}
            />
          </div>
        );
      case FormFieldTypes.SEPARATOR:
        return <Line containerCss={containerCss} />;

      case FormFieldTypes.MAINFORMTITLE:
        return (
          <FormMainTitle {...field.fieldSetting} containerCss={containerCss} />
        );
      // Add similar cases for other field types (FileUpload, Radio, Date, DateTime)
      case FormFieldTypes.CKEDITOR:
        return (
          <div className={containerCss}>
            <CKEditorField
              key={field.dataField}
              labelName={field.lable}
              dataField={field.dataField}
              name={field.id}
              onValidation={onUpdateValidation}
              value={formData?.[field.dataField] || ""}
              onChange={handleInputChange}
              error={validState.error[field.dataField] || ""}
              formSetting={formSetting}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              {...field.fieldSetting}
            />
          </div>
        );
      case FormFieldTypes.CUSTOMSELECT:
        return (
          <div className={containerCss} key={field.dataField}>
            <FormCustomSelectField
              labelName={field.lable}
              dataField={field.dataField}
              selectedOption={field.value}
              options={field.options}
              name={field.id}
              onValidation={onUpdateValidation}
              value={formData?.[field.dataField] || null}
              error={validState.error[field.dataField] || ""}
              onChange={handleInputChange}
              fieldActions={onActionChange}
              formSetting={formSetting}
              formData={formData}
              changeAction={field.changeAction}
              overRideProps={overRideProps?.[field.dataField]}
              isRequired={isRequired}
              dropDownSettings={field.dropdownSettings}
              inputButtonGroup={field.inputButtonGroup}
              handleInputGroupButton={handleInputGroupButton}
              {...field.fieldSetting}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return <>{fields.map(renderField)}</>;
};

const fieldTypeToInputType = (fieldtype) => {
  switch (fieldtype) {
    case FormFieldTypes.PASSWORD:
      return TextInputType.PASSWORD;
    case FormFieldTypes.NUMERIC:
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
    case FormFieldTypes.TINYEDITOR:
      return TextInputType.TEXT;
    case FormFieldTypes.CKEDITOR:
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
