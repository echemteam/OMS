import { FileTypeIcons } from "../../pages/customerDetail/features/documentsDetail/config/DocumentsData";

export const contactTransformData = (data) => {
    return data.reduce((acc, item) => {
        const { type, firstName, lastName, emailAddress, contactId, contactTypeId, customerContactId,phoneNumber } = item;

        const transformedItem = {
            cardInformation: {
                firstName,
                lastName,
                emailAddress,
                contactId,
                contactTypeId,
                customerContactId,
                phoneNumber
            },
        };

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(transformedItem);
        return acc;
    }, {});
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