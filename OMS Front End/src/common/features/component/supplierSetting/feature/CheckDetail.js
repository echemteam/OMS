import React from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import AddressDetail from "./AddressDetail";

const CheckDetail = () => {
  
  return (
    <>
      <div className="ach-wire-section">
        <div className="sub-card-sec-add">
          <CardSection cardTitle="Mailing Address">
            <AddressDetail/>
          </CardSection>
        </div>
      </div>
    </>
  );
};

export default CheckDetail;
