import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Libs's */
import { ApprovalEnum } from "../../../../utils/Enums/commonEnums";
//** Service's */
import {
    useGetValidateCheckListMutation, useLazyGetCustomerAddresssInfoByIdQuery, useLazyGetCustomerContactInfoByIdQuery,
    useLazyGetCustomerFinacialSettingQuery, useLazyGetCustomersInfoByIdQuery
} from "../../../../app/services/ApprovalAPI";
import PropTypes from 'prop-types';
//** Component's */
const ApprovalCheckList = React.lazy(() => import("../../../../components/ApprovalCheckList/ApprovalCheckList"));
const ApprovalValidateData = React.lazy(() => import("../../../../components/ApprovalCheckList/feature/approvalValidateData/ApprovalValidateData"));


const CustomerApproval = forwardRef(({ childRef, getListApi, updateCustomerApproval, isDetailPage, isAddPagePage }) => {

    const parentRef = useRef();
    const [customerId, setCustomerId] = useState(0);
    const [isSubCustomer, setIsSubCustomer] = useState(false);
    const [isShowApproval, setIsShowApproval] = useState(false);
    const [validateCheckList, setValidateCheckList] = useState([]);
    const [isShowValidateModal, setIsShowValidateModal] = useState(false);

    const [getValidateCheckList, { isLoading: isGetCheckListLoading, isSuccess: isGetCheckListSuccess, data: isGetCheckListData }] = useGetValidateCheckListMutation();

    //** Approval CheckList Modal*/
    const handleShowApprovalList = () => {
        setIsShowApproval(!isShowApproval);
    };

    const onSidebarApprovalClose = () => {
        if (!isDetailPage) {
            getListApi();
        }
        setIsShowApproval(!isShowApproval);
    };
    const onSuccessApprovalClose = () => {
        setIsShowApproval(!isShowApproval);
        updateCustomerApproval();
    };

    //** Validate check list Modal */
    const handleShowValidateModal = (customerId, isSubCustomer) => {
        setIsShowValidateModal(!isShowValidateModal);
        let request = {
            customerId: customerId,
            supplierId: 0,
            isSubCustomer: isSubCustomer
        }
        setIsSubCustomer(isSubCustomer);
        getValidateCheckList(request);
        setCustomerId(customerId);
    };

    const handleValidateModalClose = () => {
        setValidateCheckList([]);
        setIsShowValidateModal(!isShowValidateModal);
        if (!isDetailPage && !isAddPagePage) {
            getListApi();
        }
    };
    const handleModalClose = () => {
        setIsShowValidateModal(!isShowValidateModal);
    }

    const handleDone = () => {
        if (parentRef.current) {
            parentRef.current.validateApprovalCheckList();
        }
    }

    const handleValidateSuccess = () => {
        handleShowApprovalList();
        handleModalClose();
    }

    useEffect(() => {
        if (isGetCheckListSuccess && isGetCheckListData) {
            setValidateCheckList(isGetCheckListData);
        }
    }, [isGetCheckListSuccess, isGetCheckListData])

    //** Use Imperative Handle */
    useImperativeHandle(childRef, () => ({
        callChildFunction: handleShowValidateModal
    }))

    return (
        <React.Fragment>
            <ApprovalValidateData parentRef={parentRef} handleValidateSuccess={handleValidateSuccess} showModal={isShowValidateModal} isSupplierApproval={false}
                isGetCheckListLoading={isGetCheckListLoading} mainId={customerId} isDetailPage={isDetailPage} handleShowValidateModal={handleShowValidateModal}
                handleValidateModalClose={handleValidateModalClose} handleDone={handleDone} validateCheckList={validateCheckList ? validateCheckList : null} />
            <ApprovalCheckList onSidebarClose={onSidebarApprovalClose} isModelOpen={isShowApproval} mainId={customerId} onSuccessApprovalClose={onSuccessApprovalClose}
                ApprovalData={isSubCustomer ? ApprovalEnum.APPROVESUBCUSTOMER : ApprovalEnum.APPROVECUSTOMER} isSupplierApproval={false} isSubCustomer={isSubCustomer}
                getBasicInformationById={useLazyGetCustomersInfoByIdQuery} getAddressById={useLazyGetCustomerAddresssInfoByIdQuery}
                getContactById={useLazyGetCustomerContactInfoByIdQuery} getFinacialSettingById={useLazyGetCustomerFinacialSettingQuery}
            />
        </React.Fragment>
    )
});

CustomerApproval.propTypes = {
    childRef: PropTypes.shape({
        callChildFunction: PropTypes.func
    }),
    getListApi: PropTypes.func,
    updateCustomerApproval: PropTypes.func.isRequired,
    isDetailPage: PropTypes.bool
};

export default CustomerApproval;