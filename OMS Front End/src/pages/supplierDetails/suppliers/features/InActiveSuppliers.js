import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CardSection from '../../../../components/ui/card/CardSection';
import MolGrid from '../../../../components/Grid/MolGrid';
import SupplierContext from "../../../../utils/ContextAPIs/Supplier/SupplierListContext"
import ToastService from '../../../../services/toastService/ToastService';
import { StatusEnums } from '../../../../common/features/Enums/StatusEnums';
import { useGetSuppliersMutation, useUpdateSupplierStatusMutation } from '../../../../app/services/supplierAPI';
import { hasFunctionalPermission } from '../../../../utils/AuthorizeNavigation/authorizeNavigation';
import { securityKey } from '../../../../data/SecurityKey';

export const InActiveSuppliers = ({ statusId, configFile }) => {

    const molGridRef = useRef();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [dataSource, setDataSource] = useState();
    const { DataRef } = useContext(SupplierContext);

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

    const handleUnfreeze = (data) => {
        handleUpdate(data)
    }

    const handleActiveSupplier = (data) => {
        handleUpdate(data)
    }

    const handleUnBlock = (data) => {
        handleUpdate(data)
    }

    const handleUpdate = (data) => {
        let req = {
            supplierId: data.supplierId,
            statusId: StatusEnums.Approved
        }
        updateSupplierStatus(req)
    }

    const actionHandler = {
        UNFREEZE: handleUnfreeze,
        ACTIVECUSTOMER: handleActiveSupplier,
        UNBLOCKED: handleUnBlock
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
        </div>
    )
}