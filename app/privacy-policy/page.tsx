import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Thyleads",
  description: "Learn how Thyleads collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect both personal and non-personal information to operate effectively and provide you with the best possible experience. The types of information we collect include:

**Personal Information:** This includes data that can identify you as an individual, such as your name, email address, phone number, company name, job title, or any other details you voluntarily submit via forms, newsletters, or during direct communication.

**Non-Personal Information:** This refers to data that does not identify you directly, such as IP address, browser type, operating system, referring URLs, page visits, and interactions on our website. We use cookies and analytics tools (such as Google Analytics) to gather this information for performance and user experience improvement.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect for the following purposes:`,
    list: [
      "To provide and manage our services",
      "To communicate with you, including responding to inquiries and support requests",
      "To personalize your experience and offer tailored recommendations",
      "To analyze website usage, improve performance, and optimize content",
      "To send marketing communications (if you've opted in)",
      "To comply with legal obligations and prevent fraudulent activity",
    ],
    footer: "We will never sell your personal information to third parties.",
  },
  {
    title: "3. Cookies and Tracking Technologies",
    content: `Thyleads uses cookies and similar technologies to enhance your experience on our site. Cookies help us understand how users interact with our website, so we can improve functionality and performance. You may choose to disable cookies via your browser settings, although this may limit certain features of the site.`,
  },
  {
    title: "4. Data Sharing and Disclosure",
    content: `We do not share your personal data with third parties unless it is necessary to fulfill our services or required by law. In specific cases, we may work with trusted third-party vendors (such as CRM tools, analytics platforms, or email delivery services) who process data on our behalf under strict confidentiality agreements.

We may also disclose personal data:`,
    list: [
      "To comply with legal requirements or enforce our Terms and Conditions",
      "In connection with a business transfer (such as a merger or acquisition)",
      "To protect our rights, property, or safety",
    ],
  },
  {
    title: "5. Data Retention",
    content: `We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. The retention period may vary depending on the nature of the data and our legal or contractual obligations. Once your data is no longer needed, we will securely delete or anonymize it.`,
  },
  {
    title: "6. Your Rights",
    content: `If you are located in a jurisdiction with applicable data privacy laws (such as GDPR or CCPA), you have the right to:`,
    list: [
      "Access the personal data we hold about you",
      "Request correction or deletion of your personal data",
      "Object to or restrict the processing of your personal data",
      "Withdraw consent at any time (where applicable)",
      "Lodge a complaint with a data protection authority",
    ],
    footer: "To exercise these rights, you may contact us at sales@thyleads.com.",
  },
  {
    title: "7. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your data from unauthorized access, misuse, loss, or disclosure. However, no system can be guaranteed 100% secure. We recommend that you take precautions to protect your own data when using the internet.`,
  },
  {
    title: "8. Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or policies of these external sites. We encourage you to read their privacy policies before interacting with them.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our services and website are intended for a professional audience and are not directed toward children under the age of 13. We do not knowingly collect or solicit personal data from children. If we become aware that we have inadvertently collected data from a child, we will delete it promptly.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal compliance. When we do, we will revise the "Effective Date" at the top of the page. We encourage you to review this page periodically for any updates.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <main className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[160px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-white/60 text-lg">Effective Date: May 21, 2025</p>
          </div>

          {/* Introduction */}
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-white/70 text-lg leading-relaxed">
              Thyleads Inc. (&ldquo;Thyleads,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to respecting your privacy and protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and disclose your information when you visit our website or engage with our services.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mt-4">
              By accessing our website or submitting your information to us, you consent to the practices outlined in this Privacy Policy.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <section key={idx} className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{section.title}</h2>
                <div className="text-white/70 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.footer && (
                  <p className="mt-4 text-white/70 font-medium">{section.footer}</p>
                )}
              </section>
            ))}

            {/* Contact Section */}
            <section className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-white/70 mb-6">
                If you have any questions or concerns about this Privacy Policy or your personal data, please contact us at:
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
