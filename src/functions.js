import Swal from 'sweetalert2';

const functions = {
  isEmpty: (...vars) => {
    return vars.some(v => (typeof v === 'number' ? v <= 0 : v.trim() === ''));
  },
  toggleLoader: state => {
    if (state) {
      Swal.fire({
        title: 'Loading',
        didOpen: () => {
          Swal.showLoading();
        },
      });
      return;
    }

    Swal.close();
  },
};

export default functions;
