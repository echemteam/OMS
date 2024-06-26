import { useContext } from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import { emailConfig } from "./config/AddEditEmailForm.data";
import MolGrid from "../../../../../components/Grid/MolGrid";
import CardSection from "../../../../../components/ui/card/CardSection";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";

const EmailAddressList = ({ molGridRef, handleToggleModal, actionHandler , isSupplier}) => {

    const { emailAddressData } = useContext(isSupplier ? AddSupplierContext : BasicDetailContext);

    return (
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-2 card-email-sec">
            <CardSection
                cardTitle="Email Address"
                buttonClassName="theme-button"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                rightButton={true}
                buttonText="Add"
                titleButtonClick={handleToggleModal}>
                <div className="row">
                    <div className="col-md-12 table-striped">
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