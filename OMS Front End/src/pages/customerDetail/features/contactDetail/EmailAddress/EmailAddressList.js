import { useContext } from "react";
import MolGrid from "../../../../../components/Grid/MolGrid";
import CardSection from "../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../data/appIcons";
import { emailConfig } from "./config/AddEditEmailForm.data";
import ContactContext from "../../../../../utils/ContextAPIs/Customer/ContactContext";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const EmailAddressList = ({ molGridRef, handleToggleModal, actionHandler }) => {

    const { emailAddressData } = useContext(BasicDetailContext);

    return (
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4 card-email-sec">
            <CardSection
                cardTitle="Email Address"
                buttonClassName="danger-btn"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                rightButton={true}
                buttonText="Add"
                titleButtonClick={handleToggleModal}>
                <div className="row">
                    <div className="col-md-12 table-striped pt-1">
                        <MolGrid
                            ref={molGridRef}
                            configuration={emailConfig}
                            dataSource={emailAddressData}
                            allowPagination={false}
                            onActionChange={actionHandler}
                        />
                    </div>
                </div>
            </CardSection>
        </div>
    )
}

export default EmailAddressList;