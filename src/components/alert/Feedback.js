import MySwal from '../../config/sweet-alert/Swal';

/**
 * Displays a success message in the top right corner of the screen.
 * @param {String} action Displayed action
 */
export const confirmSuccessfulAction = action =>
  MySwal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${action} Successful!`,
    showConfirmButton: false,
    timer: 1000,
  });
