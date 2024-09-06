/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";


const BasicInformation = ({ isModelOpen, mainId, getBasicInformationById,approvalChekedData ,handleCheckbox}) => {
  const [basicInformation, setBasicInformation] = useState();
  const [isChecked,setIsChecked]=useState(approvalChekedData?.isChecked || false);
  


  //** API Call's */
  const [
    getCustomerBasicInfoById,
    {
      isFetching: isGetCustomerBasicInfoByIdFetching,
      isSuccess: isGetCustomerBasicInfoByIdSuccess,
      data: isGetCustomerBasicInfoByIdData,
    },
  ] = getBasicInformationById();

  useEffect(() => {
    if (isModelOpen && mainId) {
      getCustomerBasicInfoById(mainId);
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (
      !isGetCustomerBasicInfoByIdFetching &&
      isGetCustomerBasicInfoByIdSuccess &&
      isGetCustomerBasicInfoByIdData
    ) {
      setBasicInformation(isGetCustomerBasicInfoByIdData);
    }
  }, [
    isGetCustomerBasicInfoByIdFetching,
    isGetCustomerBasicInfoByIdSuccess,
    isGetCustomerBasicInfoByIdData,
  ]);

  const handleChange = (checkedValue,newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue,newValue);  
  };

  return (
    <>
      <div className="card-top-title">
        <h5> Basic Information </h5>
        <div className="checkbox-part">
          <Checkbox 
          name={"basicInformation"} 
          dataField={"basicInformation"}
          checked={isChecked || false}
          onChange={handleChange}  
          
          />
        </div>
      </div>

      {basicInformation && <h6> Tax Id: {basicInformation.taxId}</h6>}
    </>
  );
};

export default BasicInformation;
