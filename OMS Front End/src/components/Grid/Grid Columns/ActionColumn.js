import { Link } from "react-router-dom";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../image/Image";
import TooltipColumn from "../../ui/tooltip/Tooltip";
import Iconify from "../../ui/iconify/Iconify";

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
          className="mr-4 tooltip"
          // title="Edit"
        >
          {/* <Image imagePath={AppIcons.editIcon} altText="Edit Icon" /> */}
          <Iconify
          icon="tabler:pencil" 
          />
          <TooltipColumn text="Edit" />
        </Link>
      )}

      {col.defaultAction.allowDelete && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("DELETE", rowData);
          }}
          className="mr-4 tooltip"
        >
          {/* <Image imagePath={AppIcons.deleteIcon} altText="Delete Icon" /> */}
          <Iconify 
          icon="mingcute:delete-2-line" 
          />
          <TooltipColumn text="Delete" />
        </Link>
      )}

      {col.defaultAction.allowUnfreeze && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("UNFREEZE", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          {/* <Image
            imagePath={AppIcons.unfreezeIcone}
            altText="unfreezeIcone Icon"
          /> */}
          <Iconify icon="lets-icons:lock" />
          <TooltipColumn text="Un Freeze" />
        </Link>
      )}
      {col.defaultAction.allowActiveCustomer && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("ACTIVECUSTOMER", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          {/* <Image
            imagePath={AppIcons.aciveCustomerIcone}
            altText="ACTIVECUSTOMER Icon"
          /> */}
          <Iconify icon="solar:user-check-bold" />
          <TooltipColumn text="Active Customer" />
        </Link>
      )}
      {col.defaultAction.allowActiveSupplier && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("ACTIVESUPPLIER", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          {/* <Image
            imagePath={AppIcons.aciveCustomerIcone}
            altText="ACTIVESUPPLIER Icon"
          /> */}
          <Iconify icon="solar:user-check-bold" />
          <TooltipColumn text="Active Supplier" />
        </Link>
      )}

      {col.defaultAction.allowUnblocked && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("UNBLOCKED", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          {/* <Image imagePath={AppIcons.unblokedIcone} altText="UNBLOCKED Icon" /> */}
          <Iconify icon="gg:unblock" />
          <TooltipColumn text="Un Block" />
        </Link>
      )}

      {col.defaultAction.allowBlocked && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("BLOCKED", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          <Iconify icon="ic:twotone-block" />
          {/* <Image imagePath={AppIcons.blockredIcone} altText="BLOCKED Icon" /> */}
          <TooltipColumn text="Block" />
        </Link>
      )}

      {col.defaultAction.allowFreeze && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("FREEZE", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          {/* <Image imagePath={AppIcons.freezeblueIcone} altText="FREEZE Icon" /> */}
          <Iconify icon="lets-icons:lock" />
          <TooltipColumn text="Freeze" />
        </Link>
      )}

      {col.defaultAction.allowDisable && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("DISABLE", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          {/* <Image
            imagePath={AppIcons.disablethemeIcone}
            altText="DISABLE Icon"
          /> */}
          <Iconify icon="material-symbols-light:no-accounts" />
          <TooltipColumn text="Disable" />
        </Link>
      )}

      {col.defaultAction.allowPermission && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("PERMISSION", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          <Iconify icon="material-symbols-light:no-accounts" />
          {/* <Image imagePath={AppIcons.permissionIcon} altText="DISABLE Icon" /> */}
          <TooltipColumn text="Permission" />
        </Link>
      )}

      {col.defaultAction.allowUser && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("USER", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          <Iconify icon="material-symbols-light:no-accounts" />
          {/* <Image imagePath={AppIcons.userIcon} altText="DISABLE Icon" /> */}
          <TooltipColumn text="User" />
        </Link>
      )}
      {rowData.status === "Approved" && col.defaultAction.allowReject && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleAction("REJECT", rowData);
          }}
          className="mr-4 view-icon tooltip"
        >
          <Image imagePath={AppIcons.RejectedIcon} altText="Reject Icon" />
          <TooltipColumn text="Reject" />
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
          className="mr-4 view-icon tooltip"
        >
          {/* <Image imagePath={AppIcons.EyeIcon} altText="Delete Icon" /> */}
          <Iconify icon="lets-icons:view-light" />
          <TooltipColumn text="View" />
        </Link>
      )}
    </div>
  );
};
