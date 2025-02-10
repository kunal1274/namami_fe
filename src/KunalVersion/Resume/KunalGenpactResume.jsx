// GenpactResume.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import kunalPhoto from "../../assets/images/kunal.png";

export function KunalGenpactResume1() {
  return (
    <div className="min-h-screen bg-[#0F1F2E] text-white font-sans">
      {/* 
        1) HEADER / BANNER
           - Genpact banner with "Transformation Happens Here" 
      */}
      <header className="relative w-full h-48 bg-gradient-to-r from-[#ee4266] via-[#3b81c2] to-[#00aed9] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative text-center">
          {/* Replace this URL with a local image if desired */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Genpact_logo.svg/2560px-Genpact_logo.svg.png"
            alt="Genpact Logo"
            className="mx-auto w-44 h-auto"
          />
          <p className="text-lg font-bold">Transformation Happens Here</p>
        </div>
      </header>

      {/* 
        2) CONTACT BAR
           - Displaying location, email, phone, LinkedIn, etc. 
      */}
      <div className="bg-[#142b40] px-4 py-2 text-sm flex flex-wrap items-center justify-center gap-4">
        <span>Location: Gurugram, India</span>
        <span>|</span>
        <span>Email: kunal1274@gmail.com</span>
        <span>|</span>
        <span>Phone: +91-93134-94641</span>
        <span>|</span>
        <a
          href="https://www.linkedin.com/in/sample"
          className="underline text-blue-200"
        >
          linkedin.com/in/sample
        </a>
      </div>

      {/* 
        3) MAIN CONTENT 
        - Two-column layout: Left Sidebar and Main Content
      */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="md:col-span-1 bg-[#1c3547] p-6 rounded-md space-y-6">
          {/* SKILLS */}
          <section>
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              SKILLS
            </h2>
            {/* Functional Expertise */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                Functional Expertise
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
              <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                Technical Expertise
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
                <li>Basic C#.NET, X++, LCS, Azure DevOps</li>
                <li>Python, React, Django, Flask, Postgres (Beginner)</li>
              </ul>
            </div>
            {/* AX Versions */}
            <div>
              <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                AX Versions
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
                <li>D365 F&O, AX 2012 R2/R3, AX 2009, AX 4.0, AX 3.0</li>
              </ul>
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section>
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              ACHIEVEMENTS & RECOGNITION
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              VOLUNTEER
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h1 className="text-2xl font-bold text-[#00aed9] mb-4">
              PROFESSIONAL SUMMARY
            </h1>
            <p className="text-sm leading-relaxed text-gray-100">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              CORE COMPETENCIES
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              EXPERIENCE
            </h2>

            {/* COGNIZANT */}
            <div className="mb-6">
              <h3 className="text-white font-bold">
                1) COGNIZANT TECHNOLOGY SOLUTIONS
              </h3>
              <p className="text-xs text-gray-300 mb-2">
                Role: D365 F&O Project Manager / Financials Lead | Tenure: 2 yrs
                3+ mos
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
              <h3 className="text-white font-bold">
                2) SONATA SOFTWARE SOLUTIONS PVT. LTD.
              </h3>
              <p className="text-xs text-gray-300 mb-2">
                Role: D365 Finance Lead / Sr. Consultant | Tenure: 4 yrs
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
              <h3 className="text-white font-bold">
                3) HITACHI SOLUTIONS INDIA/AMERICA
              </h3>
              <p className="text-xs text-gray-300 mb-2">
                Role: Senior AX/D365 Consultant | Tenure: 4 years
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
              <h3 className="text-white font-bold">
                4) WIPRO INFOTECH PVT. LTD. INDIA/UAE
              </h3>
              <p className="text-xs text-gray-300 mb-2">
                Role: AX Functional Consultant | Tenure: 4 yrs
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              EDUCATION
            </h2>
            <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              ADDITIONAL HIGHLIGHTS
            </h2>
            <div className="md:flex md:space-x-6">
              {/* Motivation & Leadership */}
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                  Motivation & Leadership
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                  <li>Praised by customers for swift project turnarounds</li>
                  <li>
                    Demonstrated cross-functional leadership in global teams
                  </li>
                </ul>
              </div>

              {/* Academic & Sports Achievements */}
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                  Academic & Sports Achievements
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                  <li>Topper in 6 of 8 semesters during B. Tech</li>
                  <li>
                    Represented school in cricket & track, numerous awards
                  </li>
                </ul>
              </div>
            </div>

            {/* Hobbies/Passions */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                Hobbies/Passions
              </h3>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                <li>
                  Research, Arts/Crafts, Environmental & Social Volunteering
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0B1622] text-center text-xs text-gray-400 py-3">
        © 2025 Genpact-Themed Resume. Transformation Happens Here.
      </footer>
    </div>
  );
}

