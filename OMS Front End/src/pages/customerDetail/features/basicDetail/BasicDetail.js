import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
// import FormCreator from "../../../../components/Forms/FormCreator";
// import { basicDetailFormDataHalf } from "./component/BasicDetailForm.data";
// import CardSection from "../../../../components/ui/card/CardSection";
// import { useAddCustomersBasicInformationMutation, useLazyGetAllCountriesQuery, useLazyGetAllGroupTypesQuery, useLazyGetAllTerritoriesQuery } from "../../../../app/services/basicdetailAPI";
// import ToastService from "../../../../services/toastService/ToastService";
// import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";

// const BasicDetail = () => {
//   const basicDetailRef = useRef();
//   const [formData, setFormData] = useState(basicDetailFormDataHalf);
//   const [customerId, setCustomerId] = useState()
//   const { stepperRef, nextRef } = useContext(BasicDetailContext)

//   const [
//     getAllGroupTypes,
//     {
//       isFetching: isGetAllGroupTypesFetching,
//       isSuccess: isGetAllGroupTypesSucess,
//       data: allGetAllGroupTypesData,
//     },
//   ] = useLazyGetAllGroupTypesQuery();

//   const [
//     getAllCountries,
//     {
//       isFetching: isGetAllCountriesFetching,
//       isSuccess: isGetAllCountriesSucess,
//       data: allGetAllCountriesData,
//     },
//   ] = useLazyGetAllCountriesQuery();

//   const [
//     getAllTerritories,
//     {
//       isFetching: isGetAllTerritoriesFetching,
//       isSuccess: isGetAllTerritoriesSucess,
//       data: allGetAllTerritoriesData,
//     },
//   ] = useLazyGetAllTerritoriesQuery();

//   const [
//     addCustomersBasicInformation,
//     {
//       isLoading: isAddCustomersBasicInformationLoading,
//       isSuccess: isAddCustomersBasicInformationSuccess,
//       data: isAddCustomersBasicInformationData,
//     },
//   ] = useAddCustomersBasicInformationMutation();

//   useEffect(() => {
//     getAllGroupTypes();
//     getAllCountries();
//     getAllTerritories();
//   }, []);

//   useEffect(() => {
//     if (
//       !isGetAllGroupTypesFetching &&
//       isGetAllGroupTypesSucess &&
//       allGetAllGroupTypesData
//     ) {
//       const getData = allGetAllGroupTypesData.map((item) => ({
//         value: item.groupTypeId,
//         label: item.type,
//       }));
//       const dropdownField = basicDetailFormDataHalf.formFields.find(
//         (item) => item.dataField === "groupTypeId"
//       );
//       dropdownField.fieldSetting.options = getData;
//     }
//   }, [
//     isGetAllGroupTypesFetching,
//     isGetAllGroupTypesSucess,
//     allGetAllGroupTypesData,
//   ]);

//   useEffect(() => {
//     if (
//       !isGetAllCountriesFetching &&
//       isGetAllCountriesSucess &&
//       allGetAllCountriesData
//     ) {
//       const getData = allGetAllCountriesData.map((item) => ({
//         value: item.countryId,
//         label: item.name,
//       }));
//       const dropdownField = basicDetailFormDataHalf.formFields.find(
//         (item) => item.dataField === "countryId"
//       );
//       dropdownField.fieldSetting.options = getData;
//     }
//   }, [
//     isGetAllCountriesFetching,
//     isGetAllCountriesSucess,
//     allGetAllCountriesData,
//   ]);

//   useEffect(() => {
//     if (
//       !isGetAllTerritoriesFetching &&
//       isGetAllTerritoriesSucess &&
//       allGetAllTerritoriesData
//     ) {
//       const getData = allGetAllTerritoriesData.map((item) => ({
//         value: item.territoryId,
//         label: item.territory,
//       }));
//       const dropdownField = basicDetailFormDataHalf.formFields.find(
//         (item) => item.dataField === "territoryId"
//       );
//       dropdownField.fieldSetting.options = getData;
//     }
//   }, [
//     isGetAllTerritoriesFetching,
//     isGetAllTerritoriesSucess,
//     allGetAllTerritoriesData,
//   ]);

//   useEffect(() => {
//     if (isAddCustomersBasicInformationSuccess && isAddCustomersBasicInformationData) {
//       if (isAddCustomersBasicInformationData.errorMessage.includes('exists')) {
//         ToastService.warning(isAddCustomersBasicInformationData.errorMessage);
//         return;
//       }
//       setCustomerId(isAddCustomersBasicInformationData.keyValue)
//       ToastService.success(isAddCustomersBasicInformationData.errorMessage);
//       stepperRef.current.next()
//     }
//   }, [isAddCustomersBasicInformationSuccess, isAddCustomersBasicInformationData]);

//   // const onreset = () => {
//   //   let restData = { ...basicDetailFormDataHalf };
//   //   restData.initialState = { ...formData };
//   //   setFormData(restData);
//   // }

//   useImperativeHandle(nextRef, () => ({
//     handleAddBasicDetails,
//     // validateStep,
//   }));

//   const handleAddBasicDetails = () => {
//     let data = basicDetailRef.current.getFormData();
//     if (data != null) {
//       let req = {
//         ...data,
//         groupTypeId: data.groupTypeId.value,
//         territoryId: data.territoryId.value,
//         countryId: data.countryId.value,
//         billingCurrency: data.billingCurrency.label
//       }
//       addCustomersBasicInformation(req);
//     }
//   };

//   // const validateStep = () => {
//   //   debugger
//   //   const data = basicDetailRef.current.getFormData();
//   //   if (!data || Object.values(data).some((field) => !field)) {
//   //     ToastService.error("Please fill all the required fields.");
//   //     return false;
//   //   }
//   //   return true;
//   // };


//   return (
//     <div className="basic-info-sec half-sec">
//       <CardSection buttonClassName="theme-button">
//         <div className="row horizontal-form basic-info-step">
//           <FormCreator
//             ref={basicDetailRef}
//             {...formData}
//           />
//         </div>
//       </CardSection>
//     </div>
//   );
// };


function BasicDetail() {
  return (
    <div>BasicDetail</div>
  )
}

export default BasicDetail;
