import { useEffect, useState } from "react";
import GridCheckbox from "../ui/checkbox/GridCheckbox";

// Function for rendering the checkbox column
const RenderGridCheckboxColumn = ({
  rowData,
  col,
  rowIndex,
  onColumnDataChange
}) => {

  const { colSettings, fieldName } = col;
  const isDisabled = colSettings?.isDisabled ? true : false;

  const [value, setValue] = useState(rowData[col.fieldName]);

  useEffect(() => {
    setValue(rowData[fieldName]);
  }, [rowData, fieldName]);

  const handleCheckboxChange = () => {
    const newValue = !value;
    setValue(newValue);

    if (onColumnDataChange) {
      const newRowData = { ...rowData, [fieldName]: newValue };
      onColumnDataChange(fieldName, newRowData, rowIndex);
    }
  };

  return (
    <>
      <GridCheckbox
        type="checkbox"
        checked={value}
        disabled={isDisabled}
        onChange={(handleCheckboxChange)}
        isStaticCheckBox={false}
      />
    </>
  );
};


export default RenderGridCheckboxColumn