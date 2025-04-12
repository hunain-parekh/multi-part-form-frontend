"use client";
import Image from "next/image";
import UserTable from "@/components/UserTable";
import { FormState } from "@/types/formTypes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateFormState } from "@/store/slices/formSlice";
import { Button } from "flowbite-react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/store/services/userApi";

export default function Home() {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleEdit = (user: FormState) => {
    console.log("Editing user:", user);
    dispatch(updateFormState(user));
    router.push("/form/step-1");
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
            onDelete={(id) => {
              deleteUser(id);
            }}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
