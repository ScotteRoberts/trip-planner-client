import PropTypes from 'prop-types';
import { Trip, TripType } from '../trip/Trip.model';

/**
 * App Storage Object - Used as default storage if no local storage was detected
 */
export const AppStore = {
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

export const AppStoreType = PropTypes.shape({
  tripList: PropTypes.arrayOf(TripType),
  filterOptions: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  currentTrip: TripType,
  isDetailPanelActive: PropTypes.bool.isRequired,
  isNewTrip: PropTypes.bool.isRequired,
});
