import jwt from 'jsonwebtoken';
import { AppStore } from '../store/store';

const storageTokenName = 'trip-planner-storage-token';

/**
 * Get State from local storage.
 */
export const getAppStorage = () => {
  try {
    const token = localStorage.getItem(storageTokenName);
    // FIXME: Make sure you transform this data to not hold security stuff
    return jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
  } catch (err) {
    return AppStore;
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
