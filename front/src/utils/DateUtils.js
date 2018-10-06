export function formatDdMonthYyyy(initDate) {
  const [ year, month, date ] = initDate.split(" ")[0].split("/")
  const monthIndex = parseInt(month, 10) - 1
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  return `${date} ${monthNames[monthIndex]} ${year}`
}