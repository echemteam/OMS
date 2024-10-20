import ToastService from "../../../../../services/toastService/ToastService";
import PropTypes from 'prop-types';
export const addPhoneNumberData = (data, contactId, listData, setListData, successMessage, maxLengthMessage, duplicateMessage, onResetData, onSuccess) => {
    const phoneCode = data.phoneNumber.phoneCode && typeof data.phoneNumber === "object" ? data.phoneNumber.phoneCode : data.phoneCode;
    const fullPhoneNumber = data.phoneNumber.PhoneNumber && typeof data.phoneNumber === "object" ? data.phoneNumber.PhoneNumber : data.phoneNumber;

    // Add '+' to phoneCode for comparison
    const normalizedPhoneCode = `+${phoneCode}`;

    // Remove phoneCode from phoneNumber if it starts with the normalized phoneCode
    const phoneNumberWithoutCode = fullPhoneNumber.startsWith(normalizedPhoneCode)
        ? fullPhoneNumber.slice(normalizedPhoneCode.length)
        : fullPhoneNumber;
    let request = {
        ...data,
        contactId: contactId,
        id: listData ? listData?.length + 1 : 1,
        phoneCode: normalizedPhoneCode,
        phoneNumber: phoneNumberWithoutCode,
        phoneTypeId: data.phoneTypeId && typeof data.phoneTypeId === "object" ? data.phoneTypeId.value : data.phoneTypeId,
        phoneType: data.phoneTypeId && typeof data.phoneTypeId === "object" ? data.phoneTypeId.label : data.phoneTypeId,
        isPrimary: listData?.length === 0 ? true : data.isPrimaryPhoneNumber,
        extension: data.extension > 0 ? data.extension : '-'
    }
    if (listData && listData.length === 5) {
        ToastService.warning(maxLengthMessage);
        onResetData();
        onSuccess();
        return;
    }

    const isDuplicate = listData?.some(item => item.phoneNumber === request.phoneNumber && item.phoneCode === request.phoneCode);


    if (!isDuplicate) {
        let addData;
        if (listData) {
            addData = [...listData];
            if (data.isPrimaryPhoneNumber) {
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
        } else {
            ToastService.warning("Cannot add more than 5 items.");
        }
    } else {
        ToastService.warning(duplicateMessage);
    }

}

export const updatePhoneNumberData = (data, listData, setListData, successMessage, duplicateMessage, inValidDate, onResetData, onSuccess) => {
    if (listData && data.id > 0) {
        // const phoneCode = data.phoneCode && typeof data.phoneCode === "object" ? data.phoneCode.label : data.phoneCode
        const phoneCode = data.phoneNumber.phoneCode && typeof data.phoneNumber === "object" ? data.phoneNumber.phoneCode : data.phoneCode;
        const fullPhoneNumber = data.phoneNumber.PhoneNumber && typeof data.phoneNumber === "object" ? data.phoneNumber.PhoneNumber : data.phoneNumber;

        // Add '+' to phoneCode for comparison
        const normalizedPhoneCode = `+${phoneCode}`;

        // Remove phoneCode from phoneNumber if it starts with the normalized phoneCode
        const phoneNumberWithoutCode = fullPhoneNumber.startsWith(normalizedPhoneCode) ? fullPhoneNumber.slice(normalizedPhoneCode.length) : fullPhoneNumber;
        const phoneTypeId = data.phoneTypeId && typeof data.phoneTypeId === "object" ? data.phoneTypeId.value : data.phoneTypeId
        const phoneType = data.phoneTypeId.label ? data.phoneTypeId.label : data.phoneType
        const isPrimary = data.isPrimaryPhoneNumber

        const isDuplicate = listData.some(item => item.phoneNumber === data.phoneNumber && item.phoneCode === phoneCode && item.id !== data.id);
        if (!isDuplicate) {
            let updatedData = listData.map(item => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        phoneCode: phoneCode,
                        phoneTypeId: phoneTypeId,
                        phoneType: phoneType,
                        phoneNumber: phoneNumberWithoutCode,
                        // extension: data.extension ? data.extension : 0,
                        extension: data.extension > 0 ? data.extension : '-',
                        isPrimary: isPrimary
                    };
                } else if (isPrimary) {
                    const phoneCode = item.phoneNumber.phoneCode && typeof item.phoneNumber === "object" ? item.phoneNumber.phoneCode : item.phoneCode;
                    const fullPhoneNumber = item.phoneNumber.PhoneNumber && typeof item.phoneNumber === "object" ? item.phoneNumber.PhoneNumber : item.phoneNumber;
                    const phoneNumberWithoutCode = fullPhoneNumber.startsWith(normalizedPhoneCode) ? fullPhoneNumber.slice(normalizedPhoneCode.length) : fullPhoneNumber;
                    return {
                        ...item,
                        phoneCode: phoneCode,
                        phoneNumber: phoneNumberWithoutCode,
                        isPrimary: false
                    };
                } else {
                    const phoneCode = item.phoneNumber.phoneCode && typeof item.phoneNumber === "object" ? item.phoneNumber.phoneCode : item.phoneCode;
                    const fullPhoneNumber = item.phoneNumber.PhoneNumber && typeof item.phoneNumber === "object" ? item.phoneNumber.PhoneNumber : item.phoneNumber;
                    const phoneNumberWithoutCode = fullPhoneNumber.startsWith(normalizedPhoneCode) ? fullPhoneNumber.slice(normalizedPhoneCode.length) : fullPhoneNumber;
                    return {
                        ...item,
                        phoneCode: phoneCode,
                        phoneNumber: phoneNumberWithoutCode,
                    }
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
        onResetData?.();
        onSuccess?.();
    }
}


addPhoneNumberData.propTypes = {
    data: PropTypes.shape({
        phoneCode: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        phoneTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        phoneType: PropTypes.string,
        isPrimaryPhoneNumber: PropTypes.bool,
        extension: PropTypes.number,
        phoneNumber: PropTypes.string.isRequired
    }).isRequired,
    contactId: PropTypes.number.isRequired,
    listData: PropTypes.arrayOf(PropTypes.shape({
        phoneNumber: PropTypes.string.isRequired,
        phoneCode: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        phoneTypeId: PropTypes.string,
        phoneType: PropTypes.string,
        isPrimary: PropTypes.bool,
        extension: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })),
    setListData: PropTypes.func.isRequired,
    successMessage: PropTypes.string.isRequired,
    maxLengthMessage: PropTypes.string.isRequired,
    duplicateMessage: PropTypes.string.isRequired,
    onResetData: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
};
updatePhoneNumberData.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        phoneCode: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        phoneTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        phoneType: PropTypes.string,
        isPrimaryPhoneNumber: PropTypes.bool,
        extension: PropTypes.number,
        phoneNumber: PropTypes.string.isRequired
    }).isRequired,
    listData: PropTypes.arrayOf(PropTypes.shape({
        phoneNumber: PropTypes.string.isRequired,
        phoneCode: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        phoneTypeId: PropTypes.string,
        phoneType: PropTypes.string,
        isPrimary: PropTypes.bool,
        extension: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })),
    setListData: PropTypes.func.isRequired,
    successMessage: PropTypes.string.isRequired,
    duplicateMessage: PropTypes.string.isRequired,
    inValidDate: PropTypes.string.isRequired,
    onResetData: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
};