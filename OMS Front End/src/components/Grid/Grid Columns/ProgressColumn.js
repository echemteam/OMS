import React from 'react';
import ProgressBar from "../../../common/features/component/ProgressBar";

export const renderGridProgressAction = (rowData, col, rowIndex) => {
    const progress = rowData[col.fieldName];
    return <ProgressBar progress={progress} />;
  };