import React, { useRef } from 'react'
import { basicInfoData } from './config/BasicDetailForm.data'
import MolGrid from '../../../../components/Grid/MolGrid';
import CardSection from '../../../../components/ui/card/CardSection';
import { encryptUrlData } from '../../../../services/CryptoService';

export const BasicInformation = (props) => {
    
    const molGridRef = useRef();

    const handleEditClick = (data) => {
        let url;
        if (data.customerId) {
            url = `/viewCustomer/${encryptUrlData(data.customerId)}`;
        } else {
            url = `/SupplierDetails/${encryptUrlData(data.supplierId)}`;
        }
        window.open(url, "_blank");
    };

    const actionHandler = {
        EDIT: handleEditClick,
    };

    return (
        <div className='pop-up-input-btn mt-3'>
            
            <CardSection>
                <div className="row input-list-button">
                    <div className="col-lg-12 table-striped">
                        <MolGrid
                            ref={molGridRef}
                            configuration={basicInfoData}
                            dataSource={props.infoData}
                            onActionChange={actionHandler}
                        />
                    </div>
                </div>
            </CardSection>
        </div>
    )
}
