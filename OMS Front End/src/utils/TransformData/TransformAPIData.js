import formatDate from "../../lib/formatDate";
import { FileTypeIcons } from "../../pages/customerDetail/features/documentsDetail/config/DocumentsData";

export const contactCustomerTransformData = (data) => {
    return data.reduce((acc, item) => {
        const { type, firstName, lastName, emailAddressLst, contactId, contactTypeId, customerContactId, phoneNumberLsit, isPrimary } = item;

        const emailAddress = emailAddressLst.map((item) => ({
            emailAddres: item.emailAddress,
            isPrimary: item.isPrimary
        }));
        const phoneNumber = phoneNumberLsit.map(item => ({
            phoneTypeId: item.phoneTypeId,
            isPrimary: item.isPrimary,
            phoneCode: item.phoneCode,
            extension: item.extension,
            phoneNumber: item.phoneNumber
        }));
        const transformedItem = {
            cardInformation: {
                firstName,
                lastName,
                contactId,
                contactTypeId,
                customerContactId,
                emailAddress,
                phoneNumber,
                isPrimary
            }
        };

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(transformedItem);
        return acc;
    }, {});
};

export const contactSupplierTransformData = (data) => {
    return data.reduce((acc, item) => {
        const { type, firstName, lastName, emailAddressLst, contactId, contactTypeId, supplierContactId, phoneNumberLsit, isPrimary } = item;

        const modifyPhoneNumberList = phoneNumberLsit.map((item, index) => ({
            ...item,
            id: index + 1
        }));
        const modifyEmailAddressLst = emailAddressLst.map((item, index) => ({
            ...item,
            id: index + 1
        }));
        const emailAddress = emailAddressLst.map((item) => ({
            emailAddres: item.emailAddress,
            isPrimary: item.isPrimary
        }));
        const phoneNumber = phoneNumberLsit.map(item => ({
            phoneTypeId: item.phoneTypeId,
            isPrimary: item.isPrimary,
            phoneCode: item.phoneCode,
            extension: item.extension,
            phoneNumber: item.phoneNumber
        }));
        const transformedItem = {
            cardInformation: {
                firstName,
                lastName,
                contactId,
                contactTypeId,
                supplierContactId,
                emailAddress,
                phoneNumber,
                isPrimary
            },
            emailAddressLst: modifyEmailAddressLst,
            phoneNumberLsit: modifyPhoneNumberList
        };

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(transformedItem);
        return acc;
    }, {});
};

export const modifyPhoneNumberData = (phoneDataArray) => {
    const newArray = phoneDataArray.map(phoneData => ({
        ...phoneData,
        extension: phoneData.extension === '-' ? 0 : phoneData.extension
    }));
    return newArray;
};

export const modifyTimeLineData = (timelineData) => {
    const newArray = timelineData.map(data => ({
        ...data,
        description: data.description + ' by ' + data.name + ' on ' + formatDate(data.changedAt, 'DD/MM/YYYY hh:mm A')
    }));
    return newArray;
};

const getFileTypeIcon = (filename) => {
    const parts = filename.split('.');
    const fileType = parts.length > 1 ? parts[parts.length - 1] : '';
    return getIconForFileType(fileType);
};

const getIconForFileType = (fileType) => {
    const fileTypeIcon = FileTypeIcons.find(icon => icon.type === fileType);
    return fileTypeIcon ? fileTypeIcon.icon : null;
};

export const documentTransformData = (data) => {
    return data.reduce((acc, item) => {
        const { type, attachment, customerDocumentId, customerId, documentTypeId, name } = item;

        // Extract the file type and get the file icon basde on the file type  
        const documentIcon = getFileTypeIcon(attachment);

        const transformedItem = {
            attachment,
            customerDocumentId,
            customerId,
            documentTypeId,
            name,
            documentIcon
        };

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(transformedItem);
        return acc;
    }, {});
};

export const supplierDocumentTransformData = (data) => {
    return data.reduce((acc, item) => {
        const { type, attachment, supplierDocumentId, supplierId, documentTypeId, name } = item;

        // Extract the file type and get the file icon basde on the file type  
        const documentIcon = getFileTypeIcon(attachment);

        const transformedItem = {
            attachment,
            supplierDocumentId,
            supplierId,
            documentTypeId,
            name,
            documentIcon
        };

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(transformedItem);
        return acc;
    }, {});
};