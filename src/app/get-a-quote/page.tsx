import QuoteForm from "@/components/forms/QuoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Project Quote - Visha IT Solutions",
  description: "Request a free project quote for your web development, digital marketing, recruitment, or training needs.",
};

export default function GetAQuotePage() {
  return (
    <div className="bg-surface min-h-[calc(100vh-200px)] pt-28 sm:pt-32 lg:pt-36 pb-20">
      <div className="container max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-1/3 flex flex-col gap-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
                Let's discuss your project
              </h1>
              <p className="text-secondary-light text-lg">
                Fill out the form and our team will get back to you within 24 hours with a customized proposal and next steps.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-secondary mb-2">What happens next?</h3>
              <ul className="text-secondary-light text-sm space-y-3 mt-4">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  We review your requirements carefully.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  Our technical team assesses feasibility and timeline.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  We contact you with a transparent, no-obligation quote.
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-2/3">
            <QuoteForm />
          </div>

        </div>
      </div>
    </div>
  );
}
