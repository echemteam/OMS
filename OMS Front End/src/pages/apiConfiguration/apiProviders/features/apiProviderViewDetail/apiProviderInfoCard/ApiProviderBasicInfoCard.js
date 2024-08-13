import Image from "../../../../../../components/image/Image";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import { AppIcons } from "../../../../../../data/appIcons";
import PropTypes from "prop-types";
 const ApiProviderBasicInfoCard = ({providerFormData,editClick}) => {
  return (     
       <div className="basic-customer-detail">
      <div className="col-xl-12 col-lg-12 col-md-12 col-12">
        <div className="d-flex gap-5 profile-info  justify-content-between col-11">
          <div className="d-flex col-3 flex-column profile-icon-desc justify-content-center">
            <div className="d-flex">
              <div className="profile-icon ">
                {" "}
                {providerFormData?.name
                  ? providerFormData?.name.charAt(0).toUpperCase()
                  : ""}
              </div>
              <h5 className="ml-0">{providerFormData?.name}</h5>
            </div>
          </div>
          <div className="col-4 ">
            <div className="field-desc">
              <div className="inf-label">Base URL </div>
              <b>&nbsp;:&nbsp;</b>
              <div className="info-desc">{providerFormData?.baseURL}</div>
            </div>
        
          </div>
          <div className="col-3  ">
            <div className="field-desc">
              <div className="inf-label">Authentication</div>
              <b>&nbsp;&nbsp;&nbsp;:&nbsp;</b>
              <div className="info-desc">{providerFormData?.authenticationType}</div>
            </div>
        
          </div>
        </div>
        <div className="edit-icons"
         onClick={editClick}
        >
          {/* <Image imagePath={AppIcons.editThemeIcon} altText="Website Icon" /> */}
          <Iconify icon="tabler:pencil" />
        </div>     
      </div>
    </div>
        
    )
}

ApiProviderBasicInfoCard.propTypes = {
  providerFormData: PropTypes.shape({
    name: PropTypes.string,
    baseURL: PropTypes.string,
    authenticationType: PropTypes.string,
  }),
  editClick: PropTypes.func.isRequired,
};
export default ApiProviderBasicInfoCard;