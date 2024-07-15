import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import { ApprovalEnum } from "../../../../utils/Enums/enums";
import ApprovalCheckList from "../../../../components/ApprovalCheckList/ApprovalCheckList";
//** Service's */
import { useGetValidateCheckListMutation } from "../../../../app/services/ApprovalAPI";
//** Component's */
const ApprovalValidateData = React.lazy(() => import("../../../../components/ApprovalCheckList/approvalValidateData/ApprovalValidateData"));

const SupplierApproval = forwardRef(({ childRef, getListApi, updateApproval, isDetailPage }) => {

    const parentRef = useRef();
    const [supplierId, setSupplierId] = useState(false);
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
        updateApproval();
    };

    //** Validate check list Modal */
    const handleShowValidateModal = (supplierId) => {
        setIsShowValidateModal(!isShowValidateModal);
        let request = {
            customerId: 0,
            supplierId: supplierId
        }
        getValidateCheckList(request);
        setSupplierId(supplierId);
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
            <ApprovalValidateData parentRef={parentRef} handleValidateSuccess={handleValidateSuccess} showModal={isShowValidateModal} isSupplierApproval={true}
                isGetCheckListLoading={isGetCheckListLoading} mainId={supplierId} isDetailPage={isDetailPage} handleShowValidateModal={handleShowValidateModal}
                handleValidateModalClose={handleValidateModalClose} handleDone={handleDone} validateCheckList={validateCheckList} />

            <ApprovalCheckList onSidebarClose={onSidebarApprovalClose} isModelOpen={isShowApproval}
                ApprovalData={ApprovalEnum.APPROVESUPPLIER} onSuccessApprovalClose={onSuccessApprovalClose} />
        </React.Fragment>
    )
});

export default SupplierApproval;