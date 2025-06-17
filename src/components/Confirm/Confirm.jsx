import Swal from "sweetalert2";

export const showConfirmDialog = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  icon = "warning",
  confirmButtonText = "Yes, delete it!",
  confirmButtonColor = "#3085d6",
  cancelButtonColor = "#d33",
  showSuccess = true,
  successTitle = "Deleted!",
  successText = "Your file has been deleted.",
  successIcon = "success",
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
  });

  if (result.isConfirmed && showSuccess) {
    await Swal.fire({
      title: successTitle,
      text: successText,
      icon: successIcon,
    });
  }

  return result.isConfirmed;
};
