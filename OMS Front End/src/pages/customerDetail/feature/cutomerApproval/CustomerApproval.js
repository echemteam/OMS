import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Libs's */
import { ApprovalEnum, OwnerType } from "../../../../utils/Enums/commonEnums";
//** Service's */
import {
    useGetValidateCheckListMutation, useLazyGetCustomerAddresssInfoByIdQuery, useLazyGetCustomerContactInfoByIdQuery,
    useLazyGetCustomerFinacialSettingQuery, useLazyGetCustomersInfoByIdQuery
} from "../../../../app/services/ApprovalAPI";
import PropTypes from 'prop-types';
import BasicDetailContext from "../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Component's */
const ApprovalCheckList = React.lazy(() => import("../../../../components/ApprovalCheckList/ApprovalCheckList"));
const ApprovalValidateData = React.lazy(() => import("../../../../components/ApprovalCheckList/feature/approvalValidateData/ApprovalValidateData"));


const CustomerApproval = forwardRef(({ childRef, getListApi, updateCustomerApproval,responsibleUserIds, isDetailPage, isAddPagePage ,setSelectedStatus}) => {

    const parentRef = useRef();
    const [customerId, setCustomerId] = useState(0);
    const [isSubCustomer, setIsSubCustomer] = useState(false);
    const [isShowApproval, setIsShowApproval] = useState(false);
    const [validateCheckList, setValidateCheckList] = useState([]);
    const [isShowValidateModal, setIsShowValidateModal] = useState(false);
    const [showApprovalCheckList, setShowApprovalCheckList] = useState(false);
    const {setRejectStatusId } = useContext(BasicDetailContext);

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
    const handleShowValidateModal = (customerId, isSubCustomer, isShowApprovalCheckList = true) => {
        setIsShowValidateModal(!isShowValidateModal);
        let request = {
            customerId: customerId,
            supplierId: 0,
            isSubCustomer: isSubCustomer
        }
        setIsSubCustomer(isSubCustomer);
        getValidateCheckList(request);
        setCustomerId(customerId);
        setShowApprovalCheckList(isShowApprovalCheckList);
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
        !showApprovalCheckList && updateCustomerApproval();
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
            {showApprovalCheckList &&
                <ApprovalCheckList onSidebarClose={onSidebarApprovalClose} isModelOpen={isShowApproval} mainId={customerId} onSuccessApprovalClose={onSuccessApprovalClose}
                    ApprovalData={isSubCustomer ? ApprovalEnum.APPROVESUBCUSTOMER : ApprovalEnum.APPROVECUSTOMER} isSupplierApproval={false} isSubCustomer={isSubCustomer}
                    getBasicInformationById={useLazyGetCustomersInfoByIdQuery} getAddressById={useLazyGetCustomerAddresssInfoByIdQuery}
                    getContactById={useLazyGetCustomerContactInfoByIdQuery} getFinacialSettingById={useLazyGetCustomerFinacialSettingQuery} ownerType={OwnerType.Customer} basicData={responsibleUserIds} setRejectStatusId={setRejectStatusId} setSelectedStatus={setSelectedStatus}
                />
            }
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