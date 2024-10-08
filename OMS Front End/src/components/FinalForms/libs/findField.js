export const findFieldById = (formFields, fieldId) => {
  const searchFields = (fields, id) => {
    for (const field of fields) {
      if (field.id === id) {
        return field;
      } else if (field.row) {
        for (const row of field.row) {
          const found = searchFields(row.fields, id);
          if (found) {
            return found;
          }
        }
      }
    }
    return null;
  };

  return searchFields(formFields, fieldId);
};

export default findFieldById;