import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ApprovalEnum } from "../../../../common/features/Enums/ApprovalEnums";
import ApprovalCheckList from "../../../../components/ApprovalCheckList/ApprovalCheckList";
import ApprovalValidateData from "../../../../components/ApprovalCheckList/approvalValidateData/ApprovalValidateData";
import { useGetValidateCheckListMutation } from "../../../../app/services/ApprovalAPI";

const CustomerApproval = forwardRef(({ childRef, getListApi, updateCustomerApproval }) => {

    const [isShowApproval, setIsShowApproval] = useState(false);
    const [validateCheckList, setValidateCheckList] = useState([]);
    const [isShowValidateModal, setIsShowValidateModal] = useState(false);

    const [getValidateCheckList, { isLoading: isGetCheckListLoading, isSuccess: isGetCheckListSuccess, data: isGetCheckListData }] = useGetValidateCheckListMutation();

    //** Approval CheckList Modal*/
    const handleShowApprovalList = () => {
        setIsShowApproval(!isShowApproval);
    };

    const onSidebarApprovalClose = () => {
        getListApi();
        setIsShowApproval(!isShowApproval);
    };
    const onSuccessApprovalClose = () => {
        setIsShowApproval(!isShowApproval);
        updateCustomerApproval();
    };

    //** Validate check list Modal */
    const handleToggleModal = (customerId) => {
        setIsShowValidateModal(!isShowValidateModal);
        let request = {
            customerId: 1113,
            supplierId: 0
        }
        getValidateCheckList(request);
    };

    const handleDone = () => {
        handleShowApprovalList();
        handleToggleModal();
    }

    useEffect(() => {
        if (isGetCheckListSuccess, isGetCheckListData) {
            setValidateCheckList(isGetCheckListData);
        }
    }, [isGetCheckListSuccess, isGetCheckListData])

    //** Use Imperative Handle */
    useImperativeHandle(childRef, () => ({
        callChildFunction: handleToggleModal
    }))

    return (
        <React.Fragment>
            <ApprovalValidateData showModal={isShowValidateModal} isGetCheckListLoading={isGetCheckListLoading}
                handleToggleModal={handleToggleModal} handleDone={handleDone} validateCheckList={validateCheckList} />

            <ApprovalCheckList onSidebarClose={onSidebarApprovalClose} isModelOpen={isShowApproval}
                ApprovalData={ApprovalEnum.APPROVECUSTOMER} onSuccessApprovalClose={onSuccessApprovalClose} />
        </React.Fragment>
    )
});

export default CustomerApproval;