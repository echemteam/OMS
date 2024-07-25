import React from "react";
import PropTypes from 'prop-types'; 
//** Lib's */
import { AppIcons } from "../../../../data/appIcons";
import Image from "../../../../components/image/Image";
import DropDown from "../../../../components/ui/dropdown/DropDrown";
import { SelectGrantDenyDropdown, SelectViewEditDropdown } from "../../../../pages/Security/permissions/features/config/securityPermissions.Data";
//** Component's */
const PermissionChildItem = React.lazy(() => import("./PermissionChildItem"));

const PermissionItem = ({ item, level, onParenetUpdate }) => {

    //** Handle Change's */
    const onItemExpand = () => {
        item.isActive = !item.isActive;
        onParenetUpdate && onParenetUpdate(item, item.id);
    };
    const onValueChange = (valueItem) => {
        const value = valueItem.value;
        item.itemData.securitySettingId = value;
        onParenetUpdate && onParenetUpdate(item, item.id);
    };
    const onChildUpdate = (childItem) => {
        onParenetUpdate && onParenetUpdate(childItem, childItem.id);
    };

    return (
        <li className={`${item.isActive ? "active-1drop" : ""}`}>
            <div className="parent-part">
                <div className="drop-menu-icon" onClick={onItemExpand}>
                    {item.children.length > 0 ? (
                        <div className="arrow-icon">
                            <Image imagePath={AppIcons.arrowIcon} altText="tree-icon" />
                        </div>) : (null)}
                    <Image imagePath={item.children.length > 0 || level === 0 ? AppIcons.folderIcon : AppIcons.subFolderIcon} altText="tree-icon" />
                </div>
                <div className="security-key">{item.name}</div>
                <div className="permission-dropdown">
                    <DropDown
                        options={item.itemData?.grantDenyFlag ? SelectGrantDenyDropdown : SelectViewEditDropdown}
                        value={item.itemData?.securitySettingId}
                        onChange={onValueChange} />
                </div>
            </div>
            {item.children && item.children.length > 0 && (
                <PermissionChildItem
                    childItems={item.children}
                    level={level + 1}
                    parentItem={item}
                    onParenetUpdate={onChildUpdate} />
            )}
        </li>
    );
};
PermissionItem.propTypes = {
    item: PropTypes.shape({
        isActive: PropTypes.bool.isRequired,
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(PropTypes.shape({
            isActive: PropTypes.bool,
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string,
            children: PropTypes.array,
            itemData: PropTypes.shape({
                grantDenyFlag: PropTypes.bool,
                securitySettingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])  
            })
        })),
        itemData: PropTypes.shape({
            grantDenyFlag: PropTypes.bool,
            securitySettingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) 
        })
    }).isRequired,
    level: PropTypes.number.isRequired,
    onParenetUpdate: PropTypes.func
};
export default PermissionItem;