export function KunalGenpactResume2() {
  // Create a reference to the resume content
  const resumeRef = useRef();

  // Function to handle PDF download
  const handleDownloadPdf = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Calculate the number of pages needed
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if necessary
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("Kunal_Genpact_Resume.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
      });
  };
  return (
    <div className="min-h-screen bg-[#0F1F2E] text-white font-sans">
      {/* 
          1) HEADER / BANNER
             - Genpact banner with "Transformation Happens Here" 
        */}
      <header className="relative w-full h-48 bg-gradient-to-r from-[#ee4266] via-[#3b81c2] to-[#00aed9] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative text-center">
          {/* Replace this URL with a local image if desired */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Genpact_logo.svg/2560px-Genpact_logo.svg.png"
            alt="Genpact Logo"
            className="mx-auto w-44 h-auto"
          />
          <p className="text-lg font-bold">Transformation Happens Here</p>
        </div>
      </header>

      {/* 
          2) CONTACT BAR
             - Displaying location, email, phone, LinkedIn, etc. 
        */}
      <div className="bg-[#142b40] px-4 py-2 text-sm flex flex-wrap items-center justify-center gap-4">
        <span>Location: Gurugram, India</span>
        <span>|</span>
        <span>Email: kunal1274@gmail.com</span>
        <span>|</span>
        <span>Phone: +91-93134-94641</span>
        <span>|</span>
        <a
          href="https://www.linkedin.com/in/sample"
          className="underline text-blue-200"
        >
          linkedin.com/in/sample
        </a>
      </div>

      {/* 
          3) MAIN CONTENT 
          - Two-column layout: Left Sidebar and Main Content
        */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR */}
        <aside className="md:col-span-1 bg-[#1c3547] p-6 rounded-md space-y-6">
          {/* SKILLS */}
          <section>
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              SKILLS
            </h2>
            {/* Functional Expertise */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                Functional Expertise
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
              <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                Technical Expertise
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
                <li>Basic C#.NET, X++, LCS, Azure DevOps</li>
                <li>Python, React, Django, Flask, Postgres (Beginner)</li>
              </ul>
            </div>
            {/* AX Versions */}
            <div>
              <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                AX Versions
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
                <li>D365 F&O, AX 2012 R2/R3, AX 2009, AX 4.0, AX 3.0</li>
              </ul>
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section>
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              ACHIEVEMENTS & RECOGNITION
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              VOLUNTEER
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h1 className="text-2xl font-bold text-[#00aed9] mb-4">
              PROFESSIONAL SUMMARY
            </h1>
            <p className="text-sm leading-relaxed text-gray-100">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              CORE COMPETENCIES
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              EXPERIENCE
            </h2>

            {/* COGNIZANT */}
            <div className="mb-6">
              <h3 className="text-white font-bold">
                1) COGNIZANT TECHNOLOGY SOLUTIONS
              </h3>
              <p className="text-xs text-gray-300 mb-2">
                Role: D365 F&O Project Manager / Financials Lead | Tenure: 2 yrs
                3+ mos
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
              <h3 className="text-white font-bold">
                2) SONATA SOFTWARE SOLUTIONS PVT. LTD.
              </h3>
              <p className="text-xs text-gray-300 mb-2">
                Role: D365 Finance Lead / Sr. Consultant | Tenure: 4 yrs
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
              <h3 className="text-white font-bold">
                3) HITACHI SOLUTIONS INDIA/AMERICA
              </h3>
              <p className="text-xs text-gray-300 mb-2">
                Role: Senior AX/D365 Consultant | Tenure: 4 years
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
              <h3 className="text-white font-bold">
                4) WIPRO INFOTECH PVT. LTD. INDIA/UAE
              </h3>
              <p className="text-xs text-gray-300 mb-2">
                Role: AX Functional Consultant | Tenure: 4 yrs
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              EDUCATION
            </h2>
            <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
          <div className="bg-[#1c3547] p-6 rounded-md">
            <h2 className="text-xl font-semibold text-[#f15156] mb-4">
              ADDITIONAL HIGHLIGHTS
            </h2>
            <div className="md:flex md:space-x-6">
              {/* Motivation & Leadership */}
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                  Motivation & Leadership
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                  <li>Praised by customers for swift project turnarounds</li>
                  <li>
                    Demonstrated cross-functional leadership in global teams
                  </li>
                </ul>
              </div>

              {/* Academic & Sports Achievements */}
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                  Academic & Sports Achievements
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                  <li>Topper in 6 of 8 semesters during B. Tech</li>
                  <li>
                    Represented school in cricket & track, numerous awards
                  </li>
                </ul>
              </div>
            </div>

            {/* Hobbies/Passions */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                Hobbies/Passions
              </h3>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
           - Positioned at the bottom of the main content
      */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="bg-[#f15156] hover:bg-[#ee4266] text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
        >
          Download as PDF
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0B1622] text-center text-xs text-gray-400 py-3">
        © 2025 Genpact-Themed Resume. Transformation Happens Here.
      </footer>
    </div>
  );
}

