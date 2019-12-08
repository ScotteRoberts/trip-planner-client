import React from 'react';
import PropTypes from 'prop-types';
import './TripTable.css';
import TripTableDatum from './TripTableDatum';

import { TripType } from '../../common/trip/Trip.model';

const listingHeaders = [
  'Title',
  'Destination',
  'Duration',
  'Category',
  'Reminder Set',
  'Items Needed',
  'Items Completed',
  'Trip Planning State',
];

const TripTable = props => (
  // FIXME: The overflow should be done in a container component?
  <div style={{ overflowX: 'auto' }}>
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
  </div>
);

TripTable.propTypes = {
  tripList: PropTypes.arrayOf(TripType).isRequired,
  onTripSelect: PropTypes.func.isRequired,
};

export default TripTable;
