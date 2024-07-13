/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
//** Lib's */
import CardSection from '../../../../components/ui/card/CardSection';
//** Component */
const AddEditSupplierBasicDetail = React.lazy(() => import("./AddEditSupplierBasicDetail"));

const SupplierBasicDetail = (props) => {

  const { isOpen, getSupplierById, onSidebarClose, keyId } = props;

  return (
    <div className="basic-info-sec half-sec">
      <div className="basic-info-sec half-sec">
        <CardSection buttonClassName="theme-button">
          <AddEditSupplierBasicDetail keyId={keyId} getSupplierById={getSupplierById} isOpen={isOpen} onSidebarClose={onSidebarClose} />
        </CardSection>
      </div>

    </div>
  );
}

export default SupplierBasicDetail