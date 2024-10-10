import React, { lazy, useEffect, useRef, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../../../data/appIcons";
import CustomerDetailsModel from "./feature/CustomerDetailsModel";
import formatDate from "../../../../../components/FinalMolGrid/libs/formatDate";
import { useLazyDownloadDocumentQuery } from "../../../../../app/services/orderAPI";
import ToastService from "../../../../../services/toastService/ToastService";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import FileViewer from "react-file-viewer";

const UpdateOrderDetails = lazy(() => import("./feature/UpdateOrderDetails"))

const OrderSummary = ({ orderId, orderDetails, onRefreshOrderDetails, isOrderDetailsFetch }) => {

  const orderDetailRef = useRef();
  const [getFileType, setGetFileType] = useState([]);
  const [isModelOpenPDF, setIsModelOpenPDF] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [ordersummaryDetails, setOrderSummaryDetails] = useState(null);

  const [
    Downalod,
    {
      isFetching: isDownalodFetching,
      isSuccess: isDownalodSucess,
      data: isDownalodData,
    },
  ] = useLazyDownloadDocumentQuery();

  const handleToggleModalPDF = () => {
    if (orderDetails?.poNumber) {
      // const documentNames = orderDetails.orderDocumentList?.filter(doc => doc.documentName).map(doc => doc.documentName)[0];
      const details = orderDetails.orderDocumentList?.find(
        (doc) => doc.documentTypeId === 0 || doc.documentTypeId === ""
      );
      if (details) {
        handleDocumentAction(details?.documentName);
      } else {
        ToastService.error("File not found");
      }
    } else {
      setIsModelOpenPDF(false);
    }
  };

  const onSidebarClosePDF = () => {
    setIsModelOpenPDF(false);
    setSelectedDocument(null);
  };

  useEffect(() => {
    if (orderDetails) {
      setOrderSummaryDetails(orderDetails);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (!isDownalodFetching && isDownalodSucess && isDownalodData) {
      const fileData = isDownalodData.fileData;
      const blob = new Blob([fileData], { type: fileData.type });
      const fileURL = URL.createObjectURL(blob);
      setSelectedDocument(fileURL);
      setIsModelOpenPDF(true);
      setGetFileType(determineFileType(isDownalodData.fileName));
    }
  }, [isDownalodFetching, isDownalodSucess, isDownalodData]);

  const handleDocumentAction = (fileName) => {
    setSelectedDocument(null);
    let request = {
      folderName: "Order",
      keyId: orderDetails?.orderId,
      fileName: fileName,
    };

    Downalod(request);
  };

  const determineFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return "pdf";
      case "docx":
        return "docx";
      case "ppt":
      case "pptx":
        return "pptx";
      case "xlsx":
        return "xlsx";
      case "csv":
        return "csv";
      case "xls":
        return "xls";
      case "doc":
        return "doc";
      default:
        return null;
    }
  };

  const handleEdit = () => {
    if (orderDetailRef) {
      orderDetailRef.current.handleToggleModal();
    }
  }

  return (
    <div className="icon-btn-header">
      <CardSection
        cardTitle="Order Summary"
        rightButton={true}
        buttonClassName="theme-button"
        isIcon={true}
        iconClass="wpf:edit"
        titleButtonClick={handleEdit}
        isCenterTile={true}
        CenterTitleTxt={ordersummaryDetails?.poNumber}
        CenterBtnIcon="icomoon-free:file-pdf"
        centerBtnTitle="Purchase Order Details"
        centerBtnOnClick={handleToggleModalPDF}
      >
        {(!isOrderDetailsFetch && orderDetails) ? (
          <div className="order-summery-list">
            <div className="row">
              <div className="col-xxl-7 col-xl-6 col-lg-6 col-md-6 col-12 custom-col-6">
                <div className="desc-section">
                  <div className="key-icon-part">
                    <Iconify icon="ph:user" className="open-bar" />
                    <span>Cust.</span>
                  </div>
                  <div className="desc-detail">
                    {/* &nbsp;:&nbsp;<span>Arcus Bioscience Inc.</span> */}
                    &nbsp;:&nbsp;
                    <span className="name-ellipsis">
                      {ordersummaryDetails?.customerName || "---"}
                    </span>
                    <div className="info-icon info-user">
                      <Iconify icon="ep:info-filled" className="info" />
                      {/* Customer Detail Model Start */}
                      <CustomerDetailsModel
                        customerId={orderDetails?.customerId}
                      />
                      {/* Customer Detail Model End */}
                    </div>
                  </div>
                </div>
                <div className="desc-section">
                  <div className="key-icon-part">
                    <Iconify icon="ph:users" className="open-bar" />
                    <span>Sub-Cust.</span>
                  </div>
                  <div className="desc-detail">
                    {/* &nbsp;:&nbsp;<span>Exelixis Inc.</span> */}
                    &nbsp;:&nbsp;
                    <span className="name-ellipsis">
                      {ordersummaryDetails?.subCustomerName || "N/A"}
                    </span>
                    {ordersummaryDetails?.subCustomerId ? (
                      <div className="info-icon info-user">
                        <Iconify icon="ep:info-filled" className="info" />
                        {/* Customer Detail Model Start */}
                        <CustomerDetailsModel />
                        {/* Customer Detail Model End */}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="desc-section">
                  <div className="key-icon-part">
                    <Iconify
                      icon="material-symbols:quick-reference-outline-rounded"
                      className="open-bar"
                    />
                    <span>Ref. No</span>
                  </div>
                  <div className="desc-detail">
                    {/* &nbsp;:&nbsp;<span>123-654</span> */}
                    &nbsp;:&nbsp;
                    <span>{ordersummaryDetails?.referenceNumber || "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-6 col-12 custom-col-6">
                <div className="desc-section right-status-sec">
                  <div className="key-icon-part">
                    <Iconify icon="f7:status" className="open-bar" />
                    <span>Sub-Status</span>
                  </div>
                  <div className="desc-detail">
                    &nbsp;:&nbsp;
                    {/* <span className="status in-transit">In Transit</span> */}
                    <span className="status in-transit">
                      {ordersummaryDetails?.subStatus}
                    </span>
                  </div>
                </div>
                <div className="desc-section right-status-sec">
                  <div className="key-icon-part">
                    <Iconify icon="uil:calender" className="open-bar" />
                    <span>Recv. Date</span>
                  </div>
                  <div className="desc-detail">
                    {/* &nbsp;:&nbsp;<span>26 Oct 2024</span> */}
                    &nbsp;:&nbsp;
                    <span>
                      {formatDate(
                        ordersummaryDetails?.orderReceivedDate,
                        "MM/DD/YYYY"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <DataLoader />
        )}
      </CardSection>
      <SidebarModel
        modalTitle="PO PDF"
        contentClass="content-50"
        onClose={onSidebarClosePDF}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpenPDF}
        showToggle={true}
      >
        <div className="model-height-fix doc-view">
          {selectedDocument && getFileType ? (
            getFileType === "pdf" ? (
              <div className="pdf-iframe">
                <iframe
                  src={selectedDocument}
                  title="PDF Preview"
                  style={{ width: "100%", height: "200%" }}
                />
              </div>
            ) : (
              <FileViewer
                fileType={getFileType}
                filePath={selectedDocument}
                onError={(error) => console.error("Error:", error)}
              />
            )
          ) : null}
        </div>
      </SidebarModel>
      <UpdateOrderDetails orderId={orderId} orderDetailRef={orderDetailRef} onRefreshOrderDetails={onRefreshOrderDetails} />
    </div>
  );
};

export default OrderSummary;
