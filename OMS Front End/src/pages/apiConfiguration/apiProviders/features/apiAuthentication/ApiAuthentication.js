import { useState,useRef } from "react";
import PropTypes from "prop-types";
import CardSection from "../../../../../components/ui/card/CardSection";
import ApiAuthenticationList from "./features/ApiAuthenticationList";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import AddEditApiAuthentication from "./features/AddEditApiAuthentication";
import { AppIcons } from "../../../../../data/appIcons";


const ApiAuthentication = ({ providerId, providerObject }) => {
  const childRef = useRef();
  const getDataRef=useRef()
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [authId, setAuthId] = useState(false);
  const [listData , setListData] = useState(0)

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
    setIsEdit(false);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  const handleEditClick = (data) => {
    setAuthId(data.authId);
    setIsEdit(true);
    setIsModelOpen(true);
  };

  const onSuccess = () => {
    if (getDataRef.current) {
      getDataRef.current.callChildFunction();
    }
    setIsModelOpen(false);
  };

  const handleListData = (data) => {
    setListData(data)
  }

  return (
    <div>
      <CardSection
        cardTitle="API Authentication"
        buttonClassName="btn theme-button"
        rightButton={listData !== 1 && true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <ApiAuthenticationList
          providerId={providerId}
          getDataRef={getDataRef}
          handleEditClick={handleEditClick}
          handleListData={handleListData}
        />
      </CardSection>

      <SidebarModel
        modalTitle={
          isEdit ? "Upadte API Authentication" : "Add API Authentication"
        }
        contentClass="content-40"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditApiAuthentication
          isEdit={isEdit}
          providerId={providerId}
          providerData={providerObject}
          authId={authId}
         onClose={onSidebarClose}
          onSuccess={onSuccess}
          isModelOpen={isModelOpen}
          childRef={childRef}
        />
      </SidebarModel>
    </div>
  );
};
ApiAuthentication.propTypes = {
  providerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  providerObject: PropTypes.object.isRequired,
};
export default ApiAuthentication;
