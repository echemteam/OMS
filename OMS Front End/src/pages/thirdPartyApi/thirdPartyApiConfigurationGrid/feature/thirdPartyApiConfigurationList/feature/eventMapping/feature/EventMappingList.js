import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDeleteApiEventMappingMutation, useGetApiEventMappingsMutation } from '../../../../../../../../app/services/thirdPartyAPI';
import { AddEditMappingConfigurationData } from '../config/AddEditMapping.data';
import SwalAlert from '../../../../../../../../services/swalService/SwalService';
import ToastService from '../../../../../../../../services/toastService/ToastService';
import MolGrid from '../../../../../../../../components/Grid/MolGrid';

const EventMappingList = (props) => {
    const molGridRef = useRef();
    const { confirm } = SwalAlert();
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [getApiEventMappings, { isLoading: isGetApiEventMappingsLoading, isSuccess: isGetApiEventMappingsSuccess, data: isGetApiEventMappingsData }] = useGetApiEventMappingsMutation();
    const [deleteApiEventMapping, { isSuccess: isDeleteApiEventMappingSuccess, data: isDeleteApiEventMappingData },] = useDeleteApiEventMappingMutation();

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
        getApiEventMappings(request);
    };

    useEffect(() => {
        if (isDeleteApiEventMappingSuccess && isDeleteApiEventMappingData) {
            ToastService.success(isDeleteApiEventMappingData.errorMessage);
            const currentPageObject = molGridRef.current.getCurrentPageObject();
            getLists(currentPageObject, molGridRef.current.generateSortingString());
        }
    }, [isDeleteApiEventMappingSuccess, isDeleteApiEventMappingData]);

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
        if (isGetApiEventMappingsSuccess && isGetApiEventMappingsData) {
            if (isGetApiEventMappingsData) {
                setListData(isGetApiEventMappingsData.dataSource);
            }
            if (isGetApiEventMappingsData.totalRecord) {
                setTotalRowCount(isGetApiEventMappingsData.totalRecord);
            }
        }
    }, [isGetApiEventMappingsSuccess, isGetApiEventMappingsData]);

    const handleDeleteClick = (data) => {
        confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                deleteApiEventMapping(data.apiEventMappingId);
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
            getApiEventMappings(request);
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
                    configuration={AddEditMappingConfigurationData}
                    dataSource={listData}
                    allowPagination={true}
                    pagination={{
                        totalCount: totalRowCount,
                        pageSize: 20,
                        currentPage: 1,
                    }}
                    onPageChange={handlePageChange}
                    onSorting={handleSorting}
                    isLoading={isGetApiEventMappingsLoading}
                    onActionChange={actionHandler}
                // searchTitleButtonClick={handleSearch}
                // handleChange={handleChange}
                // handleClear={handleClear}
                />
            </div>
        </div>
    )
}

export default EventMappingList