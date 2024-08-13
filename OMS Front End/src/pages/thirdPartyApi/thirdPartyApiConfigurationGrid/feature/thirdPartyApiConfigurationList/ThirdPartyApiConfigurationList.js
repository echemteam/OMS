/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { thirdPartyListConfigurationData } from './config/ThirdPartyApiConfigurationList.data';
import { useDeleteApiEventMutation, useGetApiEventsMutation, useThirdPartyAPICallMutation } from '../../../../../app/services/thirdPartyAPI';
import ToastService from '../../../../../services/toastService/ToastService';
import SwalAlert from '../../../../../services/swalService/SwalService';
import { encryptUrlData } from '../../../../../services/CryptoService';
import FinalMolGrid from '../../../../../components/FinalMolGrid/FinalMolGrid';
import { ErrorMessage } from '../../../../../data/appMessages';

const ThirdPartyApiConfigurationList = ({ childRef }) => {
    const molGridRef = useRef();
    const navigate = useNavigate();
    const { confirm } = SwalAlert();
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);

    const [deleteApiEvent, { isSuccess: isDeleteApiEventSuccess, data: isDeleteApiEventData },] = useDeleteApiEventMutation();
    const [getThirdPartyApiResponse, { isSuccess: isApiResponseSucess, data: isApiResponseData }] = useThirdPartyAPICallMutation();
    const [getApiEvents, { isLoading: isGetApiEventsLoading, isSuccess: isGetApiEventsSuccess, data: isGetApiEventsData, },] = useGetApiEventsMutation();

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
        if (isApiResponseSucess && isApiResponseData) {
            if (isApiResponseData.isSuccess) {
                const responseData = JSON.parse(isApiResponseData.data);
                // console.log('isApiResponseData =>', responseData?.data);
                ToastService.success(responseData?.message);
            } else if (!isApiResponseData.isSuccess) {
                ToastService.warning(isApiResponseData.message);
            } else {
                ToastService.warning(ErrorMessage.DefaultMessage);
            }
        }
    }, [isApiResponseSucess, isApiResponseData]);

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

    const handleTestClick = (data) => {
        let parameter = {
            searchText: "acid"
        }
        let request = {
            eventName: data.eventName,
            isDynamicParameter: false,
            parameters: JSON.stringify(parameter)
        }
        getThirdPartyApiResponse(request);
    };


    const actionHandler = {
        VIEWCONFIGURATION: handleViewClick,
        DELETE: handleDeleteClick,
        TESTAPI: handleTestClick
    };

    useImperativeHandle(childRef, () => ({
        callChildFunction: onGetData,
    }));

    return (
        <div className="row">
            <div className="col-md-12 table-striped api-provider">
                <FinalMolGrid
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

                />
            </div>
        </div>
    )
}

ThirdPartyApiConfigurationList.propTypes = {
    childRef: PropTypes.shape({
        current: PropTypes.shape({
            callChildFunction: PropTypes.func
        })
    })
};
export default ThirdPartyApiConfigurationList