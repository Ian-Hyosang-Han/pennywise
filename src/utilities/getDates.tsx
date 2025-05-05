// function getYear(){
//     const d = new Date();
//     return d.getFullYear();
// }

// export { getYear }

function getOrdinal(day: number): string {
  const rem100 = day % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export function getTodayDate(): string {
  const d = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsAbbrev = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekday = weekdays[d.getDay()];
  const dayWithSuffix = getOrdinal(d.getDate());
  const month = monthsAbbrev[d.getMonth()];
  const year = d.getFullYear();

  return `${weekday} ${dayWithSuffix} ${month} ${year}`;
}
