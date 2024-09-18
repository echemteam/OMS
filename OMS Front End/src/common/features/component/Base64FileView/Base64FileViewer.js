/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import FileViewer from "react-file-viewer";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import { useDownloadApprovalRequestDocumentMutation } from "../../../../app/services/documentAPI";
import Image from "../../../../components/image/Image";
import Iconify from "../../../../components/ui/iconify/Iconify";
import formatDate from "../../../../lib/formatDate";
import NoRecordFound from "../../../../components/ui/noRecordFound/NoRecordFound";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import { documentTransformData } from "../../../../utils/TransformData/TransformAPIData";

const Base64FileViewer = forwardRef(({ isLoading, documentData }) => {

    const [getFileType, setGetFileType] = useState([]);
    const [documentList, setDocumentList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
   
    const [Downalod, { isFetching: isDownalodFetching, isSuccess: isDownalodSucess, data: isDownalodData }] = useDownloadApprovalRequestDocumentMutation();

    useEffect(() => {
        if (!isDownalodFetching && isDownalodSucess && isDownalodData) {
      
            const fileData = isDownalodData.fileData;
            const blob = new Blob([fileData], { type: fileData.type });
            const fileURL = URL.createObjectURL(blob);
            setSelectedDocument(fileURL);
            setIsModalOpen(true);
          
        }
    }, [isDownalodFetching, isDownalodSucess, isDownalodData]);

    useEffect(() => {
       
        if (documentData) {
            let parsedData = JSON.parse(documentData);
           
            setDocumentList(parsedData.DocumentInfoList);
            parsedData= documentTransformData(parsedData.DocumentInfoList);
            if (!Array.isArray(parsedData)) {
                parsedData = Object.values(parsedData).flat();
              }
            setDocumentList(parsedData);
           
              // Detect file types
              const detectedFileTypes = new Set();
              parsedData.forEach((item) => {
                const fileType = determineFileType(item.attachment);
                if (["pdf", "csv", "docx", "xlsx"].includes(fileType)) {
                  detectedFileTypes.add(fileType);
                }
              });
      
              setGetFileType(Array.from(detectedFileTypes));
        }
    }, [documentData]);

    const handleDocumentAction = (base64Data, fileName) => { 
      
         const parts = base64Data.split(','); 
    
        let request = {
            base64FileData: parts.length > 1 ? parts[1] : base64Data,
            fileName: fileName
        }
                Downalod(request);
       
    };

    const determineFileType = (fileName) => {
       
                const extension = fileName?.split(".").pop().toLowerCase();
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

    const handleToggleModal = () => {
        setIsModalOpen(false);
        setSelectedDocument(null);
    };

    return (
        <div className="document-list-sec">
            <div className="document-listing">
                <div className="row">
                    {!isLoading ? (
                        documentList.length > 0 ? (
                            documentList.map((data) => (
                                
                                <div className="col-xl-6 col-lg-6 col-md-4 col-6" key={data.customerDocumentId} >
                                    <div className="documents">
                                        <div className="left-icons">
                                            <Image imagePath={data.documentIcon} alt="Document Icon" />
                                        </div>
                                        <div className="right-desc">
                                            <div className="doc-details">
                                                <div className="document-typename">{data.Type}</div>
                                                <div className="document-name">{data.Name}</div>
                                                <div className="document-type">{data.Attachment}</div>
                                                <div className="document-type">
                                                    {formatDate(data.createdAt, "MM/DD/YYYY hh:mm A")}
                                                </div>
                                            </div>
                                            <div className="document-action">
                                                 {["pdf", "csv", "docx", "xlsx"].includes(determineFileType(data.attachment)) && (
                                                <span
                                                    className="action-icon"
                                                    onClick={() => handleDocumentAction(data.Base64File, data.Name)}>
                                                    <Iconify icon="lets-icons:view-light" />
                                                </span>
                                                  )}  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <NoRecordFound />
                        )) : (
                        <DataLoader />
                    )}
                </div>
            </div>
            <SidebarModel
                isOpen={isModalOpen}
                contentClass="content-65"
                modalTitle="File Preview"
                onClose={handleToggleModal}>
                <div className="model-hight-fix">
                    {selectedDocument  && (
                        <FileViewer
                            fileType={getFileType}
                            filePath={selectedDocument}
                            onError={(error) => console.error("Error:", error)}
                        />
                    )}
                </div>
            </SidebarModel>
        </div>
    );
}
);

Base64FileViewer.propTypes = {
    documentData: PropTypes.object.isRequired
};

export default Base64FileViewer;