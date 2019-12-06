import React from 'react';
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
  <table className="listing-panel">
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
);

export default TripTable;
