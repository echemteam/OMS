import React, { useRef, useState } from "react";
import { orderInformationData } from "./config/OrderInformation.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import SwalAlert from "../../../../services/swalService/SwalService";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../data/appIcons";
import Buttons from "../../../../components/ui/button/Buttons";
import { addressFormData } from "../../../../../src/common/features/component/Address/config/AddressForm.data";

const OrderDetails = () => {
  const basicInformation = useRef();
  const [formData, setFormData] = useState(orderInformationData);
  const { blocked } = SwalAlert();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const ref = useRef();
  const [formAddressData, setFormAddressData] = useState(addressFormData);

  const onSidebarClose = () => {
    setIsModelOpen(false);
  };

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };

  const handleChangeDropdownList = (data, dataField) => {
    const blockedOptionValue = "blocked";

    if (data.status === blockedOptionValue) {
      blocked(
        "Blocked !",
        "The selected customer is currently blocked. Please choose a different customer",
        "OK",
        "Cancel"
      ).then((result) => {
        if (result) {
          console.log("User acknowledged the blocked status alert.");
        }
      });
    }
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };

  const handleInputGroupButton = () => {
    setIsModelOpen(true);
  };

  return (
    <>
      <div className="row">
        <FormCreator
          config={formData}
          ref={basicInformation}
          {...formData}
          onActionChange={formActionHandler}
          handleInputGroupButton={handleInputGroupButton}
        />
      </div>
      <div className="row address-group">
        <div className="col-4"></div>
        <div className="col-4 address">
          <div>Chemistry Research Laboratory</div>
          <div>MansField Road</div>
          <div>Oxford</div>
          <div>United Kingdom, Oxfordshire OX1 3TA</div>
        </div>
        <div className="col-4 address">
          <div>Chemistry Research Laboratory</div>
          <div>MansField Road</div>
          <div>Oxford</div>
          <div>United Kingdom, Oxfordshire OX1 3TA</div>
        </div>
      </div>

      <Buttons
        buttonTypeClassName="theme-button"
        buttonText="Cancel"
        onClick={handleToggleModal}
      />

      <SidebarModel
        modalTitle="Shipping Address"
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <div className="mt-2">
          <FormCreator
            config={formAddressData}
            ref={ref}
            {...formAddressData}
          />
        </div>
      </SidebarModel>
    </>
  );
};

export default OrderDetails;
