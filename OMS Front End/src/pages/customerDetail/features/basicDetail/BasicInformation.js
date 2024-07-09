import React, { useRef } from 'react'
import { basicInfoData } from './config/BasicDetailForm.data'
import MolGrid from '../../../../components/Grid/MolGrid';
import CardSection from '../../../../components/ui/card/CardSection';
import { useNavigate } from 'react-router-dom';
import { encryptUrlData } from '../../../../services/CryptoService';

export const BasicInformation = (props) => {
    const molGridRef = useRef();
    const navigate = useNavigate();

    const handleEditClick = (data) => {
        if(data.customerId){
        navigate(`/viewCustomer/${encryptUrlData(data.customerId)}`, "_blank");
        }else{
            navigate(`/SupplierDetails/${encryptUrlData(data.supplierId)}`, "_blank");
        }
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
