import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import PropTypes from "prop-types";

import DataLoader from "./ui/dataLoader/DataLoader";
import MolGridHeader from "./Final-MolGrid-Header";
import MolGridDataRows from "./Final-MolGrid-data-row";
import MolPagination from "./Pagination/FinalMolPagination";
import NoRecordFound from "./ui/noRecordFound/NoRecordFound";

import "./FinalMolGrid.scss";

const FinalMolGrid = forwardRef((props, ref) => {
    // Initialize state for currentPage, pageSize, and totalPageCount
    const [sorting, setSorting] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [pageSize, setPageSize] = useState(props.pagination?.pageSize || 10);
    const [currentPage, setCurrentPage] = useState(props.pagination?.currentPage || 1);

    // Calculate the total page count whenever totalCount or pageSize changes
    useEffect(() => {
        if (props.pagination.totalCount > 0) {
            calculateTotalPage(pageSize);
        }
    }, [props.pagination.totalCount, pageSize]);

    // Calculate total page count and adjust currentPage if necessary
    const calculateTotalPage = (newPageSize) => {
        let newTotalPageCount = Math.ceil(
            props.pagination.totalCount / newPageSize
        );
        if (newTotalPageCount === 0) {
            newTotalPageCount = 1;
        }
        if (currentPage > newTotalPageCount) {
            setCurrentPage(newTotalPageCount);
        }
        setTotalPageCount(newTotalPageCount);
    };

    // Get the current page object
    const getCurrentPageObject = () => {
        return {
            pageNumber: currentPage,
            pageSize: pageSize,
            // Add other pagination-related properties here
        };
    };

    // Get the current page object
    const getDefulatPageObject = () => {
        setCurrentPage(1);
        return {
            pageNumber: 1,
            pageSize: pageSize,
            // Add other pagination-related properties here
        };
    };

    const getSortingString = (data) => {
        return data.map(item => {
            const sortingOrder = item.isAsc ? '' : ' desc';
            return `${item.fieldName}${sortingOrder}`;
        }).join(',');
    };

    const getSelectedRow = () => {
        return {
                row:selectedRow,
                rowIndex:selectedRowIndex
        }
    };

    const generateSortingString = () => {
        return getSortingString(sorting);
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        if (props.onPageChange) {
            props.onPageChange({
                pageNumber: newPage,
                pageSize: pageSize,
                // Add other pagination-related properties here
            });
        }
    };

    const handleSortingUpdate = (updatedSortingData) => {
        setSorting(updatedSortingData);
        if (props.onSorting) {
            props.onSorting(getSortingString(updatedSortingData));
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        calculateTotalPage(newSize);
        setCurrentPage(1);
        if (props.onPageChange) {
            props.onPageChange({
                pageNumber: 1,
                pageSize: newSize,
                // Add other pagination-related properties here
            });
        }
    };

    // Handle Save Click after data Update

    const handleUpdateSaveClick = (updateData, rowIndexToUpdate) => {
        if (props?.onRowDataUpdate) {
            props?.onRowDataUpdate(updateData, rowIndexToUpdate)
        }
    }

    const handleRowSelect = (e,rowData, rowIndex) => {
    //    e.preventDefault(); // Prevent the default action (e.g., following a link)
        setSelectedRow(rowData);
        setSelectedRowIndex(rowIndex);
        if(props.onRowSelect)
        {
            props.onRowSelect(rowData,rowIndex);
        }
        // Add any additional logic here
    };

    // Use useImperativeHandle to make the getCurrentPageObject function accessible via the ref
    useImperativeHandle(ref, () => ({
        getCurrentPageObject,
        getDefulatPageObject,
        generateSortingString,
        getSelectedRow
    }));

    const renderDataRow = () => {
        if (props.isLoading) {
            return (
                <tr className="no-address">
                    {/* <td colSpan={100}> */}
                        <DataLoader />
                    {/* </td> */}
                </tr>
            );
        }

        if (props.dataSource?.length > 0) {
            return (
                <MolGridDataRows
                    dataSource={props.dataSource}
                    columns={props.configuration.columns}
                    onActionChange={props.onActionChange}
                    customColumnClass={props.configuration.customColumnClass}
                    customHeaderClass={props.configuration.customHeaderClass}
                    allowEditGrid={props.configuration.allowEdit}
                    editGridSettings={props.configuration.editSettings}
                    slectedRowIndex={selectedRowIndex}
                    onRowDataUpdateSaving={handleUpdateSaveClick}
                    onColumnDataChange={props.onColumnChange}
                    onRowDataDelete = {props.onRowDataDelete}
                    onRowSelect={handleRowSelect} // Pass the handler here
                    {...props}
                />
            );
        }

        return (
            <tr className="no-address">
                {/* <td colSpan={100}> */}
                    <NoRecordFound />
                {/* </td> */}
            </tr>
        );
    };

    return (
        <div className={`molgrid-2 ${props.configuration.hasChildGridTable ? "table-custom" : ""}`}>
            <table className={props.configuration?.gridStyle?.tableClass}>
                <thead>
                    <MolGridHeader
                        columns={props.configuration.columns}
                        onSortingUpdate={handleSortingUpdate}
                        selectedSorting={sorting}
                        hasChildGridTable={props.configuration.hasChildGridTable}
                    />
                </thead>
                <tbody>{renderDataRow()}</tbody>
            </table>
            {props.allowPagination && (
                <MolPagination
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalPages={totalPageCount}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}
        </div>
    );
});

FinalMolGrid.propTypes = {
    configuration: PropTypes.shape({
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        allowEdit: PropTypes.bool,
        hasChildGridTable: PropTypes.bool,
    }).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object),
    allowPagination: PropTypes.bool,
    pagination: PropTypes.shape({
        currentPage: PropTypes.number,
        totalCount: PropTypes.number,
        pageSize: PropTypes.number,
    }),
    onPageChange: PropTypes.func,
    onSorting: PropTypes.func,
    onRowDataEdit:PropTypes.func,
    onColumnChange:PropTypes.func,
    onRowDataUpdate:PropTypes.func,
    onRowDataDelete:PropTypes.func,
    onRowSelect: PropTypes.func
};

FinalMolGrid.defaultProps = {
    allowPagination: true,
    pagination: {
        currentPage: 1,
        totalCount: 1,
        pageSize: 10,
    },
};

export default FinalMolGrid;

