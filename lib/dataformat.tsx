import {
    format,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
  } from "date-fns";
  
  export const formatCreationDate = (date: Date | string): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    // Convert ISO 8601 string to a Date object
    const dateObject = typeof date === "string" ? new Date(date) : date;
  
    // Get the month and year from the date
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
  
    // Create the formatted text
    const formattedText = `Joined in ${month} of ${year}`;
  
    return formattedText;
  };
  
  export function formatDateString(dateString: string): string {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy · hh:mm a");
  }
  
  export const multiFormatDateString = (timestamp: Date = new Date()): string => {
    const now = new Date();
  
    const diffInDays = differenceInDays(now, timestamp);
    const diffInHours = differenceInHours(now, timestamp);
    const diffInMinutes = differenceInMinutes(now, timestamp);
  
    if (diffInDays >= 1) {
      return formatDateString(timestamp.toISOString());
    } else if (diffInHours >= 1) {
      return `${diffInHours}h`;
    } else if (diffInMinutes >= 1) {
      return `${diffInMinutes}min`;
    } else {
      return "Just now";
    }
  };
  
  export const formatDatetime = (date: Date | string): string => {
    const formattedDate = typeof date === "string" ? new Date(date) : date;
  
    const formattedTime = format(formattedDate, "h:mm a");
  
    const formattedDayMonth = format(formattedDate, "d MMM");
  
    const formattedYear = format(formattedDate, "yyyy");
  
    return `${formattedTime} · ${formattedDayMonth}. ${formattedYear}`;
  };