import React, { useState } from "react";
import { AppIcons } from "../../../../../data/appIcons";
import DropdownSelect from "../../../../../components/ui/dropdown/DropdownSelect";
import DropDown from "../../../../../components/ui/dropdown/DropDrown";
import PermissionItem from "./PermissionItem";



function PermissionTree({ permissionsList }) {

  const [activeparent, setActiveParent] = useState([]);
  const [activesubparent, setActiveSubParent] = useState([]);
  const [activesub2parent, setActiveSub2Parent] = useState([]);
  const [activesub3parent, setActiveSub3Parent] = useState([]);

  const mainMenuList = permissionsList && permissionsList.filter(data => data.isMenu === true);
  const subMenuList = permissionsList && permissionsList.filter(data => data.isMenu !== true);



  const onValueChange = (valueItem) => {
    const value = valueItem.value;
  };

  const onChildUpdate = (childItem) => {
  };


  return (
    <div className="tree-section-view">
      <div className="section-header-part">
        <div className="drop-menu-icon">Drop</div>
        <div className="security-key">Security Key</div>
        <div className="permission-dropdown">Permission Type</div>
      </div>

      <div className="inner-section">
        <ul>
        mainMenuList
          <PermissionItem mainMenuList={mainMenuList} subMenuList={subMenuList} />
        </ul>
      </div>
    </div>
  );
}

export default PermissionTree;
