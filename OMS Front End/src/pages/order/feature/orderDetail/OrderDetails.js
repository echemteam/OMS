/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { orderInformationData } from "./config/OrderInformation.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import SwalAlert from "../../../../services/swalService/SwalService";
import {
  useGetAllSubCustomerByCustomerIdMutation,
  useLazyGetAllCustomersQuery,
  useLazyGetAllAddressesByCustomerIdAndAddressTypeIdQuery,
  useLazyGetAllOrderMethodQuery,
} from "../../../../app/services/commonAPI";
import { setDropDownOptionField } from "../../../../utils/FormFields/FieldsSetting/SetFieldSetting";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../data/appIcons";
import { addressFormData } from "../../../../../src/common/features/component/Address/config/AddressForm.data";
import { AddressType } from "../../../../utils/Enums/commonEnums";
import NoRecordFound from "../../../../components/ui/noRecordFound/NoRecordFound";
import AddEditAddress from "../../../../common/features/component/Address/feature/AddEditAddress";
import {
  useAddAddressMutation,
  useLazyGetAllAddressTypesQuery,
  useLazyGetCustomerAddresssByAddressIdQuery,
  useUpdateAddAddressMutation,
} from "../../../../app/services/addressAPI";
import AddOrderContext from "../../../../utils/Order/AddOrderContext";
import {
  // useAddEditOrderInformationMutation,
  useCheckPoNumberExistOrNotMutation,
  useLazyGetPoNumberDetailsByPoNumberQuery,
} from "../../../../app/services/orderAPI";
import ToastService from "../../../../services/toastService/ToastService";
import ExistingCustomerSupplierInfo from "../../../../common/features/component/ExistingInfo/ExistingCustomerSupplierInfo";
import { useNavigate } from "react-router-dom";

