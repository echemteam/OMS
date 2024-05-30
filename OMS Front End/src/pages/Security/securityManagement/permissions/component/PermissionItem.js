import { AppIcons } from "../../../../../data/appIcons";
import DropDown from "../../../../../components/ui/dropdown/DropDrown";
import PermissionChildItem from "./PermissionChildItem";
import Image from "../../../../../components/image/Image";

const selectGrantDeny = [
    { value: 1, label: "Grant" },
    { value: 2, label: "Deny" },
    { value: 6, label: "Empty" },
];

const selectViewEdit = [
    { value: 3, label: "View Only" },
    { value: 4, label: "Read/Write" },
    { value: 5, label: "None" },
    { value: 6, label: "Empty" },
];

const PermissionItem = ({ item, level, onParenetUpdate }) => {

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
                        options={item.itemData?.grantDenyFlag ? selectGrantDeny : selectViewEdit}
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

export default PermissionItem;