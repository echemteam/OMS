import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from 'prop-types';
//** Lib's */
import { ApprovalEnum, OwnerType } from "../../../../utils/Enums/commonEnums";
import ApprovalCheckList from "../../../../components/ApprovalCheckList/ApprovalCheckList";
//** Service's */
import { useGetValidateCheckListMutation, useLazyGetSupplierAddressInfoByIdQuery, useLazyGetSupplierBasicInfoByIdQuery, useLazyGetSupplierContactInfoByIdQuery, useLazyGetSupplierFinacialSettingQuery } from "../../../../app/services/ApprovalAPI";
//** Component's */
const ApprovalValidateData = React.lazy(() => import("../../../../components/ApprovalCheckList/feature/approvalValidateData/ApprovalValidateData"));

const SupplierApproval = forwardRef(({ childRef, getListApi, updateApproval, isDetailPage, isAddPagePage }) => {

    const parentRef = useRef();
    const [supplierId, setSupplierId] = useState(false);
    const [isShowApproval, setIsShowApproval] = useState(false);
    const [validateCheckList, setValidateCheckList] = useState([]);
    const [isShowValidateModal, setIsShowValidateModal] = useState(false);
    const [showApprovalCheckList, setShowApprovalCheckList] = useState(false);

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
    const handleShowValidateModal = (supplierId, isShowApprovalCheckList = true) => {
        setIsShowValidateModal(!isShowValidateModal);
        let request = {
            customerId: 0,
            supplierId: supplierId
        }
        getValidateCheckList(request);
        setSupplierId(supplierId);
        setShowApprovalCheckList(isShowApprovalCheckList);
    };

    const handleValidateModalClose = () => {
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
        !showApprovalCheckList && updateApproval();
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
            {showApprovalCheckList &&
                <ApprovalCheckList onSidebarClose={onSidebarApprovalClose} isModelOpen={isShowApproval} mainId={supplierId} isSupplierApproval={true}
                    ApprovalData={ApprovalEnum.APPROVESUPPLIER} onSuccessApprovalClose={onSuccessApprovalClose}
                    getBasicInformationById={useLazyGetSupplierBasicInfoByIdQuery} getAddressById={useLazyGetSupplierAddressInfoByIdQuery}
                    getContactById={useLazyGetSupplierContactInfoByIdQuery} getFinacialSettingById={useLazyGetSupplierFinacialSettingQuery} ownerType={OwnerType.Supplier}
                />
            }
        </React.Fragment>
    )
});

SupplierApproval.propTypes = {
    childRef: PropTypes.shape({
        current: PropTypes.object
    }).isRequired,
    getListApi: PropTypes.func,
    updateApproval: PropTypes.func.isRequired,
    isDetailPage: PropTypes.bool,
};
export default SupplierApproval;