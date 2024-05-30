import React from "react";
import "./Dashboard.scss";
import Image from "../../components/image/Image";
import { AppIcons } from "../../data/appIcons";

function Dashboard() {
  return (
    <>
      <div className="dashboard-sec">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="card badge-gradient-danger">
              <div className="dashboard-card">
                <Image
                  imgCustomClassName="card-img-absolute"
                  altText="Background Shape"
                  imagePath={AppIcons.CardBgShape}
                />
                <h4 className="font-weight-normal mb-3">
                  Weekly Sales <i className="bi bi-archive float-end"></i>
                </h4>
                <h2 className="mb-5">$ 15,0000</h2>
                <h6 className="card-text">Increased by 60%</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="card badge-gradient-info">
              <div className="dashboard-card">
                <Image
                  imgCustomClassName="card-img-absolute"
                  altText="Background Shape"
                  imagePath={AppIcons.CardBgShape}
                />
                <h4 className="font-weight-normal mb-3">
                  Weekly Orders <i className="bi bi-briefcase float-end"></i>
                </h4>
                <h2 className="mb-5">45,6334</h2>
                <h6 className="card-text">Decreased by 10%</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="card badge-gradient-success">
              <div className="dashboard-card">
                <Image
                  imgCustomClassName="card-img-absolute"
                  altText="Background Shape"
                  imagePath={AppIcons.CardBgShape}
                />
                <h4 className="font-weight-normal mb-3">
                  Weekly Sales <i className="bi bi-bank float-end"></i>
                </h4>
                <h2 className="mb-5">95,5741</h2>
                <h6 className="card-text">Increased by 5%</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-7 col-lg-7 col-md-7">
            <div className="card">
              <div className="card-title">
                <h4>Title Name</h4>
                <p>Lorem Ipsum is simply dummy text</p>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-5">
            <div className="card">
              <div className="card-title">
                <h4>Title Name</h4>
                <p>Lorem Ipsum is simply dummy text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <div className="card-title">
                <h4>Title Name</h4>
                <p>Lorem Ipsum is simply dummy text</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
