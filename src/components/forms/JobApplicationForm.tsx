"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";
import { submitJobApplication } from "@/handlers/jobHandlers";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  resume: FileList;
  coverLetter: string;
};

export default function JobApplicationForm({ jobId }: { jobId: string }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.coverLetter) formData.append("coverLetter", data.coverLetter);
    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]);
    }

    const result = await submitJobApplication(formData);
    
    if (result.success) {
      setSuccess(true);
      reset();
      setFileName(null);
    } else {
      setServerError(result.message);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center flex flex-col items-center justify-center">
        <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">Application Submitted!</h3>
        <p className="text-green-800">Thank you for applying. We will review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
      {serverError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
          {serverError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-secondary mb-1">Full Name *</label>
        <input {...register("fullName", { required: "Full name is required" })} className="input-field" placeholder="John Doe" />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Email Address *</label>
          <input {...register("email", { required: "Email is required" })} type="email" className="input-field" placeholder="john@example.com" />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Phone Number *</label>
          <input {...register("phone", { required: "Phone number is required" })} className="input-field" placeholder="+1 234 567 8900" />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1">Resume (PDF/DOC) *</label>
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
          <UploadCloud className="text-gray-400 mb-2" size={32} />
          <span className="text-sm text-secondary-light">
            {fileName ? <span className="font-medium text-primary">{fileName}</span> : "Click or drag file to upload"}
          </span>
          <input 
            type="file" 
            accept=".pdf,.doc,.docx"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            {...register("resume", { 
              required: "Resume is required",
              onChange: (e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFileName(e.target.files[0].name);
                }
              }
            })}
          />
        </div>
        {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1">Cover Letter (Optional)</label>
        <textarea {...register("coverLetter")} rows={4} className="input-field resize-none" placeholder="Briefly tell us why you're a great fit..." />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full py-4 text-lg disabled:opacity-70 flex justify-center items-center gap-2">
        {isSubmitting ? <><Loader2 className="animate-spin" size={24} /> Submitting...</> : "Submit Application"}
      </button>
    </form>
  );
}
