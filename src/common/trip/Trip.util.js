// ========================= HELPERS ===============================

/**
 * Calculates the difference of start and end date
 * @param {Date} startDate
 * @param {Date} endDate
 */
export const calcTripDuration = (startDate, endDate) => endDate - startDate;

/**
 * Helper for string comparison
 * @param {String} str
 * @param {String} toMatch
 */
const matchStr = (str, toMatch) =>
  str.toLowerCase().includes(toMatch.toLowerCase());

// ========================= FILTERS ===============================

/**
 * Filter by text fields: Title, destination and todo descriptions
 * @param {Trip[]} trips
 * @param {String} searchText
 */
export const filterTripsByText = (trips, searchText) =>
  trips.filter(
    trip =>
      matchStr(trip.title || '', searchText) ||
      matchStr(trip.destination || '', searchText) ||
      trip.todos.some(todo => matchStr(todo.description || '', searchText))
  );

/**
 * Filter by text category value
 * @param {Trip[]} trips
 * @param {String} category
 */
export const filterTripsByCategory = (trips, category) =>
  trips.filter(trip => matchStr(trip.category || '', category));

/**
 * Entry point filter for displayed trips
 * @param {Trip[]} trips
 * @param {*} options filter options
 */
export const filterTrips = (trips, options) => {
  let filteredTrips = [...trips];
  filteredTrips = filterTripsByText(filteredTrips, options.searchText);
  filteredTrips = filterTripsByCategory(filteredTrips, options.category);
  return filteredTrips;
};

/**
 * Filter Trip List by id
 * @param {Trip[]} trips
 * @param {String} id
 */
export const filterTripsById = (trips, id) =>
  trips.filter(trip => trip.id === id);

/** Get Single Trip
 * FIXME: Can break.. find a better method
 * @param {*} tripList
 * @param {*} id
 * @returns Single Trip
 */
export const findTripById = (tripList, id) =>
  tripList.filter(trip => trip.id === id)[0];

// ========================= CRUD ===============================

/**
 * Delete single trip
 * @param {Trip[]} tripList
 * @param {String} id
 */
export const deleteTripById = (tripList, id) =>
  tripList.filter(trip => trip.id !== id);

// FIXME: This is dumb to use for a simple checkbox
/**
 * Update single record
 * @param {Trip[]} tripList
 * @param {Trip} updatedTrip Update record
 */
export const updateTripList = (tripList, updatedTrip) => {
  const updatedTripList = [...tripList];
  const updateIndex = tripList.findIndex(trip => trip.id === updatedTrip.id);
  if (updateIndex > -1) {
    updatedTripList.splice(updateIndex, 1, updatedTrip);
  } else {
    updatedTripList.push(updatedTrip);
  }
  return updatedTripList;
};