const OrderDetails = ({ onHandleOrderInformation }) => {
  const basicInformation = useRef();
  const parentRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(orderInformationData);
  const [isSubCustomerDropdownVisible, setIsSubCustomerDropdownVisible] =
    useState(false);
  const { blocked } = SwalAlert();
  const [
    getAllCustomers,
    {
      isFetching: isGetAllCustomersFetching,
      isSuccess: isGetAllCustomersSuccess,
      data: isGetAllCustomersData,
    },
  ] = useLazyGetAllCustomersQuery();
  const [
    getAllSubCustomerByCustomerId,
    {
      isFetching: isGetAllSubCustomersFetching,
      isSuccess: isGetAllSubCustomersSuccess,
      data: isGetAllSubCustomersData,
    },
  ] = useGetAllSubCustomerByCustomerIdMutation();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [getShippingAddressData, setGetShippingAddressData] = useState(null);
  const [getBillingAddressData, setGetBillingAddressData] = useState(null);
  const [getAddressTypeId, setGetAddressTypeId] = useState(null);
  const [poNumber, setPoNumber] = useState("");

  const {
    nextStepRef,
    orderCustomerId,
    setOrderCustomerId,
    moveNextPage,
    orderId,
  } = useContext(AddOrderContext);

  const [
    getAllShippingAddress,
    {
      isFetching: isGetAllShippingAddressFetching,
      isSuccess: isGetAllShippingAddressSuccess,
      data: isGetAllShippingAddressData,
    },
  ] = useLazyGetAllAddressesByCustomerIdAndAddressTypeIdQuery();
  const [
    getAllBillingAddress,
    {
      isFetching: isGetAllBillingAddressFetching,
      isSuccess: isGetAllBillingAddressSuccess,
      data: isGetAllBillingAddressData,
    },
  ] = useLazyGetAllAddressesByCustomerIdAndAddressTypeIdQuery();
  const [
    getAllAddressTypes,
    { isSuccess: isGetAllAddressTypesSucess, data: allGetAllAddressTypesData },
  ] = useLazyGetAllAddressTypesQuery();
  const [
    getAllOrderMethod,
    { isSuccess: isGetAllOrderMethodSucess, data: allGetAllOrderMethodData },
  ] = useLazyGetAllOrderMethodQuery();
  const [
    checkPoNumberExistOrNot,
    {
      isSuccess: isCheckPoNumberExistOrNotSucess,
      data: isCheckPoNumberExistOrNotData,
    },
  ] = useCheckPoNumberExistOrNotMutation();

  useEffect(() => {
    if (isGetAllAddressTypesSucess && allGetAllAddressTypesData) {
      const filterCondition = (item) => {
        let condition = item.isForCustomers;
        return condition;
      };
      setDropDownOptionField(
        allGetAllAddressTypesData,
        "addressTypeId",
        "type",
        addressFormData,
        "addressTypeId",
        filterCondition
      );
    }
  }, [isGetAllAddressTypesSucess, allGetAllAddressTypesData]);

  useEffect(() => {
    if (isGetAllOrderMethodSucess && allGetAllOrderMethodData) {
      setDropDownOptionField(
        allGetAllOrderMethodData,
        "orderMethodId",
        "orderMethod",
        orderInformationData,
        "orderMethodId"
      );
    }
  }, [isGetAllOrderMethodSucess, allGetAllOrderMethodData]);

  useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        addressTypeId: AddressType.SHIPPING,
      };
      getAllShippingAddress(req);
    }
  }, [orderCustomerId]);

  useEffect(() => {
    if (orderCustomerId) {
      let req = {
        customerId: orderCustomerId,
        addressTypeId: AddressType.BILLING,
      };
      getAllBillingAddress(req);
    }
  }, [orderCustomerId]);

  useEffect(() => {
    getAllAddressTypes();
    getAllOrderMethod();
  }, []);

  useEffect(() => {
    if (
      !isGetAllShippingAddressFetching &&
      isGetAllShippingAddressSuccess &&
      isGetAllShippingAddressData
    ) {
      const getContact = isGetAllShippingAddressData.map((item) => ({
        value: item.addressId,
        label: item.addressLine1,
      }));

      // Create a new formData object to trigger re-render
      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData };
        const dropdownField = newFormData.formFields?.find(
          (item) => item.dataField === "isShippingId"
        );
        if (dropdownField) {
          dropdownField.fieldSetting.options = getContact;
        }
        return newFormData;
      });
    }
  }, [
    isGetAllShippingAddressFetching,
    isGetAllShippingAddressSuccess,
    isGetAllShippingAddressData,
  ]);

  useEffect(() => {
    if (
      !isGetAllBillingAddressFetching &&
      isGetAllBillingAddressSuccess &&
      isGetAllBillingAddressData
    ) {
      const getContact = isGetAllBillingAddressData.map((item) => ({
        value: item.addressId,
        label: item.addressLine1,
      }));

      // Create a new formData object to trigger re-render
      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData };
        const dropdownField = newFormData.formFields?.find(
          (item) => item.dataField === "isBillingId"
        );
        if (dropdownField) {
          dropdownField.fieldSetting.options = getContact;
        }
        return newFormData;
      });
    }
  }, [
    isGetAllBillingAddressFetching,
    isGetAllBillingAddressSuccess,
    isGetAllBillingAddressData,
  ]);

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const handleOrderInfoRepeatCall = () => {
    let req = {
      customerId: orderCustomerId,
      addressTypeId: AddressType.SHIPPING,
    };
    getAllShippingAddress(req);
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    if (
      !isGetAllCustomersFetching &&
      isGetAllCustomersSuccess &&
      isGetAllCustomersData
    ) {
      const customerData = isGetAllCustomersData.map((item) => ({
        value: item.customerId,
        label: item.name,
        date: item.createdAt,
        status: item.statusName,
        isBuyingForThirdParty: item.isBuyingForThirdParty,
      }));
      const dropdownField = formData?.formFields?.find(
        (item) => item.dataField === "customerId"
      );

      dropdownField.fieldSetting.options = customerData;

      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [
    isGetAllCustomersFetching,
    isGetAllCustomersSuccess,
    isGetAllCustomersData,
  ]);

  useEffect(() => {
    if (
      !isGetAllSubCustomersFetching &&
      isGetAllSubCustomersSuccess &&
      isGetAllSubCustomersData
    ) {
      if (isGetAllSubCustomersData.length === 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          formFields: prevFormData.formFields.filter(
            (field) => field.dataField !== "subCustomerMainCustomerId"
          ),
        }));
      } else {
        const subcustomerOptions = isGetAllSubCustomersData.map((item) => ({
          value: item.subCustomerId,
          label: item.subCustomerName,
        }));
        setFormData((prevFormData) => {
          const updatedFormData = { ...prevFormData };
          const dropdownField = updatedFormData.formFields?.find(
            (item) => item.dataField === "subCustomerMainCustomerId"
          );
          if (dropdownField) {
            dropdownField.fieldSetting.options = subcustomerOptions;
          }
          return updatedFormData;
        });
      }
    }
  }, [
    isGetAllSubCustomersFetching,
    isGetAllSubCustomersSuccess,
    isGetAllSubCustomersData,
  ]);

  useEffect(() => {
    if (!isSubCustomerDropdownVisible) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        formFields: prevFormData.formFields.filter(
          (field) => field.dataField !== "subCustomerMainCustomerId"
        ),
      }));
    }
  }, [isSubCustomerDropdownVisible]);

  const handleChangeDropdownList = (data, dataField) => {
    if (dataField === "customerId") {
      setOrderCustomerId(data.value);
      if (data.isBuyingForThirdParty) {
        getAllSubCustomerByCustomerId(data.value);
        setFormData({ ...orderInformationData });
        basicInformation.current.updateFormFieldValue({
          customerId: data.value,
          subCustomerMainCustomerId: null,
          isBillingId: null,
          isShippingId: null,
        });
        setGetShippingAddressData(null)
        setGetBillingAddressData(null)
      } else {
        setIsSubCustomerDropdownVisible(false);
      }
    }

    const blockedOptionValue = "Blocked";
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
    if (data.value && dataField === "isShippingId") {
      const finalData = isGetAllShippingAddressData?.filter(
        (item) => item.addressId === data.value
      );
      setGetShippingAddressData(finalData.length ? finalData[0] : null);
    }
    if (data.value && dataField === "isBillingId") {
      const finalData = isGetAllBillingAddressData?.filter(
        (item) => item.addressId === data.value
      );
      setGetBillingAddressData(finalData.length ? finalData[0] : null);
    }
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };

  useEffect(() => {
    if (isCheckPoNumberExistOrNotSucess && isCheckPoNumberExistOrNotData) {
      if (isCheckPoNumberExistOrNotData.errorMessage.includes("exists")) {
        ToastService.warning(isCheckPoNumberExistOrNotData.errorMessage);
        return;
      }
      ToastService.info(isCheckPoNumberExistOrNotData.errorMessage);
    }
  }, [isCheckPoNumberExistOrNotSucess, isCheckPoNumberExistOrNotData]);

  const handleInputGroupButton = (id) => {
    if (orderCustomerId) {
      if (typeof id === "number" && id > 0) {
        setGetAddressTypeId(id);
        setIsModelOpen(!isModelOpen);
      } else if (
        typeof id !== "number" &&
        id.target &&
        id.target.textContent === "Verify"
      ) {
        if (poNumber !== "") {
          let request = {
            customerId: orderCustomerId,
            poNumber: poNumber,
          };
          checkPoNumberExistOrNot(request);
        }
      } else if (id === "CustomerName" || id === "SubCustomer") {
        navigate(`/addCustomer`);
      }
    } else if (id === "CustomerName" || id === "SubCustomer") {
      navigate(`/addCustomer`);
    } else {
      ToastService.warning("Please Add Customer Name");
    }
  };

  const updatedFormData = { ...formData };
  if (!isSubCustomerDropdownVisible) {
    updatedFormData.formFields = updatedFormData.formFields.filter(
      (field) => field.dataField !== "subCustomerMainCustomerId"
    );
  }

  const handleExistingInfo = () => {
    if (poNumber !== "" && poNumber.trim().length >= 3) {
      if (parentRef.current) {
        parentRef.current.callChildFunction(poNumber);
      }
    } else {
      ToastService.warning("Please enter at least three characters.");
    }
  };

  const handleInputFields = (data, dataField) => {
    if (dataField === "poNumber") {
      const trimCustomerName = data.replace(/\s+/g, "");
      setPoNumber(trimCustomerName);
    }
  };

  const formInputHandler = {
    INPUT_CHANGED: handleInputFields,
  };

  useImperativeHandle(nextStepRef, () => ({
    handleAddOrderInformation,
  }));

  const handleAddOrderInformation = () => {
    let data = basicInformation.current.getFormData();
    if (data) {
      let req = {
        orderId: orderId ? orderId : 0,
        orderMethodId:
          data.orderMethodId && typeof data.orderMethodId === "object"
            ? data.orderMethodId.value
            : data.orderMethodId,
        orderReceivedDate: data.orderReceivedDate,
        orderAddressId: 0,
        customerId:
          data.customerId && typeof data.customerId === "object"
            ? data.customerId.value
            : data.customerId,
        subCustomerId:
          data.subCustomerMainCustomerId &&
            typeof data.subCustomerMainCustomerId === "object"
            ? data.subCustomerMainCustomerId.value
            : data.subCustomerMainCustomerId,
        poNumber: data.poNumber,
        billingAddressId:
          data.isBillingId && typeof data.isBillingId === "object"
            ? data.isBillingId.value
            : data.isBillingId,
        shippingAddressId:
          data.isShippingId && typeof data.isShippingId === "object"
            ? data.isShippingId.value
            : data.isShippingId,
      };
      // addEditOrderInformation(req);
      onHandleOrderInformation(req)
      moveNextPage();
    }
  };

  return (
    <>
      <div className="row">
        <FormCreator
          config={formData}
          ref={basicInformation}
          {...formData}
          onActionChange={formActionHandler}
          handleInputGroupButton={handleInputGroupButton}
          onInputChange={formInputHandler}
          onClick={handleAddOrderInformation}
          handleInputShowInfo={handleExistingInfo}
        />
      </div>
      <div className="row address-group">
        {/* <div className="col-4"></div> */}
        <div className="col-4">
          <div className="address">
            {getBillingAddressData ? (
              <>
                <div>{getBillingAddressData.addressLine1}</div>
                <div>{getBillingAddressData.addressLine2}</div>
                <div>{getBillingAddressData.cityName}</div>
                <div>{getBillingAddressData.stateName}</div>
                <div>
                  {getBillingAddressData.countryName},{" "}
                  {getBillingAddressData.zipCode}
                </div>
              </>
            ) : (
              <NoRecordFound />
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="address">
            {getShippingAddressData ? (
              <>
                <div>{getShippingAddressData.addressLine1}</div>
                <div>{getShippingAddressData.addressLine2}</div>
                <div>{getShippingAddressData.cityName}</div>
                <div>{getShippingAddressData.stateName}</div>
                <div>
                  {getShippingAddressData.countryName},{" "}
                  {getShippingAddressData.zipCode}
                </div>
              </>
            ) : (
              <NoRecordFound />
            )}
          </div>
        </div>
      </div>

      <ExistingCustomerSupplierInfo
        parentRef={parentRef}
        isOrderManage={true}
        isSupplier={false}
        getExistingInfoByName={useLazyGetPoNumberDetailsByPoNumberQuery}
      />

      <SidebarModel
        modalTitle="Add/Edit Address"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        {/* <div className="mt-2">
          <FormCreator
            config={formAddressData}
            ref={ref}
            {...formAddressData}
          />
        </div> */}
        <AddEditAddress
          // editRef={editRef}
          // isSupplier={isSupplier}
          isModelOpen={isModelOpen}
          // editMode={editMode}
          // keyId={keyId}
          // isButtonDisable={isButtonDisable}
          isOrderManage={true}
          updateAddress={useUpdateAddAddressMutation}
          addAddress={useAddAddressMutation}
          getAddresssById={useLazyGetCustomerAddresssByAddressIdQuery}
          onSidebarClose={onSidebarClose}
          getAddressTypeIdOrder={getAddressTypeId}
          orderCustomerId={orderCustomerId}
          onHandleOrderInfoRepeatCall={handleOrderInfoRepeatCall}
        />
      </SidebarModel>
    </>
  );
};

export default OrderDetails;
