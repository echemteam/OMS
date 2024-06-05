import React, { useEffect, useRef, useState } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import Buttons from "../../../../components/ui/button/Buttons";
import { addressFormData } from "./component/AddressForm.data";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import AddressCard from "./component/AddressCard";
import { useLazyGetAllAddressTypesQuery } from "../../../../app/services/addressAPI";

const AddressDetail = () => {
  const userFormRef = useRef();
  const [isModelOpen, setisModelOpen] = useState(false);

  const [getAllAddressTypes, {
    isFetching: isGetAllAddressTypesFetching,
    isSuccess: isGetAllAddressTypesSucess,
    data: allGetAllAddressTypesData
  },] = useLazyGetAllAddressTypesQuery();

  useEffect(() => {
    getAllAddressTypes()
  }, [])

  useEffect(() => {
    debugger
    if (!isGetAllAddressTypesFetching && isGetAllAddressTypesSucess && allGetAllAddressTypesData) {
      const getData = allGetAllAddressTypesData.map(item => ({
        value: item.groupTypeId,
        label: item.type
      }))
      const dropdownField = addressFormData.formFields.find(item => item.dataField === "type");
      dropdownField.fieldSetting.options = getData;
    }
  }, [isGetAllAddressTypesFetching, isGetAllAddressTypesSucess, allGetAllAddressTypesData])

  const handleToggleModal = () => {
    setisModelOpen(true);
  };
  const onSidebarClose = () => {
    setisModelOpen(false);
  };
  return (
    <>
      <CardSection
        cardTitle="Address"
        buttonClassName="danger-btn"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <AddressCard isAddEditModal={handleToggleModal} />
      </CardSection>

      <SidebarModel
        modalTitle="Add/Edit Address"
        contentClass="content-40"
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
