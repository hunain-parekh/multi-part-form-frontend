"use client";

import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Label, Radio, Spinner } from "flowbite-react";
import { RootState } from "@/store";
import { updateFinancialInfo } from "@/store/slices/formSlice";
import ProgressBar from "@/components/ProgressBar";
import { FinancialInfo } from "@/types/formTypes";
import { useState } from "react";
import FormInput from "@/components/generic/FormInput";

const schema = yup.object().shape({
  monthlyIncome: yup
    .number()
    .typeError("Monthly income must be a number")
    .required("Monthly income is required"),

  loanStatus: yup
    .string()
    .oneOf(["Yes", "No"], "Loan status must be either 'Yes' or 'No'")
    .required("Loan status is required"),

  loanAmount: yup.number().when("loanStatus", {
    is: (val: string) => val === "Yes",
    then: (schema) =>
      schema
        .required("Loan amount is required")
        .min(1, "Loan amount must be greater than 0")
        .typeError("Loan amount must be a number"),
    otherwise: (schema) => schema.notRequired(),
  }),

  creditScore: yup
    .number()
    .typeError("Credit score must be a number")
    .required("Credit score is required"),
});

export default function Step4() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.form);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema) as Resolver<FinancialInfo>,
    defaultValues: formData.financialInfo || {},
  });

  console.log(errors, "Errors");

  const watchLoanStatus = watch("loanStatus");

  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch(updateFinancialInfo(data));
    router.push("/form/step-5");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ProgressBar />
      <h2 className="text-2xl font-bold mb-6">Step 4: Financial Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Monthly Income (PKR)"
          name="monthlyIncome"
          type="number"
          register={register}
          errors={errors}
        />

        <div>
          <Label>Do you have any loans?</Label>
          <div className="flex gap-4 mt-2">
            <Label className="flex items-center gap-2">
              <Radio value="Yes" {...register("loanStatus")} />
              Yes
            </Label>
            <Label className="flex items-center gap-2">
              <Radio value="No" {...register("loanStatus")} />
              No
            </Label>
          </div>
          <p className="text-red-500 text-sm">{errors.loanStatus?.message}</p>
        </div>

        {watchLoanStatus === "Yes" && (
          <FormInput
            label="Loan Amount (PKR)"
            name="loanAmount"
            type="number"
            register={register}
            errors={errors}
          />
        )}

        <FormInput
          label="Credit Score"
          name="creditScore"
          type="number"
          register={register}
          errors={errors}
        />

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
