import React from 'react'

const ThirdPartyApiConfigurationInfoCard = () => {
    return (
        <div className="basic-customer-detail">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="d-flex gap-5 profile-info  justify-content-between col-11">
                    <div className="d-flex col-3 flex-column profile-icon-desc justify-content-center">
                        <div className="d-flex">
                            <div className="profile-icon ">
                                {" "}
                                {"NIsarg"
                                    ? "NIsarg".charAt(0).toUpperCase()
                                    : ""}
                            </div>
                            <h5 className="ml-0">NIsarg</h5>
                        </div>

                        <div className="field-desc col-span-3">
                            <i class="fa fa-envelope"></i>
                            <a
                                className="email-link"
                            >
                                <div className="info-desc">
                                    NIsarg
                                </div>
                            </a>
                        </div>

                        <div className="field-desc ">
                            <i class="fa fa-globe"></i>
                            <div className="info-desc">NIsarg</div>
                        </div>
                    </div>

                    <div className="col-3">

                        <div className="field-desc basic-info-select">
                            <div className="inf-label">Status</div>
                            <b>&nbsp;:&nbsp;</b>
                        </div>


                    </div>

                    {/* second no */}
                    <div className="col-3  separator">
                        <div className="field-desc">
                            <div className="inf-label">Country</div>
                            <b>&nbsp;:&nbsp;</b>
                            <div className="info-desc">NIsarg</div>
                        </div>
                        <div className="field-desc">
                            <div className="inf-label">Territory</div>
                            <b>&nbsp;:&nbsp;</b>
                            <div className="info-desc">NIsarg</div>
                        </div>
                        <div className="field-desc">
                            <div className="inf-label">Supplier Type</div>
                            <b>&nbsp;:&nbsp;</b>
                            <div className="info-desc">NIsarg</div>
                        </div>
                    </div>


                    <div className="col-3">
                        <div className="field-desc">
                            <div className="inf-label">Group Type</div>
                            <b>&nbsp;:&nbsp;</b>
                            <div className="info-desc">NIsarg</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThirdPartyApiConfigurationInfoCard