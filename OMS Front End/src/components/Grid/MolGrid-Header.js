import React from "react";
import { AppIcons } from "../../data/appIcons";
import Image from "../image/Image";
import "./MolGrid.scss";
import Iconify from "../ui/iconify/Iconify";

const MolGridHeader = (props) => {
  // Function to handle sorting or toggling sorting order
  const handleSortColumn = (col) => {
    const index = props.selectedSorting.findIndex(
      (item) => item.fieldName === col.fieldName
    );
    let sortingObj = [...props.selectedSorting];

    if (index !== -1) {
      // If it exists, toggle the 'isAsc' property
      const updatedSorting = [...sortingObj];
      updatedSorting[index] = {
        ...updatedSorting[index],
        isAsc: !updatedSorting[index].isAsc,
      };
      sortingObj = updatedSorting;
    } else {
      // Calculate the next sort number
      const nextSortNumber = props.selectedSorting.length + 1;

      // Create a new object with the calculated sort number
      const newItem = {
        fieldName: col.fieldName,
        isAsc: true,
        sortNumber: nextSortNumber,
      };

      sortingObj = [...props.selectedSorting, newItem];
    }

    if (props.onSortingUpdate) props.onSortingUpdate(sortingObj);
  };

  // Function to remove a sorted column
  const handleRemoveSortColumn = (col) => {
    const index = props.selectedSorting.findIndex(
      (item) => item.fieldName === col.fieldName
    );
    let sortingObj = [...props.selectedSorting];

    if (index !== -1) {
      // If it exists, remove the object from the array
      sortingObj.splice(index, 1);

      // Update the sort number for the remaining objects
      sortingObj = sortingObj.map((item, idx) => ({
        ...item,
        sortNumber: idx + 1,
      }));
    }

    if (props.onSortingUpdate) props.onSortingUpdate(sortingObj);
  };
  const renderShortColumn = (col) => {
    let shortColObj = props.selectedSorting.find(
      (s) => s.fieldName === col.fieldName
    );

    return (
      <>
        <div
          className={`shorting-part ${
            shortColObj && shortColObj.isAsc ? "short-column" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => {
              handleSortColumn(col);
            }}
          >
            <span>{col.name}</span>
            {/* <Image
              imgCustomClassName="order-icon"
              imagePath={AppIcons.shortingArrowIcon}
              altText="Arrow Icon"
            /> */}
            <Iconify
              imgCustomClassName="order-icon"
              icon="solar:alt-arrow-down-outline"
            />
          </button>
          {shortColObj ? (
            <span className="sort-priority-number">
              <div className="short-count">
                {shortColObj.sortNumber}
                <button
                  className="cancel-short"
                  onClick={() => {
                    handleRemoveSortColumn(col);
                  }}
                >
                  {/* <Image
                    imagePath={AppIcons.CloseIcon}
                    altText="cancel"
                  /> */}
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </span>
          ) : null}
        </div>
      </>
    );
  };

  return (
    <tr>
      {/* {props.columns.map((col, index) => (
        <th key={`col_${index}`} className="whitespace-nowrap">
          {col.allowShort ? (
            <span className="heading-shorting">{renderShortColumn(col)}</span>
          ) : (
            <>{col.name}</>
          )}
        </th>
      ))} */}
      {props.columns.map((col, index) => (
        <th
          key={`col_${index}`}
          style={{ width: col.width }}
          className="whitespace-nowrap"
        >
          {col.allowShort ? (
            <span className="heading-shorting">{renderShortColumn(col)}</span>
          ) : (
            <>{col.name}</>
          )}
        </th>
      ))}
    </tr>
  );
};

export default MolGridHeader;
