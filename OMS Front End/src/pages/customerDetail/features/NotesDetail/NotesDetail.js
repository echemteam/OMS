import { useRef, useState } from "react";
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import NotesCard from "./features/NotesCard";
import Buttons from "../../../../components/ui/button/Buttons";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import FormCreator from "../../../../components/Forms/FormCreator";
import { NotesData } from "./features/config/Notes.data";
import CenterModel from "../../../../components/ui/centerModel/CenterModel";

const NotesDetail=()=>{
    const userFormRef = useRef();
    const [showModal, setShowModal] = useState(false);
  
    const [formData, setFormData] = useState(NotesData);
 
 const handleToggleModal = () => {
    setShowModal(!showModal);

  };
  
return(<>
      <CardSection
        cardTitle="Notes"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={true}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <NotesCard isAddEditModal={handleToggleModal} />

      </CardSection>

      {showModal && (
        <CenterModel
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          modalTitle="Add Document"
          modelSizeClass="w-50s"
        >
          <div className="row horizontal-form">
            <FormCreator
              ref={userFormRef}
              {...formData}
              // onFormDataUpdate={handleFormDataChange}
            />
            <div className="col-md-12 mt-2">
              <div className="d-flex align-item-end justify-content-end">
                <div className="d-flex align-item-end">
                  <Buttons
                    buttonTypeClassName="theme-button"
                    buttonText="Add"
                    // onClick={onHandleUser}
                    // isLoading={EmailLoading || updateUserLoading}
                  />
                  <Buttons
                    buttonTypeClassName="dark-btn ml-5"
                    buttonText="Cancel"
                    onClick={handleToggleModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </CenterModel>
      )}
      {/* <SidebarModel
        modalTitle="Add/Edit Notes"
        contentClass="content-40"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <div className="row horizontal-form mt-3">
          <FormCreator
            ref={userFormRef}

            {...formData}
            // onActionChange={formActionHandler}
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
      </SidebarModel> */}

</>)
}
export default NotesDetail;