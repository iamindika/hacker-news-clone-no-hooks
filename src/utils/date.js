export function getDateString(unixTime) {
  const date = new Date(unixTime * 1000);
  
  let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour < 12 ? 'AM' : 'PM';
  const convertedHour = (hour === 0) ? 12 : (hour <= 12) ? hour : (hour - 12);
  const convertedMinute = (minute < 10) ? '0' + minute : minute;
  dateString += `, ${convertedHour}:${convertedMinute} ${meridiem}`;

  return dateString;
}