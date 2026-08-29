"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema, QuoteFormValues } from "@/validators/quoteValidator";
import { submitQuoteEnquiry } from "@/handlers/enquiryHandlers";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function QuoteForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      serviceRequired: "Other",
      preferredContactMethod: "Email",
      consent: true,
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const result = await submitQuoteEnquiry(formData);
    
    if (result.success) {
      setSuccess(true);
      reset();
    } else {
      setServerError(result.message);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center flex flex-col items-center justify-center min-h-[400px]">
        <CheckCircle2 className="text-green-500 w-16 h-16 mb-6" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">Thank you!</h3>
        <p className="text-green-800 text-lg">Our team will contact you shortly.</p>
        <button onClick={() => setSuccess(false)} className="mt-8 btn btn-outline">Submit Another Request</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      {serverError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Full Name *</label>
          <input
            {...register("fullName")}
            className="input-field"
            placeholder="John Doe"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Company Name</label>
          <input
            {...register("companyName")}
            className="input-field"
            placeholder="Company Inc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Business Email *</label>
          <input
            {...register("email")}
            type="email"
            className="input-field"
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Phone Number *</label>
          <input
            {...register("phone")}
            className="input-field"
            placeholder="+1 234 567 8900"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-2">Service Required *</label>
        <select {...register("serviceRequired")} className="input-field bg-white">
          <option value="E-Commerce">E-Commerce</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Recruitment">Recruitment</option>
          <option value="Training">Training</option>
          <option value="Other">Other</option>
        </select>
        {errors.serviceRequired && <p className="mt-1 text-sm text-red-500">{errors.serviceRequired.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-2">Project Description *</label>
        <textarea
          {...register("description")}
          rows={4}
          className="input-field resize-none"
          placeholder="Tell us about your requirements..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Budget Range</label>
          <select {...register("budgetRange")} className="input-field bg-white">
            <option value="">Select a range (Optional)</option>
            <option value="< $1k">Less than $1k</option>
            <option value="$1k - $5k">$1k - $5k</option>
            <option value="$5k - $10k">$5k - $10k</option>
            <option value="$10k+">$10k+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Preferred Contact Method</label>
          <select {...register("preferredContactMethod")} className="input-field bg-white">
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
          {errors.preferredContactMethod && <p className="mt-1 text-sm text-red-500">{errors.preferredContactMethod.message}</p>}
        </div>
      </div>

      <div className="flex items-start gap-3 mt-4">
        <input
          {...register("consent")}
          type="checkbox"
          id="consent"
          className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="consent" className="text-sm text-secondary-light">
          I consent to Visha IT Solutions collecting my details to respond to this enquiry according to the Privacy Policy.
        </label>
      </div>
      {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full py-4 text-lg mt-8 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={24} /> Processing...
          </>
        ) : (
          "Get a Free Project Quote"
        )}
      </button>
    </form>
  );
}
