import { Modal, Button, ModalHeader, ModalBody } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure you want to delete this item?",
  message = "This action cannot be undone.",
}: Props) => {
  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiTrash className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
          <p className="mb-5 text-sm text-gray-500">{message}</p>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={onConfirm}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteConfirmationModal;
