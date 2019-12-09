import React from 'react';
import MySwal from '../../config/sweet-alert/Swal';

import { TripPropType } from '../../common/trip/Trip.model';

/**
 * Sequence of steps when a reminder notifies a user of their upcoming trip
 * @param {Trip} trip
 * @returns Updated trip reminder and detail options
 */
export const handleReminderModal = async trip => {
  const result = await MySwal.fire({
    title: <p>Trip Reminder</p>,
    html: <TripDetails trip={trip} />,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Go to Details',
    cancelButtonText: 'Snooze',
  });

  if (result.value) {
    // Open up details
    return { trip, openDetails: true };
  } else if (result.dismiss === MySwal.DismissReason.cancel) {
    // Snooze with options
    const { value: snooze } = await MySwal.fire({
      icon: 'question',
      title: 'How Long?',
      input: 'select',
      inputOptions: {
        thirtySec: '30 sec',
        fiveMin: '5 min',
        fifteenMin: '15 min',
        oneHour: '1 hour',
        oneDay: '1 day',
      },
      inputPlaceholder: 'Select a time',
      showCancelButton: true,
    });
    const minute = 60000;
    switch (snooze) {
      case 'thirtySec':
        trip.reminder.dateTime = new Date(Date.now() + 0.5 * minute);
        break;
      case 'fiveMin':
        trip.reminder.dateTime = new Date(Date.now() + 5 * minute);
        break;
      case 'fifteenMin':
        trip.reminder.dateTime = new Date(Date.now() + 15 * minute);
        break;
      case 'oneHour':
        trip.reminder.dateTime = new Date(Date.now() + 60 * minute);
        break;
      case 'oneDay':
        trip.reminder.dateTime = new Date(Date.now() + 24 * 60 * minute);
        break;
      default:
        break;
    }

    return { trip, openDetails: false };
  }
};

/**
 * Shows important trip details
 * @param {Trip} trip
 */
const TripDetails = ({ trip }) => (
  <div>
    <h2>{`Title: ${trip.title}`}</h2>
    <h2>{`Destination: ${trip.destination}`}</h2>
  </div>
);

TripDetails.propTypes = {
  trip: TripPropType.isRequired,
};
