import { Link } from "react-router-dom";
import { AppIcons } from "../../../../data/appIcons";
import Image from "../../../image/Image";
import Iconify from "../../../ui/iconify/Iconify";

export const renderEditGridAction = (
  rowData,
  col,
  rowIndex,
  allowEditGrid,
  onRowEditSave,
  isRowEditable,
  onRowEditCancel,
  editGridSettings,
  onRowDataDelete
) => {
  const isEditingRow = allowEditGrid && isRowEditable;

  const handleDelete = (rowIndex) => {
    if (onRowDataDelete) {
      onRowDataDelete(rowIndex);
    }
  };

  const handleRowEditSave = (rowIndex, rowData) => {
    if (onRowEditSave) {
      onRowEditSave(rowIndex);
    }
  };

  const handleEditCancel = (rowIndex) => {
    if (onRowEditCancel) {
      onRowEditCancel(rowIndex);
    }
  };

  return (
    <div className="d-flex action-button">
      {isEditingRow && onRowEditSave && editGridSettings?.buttons?.save && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleRowEditSave(rowIndex, rowData);
          }}
          className="mr-4"
          title="SAVE"
        >
          <Image imagePath={AppIcons.DoneIcon} altText="Edit Icon" />
        </Link>
      )}

      {/* Cancel Button */}
      {isEditingRow && onRowEditCancel && editGridSettings?.buttons?.cancel && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleEditCancel(rowIndex);
          }}
          className="mr-4"
          title="CANCEL"
        >
          {/* <Image imagePath={AppIcons.CancelIcon} altText="Cancel Icon" /> */}
          
          <Iconify icon="maki:cross" />
        </Link>
      )}

      {isEditingRow && editGridSettings?.buttons?.delete && (
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleDelete(rowIndex);
          }}
          className="mr-4"
          title="DELETE"
        >
          {/* <Image imagePath={AppIcons.deleteIcon} altText="Delete Icon" /> */}
          <Iconify icon="mingcute:delete-2-line" className="delete-icon"/>
        </Link>
      )}
    </div>
  );
};
