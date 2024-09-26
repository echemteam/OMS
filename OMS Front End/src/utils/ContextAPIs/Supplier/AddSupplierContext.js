import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { useGetValidateCheckListMutation } from "../../../app/services/ApprovalAPI";

const AddSupplierContext = createContext();

export default AddSupplierContext;

export const AddSupplierContextProvider = ({ children }) => {

  const nextStepRef = useRef(null);
  const [mainId, setMainId] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [supplierId, setSupplierId] = useState(0);
  const [allCountries, setAllCountries] = useState(false);

  //** Using for Contact  */
  const [contactId, setContactId] = useState(0);
  const [contactNumbers, setContactNumbers] = useState();
  const [phoneNumberData, setPhoneNumberData] = useState();
  const [emailAddressData, setEmailAddressData] = useState();
  const [contactMainModal, setContactMainModal] = useState(false);
  //** */

  const [isResponsibleUser, setIsResponsibleUser] = useState(false);

  const [rejectStatusId, setRejectStatusId] = useState('');
  // const [showSubBackButton, setShowSubBackButton] = useState(false);

  const moveNextPage = () => {
    setActiveTab((prev) => prev + 1);
  };

  const movePreviewPage = () => {
    setActiveTab((prev) => prev - 1);
  };

  const addSupplier = (data) => {
    if (supplierId > 0 && data === 1) {
      if (nextStepRef.current) {
        nextStepRef.current.handleAddEditSupplier();
      }
    } else if (supplierId > 0) {
      setActiveTab((prev) => prev + 1);
    } else {
      if (nextStepRef.current) {
        nextStepRef.current.handleAddEditSupplier();
      }
    }
  };

  const handleActiveSubTabClick = (tabIndex) => {
    setActiveSubTab(tabIndex);
    // setShowSubBackButton(false);
    if (tabIndex === 1) {
      // setShowSubBackButton(true);
    }
  };

  //** Completion Changes  */
  const [totalCount, setTotalCount] = useState();
  const [approvalSuccessCount, setApprovalSuccessCount] = useState();
  const [getValidateCheckList, { isSuccess: isGetCheckListSuccess, data: isGetCheckListData }] = useGetValidateCheckListMutation();

  const getSupplierCompletionCount = (supplierId) => {
    let request = {
      customerId: 0,
      supplierId: supplierId
    }
    getValidateCheckList(request);
  }

  useEffect(() => {
    if (isGetCheckListSuccess && isGetCheckListData) {
      if (isGetCheckListData && isGetCheckListData.length > 0) {
        const successCheckList = isGetCheckListData.filter(data => data.isValid);
        setTotalCount(isGetCheckListData.length);
        setApprovalSuccessCount(successCheckList.length);
      }
    }
  }, [isGetCheckListSuccess, isGetCheckListData])

  return (
    <AddSupplierContext.Provider
      value={{
        totalCount,
        approvalSuccessCount,
        getSupplierCompletionCount,
        nextStepRef,
        supplierId,
        setSupplierId,
        activeTab,
        setActiveTab,
        moveNextPage,
        movePreviewPage,
        addSupplier,
        setAllCountries,
        allCountries,
        setMainId,
        mainId,
        contactId,
        setContactId,
        contactMainModal,
        contactNumbers,
        setContactNumbers,
        setPhoneNumberData,
        setIsResponsibleUser,
        isResponsibleUser,
        phoneNumberData,
        emailAddressData,
        setEmailAddressData,
        setContactMainModal,
        handleActiveSubTabClick,
        activeSubTab,
        setRejectStatusId,
        rejectStatusId,
      }}
    >
      {children}
    </AddSupplierContext.Provider>
  );
};
