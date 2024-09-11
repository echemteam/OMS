import React from "react";
import PropTypes from "prop-types";
import SearchBar from "../../../common/features/component/SearchBar";
import Buttons from "../button/Buttons";
import Filter from "../../filter/Filter";
import DropDown from "../dropdown/DropDrown";
import Shorting from "../../shorting/Shorting";

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
  searchbuttonText,
  clearButtonClassName,
  searchIconImg,
  searchTextWithIcon,
  clearTextWithIcon,
  clearIconImg,
  searchValue,
  multipleButton,
  rightButtonArray,
  isIcon,
  iconClass,
  isShort,
  selectedSortOrder
}) {
  return (
    <div
      className={`card ${cardTitle ? "card-section-left" : ""}${searchInput && rightButton ? "card-section-between" : ""
        }${rightButton ? "card-button-only" : ""}`}
    >
      {(cardTitle || rightButton || searchFilter || searchInput) && (
        <div className="card-top-title-btn responsive-grid-title">
          {cardTitle && (
            <div className="section-title mr-3">
              <h4>{cardTitle}</h4>
              <p>{cardSubTitle}</p>
            </div>
          )}
          <div className="manage-customer-dropdown">
            {searchInput && (
              <div className="col-md-4">
                <div>
                  <SearchBar
                    searchValue={searchValue}
                    searchText={searchInputName}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            )}
            {searchFilter && (
              <div className="col-md-4">
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
              </div>
            )}
            {searchButton && (
              <>
                <div className="btn-right-sec">
                  {/* Button to open the Add Craft modal */}
                  <Buttons
                    onClick={searchTitleButtonClick}
                    buttonText={searchbuttonText}
                    buttonTypeClassName={buttonClassName}
                    textWithIcon={searchTextWithIcon}
                    imagePath={searchIconImg}
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
                    buttonTypeClassName={clearButtonClassName}
                    textWithIcon={clearTextWithIcon}
                    imagePath={clearIconImg}
                  />
                </div>
              </>
            )}
          </div>
          {
            // isButtonVisible &&(
            rightButton && (
              <div className="btn-right-sec">
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
                {isShort ? <>
                  <Shorting selectedSortOrder={selectedSortOrder} />
                </> : null}
                {multipleButton && (
                  <div className="btn-right-sec">
                    {rightButtonArray.map((button, index) => (
                      <Buttons
                        key={index}
                        buttonTypeClassName={button.buttonTypeClassName}
                        onClick={button.onClick}
                        buttonText={button.buttonText}
                        buttonTextBack={buttonTextBack}
                        textWithIcon={button.textWithIcon}
                        textWithIconBack={textWithIconBack}
                        imagePath={button.imagePath}
                        imagePathBack={iconImgBack}
                        isLoading={isLoading}
                        titleText={titleText}
                      />
                    ))}
                  </div>
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
                  isIcon={isIcon}
                  iconClass={iconClass}
                />

              </div>
            )
            // )
          }
        </div>
      )}
      <div className="card-body-sec">{children}</div>
    </div>
  );
}

CardSection.propTypes = {
  children: PropTypes.node.isRequired,
  cardTitle: PropTypes.string,
  cardSubTitle: PropTypes.string,
  rightButton: PropTypes.bool,
  buttonClassName: PropTypes.string,
  titleButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
  buttonTextBack: PropTypes.string,
  searchInput: PropTypes.bool,
  searchInputName: PropTypes.string,
  textWithIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  textWithIconBack: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  iconImg: PropTypes.string,
  iconImgBack: PropTypes.string,
  handleChange: PropTypes.func,
  isLoading: PropTypes.bool,
  titleText: PropTypes.string,
  isFilter: PropTypes.bool,
  filterHeaderTitle: PropTypes.string,
  optionsValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  handleChangeDropdown: PropTypes.func,
  searchFilter: PropTypes.bool,
  selectedOptions: PropTypes.string,
  isMultiSelect: PropTypes.bool,
  isCardSection: PropTypes.bool,
  isdropdownOpen: PropTypes.bool,
  placeholder: PropTypes.string,
  clearButton: PropTypes.bool,
  clearTitleButtonClick: PropTypes.func,
  clearButtonText: PropTypes.string,
  searchTitleButtonClick: PropTypes.func,
  searchButton: PropTypes.bool,
  searchbuttonText: PropTypes.string,
  clearButtonClassName: PropTypes.string,
  searchIconImg: PropTypes.string,
  searchTextWithIcon: PropTypes.bool,
  clearTextWithIcon: PropTypes.bool,
  clearIconImg: PropTypes.string,
  searchValue: PropTypes.string,
  multipleButton: PropTypes.bool,
  rightButtonArray: PropTypes.arrayOf(
    PropTypes.shape({
      buttonTypeClassName: PropTypes.string,
      onClick: PropTypes.func,
      buttonText: PropTypes.string,
      textWithIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      imagePath: PropTypes.string,
    })
  ),
};

export default CardSection;
