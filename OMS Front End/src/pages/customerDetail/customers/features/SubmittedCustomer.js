import React, { useRef } from 'react'
import CardSection from '../../../../components/ui/card/CardSection';
import MolGrid from '../../../../components/Grid/MolGrid';
import { SubmittedCustomerGridConfig } from '../config/CustomerData';

export const SubmittedCustomer = () => {
  const molGridRef = useRef();
  return (
    <div>
      <div className="row">
        <div className="col-xxl-12 col-xl-12 col-md-12 col-12">
          <CardSection
          >
            <div className="row">
              <div className="col-md-12 table-striped">
                <MolGrid
                  ref={molGridRef}
                  configuration={SubmittedCustomerGridConfig}
                // dataSource={customerData}
                // allowPagination={false}
                // onActionChange={actionHandler}
                />
              </div>
            </div>
          </CardSection>
        </div>
      </div>
    </div>
  )
}
