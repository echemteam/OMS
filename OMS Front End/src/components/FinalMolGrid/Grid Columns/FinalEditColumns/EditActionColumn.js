import { Link } from "react-router-dom";
import { AppIcons } from "../../../../data/appIcons";
import Image from "../../../image/Image";

export const renderEditGridAction = (rowData, col, rowIndex,  allowEditGrid, onRowEditSave, isRowEditable, onRowEditCancel) => {


    // const handleAction = (actionName, data, rowIndex) => {
    //     if (onActionHandler) {
    //         if (onActionHandler[actionName]) {
    //             onActionHandler[actionName](data, rowIndex);
    //         }
    //     }
    // };

    const isEditingRow = allowEditGrid && isRowEditable;


    return (
        <div className="d-flex action-button">
            {isEditingRow && onRowEditSave && (
                <Link
                    onClick={(e) => {
                        e.preventDefault();
                        onRowEditSave(rowIndex, rowData);
                    }}
                    className="mr-4"
                    title="SAVE"
                >
                    <Image imagePath={AppIcons.DoneIcon} altText="Edit Icon" />
                </Link>
            )}

            {/* Cancel Button */}
            {isEditingRow && onRowEditCancel && (
                <Link
                    onClick={(e) => {
                        e.preventDefault();
                        onRowEditCancel(rowIndex);
                    }}
                    className="mr-4"
                    title="CANCEL"
                >
                    <Image imagePath={AppIcons.CancelIcon} altText="Edit Icon" />
                </Link>
            )}
        </div>
    );
};