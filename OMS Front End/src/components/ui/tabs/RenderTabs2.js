import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RenderTabs2 = ({ tabs }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabClick = (tabIndex, navigationPath) => {
    setActiveTab(tabIndex);
    navigate(navigationPath);
  };

  return (
    <>
      {tabs && tabs.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className="tab-section mb-0"> 
              <div className="tab-header">
                {tabs?.map((tab, index) => (
                  <button
                    key={index}
                    className={activeTab === index ? 'active' : ''}
                    onClick={() => handleTabClick(index, tab.sPage)}
                  >
                    {tab.sMenuItemCaption}
                  </button>
                ))}
              </div>

            { tabs?.map((tab, index) => (
                 !tab.isDynemic?
                <div key={index} className={`tab-content`} style={{ display: activeTab === index ? 'block' : 'none' }}>
                <div className="tab-body-section">
                  {tab.component} {/* Assuming tab.component holds the content of the tab */}
                </div>
              </div>
               : null
              ))}
               {tabs[activeTab].isDynemic &&  activeTab !== -1 && tabs[activeTab].component && (
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
RenderTabs2.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      sMenuItemCaption: PropTypes.string.isRequired,  
      sPage: PropTypes.string.isRequired,  
      component: PropTypes.node, 
      isDynemic: PropTypes.bool,  
    })
  ).isRequired,  
};
export default RenderTabs2;
