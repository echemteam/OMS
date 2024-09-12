import React, { useEffect, useRef, useState } from "react";
import "./Shorting.scss";
import Buttons from "../ui/button/Buttons";
import Checkbox from "../ui/inputs/checkBox/CheckBox";
import RadioButton from "../ui/inputs/radioButton/RadioButton";

const options = [
  { label: "Newest", value: "Newest" },
  { label: "Oldest", value: "Oldest" },
];

const Shorting = (props) => {

  const dropdownRef = useRef(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedOrderBy, setSelectedOrderBy] = useState("Newest");
  const [checkboxes, setCheckboxes] = useState(props.filtersOptions);

  const handleRadioChange = (event) => {
    setSelectedOrderBy(event.target.value);
    if (props.selectedSortOrder) {
      props.selectedSortOrder(event.target.value);
    }
  };

  const handleCheckboxChange = (value) => {
    let newCheckboxes;

    if (value === 0) {
      const allSelected = checkboxes.every(option => option.isChecked);
      newCheckboxes = checkboxes.map(option => ({
        ...option,
        isChecked: !allSelected
      }));
    } else {
      newCheckboxes = checkboxes.map(option =>
        option.value === value ? { ...option, isChecked: !option.isChecked } : option
      );
      const allSelected = newCheckboxes.every(option => option.value === 0 || option.isChecked);
      newCheckboxes = newCheckboxes.map(option =>
        option.value === 0 ? { ...option, isChecked: allSelected } : option
      );
    }

    setCheckboxes(newCheckboxes);

    if (props.selectedFilterOptions) {
      // Collect selected values to pass to the parent component
      const selectedValues = newCheckboxes.filter(option => option.isChecked && option.value !== 0).map(option => option.value);
      props.selectedFilterOptions(selectedValues);
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (props.filtersOptions) {
      setCheckboxes(props.filtersOptions);
    }
  }, [props.filtersOptions]);

  // Detect clicks outside of the dropdown to remove active class
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click happened outside of the dropdownRef component
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownActive(false); // Remove active class if clicked outside
      }
    };
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="shorting-section">
        <Buttons onClick={toggleDropdown} isIcon={true} iconClass="line-md:filter" />
        <div ref={dropdownRef} className={`shorting-desc-list ${isDropdownActive ? "active" : ""}`}>
          <div className="short-types">
            <div className="shorting-title">Order By</div>
            <div className="shorting-inputs">
              <div className="radio">
                <RadioButton
                  options={options}
                  name={"Sorting-Filter"}
                  selectedOption={selectedOrderBy}
                  checked={selectedOrderBy}
                  onChange={handleRadioChange}
                />
              </div>
            </div>
            <div className="shorting-title">Filters By</div>
            <div className="shorting-inputs">
              <div className="checkbox">
                {checkboxes && checkboxes.map((option, index) => (
                  <div className="input-checkbox">
                    <Checkbox
                      key={index}
                      name={option.label}
                      checked={option.isChecked}
                      label={option.label}
                      onChange={() => handleCheckboxChange(option.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shorting;
