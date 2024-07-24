import MolGrid from "../../../../../../../components/Grid/MolGrid";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { AccountGridConfig } from "../config/CarrierConfig";
import PropTypes from 'prop-types';

const CarrierList = ({ molGridRef, collectAccountData, actionHandler, handleToggleModal, isGetDataLoading, isShowButton }) => {

    return (
        <div className="first-card">
            <CardSection
                cardTitle="Carrier Details"
                rightButton={isShowButton ? true : false}
                buttonClassName="theme-button "
                buttonText="Add"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                titleButtonClick={handleToggleModal}>
                <div className="account-table table-striped mb-3">
                    <MolGrid
                        ref={molGridRef}
                        configuration={AccountGridConfig}
                        dataSource={collectAccountData}
                        allowPagination={false}
                        onActionChange={actionHandler}
                        isLoading={isGetDataLoading}
                    />
                </div>
            </CardSection>
        </div>
    )
}

CarrierList.propTypes = {
    molGridRef: PropTypes.object.isRequired,
    collectAccountData: PropTypes.array.isRequired,
    actionHandler: PropTypes.object.isRequired,
    handleToggleModal: PropTypes.func.isRequired,
    isGetDataLoading: PropTypes.bool.isRequired,
    isShowButton: PropTypes.bool.isRequired,
};

export default CarrierList;