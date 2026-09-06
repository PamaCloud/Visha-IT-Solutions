"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/validators/contactValidator";
import { submitContactEnquiry } from "@/handlers/enquiryHandlers";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const result = await submitContactEnquiry(formData);
    
    if (result.success) {
      // Navigate to WhatsApp
      const phoneNumber = "917036592351";
      const text = `Hello Visha IT Solutions,%0A%0A*Name:* ${encodeURIComponent(data.fullName)}%0A*Email:* ${encodeURIComponent(data.email)}%0A*Subject:* ${encodeURIComponent(data.subject)}%0A*Message:* ${encodeURIComponent(data.message)}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
      window.open(whatsappUrl, '_blank');
      
      setSuccess(true);
      reset();
    } else {
      setServerError(result.message);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50/70 p-8 rounded-2xl border border-emerald-100 text-center flex flex-col items-center justify-center min-h-[340px]">
        <CheckCircle2 className="text-emerald-500 w-16 h-16 mb-4" />
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-600 text-base max-w-sm mx-auto mb-6">
          Thank you for reaching out. A senior solutions consultant will connect with you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-xs font-bold uppercase tracking-wider text-[hsl(195,100%,25%)] hover:underline cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
      {serverError && (
        <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold border border-rose-100">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Full Name *
          </label>
          <input
            {...register("fullName")}
            className="w-full h-12 px-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all shadow-2xs"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Email Address *
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full h-12 px-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all shadow-2xs"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
          Subject *
        </label>
        <input
          {...register("subject")}
          className="w-full h-12 px-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all shadow-2xs"
          placeholder="How can we help?"
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-rose-500 font-medium">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
          Message *
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full p-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all shadow-2xs resize-none"
          placeholder="Describe your requirements or inquiry..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-rose-500 font-medium">{errors.message.message}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-13 rounded-2xl bg-gradient-to-r from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,30%)] hover:from-[hsl(195,100%,18%)] hover:to-[hsl(195,100%,26%)] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_8px_24px_rgba(0,105,148,0.3)] hover:shadow-[0_12px_32px_rgba(0,105,148,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
