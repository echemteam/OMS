import React from "react";
import UserCardDetail from "./UserCardDetail";

const UsercardModel = ({contact, index, handleToggleModalUsers}) => {
  return (
    <>
      <div className="row mt-3">
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12">
          <UserCardDetail
            contact={contact}
            index={index}
            // handleToggleModalUsers={handleToggleModalUsers}
            handleToggleModalUsers={handleToggleModalUsers}
          />
        </div>
      </div>
    </>
  );
};

export default UsercardModel;
