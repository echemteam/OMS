import { useState, useEffect } from "react";
import AccordionCollapse from "../../../../../components/Accordions/AccordionCollapse";
import { contentType } from "../../../../../components/Accordions/AccordionCollapse.Data";
import { transformData } from "../../../../../components/Accordions/AccordionsTransformData";

const ManageContactList = ({ handleEdit, modifyContactData }) => {

    // const [accordionData, setAccordionData] = useState([]);


    // useEffect(() => {
    //     if (contactDataList && contactDataList?.length > 0) {
    //         const modifyData = transformData(contactDataList);
    //         setAccordionData(modifyData)
    //     }
    // }, [contactDataList])

    return (
        <AccordionCollapse accordionList={modifyContactData} contentTypeId={contentType.CONTACT} handleEdit={handleEdit} />
    )
}

export default ManageContactList;