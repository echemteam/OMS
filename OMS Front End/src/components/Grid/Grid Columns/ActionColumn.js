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
            title: action.title,
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
          title="Edit"
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
          title="Delete"
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
          title="Un Freeze"
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
          title="Active Customer"
        >
          <Image
            imagePath={AppIcons.aciveCustomerIcone}
            altText="ACTIVECUSTOMER Icon" />
        </Link>
      )}
      {col.defaultAction.allowActiveSupplier && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("ACTIVESUPPLIER", rowData);
          }}
          className="mr-4 view-icon"
          title="Active Supplier"
        >
          <Image
            imagePath={AppIcons.aciveCustomerIcone}
            altText="ACTIVESUPPLIER Icon" />
        </Link>
      )}

      {col.defaultAction.allowUnblocked && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("UNBLOCKED", rowData);
          }}
          className="mr-4 view-icon"
          title="Un Block"
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
          title="Block"
        >
          <Image
            imagePath={AppIcons.blockredIcone}
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
          title="Freeze"
        >
          <Image
            imagePath={AppIcons.freezeblueIcone}
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
          title="Disable"
        >
          <Image
            imagePath={AppIcons.disablethemeIcone}
            altText="DISABLE Icon" />
        </Link>
      )}

      {col.defaultAction.allowPermission && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("PERMISSION", rowData);
          }}
          className="mr-4 view-icon"
          title="Permission"
        >
          <Image
            imagePath={AppIcons.permissionIcon}
            altText="DISABLE Icon" />
        </Link>
      )}

      {col.defaultAction.allowUser && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("USER", rowData);
          }}
          className="mr-4 view-icon"
          title="User"
        >
          <Image
            imagePath={AppIcons.userIcon}
            altText="DISABLE Icon" />
        </Link>
      )}
      {rowData.status === "Approved" && col.defaultAction.allowReject && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("REJECT", rowData);
          }}
          className="mr-4 view-icon"
          title="Reject"
        >
          <Image
            imagePath={AppIcons.RejectedIcon}
            altText="Reject Icon" />
        </Link>
      )}
      {rowData.status !== "Approved" && col.defaultAction.allowReject && (
        <div className="view-reject-icon w-20p"></div>
      )}
      {col.defaultAction.allowView && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("VIEW", rowData);
          }}
          className="mr-4 view-icon"
          title="VIEW"
        >
          <Image
            imagePath={AppIcons.EyeIcon}
            altText="Delete Icon" />
        </Link>
      )}

    </div>
  );
};

