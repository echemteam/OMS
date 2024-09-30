/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
//** Lib's */
import { ErrorMessage } from "../../../../../../data/appMessages";
import { EventName } from "../../../../../../utils/Enums/APIEventEnums";
import DataLoader from "../../../../../../components/ui/dataLoader/DataLoader";
//** Service's */
import ToastService from "../../../../../../services/toastService/ToastService";
import { useThirdPartyAPICallMutation } from "../../../../../../app/services/thirdPartyAPI";
import NoRecordFound from "../../../../../../components/ui/noRecordFound/NoRecordFound";
import { AppIcons } from "../../../../../../data/appIcons";
import Image from "../../../../../../components/image/Image";
import Input from "../../../../../../components/ui/inputs/input/Input";
import GridCheckbox from "../../../../../../components/FinalMolGrid/ui/checkbox/GridCheckbox";

const VerifyProductDetail = ({ productId, onVerifyProductList, setIsVerifyProduct }) => {
    const [productDetail, setProductDetail] = useState({});
    const [tempProductDetail, setTempProductDetail] = useState({});
    const [editingField, setEditingField] = useState(""); // Track which field is being edited

    const [getThirdPartyApiResponse, { isLoading: isApiResponseLoading, isSuccess: isApiResponseSuccess, data: isApiResponseData }] = useThirdPartyAPICallMutation();

    useEffect(() => {
        if (productId) {
            getProductDetailById();
        }
    }, [productId]);

    useEffect(() => {
        // Array of all the checkable conditions
        const checks = [
            tempProductDetail.isChemicalChecked,
            tempProductDetail.isCASNoChecked,
            tempProductDetail.isMDLChecked
        ];
        // Check if all conditions are true using .every()
        if (checks.every(Boolean)) {
            setIsVerifyProduct(true);
        } else {
            setIsVerifyProduct(false);
        }
    }, [setIsVerifyProduct, setTempProductDetail, tempProductDetail]);


    useEffect(() => {
        if (isApiResponseSuccess && isApiResponseData) {
            if (isApiResponseData.isSuccess) {
                const responseData = JSON.parse(isApiResponseData.data);
                let productDetail = responseData?.data;
                setProductDetail(productDetail);
                let request = {
                    ...productDetail,
                    isChemicalChecked: false,
                    isCASNoChecked: false,
                    isMDLChecked: false
                }
                setTempProductDetail(request);
                onVerifyProductList(productDetail);
            } else {
                ToastService.warning(isApiResponseData.message || ErrorMessage.DefaultMessage);
            }
        }
    }, [isApiResponseSuccess, isApiResponseData]);

    const getProductDetailById = () => {
        let dynamicParameters = { productId };
        let request = {
            eventName: EventName.AURUMPRODUCTDETAILS,
            isDynamicParameter: true,
            parameters: JSON.stringify(dynamicParameters),
        };
        getThirdPartyApiResponse(request);
    };

    const handleInputChange = (field, value) => {
        setTempProductDetail(prevDetail => ({
            ...prevDetail,
            [field]: value,
        }));
    };

    const handleCheckboxChange = (dataField, checked) => {
        setTempProductDetail(prevDetail => ({
            ...prevDetail,
            [dataField]: checked,
        }));
    };

    const handleSaveClick = (field) => {
        if (tempProductDetail[field] !== productDetail[field]) {
            setProductDetail(prevDetail => ({
                ...prevDetail,
                [field]: tempProductDetail[field],
            }));
            ToastService.success(`${field} has been updated.`);
        } else {
            ToastService.info(`No changes made to ${field}.`);
        }
        setEditingField(""); // Exit edit mode after saving
    };

    const handleEditClick = (field) => {
        setEditingField(field); // Set the field to be edited
    };

    const handleCancelClick = () => {
        setEditingField("");
    };

    const shouldShowPencilIcon = (field) => {
        // Only show pencil icon if not editing and the checkbox is false
        const checkboxState = field === "ProductName" ? tempProductDetail.isChemicalChecked :
            field === "CASNo" ? tempProductDetail.isCASNoChecked :
                field === "MDLNo" ? tempProductDetail.isMDLChecked :
                    false;
        return editingField !== field && !checkboxState;
    };

    return (
        <div className="verify-product-group">
            <div className="verify-product-label">Verify Product Details</div>
            {!isApiResponseLoading ? (
                productDetail && Object.keys(productDetail).length > 0 ? (
                    <div className="verify-product-details">
                        <div className="detail-row">
                            <span className="detail-label">Catalog ID</span>
                            <span className="detail-value">{productDetail?.CatalogId}</span>
                            <span className="detail-action"></span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Chemical Name</span>
                            <span className="detail-value">
                                {editingField === "ProductName" ? (
                                    <Input
                                        type="text"
                                        name="ProductName"
                                        value={tempProductDetail.ProductName || ""}
                                        onChange={(e) => handleInputChange("ProductName", e.target.value)}
                                        maxLength={100}
                                        isDisable={tempProductDetail.isChecked} // Disable input based on checkbox
                                    />
                                ) : (
                                    tempProductDetail.ProductName || "N/A"
                                )}
                            </span>
                            <span className="detail-action">
                                {editingField === "ProductName" ? (
                                    <>
                                        <button className="edit-button" onClick={() => handleSaveClick("ProductName")}>
                                            <Image imagePath={AppIcons.DoneIcon} altText="Save Icon" />
                                        </button>
                                        <button className="edit-button" onClick={() => handleCancelClick()}>
                                            <Image imagePath={AppIcons.CancelIcon} altText="Cancel Icon" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <GridCheckbox
                                            name="isChemicalChecked"
                                            checked={tempProductDetail.isChemicalChecked || false}
                                            onChange={(dataField, checked) => handleCheckboxChange(dataField, checked)}
                                            dataField="isChemicalChecked"
                                            isStaticCheckBox={true}
                                        />
                                        {console.log('tempProductDetail', tempProductDetail)}
                                        <div className="right-edit-pencil">
                                            {shouldShowPencilIcon("ProductName") && (
                                                <button className="edit-button" onClick={() => handleEditClick("ProductName")}>
                                                    <Image imagePath={AppIcons.PencilIcon} altText="Edit Icon" />
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">CAS Number</span>
                            <span className="detail-value">
                                {editingField === "CASNo" ? (
                                    <Input
                                        type="text"
                                        name="CASNo"
                                        value={tempProductDetail.CASNo || ""}
                                        onChange={(e) => handleInputChange("CASNo", e.target.value)}
                                        maxLength={30}
                                        isDisable={tempProductDetail.isCASChecked} // Disable input based on checkbox
                                    />
                                ) : (
                                    tempProductDetail.CASNo || "N/A"
                                )}
                            </span>
                            <span className="detail-action">
                                {editingField === "CASNo" ? (
                                    <>
                                        <button className="edit-button" onClick={() => handleSaveClick("CASNo")}>
                                            <Image imagePath={AppIcons.DoneIcon} altText="Save Icon" />
                                        </button>
                                        <button className="edit-button" onClick={() => handleCancelClick()}>
                                            <Image imagePath={AppIcons.CancelIcon} altText="Cancel Icon" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <GridCheckbox
                                            name="isCASNoChecked"
                                            checked={tempProductDetail.isCASNoChecked || false}
                                            onChange={(dataField, checked) => handleCheckboxChange(dataField, checked)}
                                            dataField="isCASNoChecked"
                                            isStaticCheckBox={true}
                                        />
                                        <div className="right-edit-pencil">
                                            {shouldShowPencilIcon("CASNo") && (
                                                <button className="edit-button" onClick={() => handleEditClick("CASNo")}>
                                                    <Image imagePath={AppIcons.PencilIcon} altText="Edit Icon" />
                                                </button>
                                            )}
                                        </div>

                                    </>
                                )}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">MDL Number</span>
                            <span className="detail-value">
                                {editingField === "MDLNo" ? (
                                    <Input
                                        type="text"
                                        name="MDLNo"
                                        value={tempProductDetail.MDLNo || ""}
                                        onChange={(e) => handleInputChange("MDLNo", e.target.value)}
                                        maxLength={30}
                                        isDisable={tempProductDetail.isMDLChecked} // Disable input based on checkbox
                                    />
                                ) : (
                                    tempProductDetail.MDLNo || "N/A"
                                )}
                            </span>
                            <span className="detail-action">
                                {editingField === "MDLNo" ? (
                                    <>
                                        <button className="edit-button" onClick={() => handleSaveClick("MDLNo")}>
                                            <Image imagePath={AppIcons.DoneIcon} altText="Save Icon" />
                                        </button>
                                        <button className="edit-button" onClick={() => handleCancelClick()}>
                                            <Image imagePath={AppIcons.CancelIcon} altText="Cancel Icon" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <GridCheckbox
                                            name="isMDLChecked"
                                            checked={tempProductDetail.isMDLChecked || false}
                                            onChange={(dataField, checked) => handleCheckboxChange(dataField, checked)}
                                            dataField="isMDLChecked"
                                            isStaticCheckBox={true}
                                        />
                                        <div className="right-edit-pencil">
                                            {shouldShowPencilIcon("MDLNo") && (
                                                <button className="edit-button" onClick={() => handleEditClick("MDLNo")}>
                                                    <Image imagePath={AppIcons.PencilIcon} altText="Edit Icon" />
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                ) : (
                    <NoRecordFound />
                )
            ) : (
                <DataLoader />
            )}
        </div>
    );
};

export default VerifyProductDetail;
