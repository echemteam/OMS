import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CardSection from '../../../../components/ui/card/CardSection';
import MolGrid from '../../../../components/Grid/MolGrid';
import SupplierContext from "../../../../utils/ContextAPIs/Supplier/SupplierListContext"
import ToastService from '../../../../services/toastService/ToastService';
import { StatusEnums } from '../../../../common/features/Enums/StatusEnums';
import { useGetSuppliersMutation, useUpdateSupplierStatusMutation } from '../../../../app/services/supplierAPI';
import { hasFunctionalPermission } from '../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { securityKey } from '../../../../data/SecurityKey';
import SupplierApproval from './supplierApproval/SupplierApproval';
import { encryptUrlData } from '../../../../services/CryptoService';
import { useNavigate } from 'react-router-dom';
import SwalAlert from '../../../../services/swalService/SwalService';

export const InActiveSuppliers = ({ statusId, configFile }) => {

    const childRef = useRef();
    const molGridRef = useRef();
    const navigate = useNavigate();
    const { confirm } = SwalAlert();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [dataSource, setDataSource] = useState();
    const { DataRef } = useContext(SupplierContext);
    const [supplierId, setSupplierId] = useState();

    const [
        getSuppliers,
        { isLoading: isListLoading, isSuccess: isListSuccess, data: isListeData },
    ] = useGetSuppliersMutation();

    const [updateSupplierStatus, { isLoading: updateSupplierStatusLoading, isSuccess: isSuccessUpdateSupplierStatus, data: updateSupplierStatusData }] = useUpdateSupplierStatusMutation();

    const handlePageChange = (page) => {
        const request = {
            pagination: {
                pageNumber: page.pageNumber,
                pageSize: page.pageSize,
            },
            filters: { searchText: "" },
            statusId: Array.isArray(statusId) ? statusId.join(",") : statusId
        };
        getSuppliers(request);
    };

    useEffect(() => {
        const actionColumn = configFile?.columns.find(column => column.name === "Action");
        if (actionColumn) {

            const hasActive = hasFunctionalPermission(securityKey.ACTIVESUPPLIER);
            const hasUnBlock = hasFunctionalPermission(securityKey.UNBLOCKSUPPLIER);
            const hasUnFreeze = hasFunctionalPermission(securityKey.UNFREEZESUPPLIER);

            if (actionColumn.defaultAction.allowActiveCustomer) {
                actionColumn.defaultAction.allowActiveCustomer = hasActive?.hasAccess;
            } else if (actionColumn.defaultAction.allowUnblocked) {
                actionColumn.defaultAction.allowUnblocked = hasUnBlock?.hasAccess;
            } else if (actionColumn.defaultAction.allowUnfreeze) {
                actionColumn.defaultAction.allowUnfreeze = hasUnFreeze?.hasAccess;
            }
        }
    }, [configFile]);

    useEffect(() => {
        if (isListSuccess && isListeData) {
            if (isListeData) {
                setDataSource(isListeData.dataSource);
            }
            if (isListeData.totalRecord) {
                setTotalRowCount(isListeData.totalRecord);
            }
        }
    }, [isListSuccess, isListeData]);

    useEffect(() => {
        if (isSuccessUpdateSupplierStatus && updateSupplierStatusData) {
            ToastService.success(updateSupplierStatusData.errorMessage);
            getListApi()
        }
    }, [isSuccessUpdateSupplierStatus, updateSupplierStatusData]);

    useImperativeHandle(DataRef, () => ({
        getListApi,
    }));

    const getListApi = () => {
        const currentPageObject = molGridRef.current.getCurrentPageObject();
        const request = {
            pagination: {
                pageNumber: currentPageObject.pageNumber,
                pageSize: currentPageObject.pageSize,
            },
            filters: { searchText: "" },
            statusId: Array.isArray(statusId) ? statusId.join(",") : statusId
        };
        getSuppliers(request);
    };

    const approvalCheckList = (data) => {
        if (childRef.current) {
            childRef.current.callChildFunction(data.supplierId);
        }
        setSupplierId(data.supplierId);
    }

    const handleUnfreeze = (data) => {
        // approvalCheckList(data)
        confirm(
            "Warning?",
            `Are you sure you want to change the supplier status to Approved?`,
            "Yes",
            "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                handleUpdate(data)
            }
        });
    }

    const handleActiveSupplier = (data) => {
        approvalCheckList(data)
    }

    const handleUnBlock = (data) => {
        // approvalCheckList(data)
        confirm(
            "Warning?",
            `Are you sure you want to change the supplier status to Approved?`,
            "Yes",
            "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                handleUpdate(data)
            }
        });
    }

    const handleUpdate = () => {
        let req = {
            supplierId: supplierId,
            statusId: StatusEnums.Approved
        }
        updateSupplierStatus(req)
    }


    const handleEditClick = (data) => {
        navigate(`/SupplierDetails/${encryptUrlData(data.supplierId)}`, "_blank");
    }

    const actionHandler = {
        UNFREEZE: handleUnfreeze,
        ACTIVECUSTOMER: handleActiveSupplier,
        UNBLOCKED: handleUnBlock,
        EDIT: handleEditClick,
    };

    return (
        <div>
            <div className="row">
                <div className="col-xxl-12 col-xl-12 col-md-12 col-12">
                    <CardSection
                    >
                        <div className="row">
                            <div className="col-md-12 table-striped">
                                <div className='inactive-scroll-bar'>
                                    <MolGrid
                                        ref={molGridRef}
                                        configuration={configFile}
                                        dataSource={dataSource}
                                        isLoading={isListLoading || updateSupplierStatusLoading}
                                        allowPagination={true}
                                        pagination={{
                                            totalCount: totalRowCount,
                                            pageSize: 25,
                                            currentPage: 1,
                                        }}
                                        onPageChange={handlePageChange}
                                        onActionChange={actionHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardSection>
                </div>
            </div>
            <SupplierApproval childRef={childRef} getListApi={getListApi} updateApproval={handleUpdate} />
        </div>
    )
}