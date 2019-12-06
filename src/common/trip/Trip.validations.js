export const titleValidation = title => title.length > 0;
export const destinationValidation = destination => destination.length > 0;
export const descriptionValidation = description => description.length > 0;
export const categoryValidation = category => category.length > 0;
export const startDateValidation = startDate =>
  new Date(startDate).getTime() >= Date.now() && startDate !== undefined;

//HACK: Does not allow for dates on the same day... Edge case.
export const endDateValidation = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const isAfterStart = end > start;
  const isAfterRecent = end > Date.now();
  const isDefined = end !== undefined;
  return isAfterStart && isAfterRecent && isDefined;
};

export const reminderDateValidation = (startDate, reminderDate) => {
  const start = new Date(startDate).getTime();
  const reminder = new Date(reminderDate).getTime();
  const isBeforeStart = reminder < start;
  const isAfterRecent = reminder > Date.now();
  const isDefined = reminderDate !== undefined;
  return isBeforeStart && isAfterRecent && isDefined;
};
