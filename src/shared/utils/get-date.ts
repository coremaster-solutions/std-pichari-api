const today = new Date();

export const getRangeDateOfCurrentMonth = () => {
  const startDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), 1);
  const endDate = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0);
  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(24, 0, 0, 0);
  return {
    startOfMonth: startDate,
    endOfMonth: endDate,
  };
};
