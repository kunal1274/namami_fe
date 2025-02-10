// src/GenpactResume.jsx
import React from "react";

export default function GenpactResume() {
  return (
    <div className="min-h-screen bg-[#0F1F2E] text-white font-sans">
      {/* Header / Banner */}
      <header className="relative w-full h-48 bg-gradient-to-r from-[#ee4266] via-[#3b81c2] to-[#00aed9] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
        <div className="relative text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Genpact_logo.svg/2560px-Genpact_logo.svg.png"
            alt="Genpact Logo"
            className="mx-auto w-48 h-auto"
          />
          <p className="text-lg font-bold">Transformation Happens Here</p>
        </div>
      </header>

      {/* Contact Bar */}
      <div className="bg-[#142b40] px-4 py-2 text-sm flex flex-wrap items-center justify-center gap-4">
        <span>Dallas, Texas</span>
        <span>|</span>
        <span>abc@gmail.com</span>
        <span>|</span>
        <span>+1-4643231588</span>
        <span>|</span>
        <a
          href="https://www.linkedin.com/in/abc"
          className="underline text-blue-200"
        >
          linkedin.com/in/abc
        </a>
        <span>|</span>
        <a href="https://www.github.com" className="underline text-blue-200">
          www.github.com
        </a>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        {/* Summary row */}
        <section className="md:flex md:space-x-6">
          {/* Left: Basic Info */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <h1 className="text-2xl font-bold text-[#00aed9]">Aditya Sharma</h1>
            <p className="text-xs text-gray-300 mt-1">
              Brand: Candidate | 5+ yrs Exp
            </p>
            <p className="text-sm mt-2">
              <span className="font-semibold">Role:</span> Product Manager
            </p>
            <p className="text-sm">
              <span className="font-semibold">Industry:</span> Finance / Energy
            </p>
          </div>

          {/* Right: Summary */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold text-[#f15156]">
              Professional Summary
            </h2>
            <p className="text-sm mt-2 leading-relaxed text-gray-100">
              Innovative and proactive Product Manager with experience building
              products in finance and energy industries from ideation to launch.
              Adept at resolving problems, managing cross-functional teams, and
              driving overall product success.
            </p>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-[#f15156]">
            Work Experience
          </h2>

          {/* TESLA */}
          <div className="bg-[#1c3547] mt-4 p-4 rounded-md">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h3 className="font-bold text-white">
                  TESLA
                  <span className="text-sm text-gray-300 ml-2">
                    Technical Project Management
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  Fremont / Las Vegas • Aug 2019 – April 2020
                </p>
              </div>
              <p className="text-[#ee4266] text-sm">Rating: ★★★★★</p>
            </div>
            <ul className="list-disc list-inside ml-4 mt-2 text-sm text-gray-200 space-y-1">
              <li>
                Drove digital transformation of customer service processes using
                RPA, cutting processing time by 70%.
              </li>
              <li>
                Collaborated with data team to build dashboards for key project
                metrics...
              </li>
            </ul>
          </div>

          {/* CAPGEMINI */}
          <div className="bg-[#1c3547] mt-4 p-4 rounded-md">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h3 className="font-bold text-white">
                  CAPGEMINI
                  <span className="text-sm text-gray-300 ml-2">
                    Product Manager
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  Pune, India • Dec 2013 – Feb 2017
                </p>
              </div>
              <p className="text-[#ee4266] text-sm">Rating: ★★★★☆</p>
            </div>
            <ul className="list-disc list-inside ml-4 mt-2 text-sm text-gray-200 space-y-1">
              <li>
                Led product ideation to launch for online banking website with
                30M in revenue...
              </li>
              <li>Established KPIs/OKRs to align cross-functional teams...</li>
            </ul>
          </div>
        </section>

        {/* Education & Skills row */}
        <section className="mt-8 md:flex md:space-x-6">
          {/* Education */}
          <div className="md:w-1/2 bg-[#1c3547] p-4 rounded-md mb-6 md:mb-0">
            <h3 className="font-bold text-[#00aed9] text-lg mb-2">Education</h3>
            <ul className="text-sm text-gray-100 space-y-2">
              <li>
                <strong>Master of Science in Information Technology</strong>
                <br />
                <span className="text-xs text-gray-300">
                  University of Texas at Dallas | Dec 2019
                </span>
              </li>
              <li>
                <strong>Bachelor of Engineering in Electronics</strong>
                <br />
                <span className="text-xs text-gray-300">
                  Mumbai University | Dec 2009
                </span>
              </li>
            </ul>
          </div>

          {/* Skills & Achievements */}
          <div className="md:w-1/2 space-y-6">
            <div className="bg-[#1c3547] p-4 rounded-md">
              <h3 className="font-bold text-[#00aed9] text-lg mb-2">Skills</h3>
              <p className="text-sm font-semibold text-gray-200">Functional:</p>
              <ul className="list-disc list-inside text-sm text-gray-300 ml-4 space-y-1">
                <li>JIRA</li>
                <li>Confluence</li>
                <li>Agile/Hybrid</li>
                <li>SDLC</li>
                <li>Test Link</li>
                <li>Mantis</li>
              </ul>
              <p className="text-sm font-semibold text-gray-200 mt-2">
                Technical:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 ml-4 space-y-1">
                <li>SQL</li>
                <li>MySQL</li>
                <li>Python</li>
                <li>Java</li>
              </ul>
            </div>

            <div className="bg-[#1c3547] p-4 rounded-md">
              <h3 className="font-bold text-[#00aed9] text-lg mb-2">
                Achievements
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-300 ml-4 space-y-1">
                <li>Re-organized something to make it work better.</li>
                <li>Identified a problem and solved it.</li>
                <li>Came up with a new idea that improved things.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1622] text-center text-xs text-gray-400 py-3">
        © 2025 Genpact-Themed Resume. Transformation Happens Here.
      </footer>
    </div>
  );
}
