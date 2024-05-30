import React, { useState } from "react";
import "./GridFilters.scss";
import Buttons from "../button/Buttons";
import Checkbox from "../inputs/checkBox/CheckBox"; import RadioButton from "../inputs/radioButton/RadioButton";
import { Link } from "react-router-dom";

const GridFilters = () => {
  const [isActiveFilters, setIsActiveFilters] = useState(false);
  const [gridData, setGridData] = useState([
    { id: 1, name: "Client 1" },
    { id: 2, name: "Department" },
    { id: 3, name: "Work Order" },
    { id: 4, name: "Scope Type" },
    { id: 5, name: "Serial #" },
    { id: 6, name: "Days Last In" },
    { id: 7, name: "Date In" },
    { id: 8, name: "Date Approved" },
    { id: 9, name: "Est Del Date" },
    { id: 10, name: "Repair Status" },
    { id: 11, name: "Repair Status" },
    // Add more data as needed
  ]);
  const [groupData, setGroupData] = useState([
    { id: 1, name: "Group By", linkTo: "" },
    { id: 2, name: "Un Group", linkTo: "" },
    // Add more data as needed
  ]);

  // Function to toggle checkbox
  const handleCheckboxChange = (id, isChecked) => {
    // Update gridData based on checkbox change
    const updatedGridData = gridData.map((item) =>
      item.id === id ? { ...item, checked: isChecked } : item
    );
    setGridData(updatedGridData);

    // below function is not in use please remove if not necessary
    setGroupData({})
  };

  const toggleFilters = () => {
    setIsActiveFilters(!isActiveFilters);
  };

  return (
    <div
      className={`filter-section ${isActiveFilters ? "active-filters" : ""}`}
    >
      <div className="filter-btn">
        <span className="filters-title">Short By:</span>
        <div className="drop-down-shorting">
          <Buttons
            buttonText="Group"
            buttonTypeClassName="custom-filter-btn bi bi-inboxes-fill"
            onClick="{}"
            titleText="Short By Group"
          />
          <div className="shorting-list group-list">
            <ul>
              {groupData.map((item) => (
                <li>
                  <Link to={item.linkTo}>
                    <i className="bi bi-ui-checks-grid"></i>
                    <span className="filter-name">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="drop-down-shorting">
          <Buttons
            buttonText="Short Ascending"
            buttonTypeClassName="custom-filter-btn bi bi-sort-alpha-down"
            onClick="{}"
            titleText="Short By Ascending"
          />
          <div className="shorting-list">
            <span className="columnTitle">Column Name</span>
            <ul>
              {gridData.map((item) => (
                <li>
                  <span className="filter-checkbox">
                    <RadioButton
                    // selectedOption={instrumentType}
                    // onChange={(e) => handleRadioChange(e.target.value, 'instrumentTypeValue')}
                    // options={instrumentTypeOptions}
                    />
                  </span>
                  <span className="filter-name">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="drop-down-shorting">
          <Buttons
            buttonText="Short Descending"
            buttonTypeClassName="custom-filter-btn bi bi-sort-alpha-down-alt"
            onClick="{}"
            titleText="Short By Descending"
          />
          <div className="shorting-list">
            <span className="columnTitle">Column Name</span>
            <ul>
              {gridData.map((item) => (
                <li>
                  <span className="filter-checkbox">
                    <RadioButton
                    // selectedOption={instrumentType}
                    // onChange={(e) => handleRadioChange(e.target.value, 'instrumentTypeValue')}
                    // options={instrumentTypeOptions}
                    />
                  </span>
                  <span className="filter-name">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="drop-down-shorting">
          <Buttons
            buttonText="Columns"
            buttonTypeClassName="custom-filter-btn bi bi-columns"
            // onClick="{}"
            titleText="Short By Columns"
          />
          <div className="shorting-list">
            <span className="columnTitle">Column Name</span>
            <ul>
              {gridData.map((item) => (
                <li>
                  <span className="filter-checkbox">
                    <Checkbox
                      // key={id}
                      // name={id}
                      // dataField={dataField}
                      // label={lable}
                      // checked={instrumentInclude[item.id] || false}
                      // onChange={(dataField, isChecked) =>
                      //   handleCheckboxChange(dataField, isChecked)
                      // }
                      checked={item.checked || false}
                      onChange={(e) =>
                        handleCheckboxChange(item.id, e.target.checked)
                      }
                    />
                  </span>
                  <span className="filter-name">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Buttons
          buttonText="Clear All"
          buttonTypeClassName="custom-filter-btn bi bi-arrow-repeat"
          onClick="{}"
          titleText="Clear All Shorting"
        />

        <Buttons
          buttonText="Hide Filters"
          buttonTypeClassName="custom-filter-btn bi bi-x-circle-fill"
          onClick={toggleFilters}
          titleText="Hide Filters"
        />
      </div>
      <div className="filter-visibility-btn">
        <Buttons
          buttonText="Filters"
          buttonTypeClassName="custom-filter-btn bi bi-sliders"
          onClick={toggleFilters}
          titleText="Filter By"
        />
      </div>
    </div>
  );
};

export default GridFilters;
