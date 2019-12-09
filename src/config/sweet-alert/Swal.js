import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Wrapper around the original Swal library to add support for React components.
const MySwal = withReactContent(Swal);

export default MySwal;
