import React from "react";
import { Accordion } from "react-bootstrap";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";

const OrderItemList = () => {
  return (
    <div>
      <div className="order-item-list">
        <CardSection>
          <div className="order-all-item-view">
            <div className="accordian-title">
              <span>Catalog ID</span>
              <span>Cas Number</span>
              <span>Unit Price</span>
              <span>Pack Size</span>
              <span>Total Price</span>
              <span>Status</span>
            </div>
          </div>
          <div className="accordian-desc">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="header-items">
                    <span>Y-2520</span>
                    <span>19679-75-5</span>
                    <span>1X$20</span>
                    <span>2 x 50MG</span>
                    <span>$ 51.75</span>
                    <span>
                      <div className="status-btn complete-bg">Complete</div>
                    </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                      <div className="key-value-se">
                        <span className="key-sec">Name</span>
                        <span className="value-sec">
                          &nbsp;:&nbsp; 2-amino-3 5-dibromobenzaldehyde
                        </span>
                      </div>
                      <div className="key-value-se">
                        <span className="key-sec">MDL Number </span>
                        <span className="value-sec">
                          &nbsp;:&nbsp; 12002452003584
                        </span>
                      </div>
                      <div className="key-value-se">
                        <span className="key-sec">Shipping Add.</span>
                        <div className="value-right-btn">
                          <span className="value-sec add-value">
                            &nbsp;:&nbsp; 2-amino-3 5-dibromobenzaldehyde
                          </span>
                          <span className="right-btn">
                            <span className="info-btn">
                              <Iconify
                                icon="ep:info-filled"
                                className="swap-icon"
                              />
                            </span>
                            <span className="info-btn tooltip-div">
                              <Iconify
                                icon="icon-park-outline:change"
                                className="swap-icon"
                              />
                              <div className="tooltip-show">
                                <p>Change Address</p>
                              </div>
                              <div className="tooltip-arrow-icon"></div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                      <div className="accordian-right-full-sec">
                        <div className="left-section">
                          <div className="key-value-se">
                            <span className="key-sec">Priority</span>
                            <span className="value-sec">
                              &nbsp;:&nbsp;{" "}
                              <span class="status-btn heigh-bg">High</span>
                            </span>
                          </div>
                          <div className="key-value-se">
                            <span className="key-sec">Req-Date</span>
                            <span className="value-sec">
                              &nbsp;:&nbsp; 10/28/2024
                            </span>
                          </div>
                          <div className="key-value-se">
                            <span className="key-sec">Promise Date</span>
                            <span className="value-sec">
                              &nbsp;:&nbsp; 11/15/2024
                            </span>
                          </div>
                        </div>
                        <div className="right-action-section">
                          <div class="file-actions">
                            <div className="btn-part pdf-view">
                              <Iconify icon="wpf:edit" className="swap-icon" />
                            </div>
                            <div className="btn-part dollar-view">
                              <Iconify
                                icon="mingcute:refund-dollar-line"
                                className="swap-icon"
                              />
                            </div>
                            <div className="btn-part delete-icon">
                              <Iconify icon="mi:delete" className="swap-icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="header-items">
                    <span>Y-2520</span>
                    <span>19679-75-5</span>
                    <span>1X$20</span>
                    <span>2 x 50MG</span>
                    <span>$ 51.75</span>
                    <span>
                      <div className="status-btn pending-bg">Pending</div>
                    </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                      <div className="key-value-se">
                        <span className="key-sec">Name</span>
                        <span className="value-sec">
                          &nbsp;:&nbsp; 2-amino-3 5-dibromobenzaldehyde
                        </span>
                      </div>
                      <div className="key-value-se">
                        <span className="key-sec">MDL Number </span>
                        <span className="value-sec">
                          &nbsp;:&nbsp; 12002452003584
                        </span>
                      </div>
                      <div className="key-value-se">
                        <span className="key-sec">Shipping Add.</span>
                        <div className="value-right-btn">
                          <span className="value-sec add-value">
                            &nbsp;:&nbsp; 2-amino-3 5-dibromobenzaldehyde
                          </span>
                          <span className="right-btn">
                            <span className="info-btn">
                              <Iconify
                                icon="ep:info-filled"
                                className="swap-icon"
                              />
                            </span>
                            <span className="info-btn tooltip-div">
                              <Iconify
                                icon="icon-park-outline:change"
                                className="swap-icon"
                              />
                              <div className="tooltip-show">
                                <p>Change Address</p>
                              </div>
                              <div className="tooltip-arrow-icon"></div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-6 col-lg-6 col-md-6 col-12">
                      <div className="accordian-right-full-sec">
                        <div className="left-section">
                          <div className="key-value-se">
                            <span className="key-sec">Priority</span>
                            <span className="value-sec">
                              &nbsp;:&nbsp;{" "}
                              <span class="status-btn heigh-bg">High</span>
                            </span>
                          </div>
                          <div className="key-value-se">
                            <span className="key-sec">Req-Date</span>
                            <span className="value-sec">
                              &nbsp;:&nbsp; 10/28/2024
                            </span>
                          </div>
                          <div className="key-value-se">
                            <span className="key-sec">Promise Date</span>
                            <span className="value-sec">
                              &nbsp;:&nbsp; 11/15/2024
                            </span>
                          </div>
                        </div>
                        <div className="right-action-section">
                          <div class="file-actions">
                            <div className="btn-part pdf-view">
                              <Iconify icon="wpf:edit" className="swap-icon" />
                            </div>
                            <div className="btn-part dollar-view">
                              <Iconify
                                icon="mingcute:refund-dollar-line"
                                className="swap-icon"
                              />
                            </div>
                            <div className="btn-part delete-icon">
                              <Iconify icon="mi:delete" className="swap-icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </CardSection>
      </div>
    </div>
  );
};

export default OrderItemList;
