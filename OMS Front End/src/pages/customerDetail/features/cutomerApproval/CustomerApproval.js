import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ApprovalEnum } from "../../../../common/features/Enums/ApprovalEnums";
import ApprovalCheckList from "../../../../components/ApprovalCheckList/ApprovalCheckList";
import ApprovalValidateData from "../../../../components/ApprovalCheckList/approvalValidateData/ApprovalValidateData";
import { useGetValidateCheckListMutation } from "../../../../app/services/ApprovalAPI";

const CustomerApproval = forwardRef(({ childRef, getListApi, updateCustomerApproval, isDetailPage }) => {

    const [isShowApproval, setIsShowApproval] = useState(false);
    const [customerId, setCustomerId] = useState(false);
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
    const handleShowValidateModal = (customerId) => {
        setIsShowValidateModal(!isShowValidateModal);
        let request = {
            customerId: customerId,
            supplierId: 0
        }
        getValidateCheckList(request);
        setCustomerId(customerId);
    };

    const handleValidateModalClose = () => {
        setIsShowValidateModal(!isShowValidateModal);
        if (!isDetailPage) {
            getListApi();
        }
    };
    const handleModalClose = () => {
        setIsShowValidateModal(!isShowValidateModal);
    }

    const handleDone = () => {
        handleShowApprovalList();
        handleModalClose();
    }

    useEffect(() => {
        if (isGetCheckListSuccess, isGetCheckListData) {
            setValidateCheckList(isGetCheckListData);
        }
    }, [isGetCheckListSuccess, isGetCheckListData])

    //** Use Imperative Handle */
    useImperativeHandle(childRef, () => ({
        callChildFunction: handleShowValidateModal
    }))

    return (
        <React.Fragment>
            <ApprovalValidateData showModal={isShowValidateModal} isGetCheckListLoading={isGetCheckListLoading} customerId={customerId} isDetailPage={isDetailPage}
                handleShowValidateModal={handleShowValidateModal} handleValidateModalClose={handleValidateModalClose} handleDone={handleDone} validateCheckList={validateCheckList} />

            <ApprovalCheckList onSidebarClose={onSidebarApprovalClose} isModelOpen={isShowApproval}
                ApprovalData={ApprovalEnum.APPROVECUSTOMER} onSuccessApprovalClose={onSuccessApprovalClose} />
        </React.Fragment>
    )
});

export default CustomerApproval;