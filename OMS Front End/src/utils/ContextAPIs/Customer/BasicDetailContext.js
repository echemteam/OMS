import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useGetValidateCheckListMutation } from '../../../app/services/ApprovalAPI';

const BasicDetailContext = createContext();

export default BasicDetailContext;


export const BasicDetailContextProvider = ({ children }) => {

    const molGridRef = useRef();

    //****  If we have supplier page we have set main id as supplierId. and If we have customer page we have set main id as customerId   */
    const [mainId, setMainId] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [subCustomer, setSubCustomer] = useState(false);
    const [customerCountryId, setCustomerCountryId] = useState('');
    //** */

    //** Shipping Method's */
    const [carriersList, setCarriersList] = useState([]);
    const [showSubBackButton, setShowSubBackButton] = useState(false);
    const [deliveryMethodsList, setDeliveryMethodsList] = useState([]);
    const [isExistsFinancialSetting, setIsExistsFinancialSetting] = useState(false);
    //** */

    //** Using for Contact  */
    // const [contactId, setContactId] = useState(0);
    const [phoneNumberData, setPhoneNumberData] = useState();
    const [emailAddressData, setEmailAddressData] = useState();
    //** */

    const [isResponsibleUser, setIsResponsibleUser] = useState(true);
    const [rejectStatusId, setRejectStatusId] = useState('');

    //** Use for Tab's */
    const nextRef = useRef(null);
    const settingRef = useRef(null);
    const financialRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [activeSubTab, setActiveSubTab] = useState(0);

    //** Completion Changes  */
    const [totalCount, setTotalCount] = useState();
    const [approvalSuccessCount, setApprovalSuccessCount] = useState();
    const [getValidateCheckList, { isSuccess: isGetCheckListSuccess, data: isGetCheckListData }] = useGetValidateCheckListMutation();

    const getCustomerCompletionCount = (customerId, isSubCustomer) => {
        let request = {
            customerId: customerId,
            supplierId: 0,
            isSubCustomer: isSubCustomer ? isSubCustomer : false
        }
        getValidateCheckList(request);
    }

    useEffect(() => {
        if (isGetCheckListSuccess && isGetCheckListData) {
            if (isGetCheckListData && isGetCheckListData.length > 0) {
                const successCheckList = isGetCheckListData.filter(data => data.isValid);
                setApprovalSuccessCount(successCheckList.length);
                setTotalCount(isGetCheckListData.length);
            }
        }
    }, [isGetCheckListSuccess, isGetCheckListData])

    const handleActiveSubTabClick = (tabIndex) => {
        setActiveSubTab(tabIndex);
        setShowSubBackButton(false);
        if (tabIndex === 1) {
            setShowSubBackButton(true);
        }
    }

    const moveNextPage = () => {
        setActiveTab((prev) => prev + 1);
    };
    const movePreviewPage = () => {
        setActiveTab((prev) => prev - 1);
    };
    //** */

    //** Use for Move next step */
    const addCustomer = (data) => {
        if (activeTab === 6) {
            setActiveSubTab(0)
        }
        if (customerId > 0 && data === 1) {
            if (nextRef.current) {
                nextRef.current.handleAddBasicDetails();
            }
        } else if (customerId > 0) {
            setActiveTab((prev) => prev + 1)
        }
        else {
            if (nextRef.current) {
                nextRef.current.handleAddBasicDetails();
            }
        }
        if (data === 5) {
            setShowSubBackButton(false);
            saveFinacialSetting();
        }
    }

    const saveFinacialSetting = () => {
        if (settingRef.current) {
            settingRef.current.onhandleEdit();
        }
    }
    //** */

    return (
        <BasicDetailContext.Provider value={{
            nextRef, customerId, setCustomerId, activeTab, setActiveTab, moveNextPage, movePreviewPage, addCustomer, setPhoneNumberData, setCustomerCountryId,
            customerCountryId, setIsExistsFinancialSetting, isExistsFinancialSetting, financialRef,
            phoneNumberData, setMainId, mainId, setShowSubBackButton, showSubBackButton, setActiveSubTab, activeSubTab, handleActiveSubTabClick, saveFinacialSetting,
            emailAddressData, setEmailAddressData, molGridRef, setDeliveryMethodsList, deliveryMethodsList, setCarriersList, carriersList, settingRef,
            setIsResponsibleUser, isResponsibleUser, setRejectStatusId, rejectStatusId, totalCount, approvalSuccessCount, getCustomerCompletionCount,
            subCustomer, setSubCustomer
        }}>
            {children}
        </BasicDetailContext.Provider>
    );
};