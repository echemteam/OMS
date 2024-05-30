export const renderHTMLColumn = (rowData, col, rowIndex) => {

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rowData?.[col.fieldName];
    const textContent = tempDiv.innerText;

    return (
        <span>
            {textContent}
        </span>
    )
};
