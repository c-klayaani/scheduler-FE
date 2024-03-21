const formatDate = (date: Date) => {
  // Define the options for the date format
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Day name
    day: "numeric", // Day in the month
    month: "long", // Month name
    year: "numeric", // Year
  };

  // Format the date according to the specified options
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const formatDateFromIso = (dateObj: Date) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export { formatDate, formatDateFromIso };
