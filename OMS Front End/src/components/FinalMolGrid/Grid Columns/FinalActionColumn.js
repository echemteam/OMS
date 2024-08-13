import { Link } from "react-router-dom";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../../components/image/Image";
import Tooltip from "../../ui/tooltip/Tooltip";
import Iconify from "../../ui/iconify/Iconify";

export const renderGridAction = (
  rowData,
  col,
  rowIndex,
  onActionHandler,
  allowEditGrid,
  isRowEditable,
  onEditRow
) => {
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
      if (onEditRow) onEditRow(rowIndex, data);
    } else {
      handleAction(actionName, data, rowIndex);
    }
  };

  const isEditingRow = allowEditGrid && isRowEditable;

  return (
    <div className="d-flex action-button ">
      {/* Edit Action Button */}
      {col.defaultAction.allowEdit && (
        <Link
          onClick={(e) => {
            e.preventDefault();

            handleRowEdit("EDIT", rowData, rowIndex);
          }}
          className="mr-4 tooltip"
        >
          {/* <Image imagePath={AppIcons.editIcon} altText="Edit Icon" /> */}
          <Iconify 
          icon="tabler:pencil" 
          />
          <Tooltip text="Edit" />
        </Link>
      )}

      {/* Custom Action Button */}

      {!isEditingRow &&
        col.customAction &&
        col.customAction.length > 0 &&
        col.customAction.map((action, index) => {
          const commonLinkProps = {
            key: `customAction_${index}`,
            onClick: (e) => {
              e.preventDefault();
              handleAction(action.name, rowData, rowIndex);
            },
            className: "mr-4 tooltip",
            // title: action.title,
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
                <Tooltip text={action.title} />
              </Link>
            );
          }
        })}

      {/* Delete Action Button */}
      {!isEditingRow && col.defaultAction.allowDelete && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("DELETE", rowData, rowIndex);
          }}
          className="mr-4 tooltip"
          title="DELETE"
        >
          {/* <Image imagePath={AppIcons.deleteIcon} altText="Delete Icon" /> */}
          <Iconify
          icon="mingcute:delete-2-line" 
          />
          <Tooltip text="Delete" />
        </Link>
      )}
    </div>
  );
};
