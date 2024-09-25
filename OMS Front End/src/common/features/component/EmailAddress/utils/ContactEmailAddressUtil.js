import ToastService from "../../../../../services/toastService/ToastService";

export const deleteData = (mainId, index, deleteAPICall, listData, setListData, messages, isEmailDelete) => {
    if (mainId) {
        deleteAPICall(mainId);
        let filteredData;
        if (isEmailDelete) {
            filteredData = listData.filter(item => item.emailId !== mainId);
        } else {
            filteredData = listData.filter(item => item.phoneId !== mainId);
        }
        setListData(filteredData);
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
        isPrimary: listData?.length === 0 ? true : data.isEmailPrimary,
        id: listData ? listData?.length + 1 : 1
    }
    if (listData && listData.length === 2) {
        ToastService.warning(maxLengthMessage);
        onResetData();
        onSuccess();
        return;
    }
    const isDuplicate = listData?.some(item => item.emailAddress.toLowerCase() === data.emailAddress.toLowerCase());
    if (!isDuplicate) {
        let addData;
        if (listData) {
            addData = [...listData];
            if (data.isEmailPrimary) {
                addData = addData.map(item => ({ ...item, isPrimary: false }));
            }
            addData.push(request);
        } else {
            addData = [request];
        }
        if (addData.length <= 5) {
            setListData(addData);
            ToastService.success(successMessage);
            onResetData();
            onSuccess();
        }
    } else {
        ToastService.warning(duplicateMessage);
    }

}

export const updateData = (data, listData, setListData, successMessage, duplicateMessage, inValidDate, onResetData, onSuccess) => {
    if (listData && data.id > 0) {
        const isDuplicate = listData.some((item) => item.emailAddress.toLowerCase() === data.emailAddress.toLowerCase() && item.id !== data.id);
        if (!isDuplicate) {
            let updatedData = listData.map(item => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        emailAddress: data.emailAddress,
                        isPrimary: data.isEmailPrimary,
                    };
                } else if (data.isEmailPrimary) {
                    return {
                        ...item,
                        isPrimary: false,
                    };
                } else {
                    return item;
                }
            });

            setListData(updatedData);
            ToastService.success(successMessage);
            onResetData?.();
            onSuccess?.();
        } else {
            ToastService.warning(duplicateMessage);
        }

    } else {
        ToastService.success(inValidDate);
        onResetData();
        onSuccess();
    }
}