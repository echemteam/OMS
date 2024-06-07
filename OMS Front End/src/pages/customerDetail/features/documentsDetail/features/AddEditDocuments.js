import React, { useRef } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import Buttons from "../../../../../components/ui/button/Buttons";
import { DocumentFormData } from "../config/DocumentsData";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const AddEditDocuments = () => {
  const documentFormRef = useRef();

  const documents = [
    {
      name: "Itinerary-Trip.pdf",
      type: "Trip Details",
      documentIcon: AppIcons.PdfIcon,
    },
    {
      name: "Itinerary-Trip.doc",
      type: "Trip Details",
      documentIcon: AppIcons.DocIcon,
    },
    {
      name: "Itinerary-Trip.xls",
      type: "Trip Details",
      documentIcon: AppIcons.XlsIcon,
    },
    {
      name: "Itinerary-Trip.ppt",
      type: "Trip Details",
      documentIcon: AppIcons.PptIcon,
    },
    {
      name: "Itinerary-Trip.zip",
      type: "Trip Details",
      documentIcon: AppIcons.ZipIcon,
    },
    {
      name: "Itinerary-Trip.csv",
      type: "Trip Details",
      documentIcon: AppIcons.CsvIcon,
    },
    
  ];

  const handleDownload = (documentName) => {
    console.log(`Downloading ${documentName}`);
    // Add your download logic here
  };

  // Function to handle delete action
  const handleDelete = (documentName) => {
    console.log(`Deleting ${documentName}`);
    // Add your delete logic here
  };

  return (
    <>
      <div className="document-list-sec">
        <div className="document-listing">
          <div className="row">
            {documents.map((doc, index) => (
              <div className="col-md-6 col-12">
                <div key={index} className="documents">
                  <div className="left-icons">
                    <Image imagePath={doc.documentIcon} alt="Document Icon" />
                  </div>
                  <div className="right-desc">
                    <div className="doc-details">
                      <div className="document-name">{doc.name}</div>
                      <div className="document-type">{doc.type}</div>
                    </div>
                    <div className="document-action">
                      <span
                        className="action-icon"
                        onClick={() => handleDownload(doc.name)}
                      >
                        <Image
                          imagePath={AppIcons.DownloadIcon}
                          alt="Download Icon"
                        />
                      </span>
                      <span
                        className="action-icon"
                        onClick={() => handleDelete(doc.name)}
                      >
                        <Image
                          imagePath={AppIcons.deleteIcon}
                          alt="Delete Icon"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row horizontal-form d-none">
        <FormCreator
          ref={documentFormRef}
          {...DocumentFormData}
          // onFormDataUpdate={handleFormDataChange}
        />
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-end justify-content-end">
            <div className="d-flex align-item-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
                // onClick={onHandleUser}
                // isLoading={EmailLoading || updateUserLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                // onClick={onSidebarClose}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditDocuments;
