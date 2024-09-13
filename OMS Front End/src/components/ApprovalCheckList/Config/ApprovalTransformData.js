export const transformData = (data) => {
    return data ? data.map((item) => ({
        id: item.checklistId,
        title: item.checklistName,
        isMainCheckBox: true,
        isMainChecked: false,
        checkListRequest: item.checkListItem && item.checkListItem.map((childItem) => ({
            checklistItemId: childItem.checklistItemId,
            title: childItem.itemDescription,
            isApproved: false
        }))
    })) : []
};

export const customerApprovalCheckList = [
    { name: "basicInformation", isCheked: false },
    { name: "addressInformation", isCheked: false },
    { name: "contactInformation", isCheked: false },
    { name: "settingInformation", isCheked: false }
]

export const subCustomerApprovalCheckList = [
    { name: "addressInformation", isCheked: false }
]

export const supplierApprovalCheckList = [
    { name: "basicInformation", isCheked: false },
    { name: "addressInformation", isCheked: false },
    { name: "contactInformation", isCheked: false }
]