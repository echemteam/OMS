/* eslint-disable react-hooks/exhaustive-deps */
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import { phoneNumberConfig } from "../config/AddEditContactsForm.data";
import CardSection from "../../../../../components/ui/card/CardSection";

const ContactNumberList = ({ phoneNumberList, molGridRef, handleToggleModal, actionHandler, isButtonDisable }) => {

    return (
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-2 card-email-sec">
            <CardSection
                cardTitle="Phone Numbers"
                buttonClassName="theme-button"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                rightButton={isButtonDisable ? false : true}
                buttonText="Add"
                titleButtonClick={handleToggleModal}>
                <div className="row">
                    <div className="col-md-12 table-striped p-0">
                        <MolGrid
                            ref={molGridRef}
                            configuration={phoneNumberConfig}
                            dataSource={phoneNumberList}
                            allowPagination={false}
                            onActionChange={actionHandler}
                        />
                    </div>
                </div>
            </CardSection>
        </div>
    )
}

export default ContactNumberList;