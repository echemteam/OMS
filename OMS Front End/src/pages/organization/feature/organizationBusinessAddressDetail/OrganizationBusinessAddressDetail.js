/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { PhysicalAddressForm } from "./config/PhysicalAddressForm.data";
import PhysicalAddressDetail from "./features/PhysicalAddressDetail";
import { BillToAddressForm } from "./config/BillToAddressForm.data";
import BillToAddressDetail from "./features/BillToAddressDetail";
import { LabAddressForm } from "./config/LabAddressForm.data";
import LabAddressDetail from "./features/LabAddressDetail";
import { WarehouseAddressForm } from "./config/WarehouseAddressForm.data";
import WarehouseAddressDetail from "./features/WarehouseAddressDetail";
import { RegisteredAddressForm } from "./config/RegisteredAddressForm.data";
import RegisteredAddressDetail from "./features/RegisteredAddressDetail";
import Buttons from "../../../../components/ui/button/Buttons";
import { useAddEditBusinessAddressesMutation, useLazyGetOrganizationBusinessAddressesQuery } from "../../../../app/services/organizationAPI";
import ToastService from "../../../../services/toastService/ToastService";

const OrganizationBusinessAddressDetail = () => {

  const physicalAddressRef = useRef();
  const billToAddressRef = useRef();
  const labAddressRef = useRef();
  const warehouseAddressRef = useRef();
 // const remitToAddressRef=useRef();
  const registeredAddressRef=useRef();

  const [physicalAddressData, setPhysicalAddressData] =useState(PhysicalAddressForm);
  const [billToAddressData, setBillToAddressData] = useState(BillToAddressForm);
  const [labAddressData, setLabAddressData] = useState(LabAddressForm);
  const [warehouseAddressData, setWarehouseAddressData] = useState(WarehouseAddressForm);
 // const [remitToAddressData,setRemitToAddressData]=useState(registeredBankAddressForm)
  const [registeredAddressData,setRegisteredAddressData]=useState(RegisteredAddressForm)

  const [addressIds, setAddressIds] = useState({
    registeredAddressId: 0,
    organizationBusinessAddressId: 0,
    physicalAddressId: 0,
    billToAddressId: 0,
    labAddressId: 0,
    remitToAddressId:0,
    warehouseAddressId: 0,
  });

  const [addEditBusinessAddresses, { isLoading: isAddEditBusinessAddressLoading, isSuccess: isAddEditBusinessAddressSuccess, data: isAddEditBusinessAddressData }] = useAddEditBusinessAddressesMutation();
 
  const [getOrganizationBusinessAddresses, { isFetching: isGetOrganizationBusinessAddressesFetching, isSuccess: isGetOrganizationBusinessAddressesSuccess, data: isGetOrganizationBusinessAddressesData }] = useLazyGetOrganizationBusinessAddressesQuery();
  useEffect(()=>{
    getOrganizationBusinessAddresses();
  },[])
  useEffect(() => {
 
    if (!isGetOrganizationBusinessAddressesFetching && isGetOrganizationBusinessAddressesSuccess && isGetOrganizationBusinessAddressesData) {
      let formPhysicalData = { ...physicalAddressData };
      let formBillToAddressData = { ...billToAddressData };
      let formLabData = { ...labAddressData };
      let formWarehouseData = { ...warehouseAddressData };
      let formRegisteredData = { ...registeredAddressData };
      if(isGetOrganizationBusinessAddressesData){

      if (isGetOrganizationBusinessAddressesData.physicalAddress) {
        formPhysicalData.initialState = {
          addressId: isGetOrganizationBusinessAddressesData.physicalAddress.addressId,
          addressLine1Id: isGetOrganizationBusinessAddressesData.physicalAddress.addressLine1,
          addressLine2Id: isGetOrganizationBusinessAddressesData.physicalAddress.addressLine2,
          cityId: isGetOrganizationBusinessAddressesData.physicalAddress.cityId,
          stateId: isGetOrganizationBusinessAddressesData.physicalAddress.stateId,
          countryId: isGetOrganizationBusinessAddressesData.physicalAddress.countryId,
          zipCode: isGetOrganizationBusinessAddressesData.physicalAddress.zipCode
        };
        setPhysicalAddressData(formPhysicalData);
       
      }

      if (isGetOrganizationBusinessAddressesData.billToAddress) {
        formBillToAddressData.initialState = {
          addressId: isGetOrganizationBusinessAddressesData.billToAddress.addressId,
          addressLine1Id: isGetOrganizationBusinessAddressesData.billToAddress.addressLine1,
          addressLine2Id: isGetOrganizationBusinessAddressesData.billToAddress.addressLine2,
          cityId: isGetOrganizationBusinessAddressesData.billToAddress.cityId,
          stateId: isGetOrganizationBusinessAddressesData.billToAddress.stateId,
          countryId: isGetOrganizationBusinessAddressesData.billToAddress.countryId,
          zipCode: isGetOrganizationBusinessAddressesData.billToAddress.zipCode
        };
        setBillToAddressData(formBillToAddressData);
       
      }

      if (isGetOrganizationBusinessAddressesData.labAddress) {
        formLabData.initialState = {
          addressId: isGetOrganizationBusinessAddressesData.labAddress.addressId,
          addressLine1Id: isGetOrganizationBusinessAddressesData.labAddress.addressLine1,
          addressLine2Id: isGetOrganizationBusinessAddressesData.labAddress.addressLine2,
          cityId: isGetOrganizationBusinessAddressesData.labAddress.cityId,
          stateId: isGetOrganizationBusinessAddressesData.labAddress.stateId,
          countryId: isGetOrganizationBusinessAddressesData.labAddress.countryId,
          zipCode: isGetOrganizationBusinessAddressesData.labAddress.zipCode
        };
        setLabAddressData(formLabData);
       
      }

      if (isGetOrganizationBusinessAddressesData.warehouseAddress) {
        formWarehouseData.initialState = {
          addressId: isGetOrganizationBusinessAddressesData.warehouseAddress.addressId,
          addressLine1Id: isGetOrganizationBusinessAddressesData.warehouseAddress.addressLine1,
          addressLine2Id: isGetOrganizationBusinessAddressesData.warehouseAddress.addressLine2,
          cityId: isGetOrganizationBusinessAddressesData.warehouseAddress.cityId,
          stateId: isGetOrganizationBusinessAddressesData.warehouseAddress.stateId,
          countryId: isGetOrganizationBusinessAddressesData.warehouseAddress.countryId,
          zipCode: isGetOrganizationBusinessAddressesData.warehouseAddress.zipCode
        };
        setWarehouseAddressData(formWarehouseData);
     
      }

      if (isGetOrganizationBusinessAddressesData.registeredAddress) {
        formRegisteredData.initialState = {
          addressId: isGetOrganizationBusinessAddressesData.registeredAddress.addressId,
          addressLine1Id: isGetOrganizationBusinessAddressesData.registeredAddress.addressLine1,
          addressLine2Id: isGetOrganizationBusinessAddressesData.registeredAddress.addressLine2,
          cityId: isGetOrganizationBusinessAddressesData.registeredAddress.cityId,
          stateId: isGetOrganizationBusinessAddressesData.registeredAddress.stateId,
          countryId: isGetOrganizationBusinessAddressesData.registeredAddress.countryId,
          zipCode: isGetOrganizationBusinessAddressesData.registeredAddress.zipCode
        };
        setRegisteredAddressData(formRegisteredData);  
        
    }
    setAddressIds({
      organizationBusinessAddressId: isGetOrganizationBusinessAddressesData.organizationBusinessAddressId,
      physicalAddressId: isGetOrganizationBusinessAddressesData.physicalAddressId,
      billToAddressId: isGetOrganizationBusinessAddressesData.billToAddressId,
      labAddressId: isGetOrganizationBusinessAddressesData.labAddressId,
      warehouseAddressId: isGetOrganizationBusinessAddressesData.warehouseAddressId,
      remitToAddressId:isGetOrganizationBusinessAddressesData.remitToAddressId,
      registeredAddressId: isGetOrganizationBusinessAddressesData.registeredAddressId,
    });
      }
    }
  }, [isGetOrganizationBusinessAddressesFetching, isGetOrganizationBusinessAddressesSuccess, isGetOrganizationBusinessAddressesData]);
 
  useEffect(() => {
    if (isAddEditBusinessAddressSuccess && isAddEditBusinessAddressData) {
      ToastService.success(isAddEditBusinessAddressData.errorMessage);
    }
  }, [isAddEditBusinessAddressSuccess, isAddEditBusinessAddressData]);


  const handleAddEditBusinessAddress=()=>{
 
    let physicalAddressFormData = physicalAddressRef.current.getFormData();
    let billToAddressFormData = billToAddressRef.current.getFormData();
    let labAddressFormData = labAddressRef.current.getFormData();
    let warehouseAddressFormData = warehouseAddressRef.current.getFormData();
   // let remitToAddressFormData = remitToAddressRef.current.getFormData();
    let registeredAddressFormData = registeredAddressRef.current.getFormData();
  
    if(physicalAddressFormData && billToAddressFormData && labAddressFormData && warehouseAddressFormData && registeredAddressFormData){
        let requestData={
            physicalAddress: {
                addressId: physicalAddressFormData.addressId ? physicalAddressFormData.addressId : 0,
                addressLine1: physicalAddressFormData.addressLine1Id,
                addressLine2: physicalAddressFormData.addressLine2Id,
                cityId: physicalAddressFormData.cityId && typeof physicalAddressFormData.cityId === "object" ? physicalAddressFormData.cityId.value : physicalAddressFormData.cityId,
                stateId: physicalAddressFormData.stateId && typeof physicalAddressFormData.stateId === "object" ? physicalAddressFormData.stateId.value : physicalAddressFormData.stateId,
                countryId: physicalAddressFormData.countryId && typeof physicalAddressFormData.countryId === "object" ? physicalAddressFormData.countryId.value : physicalAddressFormData.countryId,
                zipCode: physicalAddressFormData.zipCode
              },
              billToAddress: {
                addressId: billToAddressFormData.addressId ? billToAddressFormData.addressId : 0,
                addressLine1: billToAddressFormData.addressLine1Id,
                addressLine2: billToAddressFormData.addressLine2Id,
                cityId: billToAddressFormData.cityId && typeof billToAddressFormData.cityId === "object" ? billToAddressFormData.cityId.value : billToAddressFormData.cityId,
                stateId: billToAddressFormData.stateId && typeof billToAddressFormData.stateId === "object" ? billToAddressFormData.stateId.value : billToAddressFormData.stateId,
                countryId: billToAddressFormData.countryId && typeof billToAddressFormData.countryId === "object" ? billToAddressFormData.countryId.value : billToAddressFormData.countryId,
                zipCode: billToAddressFormData.zipCode
              },
              labAddress: {
                addressId: labAddressFormData.addressId ? labAddressFormData.addressId : 0,
                addressLine1: labAddressFormData.addressLine1Id,
                addressLine2: labAddressFormData.addressLine2Id,
                cityId: labAddressFormData.cityId && typeof labAddressFormData.cityId === "object" ? labAddressFormData.cityId.value : labAddressFormData.cityId,
                stateId: labAddressFormData.stateId && typeof labAddressFormData.stateId === "object" ? labAddressFormData.stateId.value : labAddressFormData.stateId,
                countryId: labAddressFormData.countryId && typeof labAddressFormData.countryId === "object" ? labAddressFormData.countryId.value : labAddressFormData.countryId,
                zipCode: labAddressFormData.zipCode
              },

              warehouseAddress: {
                addressId: warehouseAddressFormData.addressId ? warehouseAddressFormData.addressId : 0,
                addressLine1: warehouseAddressFormData.addressLine1Id,
                addressLine2: warehouseAddressFormData.addressLine2Id,
                cityId: warehouseAddressFormData.cityId && typeof warehouseAddressFormData.cityId === "object" ? warehouseAddressFormData.cityId.value : warehouseAddressFormData.cityId,
                stateId: warehouseAddressFormData.stateId && typeof warehouseAddressFormData.stateId === "object" ? warehouseAddressFormData.stateId.value : warehouseAddressFormData.stateId,
                countryId: warehouseAddressFormData.countryId && typeof warehouseAddressFormData.countryId === "object" ? warehouseAddressFormData.countryId.value : warehouseAddressFormData.countryId,
                zipCode: warehouseAddressFormData.zipCode
              },

              registeredAddress: {
                addressId: registeredAddressFormData.addressId ? registeredAddressFormData.addressId : 0,
                addressLine1: registeredAddressFormData.addressLine1Id,
                addressLine2: registeredAddressFormData.addressLine2Id,
                cityId: registeredAddressFormData.cityId && typeof registeredAddressFormData.cityId === "object" ? registeredAddressFormData.cityId.value : registeredAddressFormData.cityId,
                stateId: registeredAddressFormData.stateId && typeof registeredAddressFormData.stateId === "object" ? registeredAddressFormData.stateId.value : registeredAddressFormData.stateId,
                countryId: registeredAddressFormData.countryId && typeof registeredAddressFormData.countryId === "object" ? registeredAddressFormData.countryId.value : registeredAddressFormData.countryId,
                zipCode: registeredAddressFormData.zipCode
              },
              registeredAddressId: addressIds.registeredAddressId,
              organizationBusinessAddressId: addressIds.organizationBusinessAddressId,
              physicalAddressId: addressIds.physicalAddressId,
              billToAddressId: addressIds.billToAddressId,
              labAddressId: addressIds.labAddressId,
              remitToAddressId:addressIds.remitToAddressId,
              warehouseAddressId: addressIds.warehouseAddressId,
        }
        addEditBusinessAddresses(requestData);
    }
  }

  return (

    <div>
     <RegisteredAddressDetail registeredAddressData={registeredAddressData} RegisteredAddressForm={RegisteredAddressForm} registeredAddressRef={registeredAddressRef} />
     
      <PhysicalAddressDetail   physicalAddressData={physicalAddressData} PhysicalAddressForm={PhysicalAddressForm} physicalAddressRef={physicalAddressRef} />

      <BillToAddressDetail billToAddressData={billToAddressData} BillToAddressForm={BillToAddressForm}  billToAddressRef={billToAddressRef} />

      <LabAddressDetail labAddressRef={labAddressRef} LabAddressForm={LabAddressForm} labAddressData={labAddressData}/>

      <WarehouseAddressDetail warehouseAddressRef={warehouseAddressRef} WarehouseAddressForm={WarehouseAddressForm}  warehouseAddressData={warehouseAddressData}/>

      {/* <RegisteredBankAddressDetail remitToAddressData={remitToAddressData} remitToAddressRef={remitToAddressRef}/> */}
      <div className="col-md-12">
        <div className="d-flex align-item-end justify-content-end" >
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Save"
            isLoading={isAddEditBusinessAddressLoading}
            onClick={handleAddEditBusinessAddress}
          />
        </div>
      </div>
      </div>
 
  );
};

OrganizationBusinessAddressDetail.propTypes = {
  registeredAddressData: PropTypes.object,
  physicalAddressData: PropTypes.object,
  billToAddressData: PropTypes.object,
  labAddressData: PropTypes.object,
  warehouseAddressData: PropTypes.object
};
export default OrganizationBusinessAddressDetail;
