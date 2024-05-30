import React, { useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import { addressFormData } from "./component/AddressForm.data";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import AddressCard from "./component/AddressCard";

const AddressDetail = () => {
  const userFormRef = useRef();
  const [isModelOpen, setisModelOpen] = useState(false);
  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };
  return (
    <>
      <CardSection
        cardTitle="All Address"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add New Address"
        titleButtonClick={handleToggleModal}
      >
        <AddressCard isAddEditModal={handleToggleModal} />
      </CardSection>

      <SidebarModel
        modalTitle="Add/Edit Address"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <div className="row horizontal-form mt-3">
          <FormCreator
            ref={userFormRef}
            {...addressFormData}
            // onFormDataUpdate={handleFormDataChange}
          />
          <div className="col-md-12 mt-2">
            <div className="d-flex align-item-end justify-content-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
                // onClick={onHandleUser}
                // isLoading={EmailLoading || updateUserLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                onClick={onSidebarClose}
              />
            </div>
          </div>
        </div>
      </SidebarModel>
    </>
  );
};

export default AddressDetail;
