import React, { useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import { AppIcons } from "../../../data/appIcons";
import MolGrid from "../../../components/Grid/MolGrid";
import { GridColumnType } from "../../../data/gridColumnType";
import { useNavigate } from "react-router-dom";
import CenterModel from "../../../components/ui/centerModel/CenterModel";
import AddEditGroup from "./features/AddEditGroup";
import AssignUser from "./features/AssignUser";

const SecurityManagement = () => {
  const molGridRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const navigate = useNavigate();
  const onEditAction = (data) => {
    // alert("Edit called"); // Check navigate
    setShowModal(!showModal);
  };
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleToggleModal2 = () => {
    setShowModal2(!showModal2);
  };
  const handleDelete = () => {
    alert("delete clicked");
  };
  const handleCopy = () => {
    setShowModal(!showModal);
  };
  const handlePermission = () => {
    navigate("/permissions");
  };
  const handleUser = () => {
    setShowModal2(!showModal2);
  };

  const UserGridConfig = {
    columns: [
      {
        name: "Security Group Name",
        fieldName: "groupName",
        allowShort: true,
      },
      {
        name: "Action",
        colType: GridColumnType.ACTION,
        defaultAction: {
          allowEdit: true,
          allowDelete: true,
        },
        customAction: [
          {
            name: "COPY",
            iconName: AppIcons.copyIcon,
          },
          {
            name: "PERMISSION",
            iconName: AppIcons.permissionIcon,
          },
          {
            name: "USER",
            iconName: AppIcons.userIcon,
          },
        ],
      },
    ],
  };
  const userGridData = [
    {
      groupName: "Admin",
    },
    {
      groupName: "Super Admin",
    },
    {
      groupName: "Security",
    },
    {
      groupName: "Agent",
    },
  ];
  const actionHandler = {
    EDIT: onEditAction,
    DELETE: handleDelete,
    COPY: handleCopy,
    PERMISSION: handlePermission,
    USER: handleUser,
  };
  return (
    <div>
      <CardSection
        cardTitle="Security Groups"
        // cardSubTitle="Sub title add hear"
        buttonClassName="btn dark-btn"
        rightButton={true}
        buttonText="Add Group"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={onEditAction}
      >
        <div className="row">
          <div className="col-md-12 table-striped">
            <MolGrid
              ref={molGridRef}
              configuration={UserGridConfig}
              dataSource={userGridData}
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
      {showModal && (
        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          modalTitle="Add/Edit Group"
          modelSizeClass="w-40"
        >
          <AddEditGroup handleToggleModal={handleToggleModal} />
        </CenterModel>
      )}
      {showModal2 && (
        <CenterModel
          showModal={showModal2}
          handleToggleModal={handleToggleModal2}
          modalTitle="Assign User"
          modelSizeClass="w-50s"
        >
          <AssignUser handleToggleModal={handleToggleModal2} />
        </CenterModel>
      )}
    </div>
  );
};

export default SecurityManagement;
