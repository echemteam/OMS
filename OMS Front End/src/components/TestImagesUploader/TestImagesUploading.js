import React, { forwardRef, useRef, useState } from "react";
import FormCreator from "../Forms/FormCreator";
import Buttons from "../ui/button/Buttons";
import { imagesUploadData } from "./imagesUpload.Data";

const TestImagesUploading = forwardRef(() => {

    const ref = useRef();

    return (
        <div>
            <div className="row add-documentForm">
                <FormCreator config={imagesUploadData} ref={ref} {...imagesUploadData} />
                <div className="col-md-12 mt-2">
                    <div className="d-flex align-item-end justify-content-end">
                        <div className="d-flex align-item-end">
                            <Buttons
                                buttonTypeClassName="theme-button"
                                buttonText="Add" />
                            <Buttons
                                buttonTypeClassName="dark-btn ml-5"
                                buttonText="Cancel" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default TestImagesUploading;