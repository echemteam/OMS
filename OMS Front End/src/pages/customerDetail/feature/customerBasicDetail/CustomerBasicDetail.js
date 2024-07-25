/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
//** Lib's */
import CardSection from "../../../../components/ui/card/CardSection";
import AddEditCustomerBasicDetail from "./AddEditCustomerBasicDetail";
import PropTypes from "prop-types";
//** Component */

const CustomerBasicDetail = (props) => {
  const { isOpen, getCustomerById, onSidebarClose, keyId } = props;

  return (
    <div className="basic-info-sec half-sec">
      <CardSection buttonClassName="theme-button">
        <AddEditCustomerBasicDetail
          keyId={keyId}
          getCustomerById={getCustomerById}
          isOpen={isOpen}
          onSidebarClose={onSidebarClose}
        />
      </CardSection>
    </div>
  );
};

CustomerBasicDetail.propTypes = {
  isOpen: PropTypes.bool ,
  getCustomerById: PropTypes.func ,
  onSidebarClose: PropTypes.func,
  keyId: PropTypes.number ,
};
export default CustomerBasicDetail;
