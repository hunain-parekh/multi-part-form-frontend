"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Label, TextInput, Select, Spinner } from "flowbite-react";
import { RootState } from "@/store";
import { updateContactInfo } from "@/store/slices/formSlice";
import ProgressBar from "@/components/ProgressBar";
import { useState } from "react";

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Phone Number is required"),
  alternatePhoneNumber: yup.string().notRequired(),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup.string().notRequired(),
  city: yup.string().required("City is required"),
  postalCode: yup.string().required("Postal Code is required"),
  country: yup.string().required("Country is required"),
});

const cityOptions = ["Karachi", "Lahore", "Islamabad", "Quetta"];
const countryOptions = ["Pakistan", "India", "UAE", "USA"];

export default function Step2() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.form);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData.contactInfo || {},
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch(updateContactInfo(data));
    router.push("/form/step-3");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ProgressBar />
      <h2 className="text-2xl font-bold mb-6">Step 2: Contact Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Phone Number</Label>
          <TextInput {...register("phoneNumber")} />
          <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>
        </div>
        <div>
          <Label>Alternate Phone Number (optional)</Label>
          <TextInput {...register("alternatePhoneNumber")} />
        </div>
        <div>
          <Label>Address Line 1</Label>
          <TextInput {...register("addressLine1")} />
          <p className="text-red-500 text-sm">{errors.addressLine1?.message}</p>
        </div>
        <div>
          <Label>Address Line 2 (optional)</Label>
          <TextInput {...register("addressLine2")} />
        </div>
        <div>
          <Label>City</Label>
          <Select {...register("city")}>
            <option value="">Select City</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
          <p className="text-red-500 text-sm">{errors.city?.message}</p>
        </div>
        <div>
          <Label>Postal Code</Label>
          <TextInput {...register("postalCode")} />
          <p className="text-red-500 text-sm">{errors.postalCode?.message}</p>
        </div>
        <div>
          <Label>Country</Label>
          <Select {...register("country")}>
            <option value="">Select Country</option>
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
          <p className="text-red-500 text-sm">{errors.country?.message}</p>
        </div>
        <div className="flex justify-between">
          <Button onClick={() => router.back()} color="gray">
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
