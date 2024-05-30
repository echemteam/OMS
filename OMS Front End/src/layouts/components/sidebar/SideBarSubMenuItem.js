import { Link } from "react-router-dom";
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
export default SideBarSubMenuItem;