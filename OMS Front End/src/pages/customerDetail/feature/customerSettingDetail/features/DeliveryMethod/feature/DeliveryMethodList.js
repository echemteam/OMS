/* eslint-disable react-hooks/exhaustive-deps */
import MolGrid from "../../../../../../../components/Grid/MolGrid";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { OurAccountGridConfig } from "../config/DevliveryConfig";
import PropTypes from 'prop-types';

const DeliveryMethodList = ({ molGridRef, ourAccountData, actionHandler, handleToggleModal, isGetDataLoading, isShowButton }) => {
   
    return (
        <div className="first-card">
            <CardSection
                cardTitle="Delivery Method Details"
                rightButton={isShowButton ? true : false}
                buttonClassName="theme-button "
                buttonText="Add"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                titleButtonClick={handleToggleModal}>
                <div className="account-table table-striped mb-3">
                    <MolGrid
                        ref={molGridRef}
                        configuration={OurAccountGridConfig}
                        dataSource={ourAccountData}
                        allowPagination={false}
                        onActionChange={actionHandler}
                        isLoading={isGetDataLoading}
                    />
                </div>
            </CardSection>
        </div>
    )

}

DeliveryMethodList.propTypes = {
    molGridRef: PropTypes.object.isRequired,
    ourAccountData: PropTypes.array.isRequired,
    actionHandler: PropTypes.object.isRequired,
    handleToggleModal: PropTypes.func.isRequired,
    isGetDataLoading: PropTypes.bool.isRequired,
    isShowButton: PropTypes.bool.isRequired
};

export default DeliveryMethodList;