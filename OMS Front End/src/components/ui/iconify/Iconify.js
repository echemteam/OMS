import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Icon } from "@iconify/react";

const Iconify = forwardRef(
  (
    { icon, width = 20, style, className="", altText = "icon", ...other },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`component-iconify ${className}`}
        style={{ width, height: width, display: "inline-flex", ...style }}
        {...other}
      >
        {icon ? (
          <Icon icon={icon} width={width} height={width} />
        ) : (
          <div
            style={{
              width,
              height: width,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {altText}
          </div>
        )}
      </div>
    );
  }
);

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  style: PropTypes.object,
  width: PropTypes.number,
  className: PropTypes.string,
  altText: PropTypes.string,
};

export default Iconify;
