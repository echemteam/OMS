import React  from 'react';
import UserHistory from './UserHistory';
import AddEditUser from "./AddEditUser";
import RenderTabs from '../../../../components/ui/tabs/RenderTabs';
const UserManagementViewTab = () => {
  
  
  const tabs = [
    {
      sMenuItemCaption: "User Details",
      icon: "fa fa-tasks",
      component: (
        <div className="mt-2 contact-accrodiaon-scroll">
          <AddEditUser/>
        </div>
      ),
      isVisible: true,
    },
    {
      sMenuItemCaption: "History",
      icon: "fa fa-tasks",
      component: (
        <div className="mt-2 contact-accrodiaon-scroll contact-card-section-new">
          <UserHistory/>  
        </div>
      ),
      isVisible: true,
    },
  ];

  return <RenderTabs tabs={tabs} />;
};

export default UserManagementViewTab;
