import React from "react";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../image/Image";
import "./Pagination.scss";

const Pagination = () => {
  return (
    <>
      <div className="table-pagination">
        <div className="table-title">
          <p>Page 1 of 1.</p>
        </div>
        <div className="gap-2 pagination">
          <button title="Previous">
            {/* <Image
              imagePath={AppIcons.arrowIcon}
              imgCustomClassName="left-arrow"
              altText="Arrow Icon"
            /> */}
            <Iconify
              imgCustomClassName="left-icon"
              icon="solar:alt-arrow-down-outline"
            />
          </button>
          <button className="active-button">1</button>
          <button title="Next">
            <Iconify
              imgCustomClassName="right-icon"
              icon="solar:alt-arrow-down-outline"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
