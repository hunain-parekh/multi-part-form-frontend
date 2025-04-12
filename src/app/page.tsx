"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import UserTable from "@/components/UserTable";
import { FormState } from "@/types/formTypes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateFormState } from "@/store/slices/formSlice";
import { Button } from "flowbite-react";
import { useUserApi } from "@/hooks/useUserApi";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { deleteUser, getUsers } = useUserApi();

  const dispatch = useDispatch();
  const router = useRouter();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      // Handle error appropriately
      const err = error as AxiosError;
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: FormState) => {
    console.log("Editing user:", user);
    dispatch(updateFormState(user));
    router.push("/form/step-1");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gray-50 py-[100px]">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="mt-20">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                router.push("/form/step-1");
              }}
            >
              Create User
            </Button>
          </div>
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}
