import { Link } from "react-router-dom";
import { parseDynamicURL } from "../../../lib/parseWebURL";

export const renderGridLinkColumn = (rowData, col, rowIndex) => {
    const { url, isOpenNewTab } = col.colSettings|| {url:'',isOpenNewTab:false};
    const navigationURL = url ? parseDynamicURL(url, rowData) : rowData[col.fieldName];
    const target = isOpenNewTab ? "_blank" : "_self";
  
    return (
      <Link to={navigationURL} target={target}>
        {rowData[col.fieldName]}
      </Link>
    );
  };
  