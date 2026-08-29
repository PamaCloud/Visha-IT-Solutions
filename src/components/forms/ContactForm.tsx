"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/validators/contactValidator";
import { submitContactEnquiry } from "@/handlers/enquiryHandlers";
import { CheckCircle2, Loader2 } from "lucide-react";

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
      const text = `Hello Visha IT Solutions,%0A%0A*Name:* ${data.fullName}%0A*Email:* ${data.email}%0A*Subject:* ${data.subject}%0A*Message:* ${data.message}`;
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
      <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center flex flex-col items-center justify-center min-h-[300px]">
        <CheckCircle2 className="text-green-500 w-16 h-16 mb-6" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
        <p className="text-green-800 text-lg">Thank you for reaching out. We will reply soon.</p>
        <button onClick={() => setSuccess(false)} className="mt-6 btn btn-outline">Send Another Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-secondary mb-1.5">Full Name *</label>
          <input
            {...register("fullName")}
            className="w-full bg-surface/50 border border-gray-200 text-secondary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            placeholder="John Doe"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-500 font-medium">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-secondary mb-1.5">Email Address *</label>
          <input
            {...register("email")}
            type="email"
            className="w-full bg-surface/50 border border-gray-200 text-secondary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500 font-medium">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-secondary mb-1.5">Subject *</label>
        <input
          {...register("subject")}
          className="w-full bg-surface/50 border border-gray-200 text-secondary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
          placeholder="How can we help?"
        />
        {errors.subject && <p className="mt-1 text-sm text-red-500 font-medium">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-secondary mb-1.5">Message *</label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full bg-surface/50 border border-gray-200 text-secondary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] resize-none"
          placeholder="Your message here..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500 font-medium">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark focus:ring-4 focus:ring-primary/20 transition-all duration-300 shadow-[0_8px_20px_rgba(14,165,233,0.3)] shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={24} /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
