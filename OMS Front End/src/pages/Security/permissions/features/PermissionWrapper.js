import React from "react";
import PropTypes from 'prop-types';
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

PermissionWrapper.propTypes = {
    treeData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
        })
    ).isRequired,
    level: PropTypes.number.isRequired,
    onTreeNodeDataChange: PropTypes.func,
};

export default PermissionWrapper;
