// toast.js
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  position: 'bottom-end',
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const showToast = (icon = 'success', title = 'Done') => {
  Toast.fire({ icon, title });
};
