import moment from 'moment';

// Utility function to format a date using moment.js
export const formatDate = (date, format) => {
  if (!date) return ''; // Handle empty dates if needed
  if (!format)
    format = process.env.REACT_APP_DefaultDateFormat  
  return moment(date).format(format);
};

export const TimeSplit = (date,format) => {
  if (!date) return ''; // Handle empty dates if needed
  if (!format)
  format = process.env.REACT_APP_DefaultDateFormat  
  const dateTime=moment(date).format(format);
  const [, timePart] = dateTime.split(" ");
  return timePart;
};

export default formatDate;
