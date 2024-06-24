import { FileTypeIcons } from "../../pages/customerDetail/features/documentsDetail/config/DocumentsData";

export const contactTransformData = (data) => {
    return data.reduce((acc, item) => {
        const { type, firstName, lastName, emailAddressLst, contactId, contactTypeId, customerContactId, phoneNumberLsit } = item;

        const modifyPhoneNumberList = phoneNumberLsit.map((item, index) => ({
            ...item,
            id: index + 1
        }));
        const modifyEmailAddressLst = emailAddressLst.map((item, index) => ({
            ...item,
            id: index + 1
        }));

        const emailAddress = emailAddressLst.map(item => item.emailAddress).join(',');
        const phoneNumber = phoneNumberLsit.map(item => item.phoneNumber).join(',');
        const transformedItem = {
            cardInformation: {
                firstName,
                lastName,
                contactId,
                contactTypeId,
                customerContactId,
                emailAddress,
                phoneNumber
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