export default function KunalGenpactResume() {
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

        pdf.save("Kunal_Genpact_Resume.pdf");
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
        className="min-h-screen bg-[#0F1F2E] text-white font-sans"
      >
        {/* 
        1) HEADER / BANNER
           - Genpact banner with "Transformation Happens Here" 
      */}
        <header className="relative w-full h-48 bg-gradient-to-r from-[#ee4266] via-[#3b81c2] to-[#00aed9] flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative text-center">
            {/* Replace this URL with a local image if desired */}
            <img
              src={kunalPhoto}
              alt="Kunal Photo"
              className="mx-auto w-28 h-28 rounded-full object-cover"
            />
            <p className="text-md font-normal">Being the Change</p>
          </div>
        </header>

        {/* 
        2) CONTACT BAR
           - Displaying location, email, phone, LinkedIn, etc. 
      */}
        <div className="bg-[#142b40] px-4 py-2 text-sm flex flex-wrap items-center justify-center gap-4">
          <span>Location: Gurugram, India</span>
          <span>|</span>
          <span>Email: kunal1274@gmail.com</span>
          <span>|</span>
          <span>Phone: +91-93134-94641</span>
          <span>|</span>
          <a
            href="https://www.linkedin.com/in/kunal1274"
            className="underline text-blue-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/kunal1274
          </a>
        </div>

        {/* 
        3) MAIN CONTENT 
        - Two-column layout: Left Sidebar and Main Content
      */}
        <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="md:col-span-1 bg-[#1c3547] p-6 rounded-md space-y-6">
            {/* SKILLS */}
            <section>
              <h2 className="text-xl font-semibold text-[#f15156] mb-4">
                SKILLS
              </h2>
              {/* Functional Expertise */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                  Functional Expertise
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
                <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                  Technical Expertise
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
                  <li>Basic C#.NET, X++, LCS, Azure DevOps</li>
                  <li>Python, React, Django, Flask, Postgres (Beginner)</li>
                </ul>
              </div>
              {/* AX Versions */}
              <div>
                <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                  AX Versions
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
                  <li>D365 F&O, AX 2012 R2/R3, AX 2009, AX 4.0, AX 3.0</li>
                </ul>
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section>
              <h2 className="text-xl font-semibold text-[#f15156] mb-4">
                CERTIFICATIONS
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
              <h2 className="text-xl font-semibold text-[#f15156] mb-4">
                ACHIEVEMENTS & RECOGNITION
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
                <li>
                  Highly Appreciated (2024–25) for Project Mgmt. excellence
                </li>
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
              <h2 className="text-xl font-semibold text-[#f15156] mb-4">
                VOLUNTEER
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
            <div className="bg-[#1c3547] p-6 rounded-md">
              <h1 className="text-2xl font-bold text-[#00aed9] mb-4">
                PROFESSIONAL SUMMARY
              </h1>
              <p className="text-sm leading-relaxed text-gray-100">
                Enthusiastic, 14.3+ years experienced D365 F&O (AX) consultant
                with deep functional expertise across Financials, Trade &
                Logistics, Project Management & Accounting, and Service
                Management. Skilled in end-to-end implementations (24+ full
                cycle) and global team management. Recognized for driving client
                success, integrations, and strategic initiatives. Adept at
                stakeholder communication, collaboration, and adopting modern
                technologies (AI, Copilot, Azure) to maximize business value.
              </p>
            </div>

            {/* CORE COMPETENCIES */}
            <div className="bg-[#1c3547] p-6 rounded-md">
              <h2 className="text-xl font-semibold text-[#f15156] mb-4">
                CORE COMPETENCIES
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
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
                  <strong>Client Satisfaction:</strong> 7/7 CSAT from multiple
                  implementations
                </li>
              </ul>
            </div>

            {/* EXPERIENCE */}
            <div className="bg-[#1c3547] p-6 rounded-md">
              <h2 className="text-xl font-semibold text-[#f15156] mb-4">
                EXPERIENCE
              </h2>

              {/* COGNIZANT */}
              <div className="mb-6">
                <h3 className="text-white font-bold">
                  1) COGNIZANT TECHNOLOGY SOLUTIONS
                </h3>
                <p className="text-xs text-gray-300 mb-2">
                  Role: D365 F&O Project Manager / Financials Lead | Tenure: 2
                  yrs 3+ mos
                </p>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                  <li>
                    <strong>AUS-Based Client (24)</strong> &lt;Medical
                    Equipment&gt; (Aug ’24 – Present)
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        Led D365 F&O with 20+ integrations (DHL, 3M, etc.)
                      </li>
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
                      <li>
                        Financials Lead for UK fiber net, UK localizations
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* SONATA SOFTWARE */}
              <div className="mb-6">
                <h3 className="text-white font-bold">
                  2) SONATA SOFTWARE SOLUTIONS PVT. LTD.
                </h3>
                <p className="text-xs text-gray-300 mb-2">
                  Role: D365 Finance Lead / Sr. Consultant | Tenure: 4 yrs
                </p>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                  <li>
                    <strong>DRA Pacific & GSE Global (20)</strong>{" "}
                    &lt;Mining&gt; (Mar ’21 – Present)
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
                    <strong>Washington Football Team (15)</strong> (Feb ’20 –
                    May ’20)
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
                <h3 className="text-white font-bold">
                  3) HITACHI SOLUTIONS INDIA/AMERICA
                </h3>
                <p className="text-xs text-gray-300 mb-2">
                  Role: Senior AX/D365 Consultant | Tenure: 4 years
                </p>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
                <h3 className="text-white font-bold">
                  4) WIPRO INFOTECH PVT. LTD. INDIA/UAE
                </h3>
                <p className="text-xs text-gray-300 mb-2">
                  Role: AX Functional Consultant | Tenure: 4 yrs
                </p>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
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
            <div className="bg-[#1c3547] p-6 rounded-md">
              <h2 className="text-xl font-semibold text-[#f15156] mb-4">
                EDUCATION
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-200 ml-4 space-y-1">
                <li>
                  Pursuing MS in Computer Sciences [Executive from Scaler
                  Academy]
                </li>
                <li>
                  B. Tech in Electronics & Communication (2006–2010), CGPA
                  8.6/10
                </li>
                <li>12 Years Schooling: Std. X (85%), Std. XII (65.6%)</li>
              </ul>
            </div>

            {/* ADDITIONAL HIGHLIGHTS */}
            <div className="bg-[#1c3547] p-6 rounded-md">
              <h2 className="text-xl font-semibold text-[#f15156] mb-4">
                ADDITIONAL HIGHLIGHTS
              </h2>
              <div className="md:flex md:space-x-6">
                {/* Motivation & Leadership */}
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                    Motivation & Leadership
                  </h3>
                  <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                    <li>Praised by customers for swift project turnarounds</li>
                    <li>
                      Demonstrated cross-functional leadership in global teams
                    </li>
                  </ul>
                </div>

                {/* Academic & Sports Achievements */}
                <div className="md:w-1/2">
                  <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                    Academic & Sports Achievements
                  </h3>
                  <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                    <li>Topper in 6 of 8 semesters during B. Tech</li>
                    <li>
                      Represented school in cricket & track, numerous awards
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hobbies/Passions */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-[#00aed9] mb-2">
                  Hobbies/Passions
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-200 space-y-1">
                  <li>
                    Research, Arts/Crafts, Environmental & Social Volunteering
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="bg-[#0B1622] text-center text-xs text-gray-400 py-3">
          © 2025 Latest Resume - Dharmo Rakshati RakshitaH:
        </footer>
      </div>
      {/* 
        4) DOWNLOAD BUTTON 
           - Positioned below the main content and outside the resumeRef
      */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="bg-[#f15156] hover:bg-[#ee4266] text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
        >
          Download as PDF
        </button>
      </div>
    </>
  );
}
