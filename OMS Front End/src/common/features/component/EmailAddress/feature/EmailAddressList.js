/* eslint-disable react-hooks/exhaustive-deps */
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import { emailConfig } from "../config/AddEditEmailForm.data";
import CardSection from "../../../../../components/ui/card/CardSection";
import PropTypes from 'prop-types';

const EmailAddressList = ({ emailAddressList, molGridRef, handleToggleModal, actionHandler, isButtonDisable }) => {

    return (
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-0 card-email-sec">
            <CardSection
                cardTitle="Email Address"
                buttonClassName="theme-button"
                textWithIcon={true}
                iconImg={AppIcons.PlusIcon}
                rightButton={!isButtonDisable }
                buttonText="Add"
                titleButtonClick={handleToggleModal}>
                <div className="row">
                    <div className="col-md-12 table-striped p-0">
                        <MolGrid
                            ref={molGridRef}
                            configuration={emailConfig}
                            dataSource={emailAddressList}
                            allowPagination={false}
                            onActionChange={actionHandler}
                        />
                    </div>
                </div>
            </CardSection>
        </div>
    )
}
EmailAddressList.propTypes = {
    emailAddressList: PropTypes.arrayOf(
        PropTypes.shape({
            emailId: PropTypes.number,
            id: PropTypes.number,
    
        })
    ).isRequired,
    molGridRef: PropTypes.object.isRequired,
    handleToggleModal: PropTypes.func.isRequired,
    actionHandler: PropTypes.shape({
        EDIT: PropTypes.func,
        DELETE: PropTypes.func,
    }).isRequired,
    isButtonDisable: PropTypes.bool.isRequired,
};

export default EmailAddressList;