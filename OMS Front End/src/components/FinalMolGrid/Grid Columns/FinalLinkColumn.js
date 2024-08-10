import { Link } from "react-router-dom";
import { parseDynamicURL } from "./../libs/parseWebURL";

export const renderGridLinkColumn = (rowData, col) => {
  const { baseUrl = '', target = '_self' } = col.colSettings || {};
  
  // Parse the dynamic URL if provided, otherwise use the field value
  const navigationURL = baseUrl ? parseDynamicURL(baseUrl, rowData) : rowData[col.fieldName];

  return (
    <Link to={navigationURL} target={target}>
      {rowData[col.fieldName]}
    </Link>
  );
};