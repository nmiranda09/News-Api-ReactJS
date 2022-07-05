export const formatDate = (date) => {
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const d = new Date(date);
  const monthName = month[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return monthName + ' ' + day + ', ' + year;

}