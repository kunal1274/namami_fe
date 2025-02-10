// src/App.jsx
import React from "react";

function NetflixResume() {
  return (
    <div className="bg-[#191919] min-h-screen w-full text-white font-sans">
      {/* Top Section / Header */}
      <HeaderSection />

      {/* Body (scrollable content) */}
      <main className="px-4 md:px-8 lg:px-16 py-8 max-w-[1280px] mx-auto space-y-8">
        <IntroSection />
        <EducationAndSkills />
        <WorkExperience />
        <AcademicAchievements />
      </main>

      {/* Footer - optionally add */}
    </div>
  );
}

// ------------------
// HEADER SECTION
// ------------------
function HeaderSection() {
  return (
    <header className="w-full bg-[#191919] py-4 border-b border-gray-700">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        {/* Left: "Netflix" style Logo */}
        <div className="flex items-center space-x-2">
          {/* Replace with your own logo or Netflix-styled “N” */}
          <div className="text-red-600 text-4xl font-bold">N</div>
          <span className="hidden md:inline text-gray-300 text-sm">
            (Netflix-Style Resume)
          </span>
        </div>

        {/* Right: contact icons */}
        <div className="text-sm text-gray-300 flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 md:mt-0">
          <p className="flex items-center space-x-1">
            <span className="material-icons text-red-600 text-base">
              location_on
            </span>
            <span>Dallas, Texas</span>
          </p>
          <p className="flex items-center space-x-1">
            <span className="material-icons text-red-600 text-base">email</span>
            <span>abc@gmail.com</span>
          </p>
          <p className="flex items-center space-x-1">
            <span className="material-icons text-red-600 text-base">phone</span>
            <span>+1-4643231588</span>
          </p>
          <p className="flex items-center space-x-1">
            <span className="material-icons text-red-600 text-base">
              language
            </span>
            <a href="https://www.yourwebsite.com" className="underline">
              www.yourwebsite.com
            </a>
          </p>
          <p className="flex items-center space-x-1">
            <span className="material-icons text-red-600 text-base">link</span>
            <a href="https://www.linkedin.com/in/abc" className="underline">
              linkedin.com/in/abc
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}

// ------------------
// INTRO / HERO SECTION
// ------------------
function IntroSection() {
  return (
    <section className="bg-[#202020] rounded-lg p-4 md:p-6 shadow-md">
      {/* Name and #1 Applicant */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="text-2xl md:text-3xl font-bold text-red-600">
          ADITYA SHARMA
        </div>
        <div className="text-sm text-white bg-red-600 px-2 py-1 rounded-md mt-2 md:mt-0">
          #1 in Applicants Today
        </div>
      </div>

      {/* Tagline and Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        {/* Some action icons / Netflix style */}
        <div className="space-x-2 mb-4 md:mb-0">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 text-white rounded-md flex items-center space-x-1">
            <span className="material-icons">play_arrow</span>
            <span>Play</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 text-white rounded-md flex items-center space-x-1">
            <span className="material-icons">info</span>
            <span>More Info</span>
          </button>
        </div>
      </div>

      {/* Summary / Description */}
      <p className="mt-4 text-gray-100 text-sm leading-relaxed">
        Innovative and proactive Product Manager offering five years of
        experience building products in finance and energy industry from
        ideation to launch. Excellent reputation for resolving problems,
        managing cross-functional teams, and driving overall product success.
      </p>
    </section>
  );
}

// ------------------
// EDUCATION & SKILLS
// ------------------
function EducationAndSkills() {
  return (
    <section className="bg-[#202020] rounded-lg p-4 md:p-6 shadow-md">
      {/* Title Row */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-red-600 text-lg font-bold uppercase">Education:</h2>
        <h2 className="text-red-600 text-lg font-bold uppercase">Skills</h2>
      </div>

      {/* Content Row */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Education Cards */}
        <div className="md:w-1/2 space-y-4">
          <EducationCard
            title="Master of Science in Information Technology Management"
            location="University of Texas at Dallas"
            date="Dec-2019"
          />
          <EducationCard
            title="Master of Science in Information Technology Management"
            location="University of Texas at Dallas"
            date="Dec-2009"
          />
        </div>

        {/* Skills Cards */}
        <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
          <SkillsCard
            title="Functional Skills"
            list={[
              "JIRA",
              "Confluence",
              "Agile/Hybrid Methodology",
              "SDLC",
              "Test Link",
              "Mantis",
            ]}
          />
          <SkillsCard
            title="Technical Skills"
            list={["SQL", "MySQL", "Python", "Java"]}
          />
        </div>
      </div>
    </section>
  );
}

function EducationCard({ title, location, date }) {
  return (
    <div className="bg-[#2A2A2A] p-4 rounded-lg">
      <h3 className="font-bold text-white text-base mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{location}</p>
      <p className="text-gray-400 text-sm italic mt-1">{date}</p>
    </div>
  );
}

function SkillsCard({ title, list }) {
  return (
    <div className="bg-[#2A2A2A] p-4 rounded-lg">
      <h3 className="font-bold text-white text-base mb-2">{title}</h3>
      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ------------------
// WORK EXPERIENCE
// ------------------
function WorkExperience() {
  return (
    <section className="bg-[#202020] rounded-lg p-4 md:p-6 shadow-md">
      <div className="text-sm text-gray-400 mb-1">
        Explore titles related to:
        <span className="font-bold text-white ml-1">Work Experience</span>
      </div>

      {/* Company #1 */}
      <ExperienceCard
        company="TESLA"
        dateRange="Aug 2019 - Apr 2020"
        role="Technical Project Management"
        location="Fremont / Las Vegas"
        bullets={[
          "Defined and delivered a product vision for the digital transformation of current customer service processes using Robotic Process Automation...",
          "Organized agile and scrum meetings, which included sprint planning, daily scrums, or standups, sprint check-in, sprint review & retrospective.",
          "Collaborated with the data team to build a dashboard representing key project metrics...",
        ]}
      />

      {/* Company #2 */}
      <ExperienceCard
        company="CAPGEMINI"
        dateRange="Dec 2013 - Feb 2017"
        role="Product Manager"
        location="Pune, India"
        bullets={[
          "Led product ideation to launch for online banking website worth 30 million serving multiple stakeholders...",
          "Established Key Performance Indicators (KPI) and Objective and Key Results (OKR)...",
          "Built and nurtured relationship with client executives from three business areas by streamlining communication...",
        ]}
      />
    </section>
  );
}

function ExperienceCard({ company, dateRange, role, location, bullets }) {
  return (
    <div className="mt-4 bg-[#2A2A2A] p-4 rounded-lg">
      <div className="flex flex-wrap justify-between items-center">
        <h3 className="text-base md:text-lg text-red-500 font-bold">
          {company}
        </h3>
        <p className="text-sm text-gray-400">{dateRange}</p>
      </div>
      <div className="text-sm text-gray-300">
        <p className="mt-2 font-semibold">
          {role} | {location}
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ------------------
// ACADEMIC PROJECTS & ACHIEVEMENTS
// ------------------
function AcademicAchievements() {
  return (
    <section className="bg-[#202020] rounded-lg p-4 md:p-6 shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Academic projects */}
        <div className="md:w-1/2 bg-[#2A2A2A] p-4 rounded-lg">
          <h3 className="text-red-600 font-bold mb-2">Academic projects</h3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>
              <strong>Prediction of Factors Influencing Wine Quality</strong>:
              <ul className="list-disc list-inside ml-5">
                <li>
                  Used machine learning techniques including decision tree &
                  regression to predict wine quality.
                </li>
                <li>
                  Built multiple regression model to understand different
                  parameter impacts on wine quality.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Achievements */}
        <div className="md:w-1/2 bg-[#2A2A2A] p-4 rounded-lg">
          <h3 className="text-red-600 font-bold mb-2">Achievements</h3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>Re-organized something to make it work better.</li>
            <li>Identified a problem and solved it.</li>
            <li>Came up with a new idea that improved things.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default NetflixResume;
