import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; 
// import { hasPermission } from "../../../utils/AuthorizeNavigation/authorizeNavigation";

const SideBarSubMenuItem = (props) => {
    return (
        <>
            <div className="dropdown">
                <ul className="sub-menu">
                    {props.children.map((childItem, childIndex) => (
                            <>
                                <li
                                    key={childIndex}
                                    className={`${props.clickedValueSubMenu === childItem ? "child-active" : ""}`}
                                    onClick={(e) => props.handleSubItemClick(e, childItem)}
                                >
                                    <Link
                                        to={childItem.to}
                                    >{childItem.name}</Link>
                                </li>
                            </>
                         
                    ))}
                </ul>
            </div>
        </>
    )
}
SideBarSubMenuItem.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.shape({
            to: PropTypes.string,  
            name: PropTypes.string,  
        })
    ).isRequired,  
    clickedValueSubMenu: PropTypes.shape({
        to: PropTypes.string,
        name: PropTypes.string,
    }),  
    handleSubItemClick: PropTypes.func.isRequired,  
};
export default SideBarSubMenuItem;