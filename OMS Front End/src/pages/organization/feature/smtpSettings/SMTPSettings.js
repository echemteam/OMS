/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { SMTPSettingsFormData } from "./config/SMTPSettings.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import {
  useAddEditSmtpSettingsMutation,
  useLazyGetSmtpSettingsQuery,
} from "../../../../app/services/organizationAPI";
import ToastService from "../../../../services/toastService/ToastService";
import { decryptUrlData, encryptAES } from "../../../../services/CryptoService";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { useSelector } from "react-redux";
import { EmailProviders,FieldSettingType} from "../../../../utils/Enums/commonEnums";
import { removeFormFields } from "../../../../utils/FormFields/RemoveFields/handleRemoveFields";
import { setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
const setInitialData = {
  Gmail: "Gmail",
};
const SMTPSettings = (isEditablePage) => {
  const smtpRef = useRef();
  const [smtpSettingData, setSmtpSettingData] = useState(SMTPSettingsFormData);
  const [smtpId, setSmtpId] = useState(0);
  const [, setIsOfficeEmail] = useState(false);
  const [, setIsOutlook] = useState(false);

  const [, setIsGmail] = useState(true);
  const [addEditSmtpSetting,{isLoading: isAddEditSmtpSettingLoading,isSuccess: isAddEditSmtpSettingSuccess,data: isAddEditSmtpSettingData,},] = useAddEditSmtpSettingsMutation();
  const [ getSmtpSettings, {isFetching: isGetSmtpSettingsFetching,isSuccess: isGetSmtpSettingsSuccess, data: isGetSmtpSettingsData,},] = useLazyGetSmtpSettingsQuery();
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const { formSetting } = SMTPSettingsFormData;
  const roles = useSelector((state) => state.auth.roles.roleName);

  useEffect(() => {
    if (isEditablePage) {
      if (roles?.includes("Admin")) {
        setIsButtonDisable(false);
        formSetting.isViewOnly = false;
      } else {
        setIsButtonDisable(true);
        formSetting.isViewOnly = true;
      }
    }
  }, [isEditablePage, roles]);

  useEffect(() => {
    getSmtpSettings();
    setInitialValue();
  }, []);

  const setInitialValue = () => {
    let updatedFormData;
    updatedFormData = removeFormFields(SMTPSettingsFormData, [ "clientId","clientSecret","tenantId",]);

    // if (isGetSmtpSettingsData) {
      handleChangeDropdownList(setInitialData.Gmail, "emailProvider");
      setFieldSetting( smtpSettingData,"emailprovider",FieldSettingType.DISABLED,false);
    // }
    setSmtpSettingData(updatedFormData);
  };

  const getFieldsToRemove = (type) => {

    switch (type) {
      case "Office 365":
        return ["smtpServer","smtpPort","smtpUserName","smtpPassword","useSsl",];
      case "Gmail":
        return ["clientId", "clientSecret", "tenantId"];
      case "Outlook":
        return ["clientId", "clientSecret", "tenantId"];
      default:
        return [];
    }
  };
  const handleChangeDropdownList = (data, dataField) => {
 
    let manageData = { ...SMTPSettingsFormData };
    const removeFields = getFieldsToRemove(data.value);
    manageData.formFields = manageData.formFields.filter(
      (field) => !removeFields.includes(field.id)
    );
    //  manageData.initialState = { ...resetData };
    manageData.initialState = { ...SMTPSettingsFormData.initialState };
    manageData.initialState.emailProvider = data.value;
    switch (data.value) {
      case "Gmail":
        manageData.initialState.smtpServer = "smtp.gmail.com";
        manageData.initialState.smtpPort = 587;
        break;
      case "Outlook":
        manageData.initialState.smtpServer = "smtp-mail.outlook.com";
        manageData.initialState.smtpPort = 587;

        break;
      default:
        break;
    }
    setSmtpSettingData(manageData);
    switch (data.value) {
      case "Office365":
        setIsOfficeEmail(true);
        setIsOutlook(false);
        setIsGmail(false);
        break;
      case "Outlook":
        setIsOutlook(true);
        setIsOfficeEmail(false);
        setIsGmail(false);
        break;
      case "Gmail":
        setIsGmail(true);
        setIsOfficeEmail(false);
        setIsOutlook(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const dropdownField = smtpSettingData.formFields.find(
      (item) => item.dataField === "emailProvider"
    );
    dropdownField.fieldSetting.options = Object.entries(EmailProviders).map(
      ([key, value]) => ({
        value: value,
        label: key,
      })
    );
  }, []);

  useEffect(() => {
    if (isAddEditSmtpSettingSuccess && isAddEditSmtpSettingData) {
      ToastService.success(isAddEditSmtpSettingData.errorMessage);
      getSmtpSettings();
    }
  }, [isAddEditSmtpSettingSuccess, isAddEditSmtpSettingData]);

  const handleAddEditSmtpSettings = () => {
    let data = smtpRef.current.getFormData();
    if ((data && !smtpId) || (data && smtpId)) {
      let request = {
        ...data,
        emailProvider: data.emailProvider || 0,
        smtpServer: encryptAES(data?.smtpServer),
        smtpPort: data?.smtpPort || 0,
        useSsl: data.useSsl,
        smtpUserName: encryptAES(data?.smtpUserName) || "",
        smtpPassword: encryptAES(data?.smtpPassword) || "",
        smtpSettingId: smtpId ? smtpId : 0,
        clientId: data?.clientId || "",
        clientSecret: data?.clientSecret || "",
        tenantId: data?.tenantId || "",
      };
      addEditSmtpSetting(request);
    }
  };

  useEffect(() => {
    if ( !isGetSmtpSettingsFetching && isGetSmtpSettingsSuccess && isGetSmtpSettingsData) {
      debugger;
    //   const providertypes = {
    //     [EmailProviders?.Gmail]: ["clientId", "clientSecret", "tenantId"],
    //     [EmailProviders?.Office365]: [
    //       "smtpServer",
    //       "smtpPort",
    //       "smtpUserName",
    //       "smtpPassword",
    //       "useSsl",
    //     ],
    //     [EmailProviders?.Outlook]: ["clientId", "clientSecret", "tenantId"],
    //   };

     // const fieldsToRemove = providertypes[isGetSmtpSettingsData.emailProvider];
     const fieldsToRemove = getFieldsToRemove(isGetSmtpSettingsData.emailProvider);

      let formData;
      if (fieldsToRemove) {
        formData = removeFormFields(SMTPSettingsFormData, fieldsToRemove);
      }
      setFieldSetting(formData,"emailprovider", FieldSettingType.DISABLED, true);

      formData.initialState = {
        emailProvider: isGetSmtpSettingsData?.emailProvider,
        smtpServer: decryptUrlData(isGetSmtpSettingsData.smtpServer),
        smtpPort: isGetSmtpSettingsData.smtpPort,
        smtpUserName: decryptUrlData(isGetSmtpSettingsData.smtpUserName),
        smtpPassword: decryptUrlData(isGetSmtpSettingsData.smtpPassword),
        useSsl: isGetSmtpSettingsData.useSsl,
        smtpSettingId: isGetSmtpSettingsData.smtpSettingId,
        clientId: isGetSmtpSettingsData.clientId,
        clientSecret: isGetSmtpSettingsData.clientSecret,
        tenantId: isGetSmtpSettingsData.tenantId,
      };
      setSmtpSettingData(formData);
      setSmtpId(isGetSmtpSettingsData.smtpSettingId);
    }
  }, [isGetSmtpSettingsFetching,isGetSmtpSettingsSuccess,isGetSmtpSettingsData,]);

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };

  if (isGetSmtpSettingsFetching) {
    return (
      <div>
        <DataLoader />
      </div>
    ); // Replace with a proper loading spinner or component
  }

  return (
    <div className="row mt-2 add-address-form">
      <h4 className="organization-tab-title">SMTP Settings</h4>
      <FormCreator
        config={smtpSettingData}
        ref={smtpRef}
        {...smtpSettingData}
        onActionChange={formActionHandler}
      />
      {isEditablePage ? (
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-end justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText="Save"
              onClick={handleAddEditSmtpSettings}
              isLoading={isAddEditSmtpSettingLoading}
              isDisable={isButtonDisable}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SMTPSettings;
