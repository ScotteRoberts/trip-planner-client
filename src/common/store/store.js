import PropTypes from 'prop-types';
import { Trip, TripPropType } from '../trip/Trip.model';

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

/**
 * Dev Benefit - Store type to pass into the application
 */
export const AppStorePropType = PropTypes.shape({
  tripList: PropTypes.arrayOf(TripPropType).isRequired,
  filterOptions: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  currentTrip: TripPropType.isRequired,
  isDetailPanelActive: PropTypes.bool.isRequired,
  isNewTrip: PropTypes.bool.isRequired,
});
