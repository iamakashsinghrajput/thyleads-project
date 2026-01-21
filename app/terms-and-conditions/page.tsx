import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Thyleads",
  description: "Read the terms and conditions governing the use of Thyleads website and services.",
};

const sections = [
  {
    title: "1. Introduction",
    content: `Thyleads is a B2B outbound agency that builds high-conversion outbound systems for companies with established product-market fit. We combine GTM thinking, ICP refinement, hand-sourced prospecting, and strategic messaging to help our clients generate pipeline — not just meetings. These Terms apply to all visitors to our website and clients engaging in our services, whether under a paid agreement or through exploratory discussions.`,
  },
  {
    title: "2. Use of the Website",
    content: `You may use the Thyleads website for informational and non-commercial purposes only. You agree not to engage in any activity that could damage, disable, or impair the website or interfere with other users' access. You must not attempt to gain unauthorized access to any part of our site, its systems, or data, or use it in a way that violates any applicable laws or regulations.`,
  },
  {
    title: "3. Our Services",
    content: `Thyleads offers outbound strategy, prospect research, cold outreach campaigns, and related services. Each engagement is defined by a mutually agreed-upon scope of work, timeline, and deliverables outlined in a formal proposal or contract. We do not offer guarantees on the number of meetings, leads, or conversions unless explicitly stated in the agreement. Our services are custom-built and require collaboration, feedback, and strategic alignment from your team to succeed.`,
  },
  {
    title: "4. Intellectual Property",
    content: `All content on this website, including but not limited to text, graphics, logos, videos, documents, and software, is the property of Thyleads or its content providers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or exploit any content from our site or service deliverables without our written permission. Any custom assets, campaigns, or strategy documents developed during our engagement may be used by the client but may not be resold, repurposed, or distributed publicly without our prior consent.`,
  },
  {
    title: "5. Client Responsibilities",
    content: `Clients engaging with Thyleads must provide timely access to key stakeholders, necessary documentation, product information, and any prior sales or marketing data that can improve targeting and messaging. Delays caused by a client's failure to provide such information may impact timelines and deliverables. Clients are also responsible for reviewing and approving outreach materials, email copy, and prospect lists prior to launch.`,
  },
  {
    title: "6. Payment Terms",
    content: `All services are billed according to the payment schedule defined in your agreement or invoice. Payments are due within the timeframe specified — typically within 7 to 15 business days. Late payments may result in a temporary pause or termination of services. No refunds will be issued once work has commenced unless agreed upon in writing.`,
  },
  {
    title: "7. Confidentiality",
    content: `We respect the confidentiality of your data, ideas, and internal business information. Any information shared with us in the course of the engagement will be kept confidential and will not be disclosed to third parties without your explicit permission, except where required by law. Similarly, we expect clients to respect the confidentiality of our internal methods, strategies, and proprietary tools.`,
  },
  {
    title: "8. Disclaimers and Limitations",
    content: `While Thyleads makes every effort to deliver high-quality, strategic outbound campaigns, we do not guarantee specific results such as conversion rates, revenue growth, or close-won deals unless specifically committed to in writing. The performance of outbound campaigns can vary based on external factors beyond our control, such as market conditions, competition, or internal sales processes. To the fullest extent permitted by law, Thyleads shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.`,
  },
  {
    title: "9. Termination of Services",
    content: `Either party may terminate an engagement with written notice, subject to the termination terms in the signed agreement. Upon termination, the client is liable for any outstanding invoices and Thyleads will deliver any completed, approved assets up to that point. If termination occurs mid-month, pro-rata billing may apply depending on the work completed.`,
  },
  {
    title: "10. Changes to Terms",
    content: `We may update these Terms periodically to reflect changes in our practices, policies, or applicable laws. When we make changes, the "Effective Date" at the top will be updated accordingly. Continued use of our website or services after such changes constitutes your acceptance of the revised Terms.`,
  },
  {
    title: "11. Governing Law and Jurisdiction",
    content: `These Terms shall be governed by and interpreted in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising out of or relating to these Terms, our website, or our services will be subject to the exclusive jurisdiction of the courts located in Bengaluru.`,
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <main className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[160px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-white/60 text-lg">Effective Date: May 21, 2025</p>
          </div>

          {/* Introduction */}
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-white/70 text-lg leading-relaxed">
              By accessing this website or engaging with Thyleads Inc. (&ldquo;Thyleads&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), you agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;). These Terms govern your use of our website, services, and any communications between you and Thyleads.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mt-4">
              If you do not agree with these Terms, you should not use our website or engage our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <section key={idx} className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-white/70 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}

            {/* Contact Section */}
            <section className="rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">12. Contact Information</h2>
              <p className="text-white/70 mb-6">
                If you have any questions or concerns about these Terms, or if you would like to request access, updates, or deletion of any personal data, please contact us at:
              </p>
              <div className="space-y-4">
                <a href="mailto:sales@thyleads.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>sales@thyleads.com</span>
                </a>
                <a href="tel:+918769673818" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+91 87696 73818</span>
                </a>
                <div className="flex items-start gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>164, 1st Cross Rd, NGEF Layout, AECS Layout, Postal Colony, Sanjayanagara, Bengaluru, Karnataka 560094</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
