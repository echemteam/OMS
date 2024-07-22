import React, { useState } from "react";
import "./MyTask.scss";
import { Button } from "react-bootstrap";
import Buttons from "../../components/ui/button/Buttons";
import RenderTabs from "../../components/ui/tabs/RenderTabs";
import SearchBar from "../../common/features/component/SearchBar";
import CardSection from "../../components/ui/card/CardSection";
import TaskDetail from "./feature/TaskDetail";

const mainTabs = [
  {
    sMenuItemCaption: "Done",
    component: <div className="mt-2">{/* <OrganizationLocation /> */}</div>,
  },
  {
    sMenuItemCaption: "Archive",
    component: <div className="mt-2">{/* <OrganizationLocation /> */}</div>,
  },
];

const customerTabs = [
  {
    label: "Praful Desai",
    subtitle: "Customer Information Update",
    content: <div>Content for Tab One</div>,
    date:"24 June, 2024"
  },
  {
    label: "Praful Desai",
    subtitle: "Customer Information Update",
    content: <div>Content for Tab Two</div>,
    date:"24 June, 2024"

  },
  {
    label: "Praful Desai",
    subtitle: "Customer Information Update",
    content: <div>Content for Tab Three</div>,
    date:"24 June, 2024"

  },
];

const MyTask = () => {
  const [activeCustomerTab, setActiveCustomerTab] = useState(0);

  return (
    <CardSection>
      <div className="mytask-section">
        <div className="d-flex">
          <div className="col-4 task-tab">
            <div className="task-title">
              <div className="d-flex">
                <RenderTabs tabs={mainTabs} />
              </div>
              <SearchBar />
            </div>
            <div className="customer-info">
              <div className="tabs">
                {customerTabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`tab-button ${
                      activeCustomerTab === index ? "active" : ""
                    }`}
                    onClick={() => setActiveCustomerTab(index)}
                  >
                    <div className="d-flex align-items-center">
                      <span className="profile-icon">PD</span>
                      <div className="title">
                        {tab.label}
                        <span className="sub-title">{tab.subtitle}</span>
                      </div>
                    </div>
                    <span className="date">{tab.date}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-8">
            <TaskDetail />
          </div>
        </div>
      </div>
    </CardSection>
  );
};

export default MyTask;
