import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../image/Image";
import { AppIcons } from "../../../data/appIcons";

const RenderTabs = ({ tabs, isCollapse }) => {
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

  return (
    <>
      {tabs && tabs.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className={`tab-section mb-0 ${isCollapsediv ? 'collapse-tabs' : ''}`}>
              <div className="tab-header">
                {tabs &&
                  tabs.map((tab, index) => (
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
                        <Image imagePath={AppIcons.arrowIcon}/>
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

export default RenderTabs;
