import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Filter.scss";
import Image from "../image/Image";
import { AppIcons } from "../../data/appIcons";
import DropdownSelect from "../ui/dropdown/DropdownSelect";
import Input from "../ui/inputs/input/Input";
import Buttons from "../ui/button/Buttons";
import Iconify from "../ui/iconify/Iconify";

const Filter = (props) => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filters, setFilters] = useState([{ id: Date.now() }]);
  const filterSectionRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      filterSectionRef.current &&
      !filterSectionRef.current.contains(event.target)
    ) {
      setIsFilterActive(false);
    }
  };

  const addFilter = () => {
    setFilters([...filters, { id: Date.now() }]);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className={`filter-section ${isFilterActive ? "active-filter" : ""}`}
      ref={filterSectionRef}
    >
      <div
        className="button-sec btn dark-btn filter-click"
        onClick={() => setIsFilterActive(!isFilterActive)}
      >
        <Image
          imgCustomClassName="filter-icon-img"
          imagePath={AppIcons.FilterIcon}
          altText="Filter Icon"
        />
        <span>Filters</span>
      </div>
      <div className="filter-body-sec">
        <div className="body-desc-part">
          <div className="filter-Heading">
            <div className="left-title">
              <h4>{props.headerTitle ?? "Filters"}</h4>
            </div>
            <div className="right-action">
              <a href="#." title="Clear All Filters" onClick={clearAllFilters}>
                Clear All
                <Image
                  imagePath={AppIcons.ClearAllIcon}
                  altText="Filter Icon"
                />
              </a>
            </div>
          </div>
          <div className="filter-content">
            <div className="row">
              <div className="col-xxl-5 col-xl-5 col-md-5 col-12 pr-0">
                <div className="input-section">
                  <DropdownSelect placeholder={props.placeholder} />
                </div>
              </div>
              <div className="col-xxl-7 col-xl-7 col-md-7 col-12">
                <div className="filter-value-delete-icon">
                  <div className="input-section">
                    <Input placeholder="Enter filter Values" />
                  </div>
                  <div className="delete-icon">
                    <div className="delete-btn" title="Delete Filter">
                      {/* <Image imagePath={AppIcons.deleteIcon} altText="Delete" /> */}
                      <Iconify icon="mingcute:delete-2-line" className="delete-icon"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {filters.map((filter) => (
              <div key={filter.id} className="mt-2 bg-filter">
                <div className="row">
                  <div className="col-xxl-2 col-xl-2 col-md-2 col-12 pr-0">
                    <div className="input-section">
                      <DropdownSelect placeholder="And / Or" />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-md-3 col-12 pr-0">
                    <div className="input-section">
                      <DropdownSelect placeholder={props.placeholder} />
                    </div>
                  </div>
                  <div className="col-xxl-7 col-xl-7 col-md-7 col-12">
                    <div className="filter-value-delete-icon">
                      <div className="input-section">
                        <Input placeholder="Enter filter Values" />
                      </div>
                      <div className="delete-icon">
                        <div
                          className="delete-btn"
                          title="Delete Filter"
                          onClick={() => removeFilter(filter.id)}
                        >
                          {/* <Image
                            imagePath={AppIcons.deleteIcon}
                            altText="Delete"
                          /> */}
                          <Iconify icon="mingcute:delete-2-line" className="delete-icon"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="row mt-2">
              <div className="col-xxl-12 col-xl-12 col-md-12 col-12 d-flex justify-content-start">
                <div
                  className="add-filter-btn"
                  title="Add More Filter"
                  onClick={addFilter}
                >
                  <Buttons
                    buttonTypeClassName="outline-dark-btn"
                    textWithIcon={true}
                    imagePath={AppIcons.PlusIcon}
                    buttonText="Add Filter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  headerTitle: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Filter;
