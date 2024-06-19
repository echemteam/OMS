import React from "react";
import { contentType } from "../../../../../components/Accordions/AccordionCollapse.Data";

import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";

const NoRecordFound = React.lazy(() => import("../../../../../components/ui/noRecordFound/NoRecordFound"));
const AccordionCollapse = React.lazy(() => import("../../../../../components/Accordions/AccordionCollapse"));

const ManageContactList = ({ handleEdit, modifyContactData, isLoading }) => {

    const hasData = modifyContactData && Object.values(modifyContactData).some(arr => Array.isArray(arr) && arr.length > 0);

    return (
        <React.Fragment>
            {!isLoading ?
                <>
                    {hasData ?
                        <AccordionCollapse accordionList={modifyContactData} contentTypeId={contentType.CONTACT} handleEdit={handleEdit} />
                        : <NoRecordFound />}
                </>
                : <DataLoader />}
        </React.Fragment>
    )
}

export default ManageContactList;