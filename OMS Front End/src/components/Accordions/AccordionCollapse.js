import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

import { CardSectionDetails } from "./AccordionCollapse.Data";
import ContactCard from "../../pages/customerDetail/features/contactDetail/Contact/ContactCard";

const AccordionCollapse = ({ accordionList, contentTypeId, handleEdit }) => {

    const [activeKey, setActiveKey] = useState("0");
    const [customCardDetails, setCustomCardDetails] = useState();

    const handleToggle = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    const AccordtionCardDetails = (cardId, childData, cardDetails) => {
        switch (cardId) {
            case 1:
                return <ContactCard childData={childData} handleEdit={handleEdit} cardDetails={cardDetails} />
            default:
                return ''
        }
    };

    useEffect(() => {
        if (contentTypeId > 0) {
            const cardData = CardSectionDetails.find((data) => data.id === contentTypeId);
            setCustomCardDetails(cardData);
        }
    }, [contentTypeId]);

    return (
        <Accordion className="contact-card-section" activeKey={activeKey} onSelect={handleToggle} >
            {Object.entries(accordionList).map(([type, items], index) => (
                <Accordion.Item eventKey={index.toString()} className={activeKey === index.toString() ? "active" : ""} key={index}>
                    <div className="header-title-btn">
                        <Accordion.Header>
                            <span>{type}</span>
                        </Accordion.Header>
                    </div>
                    <Accordion.Body className="add-desc-part mt-4">
                        <div className="add-desc-part">
                            <div className="row">
                                {items.map((childData, childIndex) => (
                                    <div className={customCardDetails?.cardClassName} key={childIndex}>
                                        {AccordtionCardDetails(contentTypeId, childData.cardInformation, customCardDetails)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}


export default AccordionCollapse;