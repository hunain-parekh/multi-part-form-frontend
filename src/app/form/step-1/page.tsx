"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "@/store/slices/formSlice";
import { useRouter } from "next/navigation";
import { Button, Label, Radio, TextInput, Datepicker } from "flowbite-react";
import { RootState } from "@/store";
import ProgressBar from "@/components/ProgressBar";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.string().required("DOB is required"),
});

export default function Step1() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.form);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData.userProfile || {},
  });

  const onSubmit = (data: any) => {
    dispatch(updateUserProfile(data));
    router.push("/form/step-2"); // next step
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ProgressBar />
      <h2 className="text-2xl font-bold mb-6">Step 1: User Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name</Label>
          <TextInput {...register("fullName")} />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>
        <div>
          <Label>Email</Label>
          <TextInput type="email" {...register("email")} />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <Label>Password</Label>
          <TextInput type="password" {...register("password")} />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>
        <div>
          <Label>Confirm Password</Label>
          <TextInput type="password" {...register("confirmPassword")} />
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <div>
          <Label>Gender</Label>
          <div className="flex gap-4">
            <Radio id="male" value="Male" {...register("gender")} />
            <Label htmlFor="male">Male</Label>
            <Radio id="female" value="Female" {...register("gender")} />
            <Label htmlFor="female">Female</Label>
            <Radio id="other" value="Other" {...register("gender")} />
            <Label htmlFor="other">Other</Label>
          </div>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>
        <div>
          <Label>Date Of Birth</Label>
          <Datepicker
            onChange={(date) =>
              setValue("dateOfBirth", date?.toISOString() || "")
            }
          />
          <p className="text-red-500 text-sm">{errors.dateOfBirth?.message}</p>
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </div>
  );
}
