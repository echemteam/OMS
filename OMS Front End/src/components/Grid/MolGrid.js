/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "./MolGrid.scss";
import PropTypes from "prop-types";
import MolGridHeader from "./MolGrid-Header";
import MolGridDataRows from "./Molgrid-data-row";
import MolPagination from "./Pagination/MolPagination";
import DataLoader from "../ui/dataLoader/DataLoader";
import NoRecordFound from "../ui/noRecordFound/NoRecordFound";

const MolGrid = forwardRef((props, ref) => {
  // Initialize state for currentPage, pageSize, and totalPageCount
  const [currentPage, setCurrentPage] = useState(
    props.pagination?.currentPage || 1
  );
  const [pageSize, setPageSize] = useState(props.pagination?.pageSize || 10);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [sorting, setSorting] = useState([]);

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

  // Use useImperativeHandle to make the getCurrentPageObject function accessible via the ref
  useImperativeHandle(ref, () => ({
    getCurrentPageObject,
    getDefulatPageObject,
    generateSortingString
  }));

  const renderDataRow = (prop) => {
    const isRenderRow =
      !!(prop.dataSource && prop.dataSource.length > 0);
    return (
      <>
        {prop.isLoading ? (
          <tr>
            <td colSpan={100}>
              <DataLoader />
            </td>
          </tr>
        ) : isRenderRow ? (
          <MolGridDataRows
            dataSource={prop.dataSource}
            columns={prop.configuration.columns}
            onActionChange={prop.onActionChange}
            {...prop}
          />
        ) : (
          <tr className="no-address">
            <NoRecordFound />
          </tr>
        )}
      </>
    );
  };

  return (
    <div className="">
      {/* <div className="dynamic-grid"> */}
      <table className="border-table-simple">
        <thead>
          <MolGridHeader columns={props.configuration.columns}
            onSortingUpdate={handleSortingUpdate}
            selectedSorting={sorting}
          />
        </thead>
        <tbody>{renderDataRow(props)}</tbody>
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

MolGrid.propTypes = {
  configuration: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object),
  allowPagination: PropTypes.bool,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalCount: PropTypes.number,
    pageSize: PropTypes.number,
  }),
};

MolGrid.defaultProps = {
  allowPagination: true,
  pagination: {
    currentPage: 1,
    totalCount: 1,
    pageSize: 10,
  },
};

export default MolGrid;
