/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import PropTypes from 'prop-types';
import Buttons from "../../../../components/ui/button/Buttons";
import { EmailTemplateFormData } from "../config/EmailTemplate.data";
import { useAddEditEmailTemplateMutation, useLazyGetEmailTemplateByIdQuery } from "../../../../app/services/emailTemplateAPI";
import { useEffect } from "react";
import ToastService from "../../../../services/toastService/ToastService";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import AssignSnippets from "./AssignSnippets";

const AddEditEmailTemplate = forwardRef((props) => {
  const emailTemplateRef = useRef();
  const emailTemplateId = props.initData?.emailTemplateId;
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const [emailTemplateData, setEmailTemplateData] = useState(EmailTemplateFormData);
  const [addEditEmailTemplate, { isLoading: isAddEditEmailTemplateLoading, isSuccess: isAddEditEmailTemplateSuccess, data: isAddEditEmailTemplateData }] = useAddEditEmailTemplateMutation();
  const [getEmailTemplateById, { isFetching: isGetEmailTemplateByIdFetching, isSuccess: isGetEmailTemplateByIdSuccess, data: isGetEmailTemplateByIdData }] = useLazyGetEmailTemplateByIdQuery();

  useEffect(()=>{
    if(props.isEdit && emailTemplateId){
      let updatedFormData;
      updatedFormData = removeFormFields(emailTemplateData, ['emailTemplateName']);
      setEmailTemplateData(updatedFormData)
      getEmailTemplateById(emailTemplateId)
        }
        
  },[props.isEdit,emailTemplateId])

  useEffect(() => {
    if (!isGetEmailTemplateByIdFetching && isGetEmailTemplateByIdSuccess && isGetEmailTemplateByIdData  ) {

      if (isGetEmailTemplateByIdData) {
        let formData = { ...emailTemplateData };
        formData.initialState = {
          emailTemplateId:isGetEmailTemplateByIdData.emailTemplateId,
          emailBody: isGetEmailTemplateByIdData.emailBody,
          subject: isGetEmailTemplateByIdData.subject,
          isActive: isGetEmailTemplateByIdData.isActive,
        };
        setEmailTemplateData(formData);

        setShouldRerenderFormCreator((prevState) => !prevState);
      }
    }
  }, [isGetEmailTemplateByIdFetching,isGetEmailTemplateByIdSuccess, isGetEmailTemplateByIdData]);
  
  useEffect(() => {
    if (isAddEditEmailTemplateSuccess && isAddEditEmailTemplateData) {
      props.onSuccess();
      ToastService.success(isAddEditEmailTemplateData.errorMessage);
      onResetData();
      props.onClose();
      setShouldRerenderFormCreator((prevState) => !prevState);
   
    }
  }, [isAddEditEmailTemplateSuccess, isAddEditEmailTemplateData]);
  
  const onResetData = () => {
    let formData = { ...EmailTemplateFormData };
    onResetForm(formData, setEmailTemplateData, null);
    setShouldRerenderFormCreator((prevState) => !prevState);
 
  };
  
  const handleEmailTemplate=()=>{
       
    const emailFormData = emailTemplateRef.current.getFormData();
    if( emailFormData && !emailTemplateId){
      const requestData = {
        ...emailFormData,
        emailTemplateName:emailFormData.emailTemplateName,
        subject:emailFormData.subject,
        emailBody:emailFormData.emailBody,
        isActive:emailFormData.isActive,
      };
      addEditEmailTemplate(requestData);
      }
        else if(emailFormData && emailTemplateId){
      const updateData = {
        ...emailFormData,
        emailTemplateId:emailFormData.emailTemplateId,
        emailTemplateName: props.initData.emailTemplateName,
        subject:emailFormData.subject,
        emailBody:emailFormData.emailBody,
        isActive:emailFormData.isActive,
      };
      addEditEmailTemplate(updateData);
    }
  }

  useImperativeHandle(props.childRef, () => ({
    callChildFunction: onResetData,
  }));
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="row vertical-form">
            <FormCreator
              ref={emailTemplateRef}
              config={emailTemplateData}
              {...emailTemplateData}
              key={shouldRerenderFormCreator}
            />
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-center justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText={props.isEdit ? "Update" : "Save"}
              onClick={handleEmailTemplate}
              isLoading={isAddEditEmailTemplateLoading}
            />
            <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
              onClick={props.onClose}
            />
          </div>
        </div>
      </div>
       <div>
        <AssignSnippets emailTemplateId={emailTemplateId}/>
       </div>
    </div>)
})

AddEditEmailTemplate.propTypes = {
  initData: PropTypes.shape({
    emailTemplateId: PropTypes.string,
    emailTemplateName: PropTypes.string,
  }),
  isEdit: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default AddEditEmailTemplate;
