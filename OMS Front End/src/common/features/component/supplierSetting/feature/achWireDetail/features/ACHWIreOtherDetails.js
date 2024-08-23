/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CardSection from '../../../../../../../components/ui/card/CardSection';
import FormCreator from '../../../../../../../components/Forms/FormCreator';

const ACHWIreOtherDetails = ({ aCHWireOtherRef, otherData, isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData }) => {
    const [formData, setFormData] = useState(otherData);

    useEffect(() => {
        if (isGetACHWireBySupplierIdSuccess && isGetACHWireBySupplierIdData) {
            let data = { ...formData };
            data.initialState = {
                messageToRecipient: isGetACHWireBySupplierIdData.messageToRecipient,
                messageToRecipientBank: isGetACHWireBySupplierIdData.messageToRecipientBank,
            };
            setFormData(data);
        }
    }, [isGetACHWireBySupplierIdSuccess, isGetACHWireBySupplierIdData]);

    return (
        <CardSection cardTitle="Other Details">
            <div className="row">
                <FormCreator
                    config={formData}
                    ref={aCHWireOtherRef}
                    {...formData}
                />
            </div>
        </CardSection>
    )
}

export default ACHWIreOtherDetails