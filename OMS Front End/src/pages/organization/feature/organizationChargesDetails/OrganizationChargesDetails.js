import React from 'react'
import CardSection from '../../../../components/ui/card/CardSection'
import OrganizationShippingChargesDetail from '../organizationShippingCharges/OrganizationShippingChargesDetail'
import OrganizationOtherChargesDetail from '../organizationOtherChargesDetail/OrganizationOtherChargesDetail'
import OrganizationAccountingDetail from '../organizationAccountingDetail/OrganizationAccountingDetail'

function OrganizationChargesDetails() {
  return (
    <div> 
            <CardSection cardTitle="Accounting">
                <OrganizationAccountingDetail isEditablePage={true}/>
            </CardSection>

            <CardSection cardTitle="Billing">
                <OrganizationShippingChargesDetail isEditablePage={true}/>
            </CardSection>
            
            <CardSection cardTitle="Other">
                <OrganizationOtherChargesDetail isEditablePage={true}/>
            </CardSection>
    </div>
  )
}

export default OrganizationChargesDetails