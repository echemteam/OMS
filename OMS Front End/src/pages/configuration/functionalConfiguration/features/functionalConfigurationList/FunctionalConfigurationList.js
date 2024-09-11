/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { functionalConfigurationListData } from './config/FunctionalConfigurationList.data';
// import { useNavigate } from 'react-router-dom';
import { useGetFunctionalitiesMutation } from '../../../../../app/services/configurationAPI';
// import { encryptUrlData } from '../../../../../services/CryptoService';
import FinalMolGrid from '../../../../../components/FinalMolGrid/FinalMolGrid';

const FunctionalConfigurationList = (props) => {
    const molGridRef = useRef();
    // const navigate = useNavigate();
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

    // const handleViewClick = (data) => {
    //     const encryptedFunctionalityId = encryptUrlData(data.functionalityId);
    //     const encryptedModuleName = encryptUrlData(data.moduleName);
    //     navigate(`/FunctionalConfigurationViewDetail/${encryptedFunctionalityId}/${encryptedModuleName}`, "_blank");
    // }

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
        VIEWCONFIGURATION: handleEditClick,
       // EDIT: handleEditClick
    }

    return (
        <div className="row">
            <div className="col-md-12 table-striped api-provider">
                <FinalMolGrid
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
FunctionalConfigurationList.propTypes = {
    moduleId: PropTypes.number.isRequired,  
    childRef: PropTypes.shape({  
        current: PropTypes.object
    }),
    onEdit: PropTypes.func  
};
export default FunctionalConfigurationList