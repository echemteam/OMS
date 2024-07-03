import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Accordion } from "react-bootstrap";
import { CardSectionDetails } from "./AccordionCollapse.Data";

const ContactCard = React.lazy(() =>
  import(
    "../../pages/customerDetail/features/contactDetail/Contact/ContactCard"
  )
);

const AccordionCollapse = ({ accordionList, contentTypeId, handleEdit }) => {
  const [activeKey, setActiveKey] = useState([]);
  const [customCardDetails, setCustomCardDetails] = useState();

  const handleToggle = (eventKey) => {
    if (activeKey.includes(eventKey)) {
      setActiveKey(activeKey.filter((key) => key !== eventKey));
    } else {
      setActiveKey([...activeKey, eventKey]);
    }
  };

  const AccordtionCardDetails = useCallback(
    (cardId, childData, cardDetails) => {
      switch (cardId) {
        case 1:
          return (
            <ContactCard
              childData={childData}
              handleEdit={handleEdit}
              cardDetails={cardDetails}
            />
          );
        default:
          return null;
      }
    },
    [handleEdit]
  );

  useEffect(() => {
    if (contentTypeId > 0) {
      const cardData = CardSectionDetails.find(
        (data) => data.id === contentTypeId
      );
      setCustomCardDetails(cardData);
    }
  }, [contentTypeId]);

  const memoizedAccordionList = useMemo(() => {
    return Object.entries(accordionList).map(([type, items], index) => (
      <Accordion.Item
        eventKey={index.toString()}
        className={activeKey === index.toString() ? "active" : ""}
        key={index}
      >
        <div className="header-title-btn">
          <Accordion.Header>
            <span>{type}</span>
          </Accordion.Header>
        </div>
        <Accordion.Body className="add-desc-part mt-4">
          <div className="add-desc-part">
            <div className="row">
              {items.map((childData, childIndex) => (
                <div
                  className={customCardDetails?.cardClassName}
                  key={childIndex}
                >
                  {AccordtionCardDetails(
                    contentTypeId,
                    childData,
                    customCardDetails
                  )}
                </div>
              ))}
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    ));
  }, [
    accordionList,
    activeKey,
    AccordtionCardDetails,
    customCardDetails,
    contentTypeId,
  ]);

  useEffect(() => {
    setActiveKey(Object.keys(accordionList).map((_, index) => index.toString()));
  }, [accordionList]);

  return (
    <Accordion
      className="contact-card-section"
      activeKey={activeKey}
      onSelect={handleToggle}
    >
      {memoizedAccordionList}
    </Accordion>
  );
};

export default React.memo(AccordionCollapse);
