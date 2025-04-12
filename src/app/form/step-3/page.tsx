"use client";

import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Button,
  Label,
  TextInput,
  Select,
  FileInput,
  Spinner,
} from "flowbite-react";
import { RootState } from "@/store";
import { updateEmploymentInfo } from "@/store/slices/formSlice";
import ProgressBar from "@/components/ProgressBar";
import { EmploymentInfo } from "@/types/formTypes";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  currentJobTitle: yup.string().required("Job title is required"),
  employmentStatus: yup.string().required("Employment status is required"),
  companyName: yup.string().when("employmentStatus", {
    is: (val: string) => val === "Employed",
    then: (schema) => schema.required("Company Name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  yearsOfExperience: yup
    .number()
    .typeError("Experience must be a number")
    .required("Years of experience is required"),
  resume: yup
    .mixed<FileList>()
    .test({
      name: "resume-check",
      message: "Resume is required",
      test: function (value) {
        const formData = this.options.context?.formData;
        if (formData?._id) {
          return true; // not required if _id exists
        }
        return value && value.length > 0;
      },
    })
    .test({
      name: "fileSize",
      message: "File is too large (max 5MB)",
      test: function (value) {
        if (!value || value.length === 0) return true;
        return value[0].size <= 5 * 1024 * 1024;
      },
    }),
});

export default function Step3() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.form);
  const [loading, setLoading] = useState(false);
  const [resumePreviewUrl, setResumePreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema) as Resolver<EmploymentInfo>,
    defaultValues: formData.employmentInfo || {},
    context: { formData },
  });

  const resumeFile = watch("resume")?.[0];

  useEffect(() => {
    if (resumeFile) {
      const blobUrl = URL.createObjectURL(resumeFile);
      setResumePreviewUrl(blobUrl);

      // Clean up old blob to avoid memory leaks
      return () => URL.revokeObjectURL(blobUrl);
    }
  }, [resumeFile]);

  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch(updateEmploymentInfo(data));
    router.push("/form/step-4");
  };

  const watchEmploymentStatus = watch("employmentStatus");
  const uploadedResume =
    formData.employmentInfo.resume?.[0] || watch("resume")?.[0];
  const resumePath = formData.employmentInfo.resumePath;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ProgressBar />
      <h2 className="text-2xl font-bold mb-6">
        Step 3: Employment Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Current Job Title</Label>
          <TextInput {...register("currentJobTitle")} />
          <p className="text-red-500 text-sm">
            {errors.currentJobTitle?.message}
          </p>
        </div>
        <div>
          <Label>Employment Status</Label>
          <Select {...register("employmentStatus")}>
            <option value="">Select Status</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Student">Student</option>
          </Select>
          <p className="text-red-500 text-sm">
            {errors.employmentStatus?.message}
          </p>
        </div>
        {watchEmploymentStatus === "Employed" && (
          <div>
            <Label>Company Name</Label>
            <TextInput {...register("companyName")} />
            <p className="text-red-500 text-sm">
              {errors.companyName?.message}
            </p>
          </div>
        )}
        <div>
          <Label>Years of Experience</Label>
          <TextInput type="number" {...register("yearsOfExperience")} />
          <p className="text-red-500 text-sm">
            {errors.yearsOfExperience?.message}
          </p>
        </div>
        <div>
          <Label>Resume Upload</Label>
          <FileInput {...register("resume")} />
          <p className="text-red-500 text-sm">{errors.resume?.message}</p>
        </div>

        {resumePreviewUrl ? (
          <div>
            <Label className="mt-[20px]">Resume Preview</Label>
            <iframe className="w-full h-[500px]" src={resumePreviewUrl} />
          </div>
        ) : (
          resumePath && (
            <div>
              <Label className="mt-[20px]">Resume Preview</Label>
              <iframe
                className="w-full h-[500px]"
                src={`${process.env.NEXT_PUBLIC_API_URL}/${resumePath}`}
              />
            </div>
          )
        )}

        <div className="flex justify-between">
          <Button onClick={() => router.back()} color="gray" type="button">
            Back
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Spinner aria-label="Loading..." size="sm" light={true} />
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
