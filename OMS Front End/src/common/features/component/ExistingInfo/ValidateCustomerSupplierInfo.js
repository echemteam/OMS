/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';
//** Libs's */
import CardSection from '../../../../components/ui/card/CardSection';
import SidebarModel from '../../../../components/ui/sidebarModel/SidebarModel';
//** Service's */
import { encryptUrlData } from '../../../../services/CryptoService';
import FinalMolGrid from '../../../../components/FinalMolGrid/FinalMolGrid';
import Buttons from '../../../../components/ui/button/Buttons';

const ValidateCustomerSupplierInfo = forwardRef(({ onAdd, isSupplier, onSidebarClose, isModalOpen, gridCnfiguration, gridData, isGridLoading }) => {

    //** State */
    const molGridRef = useRef();
    const [isOpen, setIsOpen] = useState(isModalOpen);

    const handleEditClick = (data) => {
        let url;
        if (!isSupplier) {
            url = `/CustomerDetails/${encryptUrlData(data.customerId)}`;
        } else {
            url = `/SupplierDetails/${encryptUrlData(data.supplierId)}`;
        }
        window.open(url, "_blank");
    };



    const actionHandler = {
        EDIT: handleEditClick,
    };

    const sidebarClose = () => {
        setIsOpen(false);
    }

    const onAddData = () => {
        onAdd();
        setIsOpen(false);
    }

    return (
        <SidebarModel
            modalTitle="Matching Details"
            contentClass="content-80"
            onClose={sidebarClose} isOpen={isOpen}>
            <div className='pop-up-input-btn mt-3'>
                <CardSection>
                    <div className="row input-list-button">
                        <div className="col-lg-12 table-striped">
                            <FinalMolGrid
                                ref={molGridRef}
                                configuration={gridCnfiguration}
                                dataSource={gridData}
                                onActionChange={actionHandler}
                                isLoading={isGridLoading} />
                        </div>
                    </div>
                </CardSection>
                <div className='d-flex justify-content-end'>
                    <Buttons
                        buttonTypeClassName="theme-button mr-5"
                        buttonText="Create a customer"
                        onClick={onAddData}
                    />
                </div>
            </div>
        </SidebarModel>
    )
});

ValidateCustomerSupplierInfo.propTypes = {
    // parentRef: PropTypes.shape({
    //     current: PropTypes.shape({
    //         callChildFunction: PropTypes.func
    //     })
    // }).isRequired,
    // isSupplier: PropTypes.bool.isRequired,
    // getExistingInfoByName: PropTypes.func.isRequired
};

export default ValidateCustomerSupplierInfo;