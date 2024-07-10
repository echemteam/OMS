import React from "react";
import SearchBar from "../../../common/features/component/SearchBar";
import Buttons from "../button/Buttons";
import Filter from "../../filter/Filter";
import DropDown from "../dropdown/DropDrown";

function CardSection({
  children,
  cardTitle,
  cardSubTitle,
  rightButton,
  buttonClassName,
  titleButtonClick,
  buttonText,
  buttonTextBack,
  searchInput,
  searchInputName,
  textWithIcon,
  textWithIconBack,
  iconImg,
  iconImgBack,
  handleChange,
  isLoading,
  titleText,
  isFilter,
  filterHeaderTitle,
  // isButtonVisible
  optionsValue,
  handleChangeDropdown,
  searchFilter,
  selectedOptions,
  isMultiSelect,
  isCardSection,
  isdropdownOpen,
  placeholder,
  clearButton,
  clearTitleButtonClick,
  clearButtonText,
  searchTitleButtonClick,
  searchButton,
  searchbuttonText
}) {
  return (
    <div
      className={`card ${cardTitle ? "card-section-left" : ""}${searchInput && rightButton ? "card-section-between" : ""
        }${rightButton ? "card-button-only" : ""}`}
    >
      {(cardTitle || rightButton || searchFilter || searchInput) && (
        <div className="card-top-title-btn">
          {cardTitle && (
            <div className="section-title mr-3">
              <h4>{cardTitle}</h4>
              <p>{cardSubTitle}</p>
            </div>
          )}
          <div className="manage-customer-dropdown">
            <div className="col-md-4">
              {searchInput && (
                <div>
                  <SearchBar
                    searchText={searchInputName}
                    handleChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div className="col-md-4">
              {searchFilter && (
                <div className="ml-2">
                  <DropDown
                    value={selectedOptions}
                    options={optionsValue}
                    isMultiSelect={isMultiSelect}
                    onChange={handleChangeDropdown}
                    isCardSection={isCardSection}
                    isdropdownOpen={isdropdownOpen}
                    placeholder={placeholder}
                  />
                </div>
              )}
            </div>
          </div>
          {
            // isButtonVisible && (

            rightButton && (
              <>
                <div className="btn-right-sec">
                  {/* Button to open the Add Craft modal */}
                  {isFilter ? (
                    <>
                      <Filter
                        headerTitle={filterHeaderTitle}
                        placeholder="Select Filter"
                      />
                    </>
                  ) : (
                    ""
                  )}
                  <Buttons
                    buttonTypeClassName={buttonClassName}
                    onClick={titleButtonClick}
                    buttonText={buttonText}
                    buttonTextBack={buttonTextBack}
                    textWithIcon={textWithIcon}
                    textWithIconBack={textWithIconBack}
                    imagePath={iconImg}
                    imagePathBack={iconImgBack}
                    isLoading={isLoading}
                    titleText={titleText}
                  />
                </div>

              </>
              // )
            )

          }
          {searchButton && (
                  <>
                    <div className="btn-right-sec">
                      {/* Button to open the Add Craft modal */}
                      <Buttons
                        onClick={searchTitleButtonClick}
                        buttonText={searchbuttonText}
                        buttonTypeClassName={buttonClassName}
                      />
                    </div>
                  </>
                )}
                {clearButton && (
                  <>
                    <div className="btn-right-sec">
                      {/* Button to open the Add Craft modal */}
                      <Buttons
                        onClick={clearTitleButtonClick}
                        buttonText={clearButtonText}
                        buttonTypeClassName={buttonClassName}
                      />
                    </div>
                  </>
                )}

        </div>
      )
      }
      <div className="card-body-sec">{children}</div>
    </div >
  );
}

export default CardSection;
