import jwt from 'jsonwebtoken';
import { Trip } from '../trip/Trip.model';

const storageTokenName = 'trip-planner-storage-token';

/**
 * App Storage Object - Used as default storage if no local storage was detected
 */
export const appStorage = {
  // The saved list of trips
  tripList: [],
  filterOptions: {
    searchText: '',
    category: '',
  },
  // You can only edit fields through your current trip object
  currentTrip: new Trip(),
  isDetailPanelActive: false,
  isNewTrip: false,
};

/**
 * Get State from local storage.
 */
export const getAppStorage = () => {
  try {
    const token = localStorage.getItem(storageTokenName);
    // FIXME: Make sure you transform this data to not hold security stuff
    return jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
  } catch (err) {
    return appStorage;
  }
};

/**
 * Set State in local storage
 * @param {*} appState Stored state
 */
export const setAppStorage = appState => {
  const token = jwt.sign(appState, process.env.REACT_APP_JWT_SECRET);
  localStorage.setItem(storageTokenName, token);
};
