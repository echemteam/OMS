import Image from "../../components/image/Image";
import { AppIcons } from "../../data/appIcons";
import "./Unauthorize.scss";

const Unauthorize = () => {
  return (
    <div className="center-content-part">
      <div className="content-desc-section">
        <div className="center-container unauthorized-section">
          <div className="left-text">
            <h4>
            Oops! Unauthorized Access
            </h4>
            {/* <p>You don't have permission to access this page.</p> */}
            <p>
                You are not authorized to access this page.<br></br>Please Contact the administrator for Access.
            </p>
          </div>
          <div className="right-img">
            <Image
              imagePath={AppIcons.unauthorizedImg}
              altText="Vector Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorize;
