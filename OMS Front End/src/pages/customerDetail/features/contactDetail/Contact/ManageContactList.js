import AccordionCollapse from "../../../../../components/Accordions/AccordionCollapse";
import { contentType } from "../../../../../components/Accordions/AccordionCollapse.Data";

const ManageContactList = ({ handleEdit, modifyContactData }) => {

    return (
        <AccordionCollapse accordionList={modifyContactData} contentTypeId={contentType.CONTACT} handleEdit={handleEdit} />
    )
}

export default ManageContactList;