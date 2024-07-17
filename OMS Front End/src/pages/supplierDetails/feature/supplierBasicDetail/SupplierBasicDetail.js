/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
//** Lib's */
import CardSection from '../../../../components/ui/card/CardSection';
//** Component */
const AddEditSupplierBasicDetail = React.lazy(() => import("./AddEditSupplierBasicDetail"));

const SupplierBasicDetail = (props) => {

  const { isOpen, getSupplierById, onSidebarClose, keyId, isEditablePage } = props;

  return (
    <div className="basic-info-sec half-sec supplier-basic-info-model">
      <CardSection buttonClassName="theme-button">
        <AddEditSupplierBasicDetail keyId={keyId} getSupplierById={getSupplierById} isOpen={isOpen} isEditablePage={isEditablePage}
          onSidebarClose={onSidebarClose} />
      </CardSection>
    </div>
  );
}

export default SupplierBasicDetail