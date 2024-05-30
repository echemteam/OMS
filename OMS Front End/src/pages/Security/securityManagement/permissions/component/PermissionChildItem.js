import React from 'react';
import PermissionItem from './PermissionItem';

const PermissionChildItem = ({ childItems, level, parentItem, onParenetUpdate, ...props }) => {
    return (
        <ul className="sub-parent">
            {parentItem?.isActive && childItems.map((item, index) => (
                <PermissionItem
                    item={item}
                    key={index}
                    level={level}
                    parentItem={item}
                    onParenetUpdate={onParenetUpdate}
                    {...props}
                />
            ))}
        </ul>
    );
};

export default PermissionChildItem;
