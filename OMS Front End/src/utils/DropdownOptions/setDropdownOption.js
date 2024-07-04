export const setDropdownOption = (formFields, setState, fieldId, disabled) => {
    const getData = formFields.filter(x => x.isForCustomers).map((item) => ({
        value: item.contactTypeId,
        label: item.type,
    }));
    const dropdownField = formFields.formFields.find((item) => item.dataField === "contactTypeId");
    dropdownField.fieldSetting.options = getData;
}