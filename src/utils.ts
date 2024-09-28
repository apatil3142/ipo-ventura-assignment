export const getIssueDate = (dates: string[]): string => {
  const [startDateStr, endDateStr] = dates;

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const startDate = parseDate(startDateStr);
  const endDate = parseDate(endDateStr);

  const formatDayMonth = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('default', { month: 'short' })}`;

  if (startDate.getFullYear() === endDate.getFullYear()) {
    return `${formatDayMonth(startDate)} - ${formatDayMonth(endDate)} ${startDate.getFullYear()}`;
  } else {
    return `${formatDayMonth(startDate)} ${startDate.getFullYear()} - ${formatDayMonth(endDate)} ${endDate.getFullYear()}`;
  }
};  

export const formatLargeNumber = (num: number): string => {
  if (num >= 10000000) {
    return `${Math.floor(num / 10000000)} Crores`;
  } else if (num >= 100000) {
    return `${Math.floor(num / 100000)} Lakhs`;
  } 
  return num.toString();
};