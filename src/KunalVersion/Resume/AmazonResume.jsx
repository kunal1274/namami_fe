// src/AmazonResume.jsx
import React from "react";

export default function AmazonResume() {
  return (
    <div className="font-sans text-gray-800">
      {/* Amazon-style header */}
      <header className="bg-[#232F3E] text-white w-full">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left side: Amazon logo placeholder */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">amazon</div>
            <span className="text-xs italic">Deliver to Dallas, Texas</span>
          </div>

          {/* Middle: search bar */}
          <div className="flex-1 mx-4 hidden sm:flex">
            <input
              type="text"
              placeholder="what does a good employee look like?"
              className="w-full p-2 text-black rounded-l-md"
            />
            <button className="bg-[#febd69] text-black px-4 rounded-r-md">
              <span className="material-icons">search</span>
            </button>
          </div>

          {/* Right side: user accounts, orders, cart */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="hidden md:block">
              <p>Hello, Company Account</p>
              <p className="font-bold">Returns & Orders</p>
            </div>
            <div className="relative">
              <span className="material-icons text-2xl">shopping_cart</span>
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs font-bold px-1 rounded-full">
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Subheader with contact links */}
      <div className="bg-[#131A22] text-gray-300 px-4 py-2 flex flex-wrap items-center text-xs md:text-sm space-x-3">
        <span>Dallas, Texas</span>
        <span>|</span>
        <span>abc@gmail.com</span>
        <span>|</span>
        <span>+1-4643231588</span>
        <span>|</span>
        <a href="https://www.linkedin.com/in/abc" className="underline">
          linkedin.com/in/abc
        </a>
        <span>|</span>
        <a href="https://www.github.com" className="underline">
          www.github.com
        </a>
        <span>|</span>
        <a href="https://www.yourwebsite.com" className="underline">
          www.yourwebsite.com
        </a>
      </div>

      {/* Main container */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col lg:flex-row lg:space-x-6">
        {/* Left Column (Product-like details) */}
        <section className="lg:w-2/3">
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900">Aditya Sharma</h1>
            <p className="text-sm text-orange-600 flex items-center space-x-1">
              <span className="material-icons text-base text-yellow-400">
                star
              </span>
              <span>Brand: Candidate</span>
            </p>
            <p className="text-xs text-gray-600">
              412,173 ratings | 1000+ answered questions
            </p>
            <p className="bg-[#febd69] text-xs px-2 py-1 inline-block mt-1">
              Amazon’s Choice
            </p>
            <p className="text-green-700 text-xs inline-block ml-2">
              Climate Pledge Friendly
            </p>
            <p className="line-through text-gray-500 text-sm mt-2">
              List Price: $99999999.99
            </p>
            <p className="text-sm">
              With Deal:
              <span className="text-orange-600 font-bold ml-1">
                Add to cart for pricing information
              </span>
            </p>
            <p className="text-xs text-gray-500">
              You Save: Future Company cost
            </p>
            <p className="text-xs text-green-700 mt-1">
              Only 1 left in stock - order soon
            </p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Description:
            </h2>
            <p className="mt-2 text-sm">
              Innovative and proactive Product Manager offering five years of
              experience building products in finance and energy industry from
              ideation to launch. Excellent reputation for resolving problems,
              managing cross-functional teams, and driving overall product
              success.
            </p>
          </div>

          {/* Work Experience */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Work Experience
            </h2>

            {/* TESLA */}
            <div className="bg-white rounded shadow p-4 mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">
                    TESLA
                    <span className="text-sm text-gray-600 ml-2">
                      Technical Project Management
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Fremont / Las Vegas • Aug 2019 – April 2020
                  </p>
                </div>
                <div className="flex items-center text-yellow-400">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </div>
              </div>

              <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>
                  Defined and delivered a product vision for the digital
                  transformation of current customer service processes using
                  Robotic Process Automation, achieving reduction in processing
                  time by 70%.
                </li>
                <li>
                  Utilized agile methodology to analyze and identify gaps in
                  existing business processes.
                </li>
                <li>
                  Collaborated with the data team to build a dashboard
                  representing key project metrics...
                </li>
              </ul>
            </div>

            {/* Capgemini */}
            <div className="bg-white rounded shadow p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">
                    CAPGEMINI
                    <span className="text-sm text-gray-600 ml-2">
                      Product Manager
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Pune, India • Dec 2013 – Feb 2017
                  </p>
                </div>
                <div className="flex items-center text-yellow-400">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star_half</span>
                </div>
              </div>

              <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>
                  Led product ideation to launch for online banking website
                  worth 30 million serving multiple stakeholders.
                </li>
                <li>
                  Established KPIs and OKRs by identifying persona,
                  anti-persona, customer pain points...
                </li>
                <li>
                  Built and nurtured relationship with client executives from
                  three business areas...
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="lg:w-1/3 mt-4 lg:mt-0">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-green-700 text-sm mb-1">In Stock</p>
            <div className="text-sm text-gray-800">
              Qty: <span className="font-bold">1</span>
            </div>
            <button className="bg-yellow-400 w-full text-sm font-semibold py-2 rounded mt-2">
              Add to Card
            </button>
            <button className="bg-orange-400 w-full text-sm font-semibold py-2 rounded mt-2">
              Buy Now
            </button>
          </div>

          {/* Education & Skills */}
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg text-green-700">EDUCATION:</h3>
            <ul className="text-sm list-disc list-inside ml-2 mt-2 space-y-1">
              <li>
                <strong>
                  Master of Science in Information Technology Management
                </strong>
                <br />
                <span className="text-xs">
                  University of Texas at Dallas, Richardson, TX — Dec 2019
                </span>
              </li>
              <li className="mt-2">
                <strong>Bachelor of Engineering in Electronics</strong>
                <br />
                <span className="text-xs">
                  Mumbai University, Maharashtra, India — Dec 2009
                </span>
              </li>
            </ul>

            <h3 className="font-bold text-lg text-orange-500 mt-4">Skills:</h3>
            <p className="text-sm font-semibold text-gray-700">
              Functional Skills:
            </p>
            <ul className="text-sm list-disc list-inside ml-2 space-y-1">
              <li>JIRA</li>
              <li>Confluence</li>
              <li>Agile/Hybrid</li>
              <li>SDLC</li>
              <li>Test Link</li>
              <li>Mantis</li>
            </ul>
            <p className="text-sm font-semibold text-gray-700 mt-2">
              Technical Skills:
            </p>
            <ul className="text-sm list-disc list-inside ml-2 space-y-1">
              <li>SQL</li>
              <li>MySQL</li>
              <li>Python</li>
              <li>Java</li>
            </ul>
          </div>

          {/* People also searched for */}
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h3 className="font-bold text-sm">Customers who searched for:</h3>
            <p className="text-sm font-semibold mt-2">ACADEMIC PROJECTS</p>
            <ul className="list-disc list-inside ml-2 text-sm space-y-1">
              <li>
                <strong>Prediction of Factors Influencing Wine Quality</strong>:
                used ML techniques (decision tree & regression)...
              </li>
            </ul>

            <p className="text-sm font-semibold mt-3">ACHIEVEMENTS</p>
            <ul className="list-disc list-inside ml-2 text-sm space-y-1">
              <li>Re-organized something to make it work better.</li>
              <li>Identified a problem and solved it.</li>
              <li>Came up with a new idea that improved things.</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Footer area */}
      <footer className="bg-[#232F3E] text-white text-center text-xs py-2">
        © 2025 Amazon-Themed Resume. All rights reserved.
      </footer>
    </div>
  );
}
