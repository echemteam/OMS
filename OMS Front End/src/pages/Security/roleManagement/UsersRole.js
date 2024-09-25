import React, { useRef, useState } from "react";
import { GridColumnType } from "../../../data/gridColumnType";
import CardSection from "../../../components/ui/card/CardSection";
import { AppIcons } from "../../../data/appIcons";
import CenterModel from "../../../components/ui/centerModel/CenterModel";
import MolGrid from "../../../components/Grid/MolGrid";
import AddEditRoleModel from "./features/AddEditRoleModel";

const UsersRole = () => {
  const molGridRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const GridConfig2 = {
    columns: [
      {
        name: "Role",
        fieldName: "role",
        allowShort: true,
      },

      {
        name: "Status",
        fieldName: "status",
        allowShort: false,
        colType: GridColumnType.LABLE,
        colSettings: {
          valueField: "status",
          getLableClass: (value) => {
            switch (value) {
              case "Active":
                return "status-btn badge-gradient-success";
              case "Open":
                return "status-btn badge-gradient-info";
              case "In Active":
                return "status-btn badge-gradient-danger";
              case "Pending":
                return "status-btn badge-gradient-warning";
              case "In progress":
                return "status-btn badge-gradient-theme";
              default:
                return "status-btn badge-gradient-info";
            }
          },
        },
      },

      {
        name: "Action",
        colType: GridColumnType.ACTION,
        defaultAction: {
          allowEdit: true,
          allowDelete: true,
        },
      },
    ],
  };

  const actionHandler = {
    EDIT: handleToggleModal,
  };

  const tableData2 = [
    {
      role: "Accountant",
      status: "Active",
      isActive: true,
    },
    {
      role: "Administrator",
      status: "Active",
      isActive: true,
    },
    {
      role: "Administrator - Manager",
      status: "Active",
      isActive: true,
    },
    {
      role: "Client Admin",
      status: "Active",
      isActive: true,
    },
    {
      role: "Client Employee",
      status: "Active",
      isActive: true,
    },
    {
      role: "Director",
      status: "Active",
      isActive: true,
    },

    {
      role: "Employee",
      status: "Active",
      isActive: true,
    },
    {
      role: "HR",
      status: "Active",
      isActive: true,
    },
    {
      role: "Network Engineer",
      status: "Active",
      isActive: true,
    },
    {
      role: "Sr. Software engineer",
      status: "Active",
      isActive: true,
    },

    {
      role: "Team Leader",
      status: "Active",
      isActive: true,
    },
    {
      role: "Web Designer",
      status: "Active",
      isActive: true,
    },
    {
      role: "Web Researcher",
      status: "Active",
      isActive: true,
    },
  ];

  return (
    <div>
      <CardSection
        cardTitle="User Roles"
        cardSubTitle="Sub title add hear"
        buttonClassName="btn theme-button"
        buttonText="Add Role"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
        searchInput={true}
        rightButton={true}
        // handleChange={}
      >
        <div className="row">
          <div className="col-md-12 table-striped role-table-sec">
            <MolGrid
              ref={molGridRef}
              configuration={GridConfig2}
              dataSource={tableData2}
              allowPagination={true}
              pagination={{
                totalCount: 0,
              }}
              onActionChange={actionHandler}
              // onPageChange={handlePageChange}
            />
          </div>
        </div>
      </CardSection>

        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          modalTitle="Add Role"
          modelSizeClass="w-40"
        >
          <AddEditRoleModel handleToggleModal={handleToggleModal} />
        </CenterModel>
 
    </div>
  );
};

export default UsersRole;
