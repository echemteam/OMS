import React from 'react'
import PropTypes from 'prop-types';

const Line = (props) => {
    return (
        <div className={props.containerCss}>
            <hr />
        </div>
    )
}
Line.propTypes = {
    containerCss: PropTypes.string, // CSS class for styling the container
};
export default Line