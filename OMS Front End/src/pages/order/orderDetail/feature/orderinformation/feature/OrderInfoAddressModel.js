/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useState } from "react";
import Checkbox from "../../../../../../components/ui/inputs/checkBox/CheckBox";
import Buttons from "../../../../../../components/ui/button/Buttons";
import { useLazyGetAddresssByCustomerIdQuery } from "../../../../../../app/services/addressAPI";
import {  useUpdateOrderAddressMutation } from "../../../../../../app/services/orderAPI";
import SwalAlert from "../../../../../../services/swalService/SwalService";
import { toast } from "react-toastify";

const OrderInfoAddressModel =({handleAddClick, onUpdate ,onSidebarCloseUpdateAddress,addressContactType,customerId,orderDetails,onGetData}) => {

const [dataList,setDataList]=useState([]);
const { confirm } = SwalAlert();
const [selectedAddressId, setSelectedAddressId] = useState(null);
const [getAddresssByCustomerId,{  isFetching: isGetAddresssByCustomerIdFetching,  isSuccess: isGetAddresssByCustomerId,  data: GetAddresssByCustomerIdData},] = useLazyGetAddresssByCustomerIdQuery();
const [ updateOrderAddress,{  isLoading: isUpdateOrderAddressLoading,  isSuccess: isUpdateOrderAddressSuccess,  data: isUpdateOrderAddressData},] = useUpdateOrderAddressMutation();

  useEffect(()=>{
    if(customerId){
    getAddresssByCustomerId(customerId);
    }
  },[customerId,addressContactType,onSidebarCloseUpdateAddress])

  useEffect(() => {
    if (!isGetAddresssByCustomerIdFetching && isGetAddresssByCustomerId && GetAddresssByCustomerIdData) {
      
      if (addressContactType === "Shipping" || addressContactType === "Billing") {
        const filteredData = addressContactType
          ? GetAddresssByCustomerIdData.filter(
              (address) => address.type === addressContactType
            )
          : GetAddresssByCustomerIdData;
        setDataList(filteredData);
      }
    }
  }, [isGetAddresssByCustomerIdFetching,isGetAddresssByCustomerId,GetAddresssByCustomerIdData]);

  const handleCheckboxChange = (id) => {
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
      if (onGetData) {
        onGetData(null); 
      }
    } else {
      setSelectedAddressId(id);
      if (onGetData) {
        onGetData(id);
      }
    }
  };
  const handlevalidate=()=>{
    if (!selectedAddressId) {
      toast.error("Please select an Address ."); 
      return;
    }
  }
  const handleEditAddress=()=>{
   
    if(selectedAddressId){
    onUpdate();
    }else{
      handlevalidate();
    }
  }

const handleChangeAddress=()=>{ 
 

if(selectedAddressId){
  const req={
      //orderAddressId: ,
      orderId:orderDetails.orderId,
      billingAddressId:dataList.addressId,
      shippingAddressId:dataList.addressId,
    }
  confirm(
    "Change?",
    "Are you sure you want to Change Address?",
    "Change",
    "Cancel"
  ).then((confirmed) => {
    if (confirmed) {
      updateOrderAddress(req);
    }
  });
}
else{
  handlevalidate();
}
};

  return (
    <div className="add-list-section">
      <div className="row">
        {dataList.map((address) => (
          <div
            className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12"
            key={address.addressId}
          >
            <div className="address-card-main">
              <div className="add-desc">
                <div className="add-line-part first-add-sec">
                  <span className="add-info">{address.name}</span>
                  <span className="checkbox-part">
                    <Checkbox
                      name={`addressId_${address.addressId}`}
                      checked={selectedAddressId === address.addressId}
                      onChange={() => handleCheckboxChange(address.addressId)}
                    />
                  </span>
                </div>
                <div className="add-line-part">{address.addressLine1}</div>
                <div className="add-line-part">{address.addressLine2}</div>
                <div className="add-line-part">{address.addressLine3}</div>
                <div className="add-line-part">{address.addressLine4}</div>
                <div className="add-line-part">{address.addressLine5}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex align-item-end justify-content-end mt-3">
        <Buttons
          buttonTypeClassName="theme-button"
          buttonText="Change Address"
          isLoading={isUpdateOrderAddressLoading}
          onClick={handleChangeAddress}
        />
        <Buttons
          buttonTypeClassName="theme-button ml-3"
          buttonText="Edit Address"
          onClick={handleEditAddress}
        />
        <Buttons
          buttonTypeClassName="theme-button ml-3"
          buttonText="Add Address"
          onClick={handleAddClick}
        />
      </div>
    </div>
  );
};

export default OrderInfoAddressModel;
