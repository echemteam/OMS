import React, { useEffect, useRef, useState } from "react";
import Buttons from "../ui/button/Buttons";
import "./Shorting.scss";
import RadioButton from "../ui/inputs/radioButton/RadioButton";
import Checkbox from "../ui/inputs/checkBox/CheckBox";

const options = [
  { label: "Newest", value: "Newest" },
  { label: "Oldest", value: "Oldest" },
];
const checkboxOptions = [
  { label: "Select All", value: "selectAll", checked: false },
  { label: "First", value: "first", checked: false },
  { label: "Second", value: "second", checked: false },
  { label: "Third", value: "third", checked: false },
  { label: "Fourth", value: "fourth", checked: false },
  { label: "Fifth", value: "fifth", checked: false },
];
const Shorting = (props) => {
  const [selectedOrderBy, setSelectedOrderBy] = useState("Newest");
  const [checkboxes, setCheckboxes] = useState(checkboxOptions);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef(null);
  const handleRadioChange = (event) => {
    setSelectedOrderBy(event.target.value);
    if (props.selectedSortOrder) {
      props.selectedSortOrder(event.target.value);
    }
  };
  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);
  };
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownActive((prevState) => !prevState);
  };

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
                {checkboxes.map((checkbox, index) => (
                  <div className="input-checkbox">
                    <Checkbox
                      key={index}
                      checked={checkbox.checked}
                      label={checkbox.label}
                      onChange={() => handleCheckboxChange(index)}
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
