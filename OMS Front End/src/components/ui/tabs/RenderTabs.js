import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RenderTabs = ({ tabs }) => {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabIndex, navigationPath) => {
        setActiveTab(tabIndex);
        navigate(navigationPath);
    };

    return (
        <>
            {tabs && tabs.length > 0 &&
                <div className="row">
                    <div className="col-12">
                        <div className="tab-section vertical-tab mb-0">
                            <div className="tab-header">
                                {tabs && tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        className={activeTab === index ? "active" : ""}
                                        onClick={() => handleTabClick(index, tab.sPage)}
                                    >
                                        {tab.sMenuItemCaption}
                                    </button>
                                ))}
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
            }
        </>
    )
}

export default RenderTabs