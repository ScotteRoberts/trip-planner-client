import { PlanningStates } from './Trip.model';
import { completedTodos } from '../todo/Todo.util';

// ========================= CRUD ===============================

export const addTripById = (tripList, trip) => {};

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

/**
 * Delete single trip
 * @param {Trip[]} tripList
 * @param {String} id
 */
export const deleteTripById = (tripList, id) =>
  tripList.filter(trip => trip.id !== id);

// ========================= HELPERS ===============================

/**
 * Calculates the difference of start and end date
 * @param {Date} startDate
 * @param {Date} endDate
 */
export const calcTripDuration = (startDate, endDate) =>
  new Date(new Date(endDate) - new Date(startDate));

export const calcPlanningState = todos => {
  const numOfCompletedTodos = completedTodos(todos);
  if (numOfCompletedTodos === 0) return PlanningStates.created;
  else if (numOfCompletedTodos < todos.length) return PlanningStates.inProgress;
  else return PlanningStates.ready;
};

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

// ========================= REMINDERS ===============================

/**
 * Trip List with set reminders
 * @param {Trip[]} tripList
 */
export const tripsWithReminders = tripList =>
  tripList.filter(trip => trip.reminder.isSet);

/**
 * Time from now until the reminder
 * @param {Trip} trip
 */
export const timeToExec = trip =>
  trip.reminder.dateTime ? Date.parse(trip.reminder.dateTime) - Date.now() : -1;

/**
 * Promisified `setTimeout` function
 * @param {Number} ms Number of milliseconds to elapse before execution
 */
export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
