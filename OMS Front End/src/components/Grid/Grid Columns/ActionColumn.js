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

      {col.defaultAction.allowUnfreeze && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("UNFREEZE", rowData);
          }}
          className="mr-4 view-icon"
          title="UNFREEZE"
        >
          <Image
            imagePath={AppIcons.unfreezeIcone}
            altText="unfreezeIcone Icon" />
        </Link>
      )}
      {col.defaultAction.allowActiveCustomer && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("ACTIVECUSTOMER", rowData);
          }}
          className="mr-4 view-icon"
          title="ACTIVECUSTOMER"
        >
          <Image
            imagePath={AppIcons.aciveCustomerIcone}
            altText="ACTIVECUSTOMER Icon" />
        </Link>
      )}

      {col.defaultAction.allowUnblocked && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("UNBLOCKED", rowData);
          }}
          className="mr-4 view-icon"
          title="UNBLOCKED"
        >
          <Image
            imagePath={AppIcons.unblokedIcone}
            altText="UNBLOCKED Icon" />
        </Link>
      )}

      {col.defaultAction.allowBlocked && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("BLOCKED", rowData);
          }}
          className="mr-4 view-icon"
          title="BLOCKED"
        >
          <Image
            imagePath={AppIcons.blockIcone}
            altText="BLOCKED Icon" />
        </Link>
      )}

      {col.defaultAction.allowFreeze && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("FREEZE", rowData);
          }}
          className="mr-4 view-icon"
          title="FREEZE"
        >
          <Image
            imagePath={AppIcons.freezeIcone}
            altText="FREEZE Icon" />
        </Link>
      )}

      {col.defaultAction.allowDisable && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("DISABLE", rowData);
          }}
          className="mr-4 view-icon"
          title="DISABLE"
        >
          <Image
            imagePath={AppIcons.disableIcone}
            altText="DISABLE Icon" />
        </Link>
      )}

    </div>
  );
};

