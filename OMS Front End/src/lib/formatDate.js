import moment from 'moment';

// Utility function to format a date using moment.js
export const formatDate = (date, format) => {
  if (!date) return ''; // Handle empty dates if needed
  if (!format)
    format = process.env.REACT_APP_DefaultDateFormat // TODO: move default format to env file 
  return moment(date).format(format);
};

export default formatDate;
