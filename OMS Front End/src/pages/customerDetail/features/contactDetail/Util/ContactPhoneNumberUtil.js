import ToastService from "../../../../../services/toastService/ToastService";

export const addPhoneNumberData = (data, contactId, listData, setListData, successMessage, maxLengthMessage, duplicateMessage, onResetData, onSuccess) => {
    let request = {
        ...data,
        phoneCode: data.phoneCode && typeof data.phoneCode === "object" ? data.phoneCode.label : data.phoneCode,
        contactId: contactId,
        phoneTypeId: 1,
        id: listData ? listData?.length + 1 : 1
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
        const isDuplicate = listData && listData.some(item => item.phoneNumber === data.phoneNumber && item.phoneCode === data.phoneCode);
        if (!isDuplicate) {
            const updatedData = [...listData];
            updatedData[data.id - 1] = {
                ...updatedData[data.id - 1],
                phoneCode: data.phoneCode && typeof data.phoneCode === "object" ? data.phoneCode.label : data.phoneCode,
                phoneNumber: data.phoneNumber
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