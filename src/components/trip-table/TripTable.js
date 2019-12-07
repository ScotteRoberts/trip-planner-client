import React from 'react';
import PropTypes from 'prop-types';
import './TripTable.css';
import TripTableDatum from './TripTableDatum';

const listingHeaders = [
  'Title',
  'Destination',
  'Duration',
  'Category',
  'Reminder Set',
  'Items Needed',
  '# of Items Completed',
  'Trip Planning State',
];

const TripTable = props => (
  <div>
    <table className="trip-table">
      <thead>
        <tr>
          {listingHeaders.map((listingHeader, index) => (
            <th key={index}>{listingHeader}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {props.tripList.map((trip, index) => (
          <TripTableDatum
            key={index}
            trip={trip}
            onTripSelect={props.onTripSelect}
          />
        ))}
      </tbody>
    </table>

    <button onClick={props.onAddNewTrip}>Add a trip</button>
  </div>
);

TripTable.propTypes = {
  tripList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onTripSelect: PropTypes.func.isRequired,
  onAddNewTrip: PropTypes.func.isRequired,
};

export default TripTable;
