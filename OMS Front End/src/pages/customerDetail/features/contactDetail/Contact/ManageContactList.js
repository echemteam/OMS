import React from "react";
import { contentType } from "../../../../../components/Accordions/AccordionCollapse.Data";

import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import ContactCard from "./ContactCard";

const NoRecordFound = React.lazy(() =>
  import("../../../../../components/ui/noRecordFound/NoRecordFound")
);
const AccordionCollapse = React.lazy(() =>
  import("../../../../../components/Accordions/AccordionCollapse")
);

const ManageContactList = ({
  handleEdit,
  modifyContactData,
  isLoading,
  showEditIcon,
}) => {
  const hasData =
    modifyContactData &&
    Object.values(modifyContactData).some(
      (arr) => Array.isArray(arr) && arr.length > 0
    );

  return (
    <React.Fragment>
      {!isLoading ? (
        <>
          {hasData ? (
            // <AccordionCollapse
            //   accordionList={modifyContactData}
            //   contentTypeId={contentType.CONTACT}
            //   handleEdit={handleEdit}
            //   showEditIcon={showEditIcon}
            // />
            <>
              <div className="row">
                {Object.entries(modifyContactData).map(
                  ([type, items], index) => (
                    <div
                      className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-12"
                      key={index}
                    >
                      {items.map((childData, childIndex) => (
                        <>
                          <ContactCard
                            type={type}
                            items={items}
                            childData={childData}
                            handleEdit={handleEdit}
                            showEditIcon={showEditIcon}
                          />
                        </>
                      ))}
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <NoRecordFound />
          )}
        </>
      ) : (
        <DataLoader />
      )}
    </React.Fragment>
  );
};

export default ManageContactList;
