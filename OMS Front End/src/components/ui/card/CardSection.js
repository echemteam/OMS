import React from "react";
import SearchBar from "../../../common/features/component/SearchBar";
import Buttons from "../button/Buttons";

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
  isButtonVisible
}) {
  return (
    <div
      className={`card ${cardTitle ? "card-section-left" : ""}${searchInput && rightButton ? "card-section-between" : ""
        }${rightButton ? "card-button-only" : ""}`}
    >
      {(cardTitle || rightButton) && (
        <div className="card-top-title-btn">
          {cardTitle && <div className="section-title">

            <h4>{cardTitle}</h4>
            <p>{cardSubTitle}</p>
          </div>}
          <div className="d-flex">
            {searchInput && (
              <div className="search-input">
                <SearchBar
                  searchText={searchInputName}
                  handleChange={handleChange}
                />
              </div>
            )}
            {
              // isButtonVisible && (

              rightButton && (
                <div className="btn-right-sec">
                  {/* Button to open the Add Craft modal */}
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
                  />
                </div>
                // )
              )
            }
          </div>
        </div>
      )}
      <div className="card-body-sec">{children}</div>
    </div>
  );
}

export default CardSection;
