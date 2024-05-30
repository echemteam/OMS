import React from "react";
import Pagination from "../pagination/Pagination";
import "./Table.scss";

function GridListTable1() {
  return (
    <>
      <table className="table-auto dark-table-simple">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
          <tr>
            <td>Rising Star</td>
            <td>EarthTwin, CartWind, and rise</td>
            <td>1975</td>
          </tr>
          <tr>
            <td>Just Chill To Do It</td>
            <td>Earth, Wind, and Fire</td>
            <td>1966</td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </>
  );
}

export default GridListTable1;
