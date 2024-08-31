import formatDate from "../../lib/formatDate";
import { FileTypeIcons } from "../../common/features/component/Document/Config/DocuementsData";

export const modifyContactType = (apiResponseData) => {
    const allType = {
        id: 0,
        type: 'All', // It's used for all the types
        isForSuppliers: true,
        isForCustomers: true,
        contactTypeId: ""
    };
    return [allType, ...apiResponseData];
}

export const modifyAddressType = (apiResponseData) => {
    const allType = {
        id: 0,
        type: 'All', // It's used for all the types
        isForSuppliers: true,
        isForCustomers: true,
        addressTypeId: ""
    };
    return [allType, ...apiResponseData];
}

export const modifyPhoneNumberData = (phoneDataArray) => {
    const isSingleItem = phoneDataArray.length === 1;
    const newArray = phoneDataArray.map(phoneData => ({
        ...phoneData,
        extension: phoneData.extension === '-' ? 0 : phoneData.extension,
        isPrimary: isSingleItem ? true : phoneData.isPrimary
    }));
    return newArray;
};

export const modifyEmailAddressData = (emailDataArray) => {
    const isSingleItem = emailDataArray.length === 1;
    const newArray = emailDataArray.map(emailData => ({
        ...emailData,
        isPrimary: isSingleItem ? true : emailData.isPrimary
    }));
    return newArray;
};

export const modifyTimeLineData = (timelineData) => {
    const newArray = timelineData.map(data => ({
        ...data,
        description: data.description + ' by ' + data.name + ' on ' + formatDate(data.changedAt, 'MM/DD/YYYY hh:mm A')
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
        const { type, attachment, customerDocumentId, customerId, documentTypeId, name , createdAt} = item;

        // Extract the file type and get the file icon basde on the file type  
        const documentIcon = getFileTypeIcon(attachment);

        const transformedItem = {
            attachment,
            customerDocumentId,
            customerId,
            documentTypeId,
            name,
            documentIcon,
            createdAt
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
        const { type, attachment, supplierDocumentId, supplierId, documentTypeId, name , createdAt} = item;

        // Extract the file type and get the file icon basde on the file type  
        const documentIcon = getFileTypeIcon(attachment);

        const transformedItem = {
            attachment,
            supplierDocumentId,
            supplierId,
            documentTypeId,
            name,
            documentIcon,
            createdAt
        };

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(transformedItem);
        return acc;
    }, {});
};