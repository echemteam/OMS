import React from "react";
import Label from "../ui/label/Label";
import "../ui/inputs/checkBox/Checkbox.scss";

const CheckListItem = ({ itemList, handleCheckChange, checkItemListId }) => {
    return (
        <React.Fragment>
            <div className="checkbox-part">
                <div className="checkbox">
                    <input
                        name={itemList.title}
                        className="form-checkbox"
                        type="checkbox"
                        id={itemList.title}
                        checked={!itemList.isMainCheckBox ? itemList.isApproved : itemList.isMainChecked}
                        disabled={itemList.isMainCheckBox}
                        onChange={!itemList.isMainCheckBox ? (e) => handleCheckChange(checkItemListId, e.target.checked) : null} />
                    <label htmlFor={itemList.title} className="checkbox-label"></label>
                </div>
                <Label labelName={itemList.title} for={itemList.title} />
            </div>
        </React.Fragment>
    );
}

export default CheckListItem;