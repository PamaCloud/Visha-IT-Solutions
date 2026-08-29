import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Visha IT Solutions",
  description: "Terms and Conditions for Visha IT Solutions.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold text-secondary mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-lg max-w-none text-secondary-light">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">2. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, Visha IT Solutions and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
          </p>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">3. Restrictions</h2>
          <p>
            You are specifically restricted from all of the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
            <li>publishing any Website material in any other media;</li>
            <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
            <li>publicly performing and/or showing any Website material;</li>
            <li>using this Website in any way that is or may be damaging to this Website;</li>
            <li>using this Website in any way that impacts user access to this Website;</li>
          </ul>

          <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall Visha IT Solutions, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Visha IT Solutions, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
          </p>
        </div>
      </div>
    </div>
  );
}
