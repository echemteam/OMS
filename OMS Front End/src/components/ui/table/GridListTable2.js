import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../image/Image";
import Pagination from "../pagination/Pagination";
import "./Table.scss";
import Iconify from "../iconify/Iconify";

const GridListTable2 = () => {
  const [data] = useState({
    heading: [
      "Title",
      "Publish On",
      "Created At",
      "Status",
      "Update At",
      "Action",
    ],
    body: [
      [
        "lorem",
        "Aug, 15, 2023 ",
        "Aug, 15, 2023 8:25 a.m",
        "Private",
        "Aug, 15, 2023 10:25 a.m",
      ],
      [
        "lorem",
        "Aug, 15, 2023",
        "Aug, 15, 2023 8:25 a.m",
        "Public",
        "Aug, 15, 2023 10:25 a.m",
      ],
      [
        "lorem",
        "Aug, 15, 2023",
        "Aug, 15, 2023 8:25 a.m",
        "Private",
        "Aug, 15, 2023 10:25 a.m",
      ],
      [
        "lorem",
        "Aug, 15, 2023",
        "Aug, 15, 2023 8:25 a.m",
        "Public",
        "Aug, 15, 2023 10:25 a.m",
      ],
    ],
  });

  const handleEdit = (rowIndex) => {};

  const handleDelete = (rowIndex) => {};

  return (
    <div>
      <Table
        heading={data.heading}
        body={data.body}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination />
    </div>
  );
};

const Table = ({ heading, body, onEdit, onDelete }) => {
  return (
    <table className="border-table-simple ">
      <thead>
        <tr>
          {heading.map((head, headID) => (
            <th
              className={`whitespace-nowrap ${
                headID === 3 ? "status-column text-center" : ""
              }`}
              key={headID}
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((rowContent, rowID) => (
          <TableRow
            rowContent={rowContent}
            key={rowID}
            rowIndex={rowID}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

const TableRow = ({ rowContent, rowIndex, onEdit, onDelete }) => {
  return (
    <tr>
      {rowContent.map((val, colID) => (
        <td
          className={`whitespace-nowrap ${colID === 3 ? "status-column" : ""}`}
          key={colID}
        >
          {/* {colID === 3 ? <span className="primary">{val}</span> : val} */}

          {colID === 3 ? (
            val === "Private" ? (
              <span className="dark">{val}</span>
            ) : val === "Public" ? (
              <span className="warning">{val}</span>
            ) : (
              val
            )
          ) : (
            val
          )}
        </td>
      ))}
      <td>
        <div className="d-flex action-button">
          <Link onClick={() => onEdit(rowIndex)} className="mr-2">
            {/* <Image imagePath={AppIcons.editIcon} altText="Edit Icon" /> */}
            <Iconify 
          icon="tabler:pencil" 
          />
          </Link>
          <Link onClick={() => onDelete(rowIndex)}>
            {/* <Image imagePath={AppIcons.deleteIcon} altText="Delete Icon" /> */}
            <Iconify 
          icon="mingcute:delete-2-line" 
          />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default GridListTable2;
