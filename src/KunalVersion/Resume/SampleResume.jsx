// Resume.jsx
import React, { useRef } from "react";
import html2pdf from "html2pdf.js"; // If installed from npm

export default function Resume() {
  const printRef = useRef();

  const handleDownloadPdf = () => {
    const element = printRef.current;
    const options = {
      margin: 0.5,
      filename: "Kunal_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="p-4">
      <button
        onClick={handleDownloadPdf}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Download PDF
      </button>

      <div ref={printRef} className="min-h-screen md:flex font-sans">
        {/** LEFT COLUMN **/}
        <aside className="md:w-1/3 bg-gray-800 text-white p-6">
          {/* Optional: Add your headshot */}
          <div className="flex items-center mb-6">
            {/* If you have a profile photo: */}
            {/* <img src="/path-to-your-photo.jpg" alt="Profile" className="w-24 h-24 rounded-full mr-4" /> */}
            <div>
              {/* Name & Title */}
              <h1 className="text-2xl font-bold">Kunal Kumar</h1>
              <p className="text-sm mt-1">Microsoft Certified Professional</p>
            </div>
          </div>

          {/* CONTACT */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p>Gurugram, India</p>
            <p>+91-93134-94641</p>
            <p>kunal1274@gmail.com</p>
            <p>kunal1274@outlook.com</p>
          </div>

          {/* SKILLS */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>D365 Finance & Ops (AX): Financials, T&L, PMA, Service</li>
              <li>Security Roles, Data Migration (DMF), Integrations</li>
              <li>ISVs: Hitachi, To-Increase, Dynaway EAM, etc.</li>
              <li>Docs & Deliverables: BPD, FRD, FDD, TDD, UAT, Support</li>
            </ul>
          </div>

          {/* TECHNICAL EXPERTISE */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Technical Expertise</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Basic C#.NET, X++, LCS, Azure DevOps</li>
              <li>Python, React, Django, Flask, Postgres (Beginner)</li>
              <li>D365 F&O, AX 2012 R2/R3, AX 2009, AX 4.0, AX 3.0</li>
            </ul>
          </div>

          {/* CERTIFICATIONS */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Certifications</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Dynamics AX 2012 Financials</li>
              <li>Dynamics AX 2012 PM & Accounting</li>
              <li>Dynamics AX 2009 & AX 2012 Trade & Logistics</li>
              <li>D365 for Finance & Ops – Financials & Retail</li>
            </ul>
          </div>

          {/* ACHIEVEMENTS & RECOGNITION */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Achievements</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Highly Appreciated (2024–25) for Project Mgmt excellence</li>
              <li>Twice promoted at Sonata (2019 & 2020)</li>
              <li>7/7 CSAT from multiple clients</li>
              <li>Recommended for L1B Visa (Hitachi)</li>
            </ul>
          </div>

          {/* VOLUNTEER */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Volunteer</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>World Science Festival, WWF, Greenpeace</li>
              <li>Social causes & community events</li>
            </ul>
          </div>
        </aside>

        {/** RIGHT COLUMN **/}
        <main className="md:w-2/3 bg-white text-gray-900 p-6">
          {/* PROFESSIONAL SUMMARY */}
          <section className="mb-8">
            <h1 className="text-2xl font-bold border-b pb-2 mb-4">
              Professional Summary
            </h1>
            <p>
              Enthusiastic, 14.3+ years experienced D365 F&O (AX) consultant
              with deep functional expertise across Financials, Trade &
              Logistics, Project Mgmt. & Accounting, and Service Mgmt. Skilled
              in delivering end-to-end implementations (24+ full cycle) and
              managing global teams. Recognized for driving client success,
              complex integrations, and strategic initiatives...
            </p>
          </section>

          {/* CORE COMPETENCIES */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Core Competencies
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                Functional Solutions Leadership: Comprehensive knowledge of D365
                FO
              </li>
              <li>
                Project Management: Led 40+ team members across multiple
                geographies
              </li>
              <li>
                Integration Expertise: Bank host-to-host, AI/Copilot, commodity
                trading
              </li>
              <li>
                Continuous Improvement: Process optimization, testing, user
                adoption
              </li>
              <li>
                Client Satisfaction: 7/7 CSAT from multiple implementations
              </li>
            </ul>
          </section>

          {/* EXPERIENCE */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Experience
            </h2>

            {/* Cognizant */}
            <div className="mb-6">
              <h3 className="font-bold">Cognizant Technology Solutions</h3>
              <p className="italic text-sm">
                Role: D365 F&O Project Manager / Financials Lead | 2 yrs 3+ mos
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  <strong>AUS-Based Client (24)</strong> &lt;Medical
                  Equipment&gt; (Aug ’24 – Present)
                </li>
                <li>Led D365 F&O with 20+ integrations (DHL, 3M, etc.)</li>
                <li>Oversaw 40-member cross-functional team</li>
                <li className="mt-2">
                  <strong>Multi-Location Client (23)</strong> &lt;AI &
                  Copilot&gt; (Mar ’24 – Jul ’24)
                </li>
                <li>
                  Architected D365 FO Copilot integration, AI-based workflows
                </li>
                <li className="mt-2">
                  <strong>Qatar Airways (22)</strong> (Apr ’23 – Feb ’24)
                </li>
                <li>Financials Lead, SCM, large-scale integrations</li>
                <li className="mt-2">
                  <strong>Community Fibre (21)</strong> (Sep ’22 – Present)
                </li>
                <li>Financials Lead for UK fiber net, UK localizations</li>
              </ul>
            </div>

            {/* Sonata */}
            <div className="mb-6">
              <h3 className="font-bold">Sonata Software Solutions Pvt. Ltd.</h3>
              <p className="italic text-sm">
                Role: D365 Finance Lead / Sr. Consultant | 4 yrs
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  <strong>DRA Pacific & GSE Global (20)</strong> &lt;Mining&gt;
                  (Mar ’21 – Present)
                </li>
                <li>Finance Lead, multi-country rollouts, MR & integrations</li>
                <li className="mt-2">
                  <strong>Commodity Trading & Risk Mgmt. (18,19)</strong> (Dec
                  ’19 – Feb ’21)
                </li>
                <li>
                  Specialized commodity trading module bridging SCM & finance
                </li>
                <li className="mt-2">
                  <strong>ETG Global (16)</strong> (Jun ’20 – Feb ’21)
                </li>
                <li>Africa-based rollout, integrated Management Reporter</li>
                <li className="mt-2">
                  <strong>Washington Football Team (15)</strong> (Feb ’20 – May
                  ’20)
                </li>
                <li>Finance lead for US sports franchise</li>
                <li className="mt-2">
                  <strong>WSP / Louis Berger (14)</strong> (Feb ’19 – Jan ’20)
                </li>
                <li>Disaster mgmt. org, robust project accounting</li>
                <li className="mt-2">
                  <strong>Normet Intl (13)</strong> (Aug ’18 – Jan ’19)
                </li>
                <li>PM + finance lead, global mining chemicals</li>
              </ul>
            </div>

            {/* Hitachi */}
            <div className="mb-6">
              <h3 className="font-bold">Hitachi Solutions India/America</h3>
              <p className="italic text-sm">
                Role: Senior AX/D365 Consultant | 4 yrs
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  Multiple onsite US implementations (Agriculture, Gov Port,
                  etc.)
                </li>
                <li>Specialized in AX 2012 R2/R3, early D365</li>
                <li>Data migration, custom security roles</li>
              </ul>
            </div>

            {/* Wipro */}
            <div className="mb-6">
              <h3 className="font-bold">
                Wipro Infotech Pvt. Ltd. (India/UAE)
              </h3>
              <p className="italic text-sm">
                Role: AX Functional Consultant | 4 yrs
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
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
          </section>

          {/* EDUCATION */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Education
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                Pursuing MS in Computer Sciences [Executive from Scaler Academy]
              </li>
              <li>
                B. Tech in Electronics & Communication (2006–2010), CGPA 8.6/10
              </li>
              <li>12 Years Schooling: Std. X (85%), Std. XII (65.6%)</li>
            </ul>
          </section>

          {/* ADDITIONAL HIGHLIGHTS */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Additional Highlights
            </h2>

            <div className="mb-4">
              <h3 className="font-semibold">Motivation & Leadership</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Praised by customers for swift project turnarounds</li>
                <li>
                  Demonstrated cross-functional leadership in global teams
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Academic & Sports Achievements</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Topper in 6 of 8 semesters during B. Tech</li>
                <li>Represented school in cricket & track, numerous awards</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Hobbies/Passions</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Research, Arts/Crafts, Environmental & Social Volunteering
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
