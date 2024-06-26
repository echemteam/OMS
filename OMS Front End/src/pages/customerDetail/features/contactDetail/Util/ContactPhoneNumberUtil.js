import ToastService from "../../../../../services/toastService/ToastService";

export const addPhoneNumberData = (data, contactId, listData, setListData, successMessage, maxLengthMessage, duplicateMessage, onResetData, onSuccess) => {
    let request = {
        ...data,
        contactId: contactId,
        id: listData ? listData?.length + 1 : 1,
        phoneCode: data.phoneCode && typeof data.phoneCode === "object" ? data.phoneCode.label : data.phoneCode,
        phoneTypeId: data.phoneTypeId && typeof data.phoneTypeId === "object" ? data.phoneTypeId.value : data.phoneTypeId,
        phoneType: data.phoneTypeId && typeof data.phoneTypeId === "object" ? data.phoneTypeId.label : data.phoneTypeId
        // extension: data.extension > 0 ? data.extension : ''
    }
    let addData;
    if (listData && listData.length === 5) {
        ToastService.warning(maxLengthMessage);
        onResetData();
        onSuccess();
        return;
    }
    const isDuplicate = listData && listData.some(item => item.phoneNumber === request.phoneNumber && item.phoneCode === request.phoneCode);

    if (!isDuplicate) {
        if (listData) {
            addData = [...listData, request];
        } else {
            addData = [request];
        }
        if (addData.length <= 5) {
            setListData(addData);
            ToastService.success(successMessage);
            onResetData();
            onSuccess();
        } else {

        }
    } else {
        ToastService.warning(duplicateMessage);
    }

}

export const updatePhoneNumberData = (data, listData, setListData, successMessage, duplicateMessage, inValidDate, onResetData, onSuccess) => {
    if (listData && data.id > 0) {
        const phoneCode = data.phoneCode && typeof data.phoneCode === "object" ? data.phoneCode.label : data.phoneCode
        const phoneTypeId = data.phoneTypeId && typeof data.phoneTypeId === "object" ? data.phoneTypeId.value : data.phoneTypeId
        const phoneType = data.phoneTypeId.label ? data.phoneTypeId.label : data.phoneType
        const isDuplicate = listData && listData.some(item => item.phoneNumber === data.phoneNumber && item.phoneCode === phoneCode && item.id !== data.id);
        if (!isDuplicate) {
            const updatedData = [...listData];
            updatedData[data.id - 1] = {
                ...updatedData[data.id - 1],
                phoneCode: phoneCode,
                phoneTypeId: phoneTypeId,
                phoneType: phoneType,
                phoneNumber: data.phoneNumber,
                extension: data.extension ? data.extension : 0
            };
            setListData(updatedData);
            ToastService.success(successMessage);
            onResetData();
            onSuccess();
        } else {
            ToastService.warning(duplicateMessage);
        }

    } else {
        ToastService.success(inValidDate);
        onResetData();
        onSuccess();
    }
}