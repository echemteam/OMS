import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import FormCreator from "../Forms/FormCreator";
import Buttons from "../ui/button/Buttons";
import { UploadFilesInfo } from "./UploadFile.Data";


const initState = {
    File: ""
};

const UploadFiles = ({ uploadFilesTypeId, handleToggleModal }) => {

    const ref = useRef();
    const [formData, setFormData] = useState();
    const [uploadFilesInfo, setUploadFilesInfo] = useState();
    const [uploadResumeCandidateForm, setUploadResumeCandidateForm] = useState();

    useEffect(() => {
        const getFileInfo = UploadFilesInfo.find(data => data.id === uploadFilesTypeId);
        // setFormData();
        setFormData(getFileInfo.formFields);
        setUploadFilesInfo(getFileInfo);
    }, []);

    const handleSave = () => {
        const data = ref.current.getFormData();
        if (data && uploadFilesInfo) {
            const requestData = {
                ...Object.keys(uploadFilesInfo.requestName).reduce((acc, key) => {
                    acc[key] = data[uploadFilesInfo.requestName[key]];
                    return acc;
                }, {}),
                storagePath: uploadFilesInfo.storagePath || "Document"
            };
        }
    };

    return (
        <div className="row">
            {formData &&
                <FormCreator config={formData} ref={ref} {...formData} />}
            <div className="col-md-12 mt-2">
                <div className="d-flex align-item-end justify-content-end">
                    <div className="d-flex align-item-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText="Add"
                            onClick={handleSave}
                        // isLoading={EmailLoading || updateUserLoading}
                        />
                        <Buttons
                            buttonTypeClassName="dark-btn ml-5"
                            buttonText="Cancel"
                            onClick={handleToggleModal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

UploadFiles.propTypes = {
    uploadFilesTypeId: PropTypes.number.isRequired,
    handleToggleModal: PropTypes.func.isRequired,
};
export default UploadFiles;
