import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Icon } from '@iconify/react';

const Iconify = forwardRef(({ icon, width = 20, style, className = '', ...other }, ref) => (
  <div
    ref={ref}
    className={`component-iconify ${className}`}
    style={{ width, height: width, display: 'inline-flex', ...style }}
    {...other}
  >
    <Icon icon={icon} width={width} height={width} />
  </div>
));

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  style: PropTypes.object,
  width: PropTypes.number,
  className: PropTypes.string,
};

export default Iconify;
