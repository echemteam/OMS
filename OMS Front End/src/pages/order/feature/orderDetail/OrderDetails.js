import React, { useEffect, useRef, useState } from "react";
import { orderInformationData } from "./config/OrderInformation.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import SwalAlert from "../../../../services/swalService/SwalService";
import { useGetAllSubCustomerByCustomerIdMutation,useLazyGetAllCustomersQuery } from "../../../../app/services/commonAPI";
import { setDropDownOptionField, setFieldSetting } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import { FieldSettingType } from "../../../../utils/Enums/commonEnums";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../data/appIcons";
import Buttons from "../../../../components/ui/button/Buttons";
import { addressFormData } from "../../../../../src/common/features/component/Address/config/AddressForm.data";

const OrderDetails = () => {
  const basicInformation = useRef();

  const [formData, setFormData] = useState(orderInformationData);
   const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  const { blocked } = SwalAlert();
  const [getAllCustomers, { isFetching:isGetAllCustomersFetching,isSuccess: isGetAllCustomersSuccess, data: isGetAllCustomersData }] = useLazyGetAllCustomersQuery();
  const [getAllSubCustomerByCustomerId, { isFetching:isGetAllSubCustomersFetching,isSuccess: isGetAllSubCustomersSuccess, data: isGetAllSubCustomersData }] = useGetAllSubCustomerByCustomerIdMutation();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const ref = useRef();
  const [formAddressData, setFormAddressData] = useState(addressFormData);

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };

  useEffect(() => {
    getAllCustomers();
  },[]);

  useEffect(() => {
    if (!isGetAllCustomersFetching && isGetAllCustomersSuccess && isGetAllCustomersData) {
      const customerData = isGetAllCustomersData.map((item) => ({
        value: item.customerId,
        label: item.name,
        date:item.createdAt,
        status:item.statusName,
        isBuyingForThirdParty: item.isBuyingForThirdParty
      }));
      console.log(customerData)
      const dropdownField = orderInformationData?.formFields?.find(item => item.dataField === "customerId");
       
      dropdownField.fieldSetting.options = customerData
    
     // setShouldRerenderFormCreator((prevState) => !prevState);
     }
  }, [isGetAllCustomersFetching,isGetAllCustomersSuccess,isGetAllCustomersData]);

  useEffect(() => {
  debugger
    if (!isGetAllSubCustomersFetching && isGetAllSubCustomersSuccess && isGetAllSubCustomersData) {
      const subcustomerData = isGetAllSubCustomersData.map((item) => ({
        value: item.subCustomerMainCustomerId,
        label: item.subCustomerName,
         date:item.createdAt,
         status:item.statusName
      }));
      const dropdownField = orderInformationData?.formFields?.find(item => item.dataField === "subCustomerMainCustomerId");

      dropdownField.fieldSetting.options = subcustomerData;
    //setShouldRerenderFormCreator((prevState) => !prevState);
    }
  },  [isGetAllSubCustomersFetching,isGetAllSubCustomersSuccess,isGetAllSubCustomersData]);


  useEffect(()=>{
   
    let newFrom = { ...orderInformationData };
    newFrom.formFields = newFrom.formFields.filter(field => field.dataField !== "subCustomerMainCustomerId" );
    setFormData(newFrom);

  },[])
 

  const handleChangeDropdownList = (data, dataField) => {
    if (dataField === "customerId") {
      if (data.isBuyingForThirdParty === true) {
        getAllSubCustomerByCustomerId(data.value);
       const manageData = { ...formData };
        let filteredFormFields;
        filteredFormFields = orderInformationData.formFields
        manageData.formFields = filteredFormFields;
        setFormData(manageData)
        basicInformation.current.updateFormFieldValue({
          customerId: data.value,
          subCustomerMainCustomerId:null
      });
      setFormData(manageData);
      }
   }
   
    const blockedOptionValue = "blocked";

    if (data.status === blockedOptionValue) {
      blocked(
        "Blocked !",
        "The selected customer is currently blocked. Please choose a different customer",
        "OK",
        "Cancel"
      ).then((result) => {
        if (result) {
          console.log("User acknowledged the blocked status alert.");
        }
      });
    }
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };

  const handleInputGroupButton = () => {
    setIsModelOpen(true);
  };

  return (
    <>
      <div className="row">
        <FormCreator
          config={formData}
          ref={basicInformation}
          {...formData}
           key={shouldRerenderFormCreator}
          onActionChange={formActionHandler}
          handleInputGroupButton={handleInputGroupButton}
        />
      </div>
      <div className="row address-group">
        <div className="col-4"></div>
        <div className="col-4 address">
          <div>Chemistry Research Laboratory</div>
          <div>MansField Road</div>
          <div>Oxford</div>
          <div>United Kingdom, Oxfordshire OX1 3TA</div>
        </div>
        <div className="col-4 address">
          <div>Chemistry Research Laboratory</div>
          <div>MansField Road</div>
          <div>Oxford</div>
          <div>United Kingdom, Oxfordshire OX1 3TA</div>
        </div>
      </div>

      <Buttons
        buttonTypeClassName="theme-button"
        buttonText="Cancel"
        onClick={handleToggleModal}
      />

      <SidebarModel
        modalTitle="Shipping Address"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <div className="mt-2">
          <FormCreator
            config={formAddressData}
            ref={ref}
            {...formAddressData}
          />
        </div>
      </SidebarModel>
    </>
  );
};

export default OrderDetails;
