"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Loader2,  } from "lucide-react";
import { useCountdown } from "usehooks-ts";

const otpSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
}).required();

type OtpFormData = Yup.InferType<typeof otpSchema>;

interface OtpFormProps {
  onSubmitOtp: (otp: string) => void;
  isSubmitting: boolean;
  closeModal: () => void;
  otpType: string;
  onResendOTP?: () => void;
}

export const OtpForm = ({
  onSubmitOtp,
  isSubmitting,
  closeModal,
  otpType,
  onResendOTP,
}: OtpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
  });
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize the countdown timer with a duration of 60 seconds
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  });

  const onSubmit = (data: OtpFormData) => {
    onSubmitOtp(data.otp);
  };

  useEffect(() => {
    startCountdown();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      setValue("otp", newOtpValues.join(""));

      // Move to next input
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otpValues[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    onResendOTP?.();
    setOtpValues(["", "", "", "", "", ""]);
    resetCountdown(); // Reset the countdown
    startCountdown(); // Start the countdown again
    // Implement your OTP sending logic here
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 animate-fade-in">
        {/* <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button> */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          OTP Verification
        </h3>
        <p className="text-gray-600 mb-6">
          {otpType === "aadhar"
            ? "Verify your Aadhar number"
            : "Verify your mobile number"}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="otp-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter 6-digit OTP
            </label>
            <div className="flex justify-between mb-2">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  placeholder="_"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="outline-none size-12 text-center text-2xl border-2 rounded-md  focus:ring-1 focus:ring-blue-500  transition-all"
                />
              ))}
            </div>
            <input type="hidden" {...register("otp")} />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {errors.otp.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              className={`text-sm ${count > 0 ? "text-gray-400" : "text-blue-600 hover:text-blue-800"} transition-colors`}
              onClick={count > 0 ? undefined : handleResendOtp}
              disabled={count > 0}
            >
              {count > 0 ? `Resend OTP in ${count} sec` : "Resend OTP"}
            </button>
            <p className="text-sm text-gray-500">OTP valid for 10:00</p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-1.5 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
