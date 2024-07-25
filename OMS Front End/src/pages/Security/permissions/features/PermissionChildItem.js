import React from 'react';
import PropTypes from 'prop-types';
//** Component's */
const PermissionItem = React.lazy(() => import("./PermissionItem"));

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

PermissionChildItem.propTypes = {
    childItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    level: PropTypes.number.isRequired,
    parentItem: PropTypes.shape({
        isActive: PropTypes.bool,
    }).isRequired,
    onParenetUpdate: PropTypes.func.isRequired,
};

export default PermissionChildItem;
