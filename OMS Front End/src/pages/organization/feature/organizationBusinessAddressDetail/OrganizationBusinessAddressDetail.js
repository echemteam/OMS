/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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
import { RemitToAddressForm } from "./config/RemitToAddressForm.data";
import RemitToAddressDetail from "./features/RemitToAddressDetail";

const OrganizationBusinessAddressDetail = () => {

  const physicalAddressRef = useRef();
  const billToAddressRef = useRef();
  const labAddressRef = useRef();
  const warehouseAddressRef = useRef();
  const remitToAddressRef=useRef();
  const registeredAddressRef=useRef();

  const [physicalAddressData, setPhysicalAddressData] =useState(PhysicalAddressForm);
  const [billToAddressData, setBillToAddressData] = useState(BillToAddressForm);
  const [labAddressData, setLabAddressData] = useState(LabAddressForm);
  const [warehouseAddressData, setWarehouseAddressData] = useState(WarehouseAddressForm);
 const [remitToAddressData,setRemitToAddressData]=useState(RemitToAddressForm)
  const [registeredAddressData,setRegisteredAddressData]=useState(RegisteredAddressForm);

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
      if(isGetOrganizationBusinessAddressesData){

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
      getOrganizationBusinessAddresses();
    }
  }, [isAddEditBusinessAddressSuccess, isAddEditBusinessAddressData]);


  const handleAddEditBusinessAddress=()=>{
 
    let physicalAddressFormData = physicalAddressRef.current.getFormData();
    let billToAddressFormData = billToAddressRef.current.getFormData();
    let labAddressFormData = labAddressRef.current.getFormData();
    let warehouseAddressFormData = warehouseAddressRef.current.getFormData();
    let remitToAddressFormData = remitToAddressRef.current.getFormData();
    let registeredAddressFormData = registeredAddressRef.current.getFormData();
  
    if(physicalAddressFormData && billToAddressFormData && remitToAddressFormData && labAddressFormData && warehouseAddressFormData && registeredAddressFormData){
      const extractId = (item, key) => (item[key] && typeof item[key] === "object" ? item[key].value : item[key]);
      
      let requestData={
            physicalAddress: {
                addressId: physicalAddressFormData.addressId ?? 0,
                addressLine1: physicalAddressFormData.addressLine1Id,
                addressLine2: physicalAddressFormData.addressLine2Id,
                cityId: extractId(physicalAddressFormData, 'cityId'),
                 stateId: extractId(physicalAddressFormData, 'stateId'),
                countryId: extractId(physicalAddressFormData, 'countryId'),
                zipCode: physicalAddressFormData.zipCode
              },
              billToAddress: {
                addressId:billToAddressFormData.addressId ?? 0,
                addressLine1: billToAddressFormData.addressLine1Id,
                addressLine2: billToAddressFormData.addressLine2Id,
                cityId: extractId(billToAddressFormData, 'cityId'),
                 stateId: extractId(billToAddressFormData, 'stateId'),
                countryId: extractId(billToAddressFormData, 'countryId'),
                zipCode: billToAddressFormData.zipCode
              },
              labAddress: {
                addressId:labAddressFormData.addressId ?? 0,
                addressLine1: labAddressFormData.addressLine1Id,
                addressLine2: labAddressFormData.addressLine2Id,
                cityId: extractId(labAddressFormData, 'cityId'),
                 stateId: extractId(labAddressFormData, 'stateId'),
                countryId: extractId(labAddressFormData, 'countryId'),
                zipCode: labAddressFormData.zipCode
              },

              warehouseAddress: {
                addressId:warehouseAddressFormData.addressId ?? 0,
                addressLine1: warehouseAddressFormData.addressLine1Id,
                addressLine2: warehouseAddressFormData.addressLine2Id,
                cityId: extractId(warehouseAddressFormData, 'cityId'),
                stateId: extractId(warehouseAddressFormData, 'stateId'),
               countryId: extractId(warehouseAddressFormData, 'countryId'),
                zipCode: warehouseAddressFormData.zipCode
              },

              registeredAddress: {
                addressId:registeredAddressFormData.addressId ?? 0,
                addressLine1: registeredAddressFormData.addressLine1Id,
                addressLine2: registeredAddressFormData.addressLine2Id,
                cityId: extractId(registeredAddressFormData, 'cityId'),
                 stateId: extractId(registeredAddressFormData, 'stateId'),
                countryId: extractId(registeredAddressFormData, 'countryId'),
                zipCode: registeredAddressFormData.zipCode
              },

              remitToAddress: {
                addressId:remitToAddressFormData.addressId ?? 0,
                addressLine1: remitToAddressFormData.addressLine1Id,
                addressLine2: remitToAddressFormData.addressLine2Id,
                cityId: extractId(remitToAddressFormData, 'cityId'),
                 stateId: extractId(remitToAddressFormData, 'stateId'),
                countryId: extractId(remitToAddressFormData, 'countryId'),
                zipCode: remitToAddressFormData.zipCode
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
     <RegisteredAddressDetail isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData} isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess} registeredAddressData={registeredAddressData} RegisteredAddressForm={RegisteredAddressForm} registeredAddressRef={registeredAddressRef} />
     
      <PhysicalAddressDetail isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData} isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess}  physicalAddressData={physicalAddressData} PhysicalAddressForm={PhysicalAddressForm} physicalAddressRef={physicalAddressRef} />

      <BillToAddressDetail isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData} isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess} billToAddressData={billToAddressData} BillToAddressForm={BillToAddressForm}  billToAddressRef={billToAddressRef} />

      <LabAddressDetail isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData} isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess} labAddressRef={labAddressRef} LabAddressForm={LabAddressForm} labAddressData={labAddressData}/>

      <WarehouseAddressDetail isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData} isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess} warehouseAddressRef={warehouseAddressRef} WarehouseAddressForm={WarehouseAddressForm}  warehouseAddressData={warehouseAddressData}/>

      <RemitToAddressDetail  isGetOrganizationBusinessAddressesData={isGetOrganizationBusinessAddressesData} isGetOrganizationBusinessAddressesSuccess={isGetOrganizationBusinessAddressesSuccess} remitToAddressData={remitToAddressData} remitToAddressRef={remitToAddressRef} RemitToAddressForm={RemitToAddressForm} />
      <div className="col-md-12">
        <div className="d-flex align-item-end justify-content-end" >
          <Buttons
            buttonTypeClassName="theme-button mr-2"
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
  RegisteredAddressForm: PropTypes.object,
  registeredAddressRef: PropTypes.object,
  physicalAddressData: PropTypes.object,
  PhysicalAddressForm: PropTypes.object,
  physicalAddressRef: PropTypes.object,
  billToAddressData: PropTypes.object,
  BillToAddressForm: PropTypes.object,
  billToAddressRef: PropTypes.object,
  labAddressData: PropTypes.object,
  LabAddressForm: PropTypes.object,
  labAddressRef: PropTypes.object,
  warehouseAddressData: PropTypes.object,
  WarehouseAddressForm: PropTypes.object,
  warehouseAddressRef: PropTypes.object,
  remitToAddressData: PropTypes.object,
  remitToAddressRef: PropTypes.object,
  isAddEditBusinessAddressLoading: PropTypes.bool,
  handleAddEditBusinessAddress: PropTypes.func,
  addEditBusinessAddresses: PropTypes.func,
  addressIds: PropTypes.object,
};

export default OrganizationBusinessAddressDetail;
