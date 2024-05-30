import React, { useRef } from "react";
import MolGrid from "../../components/Grid/MolGrid";
import { GridColumnType } from "../../data/gridColumnType";
import { useNavigate } from "react-router-dom";
import { AppIcons } from "../../data/appIcons";
const GridConfig = {
  columns: [
    {
      name: "Campaign Name",
      fieldName: "campaignName",
      allowShort: false,
    },
    {
      name: "Recipients",
      fieldName: "recipients",
      allowShort: false,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
              getLableClass: (value) => {
                switch (value) {
                  case "Open":
                    return "badge-gradient-info";
                  case "Close":
                    return "badge-gradient-danger";
                  case "Pending":
                    return "badge-gradient-warning";
                  case "Completed":
                    return "badge-gradient-success";
                  case "In progress":
                    return "badge-gradient-theme";
                  
                  default:
                    return "badge-gradient-info";
                }
              },
      },
    },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
      },
      customDropdownActions: [
        { name: "Edit", path: "/EmailSetup" },
        { name: "Preview", path: "/" },
        { name: "Duplicate", path: "/" },
        { name: "Approve", path: "/" },
      ],
      // actionHandler: {
      //   onEditAction: (data) => {
      //     alert("Edit called"); // Check navigate
      //   },
      //   onDeleteAction: (data) => {
      //     alert("delete called");
      //   },
      // },
    },
  ],
};
const GridConfig2 = {
  columns: [
    {
      name: "Campaign Name",
      fieldName: "campaignName",
      allowShort: true,
    },
    {
      name: "Recipients",
      fieldName: "recipients",
      allowShort: true,
    },
    {
      name: "Date",
      fieldName: "date",
      colType: GridColumnType.DATE,
      allowShort: true,
      colSettings: {
        format: "DD/MMM/YYYY",
      },
    },
    {
      name: "Time",
      fieldName: "time",
      colType: GridColumnType.TIME,
      allowShort: false,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
              getLableClass: (value) => {
                switch (value) {
                  case "Open":
                    return "badge-gradient-info";
                  case "Close":
                    return "badge-gradient-danger";
                  case "Pending":
                    return "badge-gradient-warning";
                  case "Completed":
                    return "badge-gradient-success";
                  case "In progress":
                    return "badge-gradient-theme";
                  
                  default:
                    return "badge-gradient-info";
                }
              },
      },
    },
    
    
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      // customAction: [
      //   {
      //     name: "View",
      //     iconName: AppIcons.userIcon,
      //     onViewAction: (data) => {
      //       alert("called view");
      //     },
      //   },
      // ],
      actionHandler: {
        onEditAction: (data) => {
          alert("Edit called"); // Check navigate
        },
        onDeleteAction: (data) => {
          alert("delete called");
        },
      },
    },
    
  ],
};

const tableData = [
  {
    campaignName: "Singapore Womans Award Dinner",
    recipients: "Member, Affiliate",
    status: "Open",
    isActive: true,
  },
  {
    campaignName: "AAAA Womans Award Dinner",
    recipients: "Member, Affiliate",
    status: "Close",
    isActive: true,
  },
  {
    campaignName: "AAAA1 Womans Award Dinner",
    recipients: "Member, Affiliate",
    status: "Pending",
    isActive: true,
  },
  {
    campaignName: "1Singapore Womans Award Dinner",
    recipients: "Member, Affiliate",
    status: "Completed",
    isActive: true,
  },
  {
    campaignName: "AAAA3 Womans Award Dinner",
    recipients: "Member, Affiliate",
    status: "In progress",
    isActive: true,
  },
];
const tableData2 = [
  {
    campaignName: "Singapore Womans Award Dinner",
    recipients: "Member, Affiliate",
    date: "18 Jan 2024",
    time: "10:00AM",
    status: "Open",
    isActive: true,
  },
  {
    campaignName: "AAAA Womans Award Dinner",
    recipients: "Member, Affiliate",
    date: "18 Jan 2024",
    time: "10:00AM",
    status: "Close",
    isActive: true,
  },
  {
    campaignName: "AAAA1 Womans Award Dinner",
    recipients: "Member, Affiliate",
    date: "18 Jan 2024",
    time: "10:00AM",
    status: "Pending",
    isActive: true,
  },
  {
    campaignName: "1Singapore Womans Award Dinner",
    recipients: "Member, Affiliate",
    date: "18 Jan 2024",
    time: "10:00AM",
    status: "Completed",
    isActive: true,
  },
  {
    campaignName: "AAAA3 Womans Award Dinner",
    recipients: "Member, Affiliate",
    date: "18 Jan 2024",
    time: "10:00AM",
    status: "In progress",
    isActive: true,
  },
];

const DemoGrid = () => {
  const molGridRef = useRef();
  const navigate = useNavigate();
  const getCurrentPageObject = () => {
    if (molGridRef.current) {
      // Access the current page object through the ref
      const currentPageObject = molGridRef.current.getCurrentPageObject();
    }
  };
  const handleAddEditCampaign = () => {
    navigate("/AddEditCampaign"); // Replace '/dashboard' with your actual dashboard route
  };
  const actionHandler = {};
  return (
    <div className="grid-section">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="row">
              <div className="col-md-12">
                <div className="card-title">
                  <h4>Basic Table</h4>
                  <p>
                    Add class <span>.table</span>
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <MolGrid
                  ref={molGridRef}
                  configuration={GridConfig}
                  dataSource={tableData}
                  allowPagination={true}
                  pagination={{
                    totalCount: 0,
                  }}
                  onActionHandler={actionHandler}
                  // onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="row">
              <div className="col-md-12">
                <div className="card-title">
                  <h4>Hoverable Table</h4>
                  <p>
                    Add class <span>.table-hover</span>
                  </p>
                </div>
              </div>
              <div className="col-md-12 table-hover">
                <MolGrid
                  ref={molGridRef}
                  configuration={GridConfig}
                  dataSource={tableData}
                  allowPagination={true}
                  pagination={{
                    totalCount: 0,
                  }}
                  onActionHandler={actionHandler}
                  // onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
            <div className="row">
              <div className="col-md-12">
                <div className="card-title">
                  <h4>Striped Table</h4>
                  <p>
                    Add class <span>.table-striped</span>
                  </p>
                </div>
              </div>
              <div className="col-md-12 table-striped">
                <MolGrid
                  ref={molGridRef}
                  configuration={GridConfig2}
                  dataSource={tableData2}
                  allowPagination={true}
                  pagination={{
                    totalCount: 0,
                  }}
                  onActionHandler={actionHandler}
                  // onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
            <div className="row">
              <div className="col-md-12">
                <div className="card-title">
                  <h4>Bordered Table</h4>
                  <p>
                    Add class <span>.table-bordered</span>
                  </p>
                </div>
              </div>
              <div className="col-md-12 table-bordered">
                <MolGrid
                  ref={molGridRef}
                  configuration={GridConfig2}
                  dataSource={tableData2}
                  allowPagination={true}
                  pagination={{
                    totalCount: 0,
                  }}
                  onActionHandler={actionHandler}
                  // onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoGrid;