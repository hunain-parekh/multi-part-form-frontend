import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { FormState } from "@/types/formTypes";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

interface Props {
  users: FormState[];
  onEdit: (user: FormState) => void;
  onDelete: (_id: string) => void;
  loading: boolean;
}

export default function UserTable({ users, onEdit, onDelete, loading }: Props) {
  const skeletonRows = Array(5).fill(0); // 5 fake rows
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const confirmDelete = (_id: string) => {
    setSelectedId(_id);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
      setOpenModal(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto mt-6">
        <Table hoverable striped>
          <TableHead>
            <TableHeadCell>Full Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Job Title</TableHeadCell>
            <TableHeadCell>Monthly Income</TableHeadCell>
            <TableHeadCell>Contact Mode</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>

          <TableBody className="divide-y">
            {loading
              ? skeletonRows.map((_, index) => (
                  <TableRow key={index}>
                    {Array(7)
                      .fill(0)
                      .map((_, idx) => (
                        <TableCell key={idx}>
                          <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                        </TableCell>
                      ))}
                  </TableRow>
                ))
              : users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.userProfile.fullName}</TableCell>
                    <TableCell>{user.userProfile.email}</TableCell>
                    <TableCell>{user.contactInfo.phoneNumber}</TableCell>
                    <TableCell>{user.employmentInfo.currentJobTitle}</TableCell>
                    <TableCell>
                      {user.financialInfo.monthlyIncome
                        ? `Rs. ${user.financialInfo.monthlyIncome}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {user.preferences.preferredContactMode}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="xs"
                        color="light"
                        onClick={() => onEdit(user)}
                      >
                        <HiPencil className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        color="red"
                        onClick={() => confirmDelete(user._id ?? "")}
                      >
                        <HiTrash className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this user?"
        message="Deleting this user will remove all associated data."
      />
    </>
  );
}
