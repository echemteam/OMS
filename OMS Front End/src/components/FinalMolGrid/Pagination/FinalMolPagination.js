import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../image/Image";
import "./finalpagination.scss";
import Iconify from "../../ui/iconify/Iconify";

const MolPagination = ({
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);
  // Handle previous page navigation
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Update the input page state when the user types in the page number input
  const handlePageInputChange = (event) => {
    const input = event.target.value;
    setInputPage(input);
  };

  // Navigate to the page specified in the input field
  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  // Handle pressing "Enter" key to go to the specified page
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGoToPage();
    }
  };

  // Handle next page navigation
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    onPageSizeChange(newSize);
  };

  // Render page numbers as buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={i === currentPage ? "active-button" : ""}
          onClick={() => {
            onPageChange(i);
            setInputPage(i);
          }}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  // Generate page size options for the select input
  const generatePageSizeOptions = () => {
    const options = [];
    const staticPageSizes = [10, 20, 50, 100];
    const dynamicPageSize = pageSize;
    const isDynamicPageSizeInStatic = staticPageSizes.includes(dynamicPageSize);
    const allPageSizes = isDynamicPageSizeInStatic
      ? [...staticPageSizes]
      : [...staticPageSizes, dynamicPageSize];

    allPageSizes.sort((a, b) => a - b);

    for (const size of allPageSizes) {
      options.push(
        <option key={"sel_" + size} value={size}>
          {size}
        </option>
      );
    }

    return options;
  };

  return (
    <div className="table-pagination">
      <p>
        {/* Page {currentPage} of {totalPages} */}
        Page
        <input
          className="new-input-page ml-2"
          value={inputPage}
          onChange={handlePageInputChange}
          onBlur={handleGoToPage}
          onKeyPress={handleKeyPress}
          min="1"
          max={totalPages}
        />
        <span className="mx-1">of</span>
        <span className="mx-1">{totalPages}</span>
      </p>
      <div className="display-per-page">
        Page Size:{" "}
        <select value={pageSize} onChange={handlePageSizeChange}>
          {generatePageSizeOptions()}
        </select>
      </div>
      <div className="gap-2 pagination">
        <button title="Previous" onClick={handlePrevious}>
          {/* <Image
						imgCustomClassName="left-arrow"
						imagePath={AppIcons.arrowIcon}
						altText="Arrow Icon"
					/> */}
          <Iconify icon="solar:alt-arrow-down-outline" className="left-arrow" />
        </button>
        {renderPageNumbers()}
        <button title="Next" onClick={handleNext}>
          {/* <Image
            imgCustomClassName="right-arrow"
            imagePath={AppIcons.arrowIcon}
            altText="Arrow Icon"
          /> */}
          <Iconify className="right-arrow" icon="solar:alt-arrow-down-outline" />            
        </button>
      </div>
    </div>
  );
};

// Define PropTypes for the component
MolPagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};
export default MolPagination;
