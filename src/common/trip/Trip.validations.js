/**
 * Helper - Determines a valid title entry
 * @param {String} title
 */
export const titleValidation = title => title.length > 0;

/**
 * Helper - Determines a valid destination entry
 * @param {String} destination
 */
export const destinationValidation = destination => destination.length > 0;

/**
 * Helper - Determines a valid description entry
 * @param {String} description
 */
export const descriptionValidation = description => description.length > 0;

/**
 * Helper - Determines a valid category entry
 * @param {String} category
 */
export const categoryValidation = category => category.length > 0;

/**
 * Helper - Determines a valid start date entry
 * @param {Date | String} startDate
 */
export const startDateValidation = startDate =>
  new Date(startDate).getTime() >= Date.now() && startDate !== undefined;

/**
 * Helper - Determines a valid reminder datetime entry
 * @param {Date | String} startDate
 * @param {Date | String} reminderDate
 */
export const reminderDateValidation = (startDate, reminderDate) => {
  const start = new Date(startDate).getTime();
  const reminder = new Date(reminderDate).getTime();
  const isBeforeStart = reminder < start;
  const isAfterRecent = reminder > Date.now();
  const isDefined = reminderDate !== undefined;
  return isBeforeStart && isAfterRecent && isDefined;
};
