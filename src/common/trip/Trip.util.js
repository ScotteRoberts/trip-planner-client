const matchStr = (str, toMatch) =>
  str.toLowerCase().includes(toMatch.toLowerCase());

// WARN: This has a large runtime when going through all of the trips. Can cause issues and may need optimization.
export const filterTripsByText = (trips, searchText) =>
  trips.filter(
    trip =>
      matchStr(trip.title || '', searchText) ||
      matchStr(trip.destination || '', searchText) ||
      trip.todos.some(todo => matchStr(todo.description || '', searchText))
  );

export const filterTripsByCategory = (trips, category) =>
  trips.filter(trip => matchStr(trip.category || '', category));

export const filterTrips = (trips, options) => {
  let filteredTrips = [...trips];
  filteredTrips = filterTripsByText(filteredTrips, options.searchText);
  filteredTrips = filterTripsByCategory(filteredTrips, options.category);
  return filteredTrips;
};

export const filterTripsById = (trips, id) =>
  trips.filter(trip => trip.id === id);

// -------------------------------

export const calcTripDuration = (startDate, endDate) => endDate - startDate;

// -------------------------------

export const findTripById = (tripList, id) =>
  tripList.filter(trip => trip.id === id)[0];

export const deleteTripById = (tripList, id) =>
  tripList.filter(trip => trip.id !== id);
