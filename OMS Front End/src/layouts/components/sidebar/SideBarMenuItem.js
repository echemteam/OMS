import Image from "../../../components/image/Image";
import { AppIcons } from "../../../data/appIcons";
import PropTypes from 'prop-types';
const SideBarMenuItem = (props) => {
  return (
    <>
      <div className="dropdown-list">
        <span>
          <Image imagePath={props.image} altText="Menu Icon" />
          {props.name}
        </span>
        {props.childLength > 0 ? (
          <span className="down-arrow-icon">
            <Image imagePath={AppIcons.userIcon} altText="Menu Arrow" />
          </span>
        ) : null}
      </div>
    </>
  );
};
SideBarMenuItem.propTypes = {
  image: PropTypes.string.isRequired,    
  name: PropTypes.string.isRequired,    
  childLength: PropTypes.number.isRequired, 
};
export default SideBarMenuItem;
