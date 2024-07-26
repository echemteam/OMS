import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import MolGrid from '../../../../../components/Grid/MolGrid';
import { useNavigate } from 'react-router-dom';
import { thirdPartyListConfigurationData } from './config/ThirdPartyApiConfigurationList.data';
import { useDeleteApiEventMutation, useGetApiEventsMutation } from '../../../../../app/services/thirdPartyAPI';
import ToastService from '../../../../../services/toastService/ToastService';
import SwalAlert from '../../../../../services/swalService/SwalService';
import { encryptUrlData } from '../../../../../services/CryptoService';

const ThirdPartyApiConfigurationList = ({ childRef }) => {
    const molGridRef = useRef();
    const navigate = useNavigate();
    const { confirm } = SwalAlert();
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [getApiEvents, { isLoading: isGetApiEventsLoading, isSuccess: isGetApiEventsSuccess, data: isGetApiEventsData, },] = useGetApiEventsMutation();
    const [deleteApiEvent, { isSuccess: isDeleteApiEventSuccess, data: isDeleteApiEventData },] = useDeleteApiEventMutation();

    const getLists = (pageObject, sortingString) => {
        const request = {
            pagination: {
                pageNumber: pageObject.pageNumber,
                pageSize: pageObject.pageSize,
            },
            filters: { searchText: "" },
            sortString: sortingString,
        };
        getApiEvents(request);
    };

    useEffect(() => {
        if (isDeleteApiEventSuccess && isDeleteApiEventData) {
            ToastService.success(isDeleteApiEventData.errorMessage);
            const currentPageObject = molGridRef.current.getCurrentPageObject();
            getLists(currentPageObject, molGridRef.current.generateSortingString());
        }
    }, [isDeleteApiEventSuccess, isDeleteApiEventData]);

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
        if (isGetApiEventsSuccess && isGetApiEventsData) {
            if (isGetApiEventsData) {
                setListData(isGetApiEventsData.dataSource);
            }
            if (isGetApiEventsData.totalRecord) {
                setTotalRowCount(isGetApiEventsData.totalRecord);
            }
        }
    }, [isGetApiEventsSuccess, isGetApiEventsData]);

    const handleDeleteClick = (data) => {
        confirm("Delete?", "Are you sure you want to Delete?", "Delete", "Cancel"
        ).then((confirmed) => {
            if (confirmed) {
                deleteApiEvent(data.apiEventId);
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
            };
            getApiEvents(request);
        }
    }, []);


    const handleViewClick = (data) => {
        navigate(`/ThirdPartyApiConfigurationViewDetails/${encryptUrlData(data.apiEventId)}`, "_blank");
    }

    const actionHandler = {
        VIEW: handleViewClick,
        DELETE: handleDeleteClick
    };

    useImperativeHandle(childRef, () => ({
        callChildFunction: onGetData,
    }));

    return (
        <div className="row">
            <div className="col-md-12 table-striped api-provider">
                <MolGrid
                    ref={molGridRef}
                    configuration={thirdPartyListConfigurationData}
                    dataSource={listData}
                    allowPagination={true}
                    pagination={{
                        totalCount: totalRowCount,
                        pageSize: 20,
                        currentPage: 1,
                    }}
                    onPageChange={handlePageChange}
                    onSorting={handleSorting}
                    isLoading={isGetApiEventsLoading}
                    onActionChange={actionHandler}
                // searchTitleButtonClick={handleSearch}
                // handleChange={handleChange}
                // handleClear={handleClear}
                />
            </div>
        </div>
    )
}

export default ThirdPartyApiConfigurationList