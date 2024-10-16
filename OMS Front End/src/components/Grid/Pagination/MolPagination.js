import React, { useState } from "react";
// import { AppIcons } from "../../../data/appIcons";
// import Image from "../../image/Image";
import "./pagination.scss";
import Iconify from "../../ui/iconify/Iconify";

const MolPagination = ({
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageInputChange = (event) => {
    const input = event.target.value;
    setInputPage(input);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGoToPage();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    onPageSizeChange(newSize);
    setInputPage(1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Calculate the start and end page numbers to display
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    // Adjust the startPage if there are fewer than 5 pages to display
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

  const generatePageSizeOptions = () => {
    const options = [];

    // Add static page sizes
    const staticPageSizes = [10, 20, 50, 100];

    // Ensure the dynamicPageSize is not in the staticPageSizes array
    const dynamicPageSize = pageSize; // Replace with the dynamic page size from props

    // Check if dynamicPageSize is already in staticPageSizes
    const isDynamicPageSizeInStatic = staticPageSizes.includes(dynamicPageSize);

    // Combine static and dynamic page sizes (excluding dynamicPageSize if it's in staticPageSizes)
    const allPageSizes = isDynamicPageSizeInStatic
      ? [...staticPageSizes]
      : [...staticPageSizes, dynamicPageSize];

    // Sort allPageSizes in ascending order
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
    <>
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
          Page Size:
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
    </>
  );
};

export default MolPagination;
