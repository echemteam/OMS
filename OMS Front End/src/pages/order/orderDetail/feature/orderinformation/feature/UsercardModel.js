import React from "react";
import UserCardList from "./UserCardList";

const UsercardModel = ({contact, index, handleToggleModalUsers}) => {
  return (
    <>
      <div className="row mt-3">
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12">
          <UserCardList/>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12">
          <UserCardList/>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12">
          <UserCardList/>
        </div>
        
      </div>
    </>
  );
};

export default UsercardModel;
