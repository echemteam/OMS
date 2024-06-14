import { DocumentFormData } from "../../pages/customerDetail/features/documentsDetail/config/DocumentsData";

export const UploadFilesInfo = [
    {
        id: 1,
        titile: 'Customer Document',
        formFields: DocumentFormData,
        storagePath: '',
        requestName: {
            name: 'name',
            documentTypeId: 'documentTypeId',
            customerId: 'customerId',
            attachment: 'attachment',
            base64File: 'base64File',
            storagePath: 'storagePath'
        }
    }
]

export const UploadFilesType = {
    CUSTOMERDOCUMENT: 1,
}
