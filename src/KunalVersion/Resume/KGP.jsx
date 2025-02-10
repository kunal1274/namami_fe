// GenerateDocx.js
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageOrientation,
  Table,
  TableCell,
  TableRow,
  WidthType,
  BorderStyle,
  ImageRun,
} from "docx";
import React from "react";
import genpactLogo from "../../assets/images/transpose.png"; // Ensure the path is correct

/**
 * Generate and download Kunal's Genpact-Themed Resume as a .docx file with two-column layout
 */
export async function generateDocx() {
  try {
    // -----------------------------
    // 1. Prepare Genpact Logo Image
    // -----------------------------

    // Function to convert image to array buffer
    const getImageBuffer = async (imagePath) => {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      return await blob.arrayBuffer();
    };

    const genpactLogoBuffer = await getImageBuffer(genpactLogo);

    // -----------------------------
    // 2. Define Left Column Content
    // -----------------------------

    // Skills Section
    const skillsHeading = new Paragraph({
      text: "SKILLS",
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 },
      run: {
        color: "F15156", // Hex color without '#'
        bold: true,
      },
    });

    const functionalExpertiseHeading = new Paragraph({
      text: "Functional Expertise",
      spacing: { before: 100, after: 50 },
      run: { bold: true },
    });

    const functionalExpertiseList = [
      "D365 Finance & Ops (AX): Financials, Trade & Logistics, Project Mgmt. & Accounting, Service Mgmt.",
      "Security Roles, Data Migration (DMF), Bank Integrations (host-to-host/API), GST e-Invoice",
      "ISVs: Hitachi, To-Increase (Construction), Dynaway EAM, SK Banking, Fast Path Reporting, Commodity Trading & Risk Mgmt.",
      "Docs & Deliverables: BPD, FRD, Gap-Fit, FDD, TDD, SLD, UAT, Support",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    const technicalExpertiseHeading = new Paragraph({
      text: "Technical Expertise",
      spacing: { before: 100, after: 50 },
      run: { bold: true },
    });

    const technicalExpertiseList = [
      "Basic C#.NET, X++, LCS, Azure DevOps",
      "Python, React, Django, Flask, Postgres (Beginner)",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    const axVersionsHeading = new Paragraph({
      text: "AX Versions",
      spacing: { before: 100, after: 50 },
      run: { bold: true },
    });

    const axVersionsList = [
      "D365 F&O, AX 2012 R2/R3, AX 2009, AX 4.0, AX 3.0",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Certifications Section
    const certificationsHeading = new Paragraph({
      text: "CERTIFICATIONS",
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 },
      run: {
        color: "F15156",
        bold: true,
      },
    });

    const certificationsList = [
      "Microsoft Certified in Dynamics AX 2012 Financials",
      "Microsoft Certified in Dynamics AX 2012 PM & Accounting",
      "Microsoft Certified in Dynamics AX 2009 & AX 2012 T&L",
      "Microsoft Certified in D365 for Finance & Ops – Financials",
      "Microsoft Certified in D365 for Finance & Ops – Retail",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Achievements & Recognition Section
    const achievementsHeading = new Paragraph({
      text: "ACHIEVEMENTS & RECOGNITION",
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 },
      run: {
        color: "F15156",
        bold: true,
      },
    });

    const achievementsList = [
      "Highly Appreciated (2024–25) for Project Mgmt. excellence",
      "Twice promoted at Sonata (2019 & 2020)",
      "7/7 CSAT from multiple clients",
      "Recommended for L1B Visa (Hitachi Solutions America)",
      "Best Support Consultant on TVS & Sons project",
      "Extensive sports & academic honors (cricket, track & field)",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Volunteer Section
    const volunteerHeading = new Paragraph({
      text: "VOLUNTEER",
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 },
      run: {
        color: "F15156",
        bold: true,
      },
    });

    const volunteerList = [
      "World Science Festival, World Vision, WWF, Greenpeace, SGI, Ketto",
      "Active in social causes & community events",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Combine Left Column Content
    const leftColumnContent = [
      skillsHeading,
      functionalExpertiseHeading,
      ...functionalExpertiseList,
      technicalExpertiseHeading,
      ...technicalExpertiseList,
      axVersionsHeading,
      ...axVersionsList,
      certificationsHeading,
      ...certificationsList,
      achievementsHeading,
      ...achievementsList,
      volunteerHeading,
      ...volunteerList,
    ];

    // -----------------------------
    // 3. Define Right Column Content
    // -----------------------------

    // Professional Summary Section
    const professionalSummaryHeading = new Paragraph({
      text: "PROFESSIONAL SUMMARY",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 0, after: 100 },
      run: { color: "00AED9", bold: true },
    });

    const professionalSummary = new Paragraph({
      text: "Enthusiastic, 14.3+ years experienced D365 F&O (AX) consultant with deep functional expertise across Financials, Trade & Logistics, Project Management & Accounting, and Service Management. Skilled in end-to-end implementations (24+ full cycle) and global team management. Recognized for driving client success, integrations, and strategic initiatives. Adept at stakeholder communication, collaboration, and adopting modern technologies (AI, Copilot, Azure) to maximize business value.",
      spacing: { after: 100 },
      font: "Calibri",
      size: 24, // 12pt
    });

    // Core Competencies Section
    const coreCompetenciesHeading = new Paragraph({
      text: "CORE COMPETENCIES",
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 100, after: 50 },
      run: { color: "F15156", bold: true },
    });

    const coreCompetenciesList = [
      "Functional Solutions Leadership: Comprehensive knowledge of D365 FO",
      "Project Management: Led 40+ team members across multiple geographies",
      "Integration Expertise: Bank host-to-host, DHL, AI/Copilot, commodity trading",
      "Continuous Improvement: Passion for process optimization, testing, user adoption",
      "Client Satisfaction: 7/7 CSAT from multiple implementations",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Experience Section
    const experienceHeading = new Paragraph({
      text: "EXPERIENCE",
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 },
      run: { color: "F15156", bold: true },
    });

    const experienceContent = [
      // Cognizant Experience
      new Paragraph({
        children: [
          new TextRun({
            text: "COGNIZANT TECHNOLOGY SOLUTIONS | D365 F&O Project Manager / Financials Lead (2 yrs 3+ mos)\n",
            bold: true,
            size: 28, // 14pt
          }),
          new TextRun({
            text: "• AUS-Based Client (24) <Medical Equipment> (Aug ’24 – Present)",
            bold: true,
          }),
          new TextRun({
            text: ": Led D365 F&O with 20+ integrations (DHL, 3M, etc.)\n",
            italics: true,
            size: 22, // 11pt
          }),
          new TextRun({
            text: "• Multi-Location Client (23) <AI & Copilot> (Mar ’24 – Jul ’24): Architected D365 FO Copilot integration, AI-based workflows.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Qatar Airways (22) (Apr ’23 – Feb ’24): Financials Lead, SCM, large-scale integrations.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Community Fibre (21) (Sep ’22 – Present): Financials Lead for UK fiber net, UK localizations.\n",
            italics: true,
            size: 22,
          }),
        ],
        spacing: { after: 100 },
      }),

      // Sonata Software Experience
      new Paragraph({
        children: [
          new TextRun({
            text: "SONATA SOFTWARE SOLUTIONS PVT. LTD. | D365 Finance Lead / Sr. Consultant (4 yrs)\n",
            bold: true,
            size: 28,
          }),
          new TextRun({
            text: "• DRA Pacific & GSE Global (20) <Mining> (Mar ’21 – Present): Finance Lead, multi-country rollouts, MR & integrations.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Commodity Trading & Risk Mgmt. (18,19) (Dec ’19 – Feb ’21): Specialized commodity trading module bridging SCM & finance.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• ETG Global (16) (Jun ’20 – Feb ’21): Africa-based rollout, integrated Management Reporter.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Washington Football Team (15) (Feb ’20 – May ’20): Finance lead for US sports franchise.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• WSP / Louis Berger (14) (Feb ’19 – Jan ’20): Disaster mgmt. org, robust project accounting.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Normet Intl (13) (Aug ’18 – Jan ’19): PM + finance lead, global mining chemicals.\n",
            italics: true,
            size: 22,
          }),
        ],
        spacing: { after: 100 },
      }),

      // Hitachi Solutions Experience
      new Paragraph({
        children: [
          new TextRun({
            text: "HITACHI SOLUTIONS INDIA/AMERICA | Senior AX/D365 Consultant (4 yrs)\n",
            bold: true,
            size: 28,
          }),
          new TextRun({
            text: "• Multiple onsite US implementations (Agriculture, Government Port, etc.)\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Specialized in AX 2012 R2/R3, early D365.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Data migration, custom security roles.\n",
            italics: true,
            size: 22,
          }),
        ],
        spacing: { after: 100 },
      }),

      // Wipro Infotech Experience
      new Paragraph({
        children: [
          new TextRun({
            text: "WIPRO INFOTECH PVT. LTD. INDIA/UAE | AX Functional Consultant (4 yrs)\n",
            bold: true,
            size: 28,
          }),
          new TextRun({
            text: "• Managed 6 major AX implementations (Retail, Steel, Manufacturing).\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Migrations: AX 3.0 → AX 2009, AX 4.0 → AX 2012.\n",
            italics: true,
            size: 22,
          }),
          new TextRun({
            text: "• Recognized for meeting tight deadlines & cost reductions.\n",
            italics: true,
            size: 22,
          }),
        ],
        spacing: { after: 100 },
      }),
    ];

    // Education Section
    const educationHeading = new Paragraph({
      text: "EDUCATION",
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 },
      run: {
        color: "F15156",
        bold: true,
      },
    });

    const educationList = [
      "Pursuing MS in Computer Sciences [Executive from Scaler Academy]",
      "B. Tech in Electronics & Communication (2006–2010), CGPA 8.6/10",
      "12 Years Schooling: Std. X (85%), Std. XII (65.6%)",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Additional Highlights Section
    const additionalHighlightsHeading = new Paragraph({
      text: "ADDITIONAL HIGHLIGHTS",
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 },
      run: {
        color: "F15156",
        bold: true,
      },
    });

    // Motivation & Leadership
    const motivationHeading = new Paragraph({
      text: "Motivation & Leadership",
      run: { bold: true, color: "00AED9" },
      spacing: { before: 100, after: 50 },
      heading: HeadingLevel.HEADING_4,
    });

    const motivationList = [
      "Praised by customers for swift project turnarounds",
      "Demonstrated cross-functional leadership in global teams",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Academic & Sports Achievements
    const academicHeading = new Paragraph({
      text: "Academic & Sports Achievements",
      run: { bold: true, color: "00AED9" },
      spacing: { before: 100, after: 50 },
      heading: HeadingLevel.HEADING_4,
    });

    const academicList = [
      "Topper in 6 of 8 semesters during B. Tech",
      "Represented school in cricket & track, numerous awards",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Hobbies/Passions
    const hobbiesHeading = new Paragraph({
      text: "Hobbies/Passions",
      run: { bold: true, color: "00AED9" },
      spacing: { before: 100, after: 50 },
      heading: HeadingLevel.HEADING_4,
    });

    const hobbiesList = [
      "Research, Arts/Crafts, Environmental & Social Volunteering",
    ].map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 50 },
          style: "ListParagraph",
        })
    );

    // Combine Additional Highlights Content
    const additionalHighlightsContent = [
      motivationHeading,
      ...motivationList,
      academicHeading,
      ...academicList,
      hobbiesHeading,
      ...hobbiesList,
    ];

    // Combine Right Column Content
    const rightColumnContent = [
      professionalSummaryHeading,
      professionalSummary,
      coreCompetenciesHeading,
      ...coreCompetenciesList,
      experienceHeading,
      ...experienceContent,
      educationHeading,
      ...educationList,
      additionalHighlightsHeading,
      ...additionalHighlightsContent,
    ];

    // -----------------------------
    // 4. Create Header Banner
    // -----------------------------

    const headerBanner = new Paragraph({
      children: [
        new ImageRun({
          data: genpactLogoBuffer,
          transformation: {
            width: 400, // Adjust as needed
            height: 80, // Adjust as needed
          },
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    });

    const bannerText = new Paragraph({
      text: "Transformation Happens Here",
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      run: {
        color: "FFFFFF",
        bold: true,
        size: 28, // 14pt
      },
    });

    // -----------------------------
    // 5. Create Contact Bar
    // -----------------------------

    const contactBar = new Paragraph({
      children: [
        new TextRun({
          text: "Location: Gurugram, India",
          bold: true,
          color: "FFFFFF",
        }),
        new TextRun({
          text: " | ",
          bold: true,
          color: "FFFFFF",
        }),
        new TextRun({
          text: "Email: kunal1274@gmail.com",
          bold: true,
          color: "FFFFFF",
        }),
        new TextRun({
          text: " | ",
          bold: true,
          color: "FFFFFF",
        }),
        new TextRun({
          text: "Phone: +91-93134-94641",
          bold: true,
          color: "FFFFFF",
        }),
        new TextRun({
          text: " | ",
          bold: true,
          color: "FFFFFF",
        }),
        new TextRun({
          text: "LinkedIn: linkedin.com/in/sample",
          bold: true,
          color: "00AED9",
          underline: {},
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      run: {
        font: "Calibri",
        size: 24, // 12pt
      },
    });

    // -----------------------------
    // 6. Create Two-Column Table for Main Content
    // -----------------------------

    const resumeTable = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            // Left Column Cell
            new TableCell({
              width: {
                size: 33,
                type: WidthType.PERCENTAGE,
              },
              margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
              },
              children: leftColumnContent,
              verticalAlign: "TOP",
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideHorizontal: {
                  style: BorderStyle.NONE,
                  size: 0,
                  color: "FFFFFF",
                },
                insideVertical: {
                  style: BorderStyle.NONE,
                  size: 0,
                  color: "FFFFFF",
                },
              },
            }),
            // Right Column Cell
            new TableCell({
              width: {
                size: 67,
                type: WidthType.PERCENTAGE,
              },
              margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
              },
              children: rightColumnContent,
              verticalAlign: "TOP",
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideHorizontal: {
                  style: BorderStyle.NONE,
                  size: 0,
                  color: "FFFFFF",
                },
                insideVertical: {
                  style: BorderStyle.NONE,
                  size: 0,
                  color: "FFFFFF",
                },
              },
            }),
          ],
        }),
      ],
      borders: {
        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      },
    });

    // -----------------------------
    // 7. Define the Document
    // -----------------------------

    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "ListParagraph",
            name: "List Paragraph",
            basedOn: "Normal",
            next: "Normal",
            run: {
              font: "Calibri",
              size: 22, // 11pt
              color: "A6A6A6",
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720, // 0.5 inches (720 Twips)
                right: 720,
                bottom: 720,
                left: 720,
              },
              size: {
                orientation: PageOrientation.PORTRAIT,
              },
            },
          },
          children: [
            // Header Banner
            headerBanner,
            bannerText,

            // Contact Bar
            contactBar,

            // Main Content Table
            resumeTable,

            // Footer (Optional)
            new Paragraph({
              text: "© 2025 Genpact-Themed Resume. Transformation Happens Here.",
              alignment: AlignmentType.CENTER,
              spacing: { before: 200 },
              run: {
                color: "7D7D7D",
                size: 20, // 10pt
              },
            }),
          ],
        },
      ],
    });

    // -----------------------------
    // 8. Package & Download the doc
    // -----------------------------
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Kunal_Genpact_Resume.docx");
  } catch (error) {
    console.error("Error generating DOCX:", error);
    alert("Failed to generate the resume. Please try again.");
  }
}

/**
 * ResumeDocxButton Component
 * Renders a button that, when clicked, downloads the resume as a DOCX file.
 */
export function ResumeDocxButton() {
  const handleDownload = () => {
    generateDocx();
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        padding: "12px 24px",
        backgroundColor: "#F15156",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      Download DOCX
    </button>
  );
}

/**
 * KunalGenpactResumeDocx Component
 * Displays the download button for the Genpact-themed resume.
 */
export default function KunalGenpactResumeDocx() {
  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h1 style={{ color: "#0F1F2E", fontSize: "24px", marginBottom: "10px" }}>
        Genpact-Themed Resume
      </h1>
      <p style={{ color: "#142b40", marginBottom: "20px" }}>
        Click the button below to download your professional resume in DOCX
        format.
      </p>
      <ResumeDocxButton />
    </div>
  );
}
