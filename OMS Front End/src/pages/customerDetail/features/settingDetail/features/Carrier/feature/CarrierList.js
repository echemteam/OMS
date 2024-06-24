import MolGrid from "../../../../../../../components/Grid/MolGrid";
import CardSection from "../../../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../../../data/appIcons";
import { AccountGridConfig } from "../config/CarrierConfig";

const CarrierList = ({ molGridRef, collectAccountData, actionHandler, handleToggleModal, isGetDataLoading }) => {

    return (
        <div className="first-card">
            <CardSection
                cardTitle="Carrier Details"
                rightButton={true}
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

export default CarrierList;