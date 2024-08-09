export const validateField = (value, validations) => {
    for (let validation of validations) {
        switch (validation.type) {
            case 'required':
                if (value === undefined || value === null || String(value).trim() === '') {
                    return validation.message;
                }
                break;
            case 'minLength':
                if (value.length < validation.value) {
                    return validation.message;
                }
                break;
            case 'maxLength':
                if (value.length > validation.value) {
                    return validation.message;
                }
                break;
            case 'min':
                if (value < validation.value) {
                    return validation.message;
                }
                break;
            // Add more validation types as needed
            default:
                break;
        }
    }
    return null;
}


export const validateColumns = (columns, newRowData) => {
    const newErrors = {};
  
    columns.forEach(col => {
        if (col.allowEditColumn && col.editColumn.editColValidation.length > 0) {
        const error = validateField(newRowData[col.fieldName], col.editColumn.editColValidation);
        if (error) {
          newErrors[col.fieldName] = error;
        }
      }
    });
  
    return newErrors;
  };