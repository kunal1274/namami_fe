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
} from "docx";
import React from "react";

/**
 * Generate and download Kunal's Resume as a .docx file with two-column layout
 */
export async function generateDocx() {
  // -----------------------------
  // 1. Define Left Column Content
  // -----------------------------

  // Name Heading
  const kunalNameHeading = new Paragraph({
    text: "Kunal Kumar",
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
  });

  // Subheading
  const subHeadingMCP = new Paragraph({
    text: "Microsoft Certified Professional",
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.CENTER,
  });

  // Contact Info
  const contactHeading = new Paragraph({
    text: "Contact",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });

  const contactList = [
    "Gurugram, India",
    "+91-93134-94641",
    "kunal1274@gmail.com",
    "kunal1274@outlook.com",
  ].map(
    (item) =>
      new Paragraph({
        text: item,
        spacing: { after: 100 },
      })
  );

  // Skills
  const skillsHeading = new Paragraph({
    text: "Skills",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });

  const skillsList = [
    "D365 Finance & Ops (AX): Financials, T&L, PMA, Service",
    "Security Roles, Data Migration (DMF), Integrations",
    "ISVs: Hitachi, To-Increase, Dynaway EAM, etc.",
    "Docs & Deliverables: BPD, FRD, FDD, TDD, UAT, Support",
  ].map(
    (item) =>
      new Paragraph({
        text: item,
        bullet: { level: 0 },
        spacing: { after: 100 },
        style: "ListParagraph",
      })
  );

  // Technical Expertise
  const techExpertiseHeading = new Paragraph({
    text: "Technical Expertise",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });

  const techExpertiseList = [
    "Basic C#.NET, X++, LCS, Azure DevOps",
    "Python, React, Django, Flask, Postgres (Beginner)",
    "D365 F&O, AX 2012 R2/R3, AX 2009, AX 4.0, AX 3.0",
  ].map(
    (item) =>
      new Paragraph({
        text: item,
        bullet: { level: 0 },
        spacing: { after: 100 },
        style: "ListParagraph",
      })
  );

  // Certifications
  const certificationsHeading = new Paragraph({
    text: "Certifications",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });

  const certificationsList = [
    "Dynamics AX 2012 Financials",
    "Dynamics AX 2012 PM & Accounting",
    "Dynamics AX 2009 & AX 2012 Trade & Logistics",
    "D365 for Finance & Ops – Financials & Retail",
  ].map(
    (item) =>
      new Paragraph({
        text: item,
        bullet: { level: 0 },
        spacing: { after: 100 },
        style: "ListParagraph",
      })
  );

  // Achievements
  const achievementsHeading = new Paragraph({
    text: "Achievements",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });

  const achievementsList = [
    "Highly Appreciated (2024–25) for Project Mgmt excellence",
    "Twice promoted at Sonata (2019 & 2020)",
    "7/7 CSAT from multiple clients",
    "Recommended for L1B Visa (Hitachi)",
  ].map(
    (item) =>
      new Paragraph({
        text: item,
        bullet: { level: 0 },
        spacing: { after: 100 },
        style: "ListParagraph",
      })
  );

  // Volunteer
  const volunteerHeading = new Paragraph({
    text: "Volunteer",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });

  const volunteerList = [
    "World Science Festival, WWF, Greenpeace",
    "Social causes & community events",
  ].map(
    (item) =>
      new Paragraph({
        text: item,
        bullet: { level: 0 },
        spacing: { after: 100 },
        style: "ListParagraph",
      })
  );

  // Combine Left Column Content
  const leftColumnContent = [
    kunalNameHeading,
    subHeadingMCP,
    contactHeading,
    ...contactList,
    skillsHeading,
    ...skillsList,
    techExpertiseHeading,
    ...techExpertiseList,
    certificationsHeading,
    ...certificationsList,
    achievementsHeading,
    ...achievementsList,
    volunteerHeading,
    ...volunteerList,
  ];

  // -----------------------------
  // 2. Define Right Column Content
  // -----------------------------

  // Professional Summary
  const professionalSummaryHeading = new Paragraph({
    text: "Professional Summary",
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 0, after: 200 },
  });

  const professionalSummary = new Paragraph({
    text: "Enthusiastic, 14.3+ years experienced D365 F&O (AX) consultant with deep functional expertise across Financials, Trade & Logistics, Project Management & Accounting, and Service Management. Skilled in delivering end-to-end implementations (24+ full-cycle) and managing global teams. Recognized for driving client success, complex integrations, and strategic initiatives. Adept at stakeholder communication, collaboration, and adopting modern technologies (AI, Copilot, Azure) to maximize business value.",
    spacing: { after: 200 },
    font: "Calibri",
    size: 24, // 12pt
  });

  // Core Competencies
  const coreCompetenciesHeading = new Paragraph({
    text: "Core Competencies",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });

  const coreCompetenciesList = [
    "Functional Solutions Leadership: Comprehensive knowledge of D365 FO",
    "Project Management: Led 40+ team members across multiple geographies",
    "Integration Expertise: Bank host-to-host, AI/Copilot, commodity trading",
    "Continuous Improvement: Process optimization, testing, user adoption",
    "Client Satisfaction: 7/7 CSAT from multiple implementations",
  ].map(
    (item) =>
      new Paragraph({
        text: item,
        bullet: { level: 0 },
        spacing: { after: 100 },
        style: "ListParagraph",
      })
  );

  // Experience
  const experienceHeading = new Paragraph({
    text: "Experience",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 300, after: 100 },
  });

  const experienceContent = [
    // Cognizant Experience
    new Paragraph({
      children: [
        new TextRun({
          text: "Cognizant Technology Solutions | D365 F&O Project Manager / Financials Lead (2 yrs 3+ mos)\n",
          bold: true,
        }),
        new TextRun({
          text: "• AUS-Based Client (24) <Medical Equipment> (Aug ’24 – Present): Led D365 F&O with 20+ integrations.\n",
        }),
        new TextRun({
          text: "• Multi-Location Client (23) <AI & Copilot> (Mar ’24 – Jul ’24): Architected D365 FO Copilot integration.\n",
        }),
        new TextRun({
          text: "• Qatar Airways (22) (Apr ’23 – Feb ’24): Financials Lead, SCM, large-scale integrations.\n",
        }),
      ],
      spacing: { after: 200 },
    }),

    // Sonata Experience
    new Paragraph({
      children: [
        new TextRun({
          text: "Sonata Software Solutions Pvt. Ltd. | D365 Finance Lead / Sr. Consultant (4 yrs)\n",
          bold: true,
        }),
        new TextRun({
          text: "• DRA Pacific & GSE Global (20) <Mining> (Mar ’21 – Present): Finance Lead, multi-country rollouts, MR & integrations.\n",
        }),
        new TextRun({
          text: "• Commodity Trading & Risk Mgmt. (18,19) (Dec ’19 – Feb ’21): Specialized commodity trading module bridging SCM & finance.\n",
        }),
        new TextRun({
          text: "• ETG Global (16) (Jun ’20 – Feb ’21): Africa-based rollout, integrated Management Reporter.\n",
        }),
        new TextRun({
          text: "• Washington Football Team (15) (Feb ’20 – May ’20): Finance lead for US sports franchise.\n",
        }),
        new TextRun({
          text: "• WSP / Louis Berger (14) (Feb ’19 – Jan ’20): Disaster mgmt. org, robust project accounting.\n",
        }),
        new TextRun({
          text: "• Normet Intl (13) (Aug ’18 – Jan ’19): PM + finance lead, global mining chemicals.\n",
        }),
      ],
      spacing: { after: 200 },
    }),

    // Hitachi Experience
    new Paragraph({
      children: [
        new TextRun({
          text: "Hitachi Solutions India/America | Senior AX/D365 Consultant (4 yrs)\n",
          bold: true,
        }),
        new TextRun({
          text: "• Multiple onsite US implementations (Agriculture, Gov Port, etc.).\n",
        }),
        new TextRun({
          text: "• Specialized in AX 2012 R2/R3, early D365.\n",
        }),
        new TextRun({
          text: "• Data migration, custom security roles.\n",
        }),
      ],
      spacing: { after: 200 },
    }),

    // Wipro Experience
    new Paragraph({
      children: [
        new TextRun({
          text: "Wipro Infotech Pvt. Ltd. (India/UAE) | AX Functional Consultant (4 yrs)\n",
          bold: true,
        }),
        new TextRun({
          text: "• Managed 6 major AX implementations (Retail, Steel, Manufacturing).\n",
        }),
        new TextRun({
          text: "• Migrations: AX 3.0 → AX 2009, AX 4.0 → AX 2012.\n",
        }),
        new TextRun({
          text: "• Recognized for meeting tight deadlines & cost reductions.\n",
        }),
      ],
      spacing: { after: 200 },
    }),
  ];

  // Education
  const educationHeading = new Paragraph({
    text: "Education",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 300, after: 100 },
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
        spacing: { after: 100 },
        style: "ListParagraph",
      })
  );

  // Additional Highlights
  const additionalHighlightsHeading = new Paragraph({
    text: "Additional Highlights",
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 300, after: 100 },
  });

  const additionalHighlightsContent = [
    // Motivation & Leadership
    new Paragraph({
      children: [
        new TextRun({
          text: "Motivation & Leadership",
          bold: true,
        }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "• Praised by customers for swift project turnarounds\n",
        }),
        new TextRun({
          text: "• Demonstrated cross-functional leadership in global teams",
        }),
      ],
      spacing: { after: 100 },
    }),

    // Academic & Sports Achievements
    new Paragraph({
      children: [
        new TextRun({
          text: "Academic & Sports Achievements",
          bold: true,
        }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "• Topper in 6 of 8 semesters during B. Tech\n",
        }),
        new TextRun({
          text: "• Represented school in cricket & track, numerous awards",
        }),
      ],
      spacing: { after: 100 },
    }),

    // Hobbies/Passions
    new Paragraph({
      children: [
        new TextRun({
          text: "Hobbies/Passions",
          bold: true,
        }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "• Research, Arts/Crafts, Environmental & Social Volunteering",
        }),
      ],
      spacing: { after: 100 },
    }),
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
  // 3. Create Two-Column Table
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
  // 4. Define the Document
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
        children: [resumeTable],
      },
    ],
  });

  // -----------------------------
  // 5. Package & Download the doc
  // -----------------------------
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Kunal_Resume.docx");
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
        padding: "8px 16px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Download DOCX
    </button>
  );
}

/**
 * ResumeDocx Component
 * Displays the download button for the resume.
 */
export default function ResumeDocx() {
  return (
    <div style={{ margin: "20px" }}>
      <h1>Resume Page</h1>
      <p>Click below to download the DOCX version of the resume:</p>
      <ResumeDocxButton />
    </div>
  );
}
