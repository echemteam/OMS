/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../image/Image";
import { AppIcons } from "../../../data/appIcons";
import PropTypes from "prop-types";

const RenderTabs = ({ tabs, isCollapse, onActiveTab, isOrganization }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isCollapsediv, setIsCollapsediv] = useState(false);

  const handleTabClick = (tabIndex, navigationPath) => {
    setActiveTab(tabIndex);
    navigate(navigationPath);
  };

  const handleCollapseClick = () => {
    setIsCollapsediv(prevState => !prevState);
  };

  useEffect(() => {
    if (activeTab && isOrganization === true) {
      onActiveTab(activeTab)
    } else if (activeTab === 0 && isOrganization === true) {
      onActiveTab(activeTab)
    }
  }, [activeTab])

  return (
    <>
      {tabs && tabs.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className={`tab-section mb-0 ${isCollapsediv ? 'collapse-tabs' : ''}`}>
              <div className="tab-header">
                {tabs &&
                  tabs.map((tab, index) => (
                    tab &&
                    <button
                      key={index}
                      className={activeTab === index ? "active" : ""}
                      onClick={() => handleTabClick(index, tab.sPage)}
                    >
                      {tab.sMenuItemCaption}
                    </button>
                  ))}
                {isCollapse ? (
                  <>
                    <div className="collapse-tab" onClick={handleCollapseClick} title="Collapse Tabs">
                      <Image imagePath={AppIcons.arrowIcon} />
                    </div>
                  </>
                ) : null}
              </div>
              {activeTab !== -1 && tabs[activeTab].component && (
                <div className="tab-content">
                  <div className="tab-body-section">
                    {tabs[activeTab].component}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

RenderTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      sMenuItemCaption: PropTypes.string.isRequired,
      sPage: PropTypes.string.isRequired,
      component: PropTypes.node
    })
  ).isRequired,
  isCollapse: PropTypes.bool,
  onActiveTab: PropTypes.func,
  isOrganization: PropTypes.bool
};

export default RenderTabs;
