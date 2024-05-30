import React from "react";
//** Component's */
const PermissionItem = React.lazy(() => import("./PermissionItem"));

const PermissionWrapper = ({ treeData, level, onTreeNodeDataChange, ...props }) => {

    //** Handle Change's */
    const updateTreeData = (data, id) => {
        const newTreeData = treeData.map((item) =>
            item.id === id ? { ...item, ...data } : item
        );
        onTreeNodeDataChange && onTreeNodeDataChange(newTreeData);
    };

    return (
        <ul>
            {treeData.map((item, index) => (
                <PermissionItem
                    key={index}
                    item={item}
                    level={level}
                    parentItem={null}
                    onParenetUpdate={updateTreeData}
                    {...props}
                />
            ))}
        </ul>
    );
};

export default PermissionWrapper;
