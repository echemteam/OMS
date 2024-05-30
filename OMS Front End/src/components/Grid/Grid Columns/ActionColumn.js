import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../image/Image";
import Buttons from "../../ui/button/Buttons";

export const RenderGridAction = (rowData, col, rowIndex, onActionHandler) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  console.log(rowData, col, rowIndex, onActionHandler);

  useEffect(() => {
    // Add event listener to listen for clicks on the document body
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Close the dropdown if clicked outside of it
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  if (!col.defaultAction) {
    col.defaultAction = {
      allowEdit: true,
      allowDelete: true,
    };
  }

  if (col.renderCustomAction) {
    col?.renderCustomAction(rowData, col);
  }

  const handleAction = (actionName, data, rowIndex) => {
    if (onActionHandler) {
      if (onActionHandler[actionName]) {
        onActionHandler[actionName](data);
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="d-flex action-button">
      {/* {col.customAction &&
        col.customAction.length > 0 &&
        col.customAction.map((action, index) => {
          const commonLinkProps = {
            key: `customAction_${index}`,
            onClick: (e) => {
              e.preventDefault();
              handleAction(action.name, rowData);
            },
            className: "mr-4",
            title: action.name,
            href: "",
          };
          // Add condition to check if rowData.contractInputFile is present
          if (action.name === "DOWNLOAD" && !rowData.contractInputFile) {
            return null;
          } else {
            // Render null if rowData.contractInputFile is not present
            return (
              // <Link {...commonLinkProps}>
              //   <Image imagePath={action.iconName} altText={action.name} />
              // </Link>
              <div
                className={`dropdown-action ${isDropdownOpen ? "openAction" : ""}`}
                ref={dropdownRef}
              >
                <Buttons
                  buttonTypeClassName=""
                  textWithIcon={true}
                  imagePath={AppIcons.arrowIcon}
                  onClick={toggleDropdown}
                ></Buttons>
                <div className="dropdown-list">
                  <ul>
                    <li>
                      <Link onClick={closeDropdown}>Edit</Link>
                    </li>
                    <li>
                      <Link onClick={closeDropdown}>Preview</Link>
                    </li>
                    <li>
                      <Link onClick={closeDropdown}>Duplicate</Link>
                    </li>
                    <li>
                      <Link onClick={closeDropdown}>Approve</Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          }
        })}
         */}

      {col.customAction &&
        col.customAction.length > 0 &&
        col.customAction.map((action, index) => {
          const commonLinkProps = {
            key: `customAction_${index}`,
            onClick: (e) => {
              e.preventDefault();
              handleAction(action.name, rowData);
            },
            className: "mr-4",
            title: action.name,
            href: "",
          };
          // Add condition to check if rowData.contractInputFile is present
          if (action.name === "DOWNLOAD" && !rowData.contractInputFile) {
            return null;
          } else {
            // Render null if rowData.contractInputFile is not present
            return (
              <Link {...commonLinkProps}>
                <Image imagePath={action.iconName} altText={action.name} />
              </Link>
            );
          }
        })}

      {col.customDropdownActions && col.customDropdownActions.length > 0 && (
        <div
          className={`dropdown-action ${isDropdownOpen ? "openAction" : ""}`}
          ref={dropdownRef}
        >
          <Buttons
            buttonTypeClassName=""
            textWithIcon={true}
            imagePath={AppIcons.arrowIcon}
            onClick={toggleDropdown}
          ></Buttons>
          <div className="dropdown-list">
            <ul>
              {col.customDropdownActions.map((action, index) => (
                <li key={`customAction_${index}`}>
                  <Link onClick={closeDropdown} to={action.path}>
                    {action.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {col.defaultAction.allowEdit && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("EDIT", rowData);
          }}
          className="mr-4"
          title="EDIT"
        >
          <Image imagePath={AppIcons.editIcon} altText="Edit Icon" />
        </Link>
      )}

      {col.defaultAction.allowDelete && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("DELETE", rowData);
          }}
          className="mr-4"
          title="DELETE"
        >
          <Image imagePath={AppIcons.deleteIcon} altText="Delete Icon" />
        </Link>
      )}
    </div>
  );
};