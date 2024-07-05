import React, { useState, useEffect, useRef } from "react";
import "./Filter.scss";
import Image from "../image/Image";
import { AppIcons } from "../../data/appIcons";
import DropdownSelect from "../ui/dropdown/DropdownSelect";
import Input from "../ui/inputs/input/Input";
import Buttons from "../ui/button/Buttons";

const Filter = (props) => {
  return (
    <div className="filter-section">
      <div className="button-sec btn dark-btn">
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
              <h4>{props.headerTitle}</h4>
            </div>
            <div className="right-action">
              <a href="#." title="Clear All Filters">
                Clear All
                <Image
                  imagePath={AppIcons.ClearAllIcon}
                  altText="Filter Icon"
                />
              </a>
            </div>
          </div>
          <div className="filter-content">
            <div className="bg-filter">
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
                        <Image
                          imagePath={AppIcons.deleteIcon}
                          altText="Delete"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 bg-filter">
              <div className="row ">
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
                      <div className="delete-btn" title="Delete Filter">
                        <Image
                          imagePath={AppIcons.deleteIcon}
                          altText="Delete"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-xxl-5 col-xl-5 col-md-5 col-12 pr-0">
                <div className="add-filter-btn">
                  <Buttons
                    buttonTypeClassName="theme-button"
                    onClick=""
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

export default Filter;
