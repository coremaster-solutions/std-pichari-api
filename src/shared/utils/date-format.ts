export const getDateFormatTimezone = (dateTimeJSON: string) => {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(dateTimeJSON));
};

export const getTimeFormatTimezone = (dateTimeJSON: string) => {
  return new Date(dateTimeJSON).toLocaleTimeString([], {
    timeZone: "America/Lima",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
