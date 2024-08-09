/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
//** Lib's */
import { AppIcons } from '../../../../../../data/appIcons';
// import MolGrid from '../../../../../../components/Grid/MolGrid';
import { securityKey } from '../../../../../../data/SecurityKey';
import { StatusEnums } from '../../../../../../utils/Enums/StatusEnums';
import CardSection from '../../../../../../components/ui/card/CardSection';
import SupplierContext from "../../../../../../utils/ContextAPIs/Supplier/SupplierListContext"
import AddSupplierContext from "../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { hasFunctionalPermission } from '../../../../../../utils/AuthorizeNavigation/authorizeNavigation';
//** Service's */
import { encryptUrlData } from '../../../../../../services/CryptoService';
import SwalAlert from '../../../../../../services/swalService/SwalService';
import ToastService from '../../../../../../services/toastService/ToastService';
import { useGetSuppliersMutation, useUpdateSupplierStatusMutation } from '../../../../../../app/services/supplierAPI';
import FinalMolGrid from '../../../../../../components/FinalMolGrid/FinalMolGrid';
//** Component's */
const SupplierApproval = React.lazy(() => import("../../../../feature/supplierApproval/SupplierApproval"));


const InActiveSuppliersList = ({ statusId, configFile, handleChange, search, handleChangeDropdown, statusOptions, selectedDrpvalues, selectedStatusOptions, searchStatusFilter, handleSearch, handleClear, shouldRerenderFormCreator }) => {

    const childRef = useRef();
    const molGridRef = useRef();
    const navigate = useNavigate();
    const { confirm } = SwalAlert();
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [dataSource, setDataSource] = useState();
    const { DataRef } = useContext(SupplierContext);
    const [supplierId, setSupplierId] = useState();
    const authState = useSelector((state) => state.auth);
    const { isResponsibleUser, setIsResponsibleUser } = useContext(AddSupplierContext);

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
            filters: { searchText: search },
            statusId: Array.isArray(statusId) ? statusId.join(",") : String(statusId)
        };
        getSuppliers(request);
    };

    useEffect(() => {
        if (!isResponsibleUser) {
            const actionColumn = configFile?.columns.find(column => column.name === "Action");
            if (actionColumn) {

                const hasActive = hasFunctionalPermission(securityKey.ACTIVESUPPLIER);
                const hasUnBlock = hasFunctionalPermission(securityKey.UNBLOCKSUPPLIER);
                const hasUnFreeze = hasFunctionalPermission(securityKey.UNFREEZESUPPLIER);

                if (actionColumn.defaultAction.allowActiveSupplier) {
                    actionColumn.defaultAction.allowActiveSupplier = hasActive?.hasAccess;
                } else if (actionColumn.defaultAction.allowUnblocked) {
                    actionColumn.defaultAction.allowUnblocked = hasUnBlock?.hasAccess;
                } else if (actionColumn.defaultAction.allowUnfreeze) {
                    actionColumn.defaultAction.allowUnfreeze = hasUnFreeze?.hasAccess;
                }
            }
        }
    }, [configFile]);

    const hasResponsibleUserhasAccess = () => {
        const actionColumn = configFile?.columns.find((column) => column.name === "Action");
        if (actionColumn) {
            if (actionColumn.defaultAction.hasOwnProperty('allowActiveCustomer')) {
                actionColumn.defaultAction.allowActiveCustomer = true;
            }
            if (actionColumn.defaultAction.hasOwnProperty("allowUnblocked")) {
                actionColumn.defaultAction.allowUnblocked = true;
            }
            if (actionColumn.defaultAction.hasOwnProperty('allowUnfreeze')) {
                actionColumn.defaultAction.allowUnfreeze = true;
            }
        }
    }

    useEffect(() => {
        if (isListSuccess && isListeData) {
            if (isListeData) {
                setDataSource(isListeData.dataSource);
                const isResponsibleId = isListeData.dataSource.find(data => data.responsibleUserId === authState?.user?.userID);
                if (isResponsibleId) {
                    setIsResponsibleUser(true);
                    hasResponsibleUserhasAccess();
                } else {
                    setIsResponsibleUser(false);
                }
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
            filters: { searchText: search },
            statusId: selectedDrpvalues.length === 0 ? (Array.isArray(statusId) ? statusId.join(",") : String(statusId)) : (Array.isArray(selectedDrpvalues) ? selectedDrpvalues.join(",") : String(selectedDrpvalues))
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
            `Are you sure you want to unfreeze and change the status to approved?`,
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
            `Are you sure you want to unfreeze and change the status to approved?`,
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
        ALLOWUNFREEZE: handleUnfreeze,
        ACTIVECUSTOMER: handleActiveSupplier,
        ALLOWUNBLOCKED: handleUnBlock,
        EDIT: handleEditClick,
    };

    return (
        <div>
            <div className="row">
                <div className="col-xxl-12 col-xl-12 col-md-12 col-12" key={shouldRerenderFormCreator}>
                    <CardSection
                        searchInput={true}
                        handleChange={handleChange}
                        searchInputName="Search By Supplier Name, Tax Id , Email Address"
                        searchFilter={searchStatusFilter }
                        handleChangeDropdown={handleChangeDropdown}
                        selectedOptions={selectedDrpvalues}
                        optionsValue={statusOptions}
                        isMultiSelect={true}
                        placeholder="Search by Status"
                        isCardSection={true}
                        isdropdownOpen={true}
                        searchButton={true}
                        searchbuttonText="Search"
                        buttonClassName="theme-button"
                        searchTitleButtonClick={handleSearch}
                        clearButton={true}
                        clearTitleButtonClick={handleClear}
                        clearButtonText="Clear"
                        clearButtonClassName="dark-btn"
                        searchIconImg={AppIcons.SearchIcone}
                        searchTextWithIcon={true}
                        clearTextWithIcon={true}
                        clearIconImg={AppIcons.ClearIcone}
                    >
                        <div className="row">
                            <div className="col-md-12 table-striped">
                                <div className='inactive-scroll-bar'>
                                    <FinalMolGrid
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

InActiveSuppliersList.propTypes = {
    statusId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ]).isRequired,
    configFile: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    handleChangeDropdown: PropTypes.func.isRequired,
    statusOptions: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
      })
    ).isRequired,
    selectedDrpvalues: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.string
      ]).isRequired,
      selectedStatusOptions: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.string
      ]).isRequired,
    searchStatusFilter: PropTypes.bool.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleClear: PropTypes.func.isRequired,
    shouldRerenderFormCreator: PropTypes.bool.isRequired,
  };

export default InActiveSuppliersList;