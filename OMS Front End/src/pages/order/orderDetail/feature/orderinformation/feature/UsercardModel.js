/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import UserCardList from "./UserCardList";
import SwalAlert from "../../../../../../services/swalService/SwalService";
import { useLazyGetContactByCustomerIdQuery, useUpdateOrderContactMutation } from "../../../../../../app/services/orderAPI";
import { toast } from "react-toastify";
import Buttons from "../../../../../../components/ui/button/Buttons";
import ToastService from "../../../../../../services/toastService/ToastService";
import DataLoader from "../../../../../../components/ui/dataLoader/DataLoader";

const UsercardModel = ({onGetContactId,setContactTypeId,handleAddContact,handleRefreshOrderDetails,orderContactId,onSidebarCloseUserModel,onSidebarCloseUpdateContact,  defaultId, onUpdate,selectedContactId,setSelectedContactId, contactTypeId, addressContactType,customerId,orderDetails,}) => {
  const [dataList, setDataList] = useState([]);
  const { confirm } = SwalAlert();
  const [isButtonDisable, setIsButtonDisable] = useState(false);
const [ getContactByCustomerId, {   isFetching: isGetContactByCustomerIdFetching,isSuccess: isGetContactByCustomerIdSuccess, data: isGetContactByCustomerIdItem },] = useLazyGetContactByCustomerIdQuery();
  const [
    updateOrderContact,
    {
      isLoading: isUpdateOrderContactLoading,
      isSuccess: isUpdateOrderContactSuccess,
      data: isUpdateOrderContactData,
    },
  ] = useUpdateOrderContactMutation();

  useEffect(() => {
    if (isUpdateOrderContactSuccess && isUpdateOrderContactData) {
      ToastService.success(isUpdateOrderContactData.errorMessage);   
      onSidebarCloseUserModel();
      handleRefreshOrderDetails();
    }
  }, [isUpdateOrderContactSuccess, isUpdateOrderContactData,]);

  useEffect(()=>{
    if(defaultId===selectedContactId){
      setIsButtonDisable(true);
    }
    else{
      setIsButtonDisable(false);
    }
  },[selectedContactId])
  
  const handleChangeContact = () => {
    if (selectedContactId) {
      confirm(
        "Change?",
        "Are you sure you want to Change Contact?",
        "Change",
        "Cancel"
      ).then((confirmed) => {
        if (confirmed) {
          const req = {
            orderContactId: orderContactId,
            orderId: orderDetails.orderId,
            contactId: selectedContactId,
            contactTypeId:contactTypeId,
          };
          updateOrderContact(req);
        }
      });
    } else {
      handlevalidate();
    }
  };

  useEffect(() => {
  
     if (addressContactType) {
      const req={
        customerId:customerId,
        searchText: "", 
        searchContactType:contactTypeId,
      }
      getContactByCustomerId(req);
     }
  }, [addressContactType,getContactByCustomerId]);

  useEffect(()=>{
    setSelectedContactId(defaultId)
  },[defaultId]);

  useEffect(() => {
    if (!isGetContactByCustomerIdFetching && isGetContactByCustomerIdSuccess && isGetContactByCustomerIdItem) {
     
      if (addressContactType === "Invoice Submission" || addressContactType === "Purchasing" ||  addressContactType === "EndUser") {
        const filteredData = addressContactType
          ? isGetContactByCustomerIdItem.filter((contact) => contact.type === addressContactType)
          : isGetContactByCustomerIdItem;
        setDataList(filteredData);
            
      }
     
    }
  }, [isGetContactByCustomerIdFetching, isGetContactByCustomerIdSuccess, isGetContactByCustomerIdItem,addressContactType]);

  const handlevalidate = () => {
    if (!selectedContactId) {
      toast.error("Please select an Address .");
      return;
    }
  };

  const handleCheckboxChange = (id,contactTypeId) => {
    if (selectedContactId === id) {
      setSelectedContactId(null);
      if (onGetContactId) {
        onGetContactId(null);
      }
    } else {
      setSelectedContactId(id);
      if (onGetContactId) {
        onGetContactId(id);
      }
      setContactTypeId(contactTypeId);
    }
  };

  return (
    <>
      <div className="row mt-3">
        {!isGetContactByCustomerIdFetching? (<>
        {dataList.map((contact)=>(
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12 mb-3" key={contact.contactId}>
          <UserCardList contact={contact} 
          onGetContactId={onGetContactId} 
          handleCheckboxChange={handleCheckboxChange} 
          selectedContactId={selectedContactId} 
          setSelectedContactId={setSelectedContactId}
           />
        </div>
        ))}
          </>):( <DataLoader />)}
      <div className="d-flex align-item-end justify-content-end mt-3">
        <Buttons
          buttonTypeClassName="theme-button"
          buttonText="Change Contact"
          isLoading={isUpdateOrderContactLoading}
          onClick={handleChangeContact}
          isDisable={isButtonDisable}
        />
        {/* <Buttons
          buttonTypeClassName="theme-button ml-3"
          buttonText="Edit Contact"
          onClick={handleEditContact}
        /> */}
        <Buttons
          buttonTypeClassName="theme-button ml-3"
          buttonText={`Add ${addressContactType} Contact`}
          onClick={handleAddContact}
        />
      </div>
    
      </div>
    </>
  );
};

export default UsercardModel;
