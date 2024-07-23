import { useState ,useRef} from "react";

import CardSection from "../../../../../components/ui/card/CardSection";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import AddEditApiEndPoints from "../../features/apiEndPoints/features/AddEditApiEndPoints";
import ApiEndPointsList from "../../features/apiEndPoints/features/AddEndPointsList";
import { addEditApiEndPointsFormData } from "./config/ApiEndPoints.data";
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";
import { AppIcons } from "../../../../../data/appIcons";

const ApiEndPoints=({providerId})=>{
  const childRef = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState(addEditApiEndPointsFormData);

    const handleEditClick = (data) => {
  
      onResetForm(addEditApiEndPointsFormData,setFormData, null);
      setIsModelOpen(true);
      setFormData(data);
      setIsEdit(true);     
     };

    const handleToggleModal = () => {
      setIsModelOpen(true);
    };
  const onSidebarClose = () => {
        setIsModelOpen(false);
        setIsEdit(false);     
     };
     const onSuccess = () => {
      setIsModelOpen(true);
      if (childRef.current) {
          childRef.current.callChildFunction();
      }
  };
return(<>
  <div>
      <CardSection
        cardTitle="API EndPoints"
        buttonClassName="btn theme-button"
        rightButton={ true }
        buttonText="Add"
       textWithIcon={true}
       iconImg={AppIcons.PlusIcon}
       titleButtonClick={handleToggleModal}
      >
       <ApiEndPointsList  providerId={providerId}  initData={formData} childRef={childRef}  handleEditClick={handleEditClick}/>
      </CardSection>
      
        <SidebarModel
         modalTitle= {isEdit ? "Update Api EndPoints" : "Add Api EndPoints"}
         contentClass="content-35"
         onClose={onSidebarClose}
         modalTitleIcon={AppIcons.AddIcon}
         isOpen={isModelOpen}
        >
          <AddEditApiEndPoints
            isEdit={isEdit}
            providerId={providerId}
         initData={formData}
        onClose={onSidebarClose}
        onSuccess={onSuccess}
          />
        </SidebarModel>
    </div></>)
}
export default ApiEndPoints