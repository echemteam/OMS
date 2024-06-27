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