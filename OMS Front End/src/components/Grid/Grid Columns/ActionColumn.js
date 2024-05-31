import { Link } from "react-router-dom";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../image/Image";

export const renderGridAction = (rowData, col, rowIndex, onActionHandler) => {
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

  return (
    <div className="d-flex action-button">
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

