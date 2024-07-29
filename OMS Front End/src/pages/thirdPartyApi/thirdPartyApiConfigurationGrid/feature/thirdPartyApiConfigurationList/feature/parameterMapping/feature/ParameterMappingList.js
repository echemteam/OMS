import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import SwalAlert from '../../../../../../../../services/swalService/SwalService';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import MolGrid from '../../../../../../../../components/Grid/MolGrid';
import { AddEditParameterMappingConfigurationData } from '../config/AddEditParameterMapping.data';
import { useDeleteApiParameterMappingMutation, useGetApiParameterMappingsMutation } from '../../../../../../../../app/services/thirdPartyAPI';

const ParameterMappingList = (props) => {

    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [getApiParameterMappings, { isLoading: isGetApiParameterMappingsLoading, isSuccess: isGetApiParameterMappingsSuccess, data: isGetApiParameterMappingsData }] = useGetApiParameterMappingsMutation();
    const [deleteApiParameterMapping, { isSuccess: isDeleteApiParameterMappingSuccess, data: isDeleteApiParameterMappingData },] = useDeleteApiParameterMappingMutation();

    const getLists = (pageObject, sortingString) => {
        const request = {
            pagination: {
                pageNumber: pageObject.pageNumber,
                pageSize: pageObject.pageSize,
            },
            filters: { searchText: "" },
            sortString: sortingString,
            apiEventId: props.keyId
        };
        getApiParameterMappings(request);
    };

    useEffect(() => {
        if (isDeleteApiParameterMappingSuccess && isDeleteApiParameterMappingData) {
            ToastService.success(isDeleteApiParameterMappingData.errorMessage);
            const currentPageObject = molGridRef.current.getCurrentPageObject();
            getLists(currentPageObject, molGridRef.current.generateSortingString());
        }
    }, [isDeleteApiParameterMappingSuccess, isDeleteApiParameterMappingData]);

    const handlePageChange = (page) => {
        getLists(page, molGridRef.current.generateSortingString());
    };

    const handleSorting = (shortString) => {
        getLists(molGridRef.current.getCurrentPageObject(), shortString);
    };

    const onGetData = () => {
        if (molGridRef.current) {
            const defaultPageObject = molGridRef.current.getCurrentPageObject();
            getLists(defaultPageObject, molGridRef.current.generateSortingString());
        }
    };

    useEffect(() => {
        if (isGetApiParameterMappingsSuccess && isGetApiParameterMappingsData) {
            if (isGetApiParameterMappingsData) {
                setListData(isGetApiParameterMappingsData.dataSource);
            }
            if (isGetApiParameterMappingsData.totalRecord) {
                setTotalRowCount(isGetApiParameterMappingsData.totalRecord);
            }
        }
    }, [isGetApiParameterMappingsSuccess, isGetApiParameterMappingsData]);

    const handleDeleteClick = (data) => {
        confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                deleteApiParameterMapping(data.apiParameterMappingId);
            }
        });
    };

    useEffect(() => {
        if (molGridRef.current) {
            const currentPageObject = molGridRef.current.getCurrentPageObject();
            const currentsortingString = molGridRef.current.generateSortingString();
            const request = {
                pagination: {
                    pageNumber: currentPageObject.pageNumber,
                    pageSize: currentPageObject.pageSize,
                },
                filters: { searchText: "" },
                sortString: currentsortingString,
                apiEventId: props.keyId

            };
            getApiParameterMappings(request);
        }
    }, []);

    const actionHandler = {
        DELETE: handleDeleteClick
    };

    useImperativeHandle(props.childRef, () => ({
        callChildFunction: onGetData,
    }));

    return (
        <div className="row">
            <div className="col-md-12 table-striped api-provider">
                <MolGrid
                    ref={molGridRef}
                    configuration={AddEditParameterMappingConfigurationData}
                    dataSource={listData}
                    allowPagination={true}
                    pagination={{
                        totalCount: totalRowCount,
                        pageSize: 20,
                        currentPage: 1,
                    }}
                    onPageChange={handlePageChange}
                    onSorting={handleSorting}
                    isLoading={isGetApiParameterMappingsLoading}
                    onActionChange={actionHandler}
                />
            </div>
        </div>
    )
}

export default ParameterMappingList