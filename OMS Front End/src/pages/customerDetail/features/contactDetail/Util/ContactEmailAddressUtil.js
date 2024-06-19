import ToastService from "../../../../../services/toastService/ToastService";

export const deleteData = (mainId, index, deleteAPICall, listData, setListData, messages) => {
    if (mainId) {
        deleteAPICall(mainId);
    } else {
        const filteredData = listData.filter(item => item.id !== index);
        const reindexedData = filteredData.map((item, index) => ({
            ...item,
            id: index + 1
        }));
        setListData(reindexedData);
        ToastService.success(messages);
    }
}

export const addData = (data, contactId, listData, setListData, successMessage, maxLengthMessage, duplicateMessage, onResetData, onSuccess) => {
    let request = {
        ...data,
        contactId: contactId,
        id: listData ? listData?.length + 1 : 1
    }
    let addData;
    if (listData && listData.length === 2) {
        ToastService.warning(maxLengthMessage);
        onResetData();
        onSuccess();
        return;
    }
    const isDuplicate = listData && listData.some(item => item.emailAddress === data.emailAddress);
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

export const updateData = (data, listData, setListData, successMessage, duplicateMessage, inValidDate, onResetData, onSuccess) => {
    if (listData && data.id > 0) {
        const isDuplicate = listData.some((item, idx) => item.emailAddress === data.emailAddress && idx !== data.id);
        if (!isDuplicate) {
            const updatedData = [...listData];
            updatedData[data.id - 1] = {
                ...updatedData[data.id - 1],
                emailAddress: data.emailAddress
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