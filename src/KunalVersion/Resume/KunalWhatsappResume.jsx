// src/components/KunalWhatsappResume.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import kunalPhoto from "../../assets/images/kunal.png";
import {
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Icons for contact info

export function KunalWhatsappResume1() {
  // Create a reference to the resume content
  const resumeRef = useRef(null);

  // Function to handle PDF download
  const handleDownloadPdf = () => {
    const input = resumeRef.current;

    console.log("Resume Ref:", input);

    if (!input) {
      console.error("No resume content to capture");
      alert("Failed to generate PDF. Please try again.");
      return;
    }

    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if necessary
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("Kunal_Whatsapp_Resume.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-[#ECE5DD] text-gray-900 font-sans">
      {/* 
        1) HEADER / BANNER
           - WhatsApp-themed banner with "Be the Change"
      */}
      <header className="relative w-full h-48 bg-gradient-to-r from-[#25D366] via-[#075E54] to-[#25D366] flex items-center justify-center">
        <div className="absolute inset-0 bg-white bg-opacity-10"></div>
        <div className="relative text-center">
          {/* Replace this URL with a local image if desired */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            className="mx-auto w-20 h-20 mb-2"
          />
          <p className="text-lg font-semibold">Be the Change</p>
        </div>
      </header>

      {/* 
        2) CONTACT BAR
           - Displaying location, email, phone, LinkedIn, etc. 
      */}
      <div className="bg-[#075E54] px-4 py-2 text-sm flex flex-wrap items-center justify-center gap-4">
        <span>Location: Gurugram, India</span>
        <span>|</span>
        <span>Email: kunal1274@gmail.com</span>
        <span>|</span>
        <span>Phone: +91-93134-94641</span>
        <span>|</span>
        <a
          href="https://www.linkedin.com/in/sample"
          className="underline text-green-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/sample
        </a>
      </div>

      {/* 
        3) MAIN CONTENT 
        - Two-column layout: Left Sidebar and Main Content
      */}
      <main
        className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        ref={resumeRef}
      >
        {/* LEFT SIDEBAR */}
        <aside className="md:col-span-1 bg-[#DCF8C6] p-6 rounded-md space-y-6">
          {/* Photo Section */}
          <div className="relative text-center">
            <img
              src={kunalPhoto}
              alt="Kunal Photo"
              className="mx-auto w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#075E54] transition-transform duration-300 transform hover:scale-105"
            />
            <p className="text-md font-medium mt-2 text-[#075E54]">
              Being the Change
            </p>
          </div>

          {/* SKILLS */}
          <section>
            <h2 className="text-xl font-semibold text-[#25D366] mb-4">
              SKILLS
            </h2>
            {/* Functional Expertise */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#075E54] mb-2">
                Functional Expertise
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
                <li>
                  D365 Finance & Ops (AX): Financials, Trade & Logistics,
                  Project Mgmt. & Accounting, Service Mgmt.
                </li>
                <li>
                  Security Roles, Data Migration (DMF), Bank Integrations
                  (host-to-host/API), GST e-Invoice
                </li>
                <li>
                  ISVs: Hitachi, To-Increase (Construction), Dynaway EAM, SK
                  Banking, Fast Path Reporting, Commodity Trading & Risk Mgmt.
                </li>
                <li>
                  Docs & Deliverables: BPD, FRD, Gap-Fit, FDD, TDD, SLD, UAT,
                  Support
                </li>
              </ul>
            </div>
            {/* Technical Expertise */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#075E54] mb-2">
                Technical Expertise
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
                <li>Basic C#.NET, X++, LCS, Azure DevOps</li>
                <li>Python, React, Django, Flask, Postgres (Beginner)</li>
              </ul>
            </div>
            {/* AX Versions */}
            <div>
              <h3 className="text-lg font-bold text-[#075E54] mb-2">
                AX Versions
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
                <li>D365 F&O, AX 2012 R2/R3, AX 2009, AX 4.0, AX 3.0</li>
              </ul>
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section>
            <h2 className="text-xl font-semibold text-[#25D366] mb-4">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
              <li>Microsoft Certified in Dynamics AX 2012 Financials</li>
              <li>Microsoft Certified in Dynamics AX 2012 PM & Accounting</li>
              <li>Microsoft Certified in Dynamics AX 2009 & AX 2012 T&L</li>
              <li>
                Microsoft Certified in D365 for Finance & Ops – Financials
              </li>
              <li>Microsoft Certified in D365 for Finance & Ops – Retail</li>
            </ul>
          </section>

          {/* ACHIEVEMENTS & RECOGNITION */}
          <section>
            <h2 className="text-xl font-semibold text-[#25D366] mb-4">
              ACHIEVEMENTS & RECOGNITION
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
              <li>Highly Appreciated (2024–25) for Project Mgmt. excellence</li>
              <li>Twice promoted at Sonata (2019 & 2020)</li>
              <li>7/7 CSAT from multiple clients</li>
              <li>Recommended for L1B Visa (Hitachi Solutions America)</li>
              <li>Best Support Consultant on TVS & Sons project</li>
              <li>
                Extensive sports & academic honors (cricket, track & field)
              </li>
            </ul>
          </section>

          {/* VOLUNTEER */}
          <section>
            <h2 className="text-xl font-semibold text-[#25D366] mb-4">
              VOLUNTEER
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
              <li>
                World Science Festival, World Vision, WWF, Greenpeace, SGI,
                Ketto
              </li>
              <li>Active in social causes & community events</li>
            </ul>
          </section>
        </aside>

        {/* MAIN CONTENT */}
        <section className="md:col-span-2 space-y-6">
          {/* PROFESSIONAL SUMMARY */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-[#25D366] mb-4">
              PROFESSIONAL SUMMARY
            </h1>
            <p className="text-sm leading-relaxed text-gray-800">
              Enthusiastic, 14.3+ years experienced D365 F&O (AX) consultant
              with deep functional expertise across Financials, Trade &
              Logistics, Project Management & Accounting, and Service
              Management. Skilled in end-to-end implementations (24+ full cycle)
              and global team management. Recognized for driving client success,
              integrations, and strategic initiatives. Adept at stakeholder
              communication, collaboration, and adopting modern technologies
              (AI, Copilot, Azure) to maximize business value.
            </p>
          </div>

          {/* CORE COMPETENCIES */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#25D366] mb-4">
              CORE COMPETENCIES
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                <strong>Functional Solutions Leadership:</strong> Comprehensive
                knowledge of D365 FO
              </li>
              <li>
                <strong>Project Management:</strong> Led 40+ team members across
                multiple geographies
              </li>
              <li>
                <strong>Integration Expertise:</strong> Bank host-to-host, DHL,
                AI/Copilot, commodity trading
              </li>
              <li>
                <strong>Continuous Improvement:</strong> Passion for process
                optimization, testing, user adoption
              </li>
              <li>
                <strong>Client Satisfaction:</strong> 7/7 CSAT from multiple
                implementations
              </li>
            </ul>
          </div>

          {/* EXPERIENCE */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#25D366] mb-4">
              EXPERIENCE
            </h2>

            {/* COGNIZANT */}
            <div className="mb-6">
              <h3 className="text-gray-900 font-bold">
                1) COGNIZANT TECHNOLOGY SOLUTIONS
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Role: D365 F&O Project Manager / Financials Lead | Tenure: 2 yrs
                3+ mos
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                <li>
                  <strong>AUS-Based Client (24)</strong> &lt;Medical
                  Equipment&gt; (Aug ’24 – Present)
                  <ul className="list-disc list-inside ml-5">
                    <li>Led D365 F&O with 20+ integrations (DHL, 3M, etc.)</li>
                    <li>Oversaw 40-member cross-functional team</li>
                  </ul>
                </li>
                <li className="mt-2">
                  <strong>Multi-Location Client (23)</strong> &lt;AI &
                  Copilot&gt; (Mar ’24 – Jul ’24)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      Architected D365 FO Copilot integration, AI-based
                      workflows
                    </li>
                  </ul>
                </li>
                <li className="mt-2">
                  <strong>Qatar Airways (22)</strong> (Apr ’23 – Feb ’24)
                  <ul className="list-disc list-inside ml-5">
                    <li>Financials Lead, SCM, large-scale integrations</li>
                  </ul>
                </li>
                <li className="mt-2">
                  <strong>Community Fibre (21)</strong> (Sep ’22 – Present)
                  <ul className="list-disc list-inside ml-5">
                    <li>Financials Lead for UK fiber net, UK localizations</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* SONATA SOFTWARE */}
            <div className="mb-6">
              <h3 className="text-gray-900 font-bold">
                2) SONATA SOFTWARE SOLUTIONS PVT. LTD.
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Role: D365 Finance Lead / Sr. Consultant | Tenure: 4 yrs
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                <li>
                  <strong>DRA Pacific & GSE Global (20)</strong> &lt;Mining&gt;
                  (Mar ’21 – Present)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      Finance Lead, multi-country rollouts, MR & integrations
                    </li>
                  </ul>
                </li>
                <li className="mt-2">
                  <strong>Commodity Trading & Risk Mgmt. (18,19)</strong> (Dec
                  ’19 – Feb ’21)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      Specialized commodity trading module bridging SCM &
                      finance
                    </li>
                  </ul>
                </li>
                <li className="mt-2">
                  <strong>ETG Global (16)</strong> (Jun ’20 – Feb ’21)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      Africa-based rollout, integrated Management Reporter
                    </li>
                  </ul>
                </li>
                <li className="mt-2">
                  <strong>Washington Football Team (15)</strong> (Feb ’20 – May
                  ’20)
                  <ul className="list-disc list-inside ml-5">
                    <li>Finance lead for US sports franchise</li>
                  </ul>
                </li>
                <li className="mt-2">
                  <strong>WSP / Louis Berger (14)</strong> (Feb ’19 – Jan ’20)
                  <ul className="list-disc list-inside ml-5">
                    <li>Disaster mgmt. org, robust project accounting</li>
                  </ul>
                </li>
                <li className="mt-2">
                  <strong>Normet Intl (13)</strong> (Aug ’18 – Jan ’19)
                  <ul className="list-disc list-inside ml-5">
                    <li>PM + finance lead, global mining chemicals</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* HITACHI SOLUTIONS */}
            <div className="mb-6">
              <h3 className="text-gray-900 font-bold">
                3) HITACHI SOLUTIONS INDIA/AMERICA
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Role: Senior AX/D365 Consultant | Tenure: 4 years
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                <li>
                  Multiple onsite US implementations (Agriculture, Government
                  Port, etc.)
                </li>
                <li>Specialized in AX 2012 R2/R3, early D365</li>
                <li>Data migration, custom security roles</li>
              </ul>
            </div>

            {/* WIPRO */}
            <div>
              <h3 className="text-gray-900 font-bold">
                4) WIPRO INFOTECH PVT. LTD. INDIA/UAE
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Role: AX Functional Consultant | Tenure: 4 yrs
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                <li>
                  Managed 6 major AX implementations (Retail, Steel,
                  Manufacturing)
                </li>
                <li>Migrations: AX 3.0 → AX 2009, AX 4.0 → AX 2012</li>
                <li>
                  Recognized for meeting tight deadlines & cost reductions
                </li>
              </ul>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#25D366] mb-4">
              EDUCATION
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                Pursuing MS in Computer Sciences [Executive from Scaler Academy]
              </li>
              <li>
                B. Tech in Electronics & Communication (2006–2010), CGPA 8.6/10
              </li>
              <li>12 Years Schooling: Std. X (85%), Std. XII (65.6%)</li>
            </ul>
          </div>

          {/* ADDITIONAL HIGHLIGHTS */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#25D366] mb-4">
              ADDITIONAL HIGHLIGHTS
            </h2>
            <div className="md:flex md:space-x-6">
              {/* Motivation & Leadership */}
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-[#075E54] mb-2">
                  Motivation & Leadership
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>Praised by customers for swift project turnarounds</li>
                  <li>
                    Demonstrated cross-functional leadership in global teams
                  </li>
                </ul>
              </div>

              {/* Academic & Sports Achievements */}
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-[#075E54] mb-2">
                  Academic & Sports Achievements
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>Topper in 6 of 8 semesters during B. Tech</li>
                  <li>
                    Represented school in cricket & track, numerous awards
                  </li>
                </ul>
              </div>
            </div>

            {/* Hobbies/Passions */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-[#075E54] mb-2">
                Hobbies/Passions
              </h3>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                <li>
                  Research, Arts/Crafts, Environmental & Social Volunteering
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* 
        4) DOWNLOAD BUTTON 
           - Positioned below the main content and outside the resumeRef
      */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 flex items-center space-x-2"
        >
          {/* WhatsApp Download Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.88 3.549A11.952 11.952 0 0112 2c-6.627 0-12 5.373-12 12 0 2.227.606 4.308 1.652 6.09L1 21l4.773-1.652C6.65 19.607 8.728 20.213 11 20.213c6.627 0 12-5.373 12-12 0-2.272-.606-4.35-1.652-6.141l.001-.001z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 17.232l-2.122-2.122m4.242-4.242l-2.121-2.121M9.88 9.88l-2.121 2.121M7.758 16.242l2.121-2.121"
            />
          </svg>
          <span>Download as PDF</span>
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#075E54] text-center text-xs text-gray-200 py-3">
        © 2025 WhatsApp-Themed Resume. Be the Change.
      </footer>
    </div>
  );
}

export default function KunalWhatsappResume() {
  // Reference to the resume content for PDF generation
  const resumeRef = useRef(null);

  // Function to handle PDF download
  const handleDownloadPdf = () => {
    const input = resumeRef.current;

    if (!input) {
      console.error("No resume content to capture");
      alert("Failed to generate PDF. Please try again.");
      return;
    }

    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if necessary
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("Kunal_Whatsapp_Resume.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
      });
  };

  return (
    <>
      <div
        ref={resumeRef}
        className="min-h-screen bg-[#ECE5DD] text-gray-900 font-sans"
      >
        {/* 
        1) HEADER / BANNER
           - WhatsApp-themed banner with "Be the Change"
      */}
        <header className="relative w-full h-48 bg-gradient-to-r from-[#25D366] via-[#075E54] to-[#25D366] flex items-center justify-center">
          <div className="absolute inset-0 bg-white bg-opacity-10"></div>
          <div className="relative text-center">
            {/* WhatsApp Logo */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp Logo"
              className="mx-auto w-20 h-20 mb-2"
            />
            <p className="text-lg font-semibold text-white">Be the Change</p>
          </div>
        </header>

        {/* 
        2) CONTACT BAR
           - Displaying location, email, phone, LinkedIn, etc. 
      */}
        <div className="bg-[#075E54] px-4 py-3 text-sm flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-white" />
            <span className="text-white">Gurugram, India</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-white" />
            <span className="text-white">kunal1274@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone className="text-white" />
            <span className="text-white">+91-93134-94641</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaLinkedin className="text-white" />
            <a
              href="https://www.linkedin.com/in/sample"
              className="underline text-green-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/sample
            </a>
          </div>
        </div>

        {/* 
        3) MAIN CONTENT 
        - Two-column layout: Left Sidebar and Main Content
      */}
        <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="md:col-span-1 bg-[#DCF8C6] p-6 rounded-md space-y-6 shadow-lg">
            {/* Photo Section */}
            <div className="relative text-center">
              <img
                src={kunalPhoto}
                alt="Kunal Photo"
                className="mx-auto w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#075E54] transition-transform duration-300 transform hover:scale-105"
              />
              <p className="text-md font-medium mt-2 text-[#075E54]">
                Being the Change
              </p>
            </div>

            {/* SKILLS */}
            <section>
              <h2 className="text-xl font-semibold text-[#25D366] mb-4">
                SKILLS
              </h2>
              {/* Functional Expertise */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-[#075E54] mb-2">
                  Functional Expertise
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                  <li>
                    Financials | Trade and Logistics | Project Management and
                    Accounting | Service Management
                  </li>
                  <li>
                    Custom Security Roles | Data Migration through DMF, Excel
                    Add-ins
                  </li>
                  <li>
                    Bank Integrations – host to host and API Integration | GST
                    India e-Invoice Integration
                  </li>
                  <li>
                    ISVs: Hitachi, To-Increase Construction, Dynaway EAM, SK
                    Banking, Fast Path Reporting
                  </li>
                  <li>
                    Documentation: BPD, FRD, Gap-Fit, FDD, TDD, SLD, Testing,
                    User Manuals, Value Prop, Proposals, Press Releases, Pilot
                    Implementation, Blogs, UAT, Support Lead
                  </li>
                  <li>Handling Consultants – Developers and Functional</li>
                </ul>
              </div>
              {/* Technical Expertise */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-[#075E54] mb-2">
                  Technical Expertise
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                  <li>
                    Dynamics 365 Finance & Operations (D365FO) | Basic C#.NET |
                    Basic X++
                  </li>
                  <li>
                    AX Table Structure | AX Installation & Configuration | LCS |
                    LCS Code Deployments | LCS BPM | Basic Azure DevOps
                  </li>
                  <li>
                    Beginner Level: Python, React, Django, Flask, Postgres
                  </li>
                  <li>
                    Latest AX Versions: D365FO, AX 2012 R2/R3, AX 2009, AX 4.0,
                    AX 3.0
                  </li>
                  <li>
                    ISVs Worked On: Commodity Trading and Risk Management,
                    Dataverse to External Web Apps (React), Construction
                    Management, Property Management
                  </li>
                </ul>
              </div>
              {/* Implementations */}
              <div>
                <h3 className="text-lg font-bold text-[#075E54] mb-2">
                  Implementations
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                  <li>
                    Total Implementations: 24 Projects | End-to-End: 20 Projects
                  </li>
                </ul>
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section>
              <h2 className="text-xl font-semibold text-[#25D366] mb-4">
                CERTIFICATIONS
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>Microsoft Certified in Dynamics AX 2012 Financials</li>
                <li>
                  Microsoft Certified in Dynamics AX 2012 Project Management and
                  Accounting
                </li>
                <li>
                  Microsoft Certified in Dynamics AX 2009 and AX 2012 Trade and
                  Logistics
                </li>
                <li>
                  Microsoft Certified in Dynamics 365 for Finance and Operations
                  – Financials
                </li>
                <li>
                  Microsoft Certified in Dynamics 365 for Finance and Operations
                  – Retail
                </li>
              </ul>
            </section>

            {/* ACHIEVEMENTS & RECOGNITION */}
            <section>
              <h2 className="text-xl font-semibold text-[#25D366] mb-4">
                ACHIEVEMENTS & RECOGNITION
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  Highly Appreciated (2024–25) for Project Management excellence
                </li>
                <li>
                  Twice promoted at Sonata Software Solutions (2019 & 2020)
                </li>
                <li>CSAT Rating: 7/7 from multiple clients</li>
                <li>
                  Recommended for L1B Visa with Hitachi Solutions America Ltd.
                  (2016)
                </li>
                <li>
                  Best Support Consultant on TV Sundaram Iyengar & Sons project
                </li>
                <li>
                  Extensive sports & academic honors (Cricket, Track & Field)
                </li>
              </ul>
            </section>

            {/* VOLUNTEER */}
            <section>
              <h2 className="text-xl font-semibold text-[#25D366] mb-4">
                VOLUNTEER
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  World Science Festival | World Science U | WWF | World Vision
                  | Greenpeace | SGI | Ketto
                </li>
                <li>Active in social causes & community events</li>
              </ul>
            </section>
          </aside>

          {/* MAIN CONTENT */}
          <section className="md:col-span-2 space-y-6">
            {/* PROFESSIONAL SUMMARY */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h1 className="text-2xl font-bold text-[#25D366] mb-4">
                PROFESSIONAL SUMMARY
              </h1>
              <p className="text-sm leading-relaxed text-gray-800">
                My educational background, combined with over 14.3+ years of
                professional experience, positions me as a highly qualified
                candidate for this role. Throughout my career, I have
                consistently earned recognition for my dedication and
                performance, leading to promotions and increased
                responsibilities. These achievements are a testament to my
                expertise in Functional Dynamics 365 Finance and Operations
                (previously Dynamics AX), my unwavering commitment to continuous
                professional growth, and my strong written and verbal
                communication skills.
              </p>
            </div>

            {/* CORE COMPETENCIES */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-[#25D366] mb-4">
                CORE COMPETENCIES
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  <strong>Functional Solutions Leadership:</strong>{" "}
                  Comprehensive knowledge of D365 FO
                </li>
                <li>
                  <strong>Project Management:</strong> Led 40+ team members
                  across multiple geographies
                </li>
                <li>
                  <strong>Integration Expertise:</strong> Bank host-to-host,
                  DHL, AI/Copilot, commodity trading
                </li>
                <li>
                  <strong>Continuous Improvement:</strong> Passion for process
                  optimization, testing, user adoption
                </li>
                <li>
                  <strong>Client Satisfaction:</strong> CSAT Rating of 7/7 from
                  multiple implementations
                </li>
              </ul>
            </div>

            {/* EXPERIENCE */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-[#25D366] mb-4">
                EXPERIENCE
              </h2>

              {/* Cognizant Technology Limited */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-bold">
                  Cognizant Technology Limited
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Role: D365 F&O Project Manager / Financials Lead | Tenure: 2
                  yrs 3+ mos
                </p>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  {/* Project 24 */}
                  <li>
                    <strong>AUS-Based Client (24)</strong> &lt;Medical Equipment
                    and Healthcare&gt; (Aug’24 – Present)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Project Manager |
                        Financials Lead | SCM | MR | Integrations | DHL
                        Integrations | 20 Interface Integrations
                      </li>
                      <li>
                        Managed a team of 40 members handling EMEA, Canada, and
                        AUS implementations and support
                      </li>
                      <li>Next USA Implementation in the pipeline</li>
                    </ul>
                  </li>
                  {/* Project 23 */}
                  <li className="mt-2">
                    <strong>Multi-Location Client (23)</strong> &lt;AI and
                    Copilot Solution Architect and Development&gt; (Mar’24 –
                    Jul’24)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 FO Copilot – Solution Architect | Demo | AI |
                        Copilot and Integrations
                      </li>
                    </ul>
                  </li>
                  {/* Project 22 */}
                  <li className="mt-2">
                    <strong>Qatar Airways (22)</strong> &lt;Duty Free and
                    Airways&gt; (Apr’23 – Feb’24)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials Lead | SCM | MR
                        | Integrations
                      </li>
                    </ul>
                  </li>
                  {/* Project 21 */}
                  <li className="mt-2">
                    <strong>Community Fibre (21)</strong> &lt;Network and Fiber
                    Net&gt; (Sep’22 – Present)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials Lead | SCM | MR
                        | Integrations | UK Localizations
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Sonata Software Solutions Private Limited */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-bold">
                  Sonata Software Solutions Private Limited
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Role: D365 Finance Lead / Sr. Consultant | Tenure: 4 yrs
                </p>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  {/* Project 20 */}
                  <li>
                    <strong>DRA Pacific & GSE Global (20)</strong>{" "}
                    &lt;Underground Mining Chemicals Equipment&gt; (Mar’21 –
                    Present)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials Lead | MR |
                        Integrations
                      </li>
                      <li>Managed multi-country rollouts and integrations</li>
                    </ul>
                  </li>
                  {/* Project 19 */}
                  <li className="mt-2">
                    <strong>DRA Global (19)</strong> &lt;Underground Mining
                    Chemicals Equipment&gt; (Mar’21 – Present)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials Lead | MR |
                        Integrations
                      </li>
                      <li>
                        Supported global implementations across 100+ countries
                      </li>
                    </ul>
                  </li>
                  {/* Project 18 & 17 */}
                  <li className="mt-2">
                    <strong>
                      Commodity Trading and Risk Management (18,19)
                    </strong>{" "}
                    &lt;Commodity Trading and Risk Management&gt; (Dec’19 –
                    Feb’21)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials Lead | SCM Lead
                        | New Module Commodity Trading and Risk Management
                      </li>
                    </ul>
                  </li>
                  {/* Project 16 */}
                  <li className="mt-2">
                    <strong>ETG Global (16)</strong> &lt;Commodity Trading and
                    Risk Management&gt; (Jun’20 – Feb’21)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials Lead | SCM | MR
                      </li>
                      <li>
                        Africa-based rollout | Integrated Management Reporter
                      </li>
                    </ul>
                  </li>
                  {/* Project 15 */}
                  <li className="mt-2">
                    <strong>Washington Football Team (15)</strong> &lt;American
                    Football Team&gt; (Feb’20 – May’20)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials Lead Sr.
                        Consultant | MR
                      </li>
                      <li>
                        Managed financial operations for a major US sports
                        franchise
                      </li>
                    </ul>
                  </li>
                  {/* Project 14 */}
                  <li className="mt-2">
                    <strong>WSP / Louis Berger (14)</strong> &lt;Global/National
                    Epidemic and Disaster Management&gt; (Feb’19 – Jan’20)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials Lead Consultant
                        | MR | Project Management and Accounting
                      </li>
                      <li>
                        Managed robust project accounting and disaster
                        management operations
                      </li>
                    </ul>
                  </li>
                  {/* Project 13 */}
                  <li className="mt-2">
                    <strong>Normet Intl (13)</strong> &lt;Underground Mining
                    Chemicals Equipment&gt; (Aug’18 – Jan’19)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials | SCM | Project
                        Management and Accounting | Bank Integration | Acting PM
                        cum Lead Role
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Hitachi Solutions India/America */}
              <div className="mb-6">
                <h3 className="text-gray-900 font-bold">
                  Hitachi Solutions India/America
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Role: Senior AX/D365 Consultant | Tenure: 3 yrs 10 mos
                </p>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  {/* Project 12 */}
                  <li>
                    <strong>Agriculture & Farming (12)</strong> &lt;Agriculture
                    & Farming&gt; (Dec’17 – July’18)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        D365 Finance and Operations – Financials | SCM | Project
                        Management and Accounting
                      </li>
                    </ul>
                  </li>
                  {/* Project 11 */}
                  <li className="mt-2">
                    <strong>
                      US Gov & Port & Property & Lease Management (11)
                    </strong>{" "}
                    &lt;US Gov & Port & Property & Lease Management&gt; (Feb’18
                    – Jul’18)
                    <ul className="list-disc list-inside ml-5">
                      <li>AX 2012 R3 Financials</li>
                    </ul>
                  </li>
                  {/* Project 10 */}
                  <li className="mt-2">
                    <strong>Research & Chemicals & Allergy (10)</strong>{" "}
                    &lt;Research & Chemicals & Allergy&gt; (May’17 – Jul’18)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        AX 2012 R3 Financials | Project Management and
                        Accounting | Production | Inventory
                      </li>
                    </ul>
                  </li>
                  {/* Project 9 */}
                  <li className="mt-2">
                    <strong>
                      US Gov & Security & Scanning & Airports & Rockets &
                      Electronics (9)
                    </strong>{" "}
                    &lt;US Gov & Security & Scanning & Airports & Rockets &
                    Electronics&gt; (Dec’16 – Apr’17)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        AX 2012 R3 Financials | Project Management and
                        Accounting | Service Management
                      </li>
                    </ul>
                  </li>
                  {/* Project 8 */}
                  <li className="mt-2">
                    <strong>Franchise TV Stations (8)</strong> &lt;Franchise TV
                    Stations&gt; (Oct’15 – Nov’16)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        AX 2012 R3 Financials | Project Management and
                        Accounting | Security Roles | Data Migration
                      </li>
                    </ul>
                  </li>
                  {/* Project 7 */}
                  <li className="mt-2">
                    <strong>Hitachi IP Construction EAM Mobile Apps (7)</strong>{" "}
                    &lt;Hitachi IP Construction EAM Mobile Apps&gt; (Oct’14 –
                    Oct’15)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        AX 2012 R2/R3 | CTP 6 in Financials | Project Management
                        and Accounting | Services | Product Development Team
                      </li>
                      <li>
                        Hitachi + To-Increase Construction | Hitachi + Dynaway
                        Enterprise Asset Management
                      </li>
                      <li>
                        Value Propositions | Press Releases | Mobile Apps
                        Development and Testing
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Wipro Infotech Pvt. Ltd. */}
              <div>
                <h3 className="text-gray-900 font-bold">
                  Wipro Infotech Pvt. Ltd.
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Role: AX Functional Consultant | Tenure: 4 yrs
                </p>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  {/* Project 6 */}
                  <li>
                    <strong>
                      Credit Debit Cards & Mall & Ski Dubai & Waterpark & Magic
                      Planets & Health & Charity & Toy Store (6)
                    </strong>{" "}
                    &lt;Credit Debit Cards & Mall & Ski Dubai & Waterpark &
                    Magic Planets & Health & Charity & Toy Store&gt; (May’13 -
                    Sep’14)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        AX 2012 R2 Financials | Security Roles | Data Migration
                      </li>
                    </ul>
                  </li>
                  {/* Project 5 */}
                  <li className="mt-2">
                    <strong>Steel Pipes (5)</strong> &lt;Steel Pipes&gt; (Nov’12
                    – May’13)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        AX 2009 Financials | Trade and Logistics | Basic
                        Production
                      </li>
                    </ul>
                  </li>
                  {/* Project 4 */}
                  <li className="mt-2">
                    <strong>Pens Manufacturing (4)</strong> &lt;Pens
                    Manufacturing&gt; (Nov’12 – May’13)
                    <ul className="list-disc list-inside ml-5">
                      <li>AX 2009 Financials | Trade and Logistics</li>
                    </ul>
                  </li>
                  {/* Project 3 */}
                  <li className="mt-2">
                    <strong>McDonalds Franchise (3)</strong> &lt;McDonalds
                    Franchise&gt; (Jul’12 - Oct’13)
                    <ul className="list-disc list-inside ml-5">
                      <li>AX 2012 Financials | Basic Production</li>
                    </ul>
                  </li>
                  {/* Project 2 */}
                  <li className="mt-2">
                    <strong>Jewelry (2)</strong> &lt;Jewelry&gt; (Nov’11 –
                    Aug’12)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        Migration from AX 4.0 to AX 2009 in Financials | Trade
                        and Logistics
                      </li>
                    </ul>
                  </li>
                  {/* Project 1 */}
                  <li className="mt-2">
                    <strong>Automobiles & Dealer & POS (1)</strong>{" "}
                    &lt;Automobiles & Dealer & POS&gt; (Oct’10 - Oct’11)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        Migration from AX3.0 to AX 2009 in Trade and Logistics |
                        X++ Reports | BI and SSRS | AX Installation and
                        Configuration
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* EDUCATION */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-[#25D366] mb-4">
                EDUCATION
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  12 Years of Regular Schooling (Std. X = 85%, Std. XII = 65.6%)
                </li>
                <li>
                  Bachelor of Technology in Electronics and Communication
                  (2006-2010): CGPA = 8.6/10
                </li>
              </ul>
            </div>

            {/* ADDITIONAL HIGHLIGHTS */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-[#25D366] mb-4">
                ADDITIONAL HIGHLIGHTS
              </h2>
              <div className="md:flex md:space-x-6">
                {/* Motivation & Leadership */}
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <h3 className="text-lg font-bold text-[#075E54] mb-2">
                    MOTIVATION & LEADERSHIP
                  </h3>
                  <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                    <li>
                      Client recommendations and highly appreciated by customers
                      and internal management (2024 & 2025)
                    </li>
                    <li>
                      Best Support Consultant in TV Sundaram Iyengar & Sons Ltd.
                      Madurai (AX Migration Nov 2010 – Oct 2011)
                    </li>
                    <li>
                      Appreciated for Best Delivery Assurance Report and timely
                      UAT completion
                    </li>
                    <li>
                      CSAT Rating: 7/7 from customers in ASPI, Chennai (AX 2009)
                      and MAF, Dubai (AX 2012), D365 for Agriculture Client
                    </li>
                    <li>
                      Recommended for L1B Visa with Hitachi Solutions America
                      Ltd. (2016)
                    </li>
                    <li>
                      Promoted twice at Sonata Software Solutions (2019 & 2020)
                      as Finance Lead for global implementations
                    </li>
                    <li>
                      Topper of the Batch in 6 out of 8 semesters during B.Tech.
                    </li>
                    <li>
                      Led college volunteer teams across 3 batches (~1200
                      students) for social causes and justice
                    </li>
                    <li>
                      Nominated for School Captain (2004-05) and IInd Topper of
                      the School in Std. X
                    </li>
                    <li>
                      Outstanding achievements in Cricket and Athletics:
                      <ul className="list-disc list-inside ml-5">
                        <li>Seven Consecutive Sixes in Seven Balls</li>
                        <li>Four Wickets in Four Consecutive Balls</li>
                        <li>
                          7-time Hattrick | ~117 Runouts | ~600 Catches | ~460
                          Wickets
                        </li>
                        <li>
                          Highest Score in Test Match – 201* | Strike Rate in
                          Limited Overs – 300
                        </li>
                        <li>
                          Average Score in Limited Overs – 70 | Total Runs –
                          10,000
                        </li>
                        <li>Over 700 Sixes and 1,200 Fours</li>
                        <li>
                          Led team to Intra-School Championships; won Bronze in
                          100m, Gold in 400m Relay, and Gold in Triple Jump
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* Academic & Sports Achievements */}
                <div className="md:w-1/2">
                  <h3 className="text-lg font-bold text-[#075E54] mb-2">
                    ACADEMIC & SPORTS ACHIEVEMENTS
                  </h3>
                  <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                    <li>
                      Topper of the Batch in 6 out of 8 semesters during B.Tech.
                    </li>
                    <li>
                      Led college volunteer teams across 3 batches (~1200
                      students) for social causes and justice
                    </li>
                    <li>
                      Nominated for School Captain (2004-05) and IInd Topper of
                      the School in Std. X
                    </li>
                    <li>
                      Outstanding achievements in Cricket and Athletics:
                      <ul className="list-disc list-inside ml-5">
                        <li>Seven Consecutive Sixes in Seven Balls</li>
                        <li>Four Wickets in Four Consecutive Balls</li>
                        <li>
                          7-time Hattrick | ~117 Runouts | ~600 Catches | ~460
                          Wickets
                        </li>
                        <li>
                          Highest Score in Test Match – 201* | Strike Rate in
                          Limited Overs – 300
                        </li>
                        <li>
                          Average Score in Limited Overs – 70 | Total Runs –
                          10,000
                        </li>
                        <li>Over 700 Sixes and 1,200 Fours</li>
                        <li>
                          Led team to Intra-School Championships; won Bronze in
                          100m, Gold in 400m Relay, and Gold in Triple Jump
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hobbies/Passions */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-[#075E54] mb-2">
                  HOBBIES/PASSIONS
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>
                    Research | Arts/Crafts | Environmental & Social Volunteering
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="bg-[#075E54] text-center text-xs text-gray-200 py-3">
          © 2025 WhatsApp-Themed Resume. Be the Change.
        </footer>
      </div>
      {/* 
        4) DOWNLOAD BUTTON 
           - Positioned below the main content and outside the resumeRef
      */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300 flex items-center space-x-2"
        >
          {/* WhatsApp Download Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.88 3.549A11.952 11.952 0 0112 2c-6.627 0-12 5.373-12 12 0 2.227.606 4.308 1.652 6.09L1 21l4.773-1.652C6.65 19.607 8.728 20.213 11 20.213c6.627 0 12-5.373 12-12 0-2.272-.606-4.35-1.652-6.141l.001-.001z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 17.232l-2.122-2.122m4.242-4.242l-2.121-2.121M9.88 9.88l-2.121 2.121M7.758 16.242l2.121-2.121"
            />
          </svg>
          <span>Download as PDF</span>
        </button>
      </div>
    </>
  );
}
