"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2 } from "lucide-react";
import { Button } from "flowbite-react";
import confetti from "canvas-confetti";
import { RootState } from "@/store";
import { resetForm } from "@/store/slices/formSlice";

export default function SuccessPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const name = useSelector((state: RootState) => (state.form as any).userProfile?.fullName);

  useEffect(() => {
    // Confetti effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Reset Redux form state
    dispatch(resetForm());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center animate-fade-in">
        <CheckCircle2 className="mx-auto text-green-500 w-20 h-20 mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-2">Success!</h1>
        <p className="text-gray-700 mb-4">
          {name ? `Thank you, ${name}!` : "Thank you!"} Your form has been submitted/updated successfully.
        </p>
        <Button color="success" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
