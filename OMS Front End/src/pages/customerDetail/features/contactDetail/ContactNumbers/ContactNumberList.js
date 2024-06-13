import MolGrid from "../../../../../components/Grid/MolGrid";
import CardSection from "../../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../../data/appIcons";
import { GridColumnType } from "../../../../../data/gridColumnType";

const ContactNumberList = ({ molGridRef, handleToggleModal, actionHandler }) => {

    const contactData = [
        {
            contactNo: "+91 9526335445",
        },
        {
            contactNo: "+001 2026335445",
        },
    ];
    const contactConfig = {
        columns: [
            {
                name: "Contact Numbers",
                fieldName: "contactNo",
                allowShort: true,
            },

            {
                name: "Action",
                colType: GridColumnType.ACTION,
                defaultAction: {
                    allowEdit: true,
                    allowDelete: true,
                },
            },
        ],
    };

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
                            configuration={contactConfig}
                            dataSource={contactData}
                            allowPagination={false}
                            onActionChange={actionHandler}
                        // onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </CardSection>
        </div>
    )
}

export default ContactNumberList;