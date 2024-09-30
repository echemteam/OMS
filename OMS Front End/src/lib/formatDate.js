import moment from "moment";

// Utility function to format a date using moment.js
export const formatDate = (date, format) => {
  if (!date) return ""; // Handle empty dates if needed
  if (!format) format = "MM/DD/YYYY hh:mm A"; // TODO: move default format to env file
  return moment(date).format(format);
};

export default formatDate;

export const formatDateInShort = (isDate) => {
  if (!isDate) return ""; // Return an empty string if no date is provided

  const date = new Date(isDate);

  // Check for an invalid date
  if (isNaN(date)) return "";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
