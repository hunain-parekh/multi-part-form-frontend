"use client";

import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Label, Radio } from "flowbite-react";
import { RootState } from "@/store";
import { updatePreferences } from "@/store/slices/formSlice";
import ProgressBar from "@/components/ProgressBar";
import { Preferences } from "@/types/formTypes";

const schema = yup.object().shape({
  preferredContactMode: yup
    .string()
    .oneOf(["Email", "Phone", "SMS"])
    .required("Preferred contact mode is required"),

  hobbies: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one hobby"),

  newsletter: yup.boolean(),
});

export default function Step5() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.form);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema) as Resolver<Preferences>,
    defaultValues: formData.preferences || {},
  });

  const onSubmit = (data: any) => {
    dispatch(updatePreferences(data));
    router.push("/form/step-6"); // Change to next step
  };

  const hobbiesOptions = ["Sports", "Music", "Reading", "Gaming", "Traveling"];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ProgressBar />
      <h2 className="text-2xl font-bold mb-6">Step 5: Preferences</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Preferred Contact Mode */}
        <div>
          <Label className="mb-1">Preferred Mode of Contact</Label>
          <div className="flex flex-col gap-2">
            {["Email", "Phone", "SMS"].map((mode) => (
              <Label key={mode} className="flex items-center gap-2">
                <Radio value={mode} {...register("preferredContactMode")} />
                {mode}
              </Label>
            ))}
          </div>
          <p className="text-red-500 text-sm">
            {errors.preferredContactMode?.message}
          </p>
        </div>

        {/* Hobbies */}
        <div>
          <Label className="mb-1">Hobbies & Interests</Label>
          <div className="flex flex-col gap-2">
            {hobbiesOptions.map((hobby) => (
              <Label key={hobby} className="flex items-center gap-2">
                <Checkbox
                  value={hobby}
                  {...register("hobbies")}
                />
                {hobby}
              </Label>
            ))}
          </div>
          <p className="text-red-500 text-sm">{errors.hobbies?.message}</p>
        </div>

        {/* Newsletter */}
        <div>
          <Label className="flex items-center gap-2">
            <Checkbox {...register("newsletter")} />
            Subscribe to our newsletter
          </Label>
        </div>

        <div className="flex justify-between">
          <Button type="button" color="gray" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}
