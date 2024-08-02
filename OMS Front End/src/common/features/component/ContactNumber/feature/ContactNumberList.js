/* eslint-disable react-hooks/exhaustive-deps */
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import MolGrid from "../../../../../components/Grid/MolGrid";
import { phoneNumberConfig } from "../config/AddEditContactsForm.data";
import CardSection from "../../../../../components/ui/card/CardSection";
import PropTypes from 'prop-types';
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
ContactNumberList.propTypes = {
    phoneNumberList: PropTypes.arrayOf(PropTypes.shape({
        phoneNumber: PropTypes.string.isRequired,
        phoneCode: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        phoneTypeId: PropTypes.number,
        phoneType: PropTypes.string,
        isPrimary: PropTypes.bool,
        extension: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })).isRequired,
    molGridRef: PropTypes.object,
    handleToggleModal: PropTypes.func.isRequired,
    actionHandler: PropTypes.object.isRequired,
    isButtonDisable: PropTypes.bool.isRequired
};
export default ContactNumberList;