import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { functionalConfigurationListData } from './config/FunctionalConfigurationList.data';
import { useNavigate } from 'react-router-dom';
import MolGrid from '../../../../../components/Grid/MolGrid';
import { useGetFunctionalitiesMutation } from '../../../../../app/services/configurationAPI';
import { encryptUrlData } from '../../../../../services/CryptoService';

const FunctionalConfigurationList = (props) => {
    const molGridRef = useRef();
    const navigate = useNavigate();
    const [listData, setListData] = useState();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [getFunctionalities, { isLoading: isGetFunctionalitiesLoading, isSuccess: isGetFunctionalitiesSuccess, data: isGetFunctionalitiesData }] = useGetFunctionalitiesMutation();

    const getLists = (pageObject, sortingString) => {
        const request = {
            pagination: {
                pageNumber: pageObject.pageNumber,
                pageSize: pageObject.pageSize,
            },
            filters: { searchText: "" },
            sortString: sortingString,
            moduleId: props.moduleId
        };
        getFunctionalities(request);
    };

    const handlePageChange = (page) => {
        getLists(page, molGridRef.current.generateSortingString());
    };

    const handleSorting = (shortString) => {
        getLists(molGridRef.current.getCurrentPageObject(), shortString);
    };

    useEffect(() => {
        if (isGetFunctionalitiesSuccess && isGetFunctionalitiesData) {
            if (isGetFunctionalitiesData) {
                setListData(isGetFunctionalitiesData.dataSource);
            }
            if (isGetFunctionalitiesData.totalRecord) {
                setTotalRowCount(isGetFunctionalitiesData.totalRecord);
            }
        }
    }, [isGetFunctionalitiesSuccess, isGetFunctionalitiesData]);

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
                moduleId: props.moduleId
            };
            getFunctionalities(request);
        }
    }, [props.moduleId]);

    const handleViewClick = (data) => {
        navigate(`/FunctionalConfigurationViewDetail/${encryptUrlData(data.functionalityId)}`, "_blank");
    }

    const onGetData = () => {
        if (molGridRef.current) {
            const defaultPageObject = molGridRef.current.getCurrentPageObject();
            getLists(defaultPageObject, molGridRef.current.generateSortingString());
        }
    };

    useImperativeHandle(props.childRef, () => ({
        callChildFunction: onGetData,
    }));


    const handleEditClick = (data) => {
        if (props.onEdit) {
            props.onEdit(data);
          }
    }

    const actionHandler = {
        VIEW: handleViewClick,
        EDIT: handleEditClick
    }

    return (
        <div className="row">
            <div className="col-md-12 table-striped api-provider">
                <MolGrid
                    ref={molGridRef}
                    configuration={functionalConfigurationListData}
                    dataSource={listData}
                    allowPagination={true}
                    pagination={{
                        totalCount: totalRowCount,
                        pageSize: 20,
                        currentPage: 1,
                    }}
                    onPageChange={handlePageChange}
                    onSorting={handleSorting}
                    isLoading={isGetFunctionalitiesLoading}
                    onActionChange={actionHandler}
                />
            </div>
        </div>
    )
}

export default FunctionalConfigurationList