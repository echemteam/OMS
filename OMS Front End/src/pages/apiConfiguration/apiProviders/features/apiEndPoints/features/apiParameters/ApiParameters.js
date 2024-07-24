import { useRef,useState ,useEffect } from "react";
import { useParams } from "react-router";
import { decryptUrlData } from "../../../../../services/CryptoService";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import AddEditApiParameters from "./features/AddEditApiParameters";
import ApiParametersList from "./features/ApiParametersList";
import { onResetForm } from "../../../../../utils/FormFields/ResetForm/handleResetForm";



const ApiParameters=()=>{
  const childRef = useRef();

  const { id } = useParams();
  const  endpointId= id ? decryptUrlData(id) : 0;

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState(addEditApiParameterFormData);

    const onSidebarClose = () => {
       setIsModelOpen(false);
       setIsEdit(false)   
    };
    const handleToggleModal = () => {   
      setIsModelOpen(true);
    };

    useEffect(()=>{
      handleToggleModal()
    },[endpointId])

    const handleEditClick = (data) => {
      onResetForm(addEditApiParameterFormData,setFormData, null);
        setIsModelOpen(true);
        setFormData(data);
           setIsEdit(true)   
    };

    const onSuccess = () => {
      setIsModelOpen(true);
      if (childRef.current) {
          childRef.current.callChildFunction();
      }
  };
    return(<> 
        <SidebarModel
         modalTitle= "Api Parameter"
         contentClass="content-60"
         onClose={onSidebarClose}
         modalTitleIcon={AppIcons.AddIcon}
         isOpen={isModelOpen} 
        >
          <AddEditApiParameters
          isEdit={isEdit}
          initData={formData}
          onClose={onSidebarClose}
          onSuccess={onSuccess}
          endpointId={endpointId}
          />

  <ApiParametersList handleEditClick={handleEditClick} endpointId={endpointId} childRef={childRef}/>
        </SidebarModel>
   
    </>)

}
export default ApiParameters;