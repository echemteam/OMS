import React from 'react'
import { useRef } from 'react';
import { SMTPTestInitialState, TestEmailConfig } from './config/SMTPSettings.data';
import Buttons from '../../../../components/ui/button/Buttons';
import { useSendTestOutboundEmailsMutation } from '../../../../app/services/organizationAPI';
import { useEffect } from 'react';
import ToastService from '../../../../services/toastService/ToastService';
import FormCreator from '../../../../components/FinalForms/FormCreator';

function TestEmails(props) {

  const ref = useRef();

  //** API Call's */
  const [testOutboundEmail, { isLoading, isSuccess: isSuccessTestEmail, data: isTestEmailData }] = useSendTestOutboundEmailsMutation();

  //** Handle Change */
  const handleTestOutboundEmail = () => {
    const data = ref.current.getFormData();
    const emailData = props.smtpRef?.current.getFormData();
    if (emailData && data) {
      if (data.emailTo) {
        const emailArray = data.emailTo.split(',').map(email => email.trim());
        data.emailTo = emailArray.join(';');
      }
      let request = {
        ...emailData,
        ...data
      }
      testOutboundEmail(request);
    }
  };

  //** Use Effect */
  useEffect(() => {
    if (isSuccessTestEmail && isTestEmailData) {
      if (isTestEmailData.keyValue != 0) {
        ToastService.success(isTestEmailData.errorMessage);
      } else {
        ToastService.error(isTestEmailData.errorMessage);
      }
      props.onClose();
    }
  }, [isSuccessTestEmail, isTestEmailData]);

  useEffect(() => {
    if (TestEmailConfig) {
      TestEmailConfig.initialState = SMTPTestInitialState;
    }
  }, [TestEmailConfig]);


  return (<>
    <div>
      <div className="row">
        <div className="col-md-12 add-role-input">
          <div className="row vertical-form">
            <FormCreator
              ref={ref}
              config={TestEmailConfig}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="d-flex align-item-center justify-content-end mt-3">
            <Buttons
              buttonTypeClassName="theme-button"
              onClick={handleTestOutboundEmail}
              buttonText={"Test Outbound Email"}
              isLoading={isLoading}
            />
            <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
              onClick={props.onClose}
            />
          </div>
        </div>
      </div>
    </div>

  </>);
}

export default TestEmails