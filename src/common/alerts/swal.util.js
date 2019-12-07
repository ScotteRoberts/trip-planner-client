import React from 'react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const handleSetupModal = async trip => {
  const result = await MySwal.fire({
    title: <p>{`${trip.title} - Reminder`}</p>,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Go to Details',
    cancelButtonText: 'Snooze',
  });

  if (result.value) {
    // Open up details
    return { trip, openDetails: true };
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // Snooze with options
    const { value: snooze } = await Swal.fire({
      icon: 'question',
      title: 'How Long?',
      input: 'select',
      inputOptions: {
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
    console.log('Modified Trip', trip.reminder);

    return { trip, openDetails: false };
  }
};

export const confirmSuccessfulAction = action =>
  MySwal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${action} Successful!`,
    showConfirmButton: false,
    timer: 1000,
  });
