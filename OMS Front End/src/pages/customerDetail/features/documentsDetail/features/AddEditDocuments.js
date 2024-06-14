import React, { useRef } from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const AddEditDocuments = () => {

  const documents = [
    {
      name: "Itinerary-Trip.pdf",
      type: "Trip Details",
      documentType:" Registration Document",
      documentIcon: AppIcons.PdfIcon,
    },
    {
      name: "Itinerary-Trip.doc",
      type: "Trip Details",
      documentType:" Customer Detail Form",
      documentIcon: AppIcons.DocIcon,
    },
    {
      name: "Itinerary-Trip.xls",
      type: "Trip Details",
      documentType:"Our Submitted Form",
      documentIcon: AppIcons.XlsIcon,
    },
    {
      name: "Itinerary-Trip.ppt",
      type: "Trip Details",
      documentType:" Registration Document",
      documentIcon: AppIcons.PptIcon,
    },
    {
      name: "Itinerary-Trip.zip",
      type: "Trip Details",
      documentType:" Customer Detail Form",
      documentIcon: AppIcons.ZipIcon,
    },
    {
      name: "Itinerary-Trip.csv",
      type: "Trip Details",
      documentType:"Our Submitted Form",
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
                    <div className="document-typename">{doc.documentType}</div>
                    <div className="document-type">{doc.type}</div>
                   
                      <div className="document-name">{doc.name}</div>
                    
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
    </>
  );
};

export default AddEditDocuments;
