import { useContext } from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import { phoneNumberConfig } from "./config/AddEditContactsForm.data";
import CardSection from "../../../../../components/ui/card/CardSection";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const ContactNumberList = ({ molGridRef, handleToggleModal, actionHandler,isLoading }) => {

    const { phoneNumberData } = useContext(BasicDetailContext);

    return (
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-4 card-email-sec">
            <CardSection
                cardTitle="Phone Numbers"
                buttonClassName="theme-button"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                rightButton={true}
                buttonText="Add"
                titleButtonClick={handleToggleModal}>
                <div className="row">
                    <div className="col-md-12 table-striped pt-1">
                        <MolGrid
                            ref={molGridRef}
                            configuration={phoneNumberConfig}
                            dataSource={phoneNumberData}
                            allowPagination={false}
                            onActionChange={actionHandler}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </CardSection>
        </div>
    )
}

export default ContactNumberList;