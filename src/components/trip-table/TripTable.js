import React from 'react';
import './TripTable.css';
import Listing from './TripTableData';

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

const ListingPanel = props => (
  <table className="listing-panel">
    <thead>
      <tr>
        {listingHeaders.map((listingHeader, index) => (
          <th key={index}>{listingHeader}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {props.tripList.map((listing, index) => (
        <Listing
          key={index}
          listing={listing}
          onTripSelect={props.onTripSelect}
        />
      ))}
    </tbody>
  </table>
);

export default ListingPanel;
