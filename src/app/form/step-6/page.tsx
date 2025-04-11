"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { Button, Card } from "flowbite-react";
import ProgressBar from "@/components/ProgressBar";

export default function Step6() {
  const router = useRouter();
  const form = useSelector((state: RootState) => state.form);

  const handleEdit = (step: number) => {
    router.push(`/form/step-${step}`);
  };

  const handleFinalSubmit = () => {
    // You can send this data to backend here
    console.log("Final Submitted Data: ", form);
    router.push("/form/success"); // or a success page
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProgressBar />
      <h2 className="text-3xl font-bold mb-6">Step 6: Summary & Confirmation</h2>

      <div className="space-y-6">
        {/* Step 1: Personal Info */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">User Profile</h3>
              <p><strong>Full Name:</strong> {form.userProfile?.fullName}</p>
              <p><strong>Email:</strong> {form.userProfile?.email}</p>
              <p><strong>Gender:</strong> {form.userProfile?.gender}</p>
              <p><strong>DOB:</strong> {form.userProfile?.dateOfBirth}</p>
            </div>
            <Button size="xs" onClick={() => handleEdit(1)}>Edit</Button>
          </div>
        </Card>

        {/* Step 2: Contact Information */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <p><strong>Phone Number:</strong> {form.contactInfo.phoneNumber}</p>
              <p><strong>Alternate Phone Number:</strong> {form.contactInfo.alternatePhoneNumber}</p>
              <p><strong>Address Line 1:</strong> {form.contactInfo.addressLine1}</p>
              <p><strong>Address Line 2:</strong> {form.contactInfo.addressLine2}</p>
              <p><strong>City:</strong> {form.contactInfo.city}</p>
              <p><strong>Postal Code:</strong> {form.contactInfo.postalCode}</p>
              <p><strong>Country:</strong> {form.contactInfo.country}</p>
            </div>
            <Button size="xs" onClick={() => handleEdit(2)}>Edit</Button>
          </div>
        </Card>

        {/* Step 3: Employment Info */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Employment Information</h3>
              <p><strong>Job Title:</strong> {form.employmentInfo?.currentJobTitle}</p>
              <p><strong>Employment Status:</strong> {form.employmentInfo?.employmentStatus}</p>
              {form.employmentInfo?.employmentStatus === "Employeed" && (
                <p><strong>Company:</strong> {form.employmentInfo?.companyName}</p>
              )}
              <p><strong>Years of Experience:</strong> {form.employmentInfo?.yearsOfExperience}</p>
              <p><strong>Resume:</strong> {form?.employmentInfo?.resume?.[0]?.name || "No Resume Uploaded"}</p>
            </div>
            <Button size="xs" onClick={() => handleEdit(3)}>Edit</Button>
          </div>
        </Card>

        {/* Step 4: Financial Info */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Financial Information</h3>
              <p><strong>Monthly Income:</strong> {form.financialInfo?.monthlyIncome}</p>
              <p><strong>Loan Status:</strong> {form.financialInfo?.loanStatus}</p>
              {form.financialInfo?.loanStatus === "Yes" && (
                <p><strong>Loan Amount:</strong> {form.financialInfo?.loanAmount}</p>
              )}
              <p><strong>Credit Score:</strong> {form.financialInfo?.creditScore}</p>
            </div>
            <Button size="xs" onClick={() => handleEdit(4)}>Edit</Button>
          </div>
        </Card>

        {/* Step 5: Preferences */}
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Preferences</h3>
              <p><strong>Preferred Contact:</strong> {form.preferences?.preferredContactMode}</p>
              <p><strong>Hobbies:</strong> {(form.preferences?.hobbies || []).join(", ")}</p>
              <p><strong>Newsletter:</strong> {form.preferences?.newsletter ? "Subscribed" : "Not Subscribed"}</p>
            </div>
            <Button size="xs" onClick={() => handleEdit(5)}>Edit</Button>
          </div>
        </Card>

        {/* Final Action */}
        <div className="flex justify-end gap-4">
          <Button color="gray" onClick={() => handleEdit(5)}>Back</Button>
          <Button onClick={handleFinalSubmit}>Submit Application</Button>
        </div>
      </div>
    </div>
  );
}
