import React from "react";
import AccordionCollapse from "../../../../../components/Accordions/AccordionCollapse";
import { contentType } from "../../../../../components/Accordions/AccordionCollapse.Data";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";

const ManageContactList = ({ handleEdit, modifyContactData }) => {

    const hasData = modifyContactData && Object.values(modifyContactData).some(arr => Array.isArray(arr) && arr.length > 0);

    return (
        <React.Fragment>
            {hasData ?
                <AccordionCollapse accordionList={modifyContactData} contentTypeId={contentType.CONTACT} handleEdit={handleEdit} />
                : <NoRecordFound />}
        </React.Fragment>
    )
}

export default ManageContactList;