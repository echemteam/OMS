import React, { useRef } from 'react'
import CardSection from '../../../../components/ui/card/CardSection'
import MolGrid from '../../../../components/Grid/MolGrid';
import { AllCustomerGridConfig } from '../config/CustomerData';

const customerData = [
  { userName: 'John Doe', firstName: '12345' , progress: 75  },
  { userName: 'John Doe', firstName: '12345' , progress: 20  },
  { userName: 'John Doe', firstName: '12345' , progress: 10  },
  { userName: 'John Doe', firstName: '12345' , progress: 30  },
  { userName: 'John Doe', firstName: '12345' , progress: 5  },
  { userName: 'John Doe', firstName: '12345' , progress: 25  },
];

export const AllCustomer = () => {
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
                  configuration={AllCustomerGridConfig}
                  dataSource={customerData}
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
