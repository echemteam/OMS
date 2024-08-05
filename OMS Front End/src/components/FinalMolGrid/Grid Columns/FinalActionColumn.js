import { Link } from "react-router-dom";

import { AppIcons } from "../../../data/appIcons";

import Image from "../../image/Image";



export const renderGridAction = (rowData, col, rowIndex, onActionHandler, allowEditGrid, isRowEditable, onEditRow) => {

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
        onActionHandler[actionName](data, rowIndex);
      }
    }
  };

  // this method help user to check if row edit enable then allow to make it editable
  const handleRowEdit = (actionName, data, rowIndex) => {
    if (!isRowEditable && allowEditGrid) {
      if (onEditRow) {
        onEditRow(rowIndex, data);
      }
      else {
        handleAction(actionName, data, rowIndex);
      }
    }
  }

    const isEditingRow = allowEditGrid && isRowEditable;

    return (
      <div className="d-flex action-button">
        {!isEditingRow && col.customAction &&
          col.customAction.length > 0 &&
          col.customAction.map((action, index) => {
            const commonLinkProps = {
              key: `customAction_${index}`,
              onClick: (e) => {
                e.preventDefault();
                handleAction(action.name, rowData, rowIndex);
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


        {/* Edit Action Button */}
        {col.defaultAction.allowEdit && (
          <Link
            onClick={(e) => {
              e.preventDefault();
              // handleAction("EDIT", rowData);
              handleRowEdit("EDIT", rowData, rowIndex);
            }}
            className="mr-4"
            title="EDIT"
          >
            <Image imagePath={AppIcons.editIcon} altText="Edit Icon" />
          </Link>
        )}

        {/* Delete Action Button */}
        {!isEditingRow && col.defaultAction.allowDelete && (
          <Link
            onClick={(e) => {
              e.preventDefault();
              handleAction("DELETE", rowData, rowIndex);
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

