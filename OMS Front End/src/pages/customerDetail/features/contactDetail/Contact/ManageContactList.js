import React from "react";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";

const ContactCard = React.lazy(() => import("./ContactCard"));
const NoRecordFound = React.lazy(() => import("../../../../../components/ui/noRecordFound/NoRecordFound"));

const ManageContactList = ({
  handleEdit,
  modifyContactData,
  isLoading,
  showEditIcon,
}) => {

  return (
    <React.Fragment>
      {!isLoading ? (
        <>
          {modifyContactData && modifyContactData.length > 0 ? (
            <div className="row">
              {modifyContactData.map((childData, childIndex) => (
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-12">
                  <ContactCard
                    type={childData.type}
                    // items={items}
                    childData={childData}
                    handleEdit={handleEdit}
                    showEditIcon={showEditIcon}
                  />
                </div>
              ))}
              {/* )
            )} */}
            </div>
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
