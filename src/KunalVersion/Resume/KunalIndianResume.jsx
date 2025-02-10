// src/components/KunalIndianResume.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import kunalPhoto from "../../assets/images/kunal.png"; // सुनिश्चितं कुर्वीत यत् पथः सम्यक् अस्ति
import {
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa"; // सम्पर्कसूचना कृते चिह्नानि

export function KunalIndianResume() {
  // PDF निर्माण के लिए रिज्यूमे सामग्री का संदर्भ
  const resumeRef = useRef(null);

  // PDF डाउनलोड करने का कार्य
  const handleDownloadPdf = () => {
    const input = resumeRef.current;

    if (!input) {
      console.error("किसी रिज्यूमे सामग्री को कैप्चर करने के लिए नहीं मिला");
      alert("PDF निर्माण विफल रहा। कृपया पुनः प्रयास करें।");
      return;
    }

    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // आयाम गणना
        const imgWidth = 210; // A4 चौड़ाई मिमी में
        const pageHeight = 297; // A4 ऊँचाई मिमी में
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // पहली पृष्ठ जोड़ें
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // आवश्यकतानुसार अतिरिक्त पृष्ठ जोड़ें
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("कुणाल_भारतीय_रिज्यूमे.pdf");
      })
      .catch((error) => {
        console.error("PDF निर्माण में त्रुटि:", error);
        alert("PDF निर्माण विफल रहा। कृपया पुनः प्रयास करें।");
      });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-gray-900 font-sans">
      {/* 
        1) HEADER / BANNER
           - भारतीय सांस्कृतिक थीम वाला बैनर
      */}
      <header className="relative w-full h-48 bg-gradient-to-r from-[#FF9933] via-[#FFD700] to-[#FF9933] flex items-center justify-center">
        <div className="absolute inset-0 bg-white bg-opacity-10"></div>
        <div className="relative text-center">
          {/* भारतीय प्रतीक चिह्न */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Emblem_of_India.svg"
            alt="भारतीय प्रतीक चिह्न"
            className="mx-auto w-20 h-20 mb-2"
          />
          <p className="text-lg font-semibold text-white">
            परिवर्तन की अग्रिम पंक्ति
          </p>
        </div>
      </header>

      {/* 
        2) संपर्क पट्टी
           - स्थान, ईमेल, फोन, LinkedIn आदि दिखाना 
      */}
      <div className="bg-[#8DB600] px-4 py-3 text-sm flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-white" />
          <span className="text-white">गुरुग्राम, भारत</span>
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
        3) मुख्य सामग्री 
        - दो स्तंभीय लेआउट: बायां साइडबार और मुख्य सामग्री
      */}
      <main
        className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        ref={resumeRef}
      >
        {/* बायां साइडबार */}
        <aside className="md:col-span-1 bg-[#FFFACD] p-6 rounded-md space-y-6 shadow-lg">
          {/* फोटो अनुभाग */}
          <div className="relative text-center">
            <img
              src={kunalPhoto}
              alt="कुणाल का फोटो"
              className="mx-auto w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#8DB600] transition-transform duration-300 transform hover:scale-105"
            />
            <p className="text-md font-medium mt-2 text-[#8DB600]">
              परिवर्तन की अग्रिम पंक्ति
            </p>
          </div>

          {/* कौशल */}
          <section>
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">कौशल</h2>
            {/* कार्यात्मक विशेषज्ञता */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                कार्यात्मक विशेषज्ञता
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  वित्तीय | व्यापार और लॉजिस्टिक्स | परियोजना प्रबंधन और लेखांकन
                  | सेवा प्रबंधन
                </li>
                <li>
                  कस्टम सुरक्षा भूमिकाएँ | DMF के माध्यम से डेटा माइग्रेशन,
                  एक्सेल एड-इन्स
                </li>
                <li>
                  बैंक इंटीग्रेशन – होस्ट टू होस्ट और API इंटीग्रेशन | भारत में
                  GST ई-इनवॉइस इंटीग्रेशन
                </li>
                <li>
                  ISVs: हिटाची, टू-इंक्रीज़ कंस्ट्रक्शन, डायनवे एंटरप्राइज एसेट
                  मैनेजमेंट, SK बैंकिंग, फास्ट पाथ रिपोर्टिंग
                </li>
                <li>
                  दस्तावेजीकरण: BPD, FRD, Gap-Fit, FDD, TDD, SLD, परीक्षण,
                  उपयोगकर्ता मैनुअल, मूल्य प्रस्ताव, प्रस्ताव तैयारी, प्रेस
                  रिलीज़, पायलट कार्यान्वयन, ब्लॉग, UAT, समर्थन नेतृत्व
                </li>
                <li>कंसल्टेंट्स – डेवलपर्स और कार्यात्मक का प्रबंधन</li>
              </ul>
            </div>
            {/* तकनीकी विशेषज्ञता */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                तकनीकी विशेषज्ञता
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  Dynamics 365 Finance & Operations (D365FO) | बेसिक C#.NET |
                  बेसिक X++
                </li>
                <li>
                  AX टेबल संरचना | AX स्थापना और विन्यास | LCS | LCS कोड
                  डिप्लॉयमेंट्स | LCS BPM | बेसिक Azure DevOps
                </li>
                <li>शुरुआती स्तर: पाइथन, React, Django, Flask, Postgres</li>
                <li>
                  नवीनतम AX संस्करण: D365FO, AX 2012 R2/R3, AX 2009, AX 4.0, AX
                  3.0
                </li>
                <li>
                  काम किए ISVs: Commodity Trading and Risk Management, Dataverse
                  to External Web Apps (React), Construction Management,
                  Property Management
                </li>
              </ul>
            </div>
            {/* कार्यान्वयन */}
            <div>
              <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                कार्यान्वयन
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  कुल कार्यान्वयन: २४ परियोजनाएँ | पूर्ण-से-पूर्ण: २० परियोजनाएँ
                </li>
              </ul>
            </div>
          </section>

          {/* प्रमाणपत्र */}
          <section>
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              प्रमाणपत्र
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>Dynamics AX 2012 Financials में माइक्रोसॉफ्ट प्रमाणित</li>
              <li>
                Dynamics AX 2012 Project Management and Accounting में
                माइक्रोसॉफ्ट प्रमाणित
              </li>
              <li>
                Dynamics AX 2009 और AX 2012 Trade and Logistics में माइक्रोसॉफ्ट
                प्रमाणित
              </li>
              <li>
                Dynamics 365 for Finance and Operations – Financials में
                माइक्रोसॉफ्ट प्रमाणित
              </li>
              <li>
                Dynamics 365 for Finance and Operations – Retail में
                माइक्रोसॉफ्ट प्रमाणित
              </li>
            </ul>
          </section>

          {/* उपलब्धियाँ एवं मान्यता */}
          <section>
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              उपलब्धियाँ एवं मान्यता
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                परियोजना प्रबंधन उत्कृष्टता के लिए २०२४-२५ में अत्यधिक सराहना
                प्राप्त
              </li>
              <li>
                सोना सॉफ़्टवेयर सॉल्यूशंस में (२०१९ और २०२०) दो बार पदोन्नति
                प्राप्त
              </li>
              <li>कई ग्राहकों से CSAT रेटिंग: ७/७</li>
              <li>
                हिटाची सॉल्यूशंस अमेरिका लिमिटेड के साथ L1B वीजा के लिए अनुशंसा
                प्राप्त
              </li>
              <li>
                टीवी सुंदराम इय्यंगार एंड संस परियोजना में श्रेष्ठ समर्थन
                सलाहकार
              </li>
              <li>क्रिकेट और एथलेटिक्स में व्यापक खेल एवं शैक्षिक सम्मान</li>
            </ul>
          </section>

          {/* स्वयंसेवी कार्य */}
          <section>
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              स्वयंसेवी कार्य
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                वर्ल्ड साइंस फेस्टिवल | वर्ल्ड साइंस यू | WWF | वर्ल्ड विज़न |
                ग्रीनपीस | SGI | केटो
              </li>
              <li>
                सामाजिक कारणों और सामुदायिक कार्यक्रमों में सक्रिय भागीदारी
              </li>
            </ul>
          </section>
        </aside>

        {/* मुख्य सामग्री */}
        <section className="md:col-span-2 space-y-6">
          {/* व्यावसायिक सारांश */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-[#8DB600] mb-4">
              व्यावसायिक सारांश
            </h1>
            <p className="text-sm leading-relaxed text-gray-800">
              मेरी शैक्षिक पृष्ठभूमि, १४.३+ वर्षों के व्यावसायिक अनुभव के साथ,
              मुझे इस भूमिका के लिए अत्यधिक योग्य उम्मीदवार बनाती है। अपने करियर
              में, मैंने लगातार अपनी समर्पण और प्रदर्शन के लिए मान्यता अर्जित की
              है, जिससे पदोन्नति और बढ़ी हुई जिम्मेदारियाँ मिली हैं। ये
              उपलब्धियाँ Functional Dynamics 365 Finance and Operations (पूर्व
              में Dynamics AX) में मेरी विशेषज्ञता, निरंतर पेशेवर विकास के प्रति
              मेरी अटूट प्रतिबद्धता, और मेरी मजबूत लिखित और मौखिक संचार क्षमताओं
              का प्रमाण हैं।
            </p>
          </div>

          {/* मुख्य क्षमताएँ */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              मुख्य क्षमताएँ
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                <strong>कार्यात्मक समाधान नेतृत्व:</strong> D365 FO का व्यापक
                ज्ञान
              </li>
              <li>
                <strong>परियोजना प्रबंधन:</strong> कई भौगोलिक क्षेत्रों में ४०+
                टीम सदस्यों का नेतृत्व
              </li>
              <li>
                <strong>एकीकरण विशेषज्ञता:</strong> बैंक होस्ट-टू-होस्ट, DHL,
                AI/Copilot, कमोडिटी ट्रेडिंग
              </li>
              <li>
                <strong>निरंतर सुधार:</strong> प्रक्रिया अनुकूलन, परीक्षण,
                उपयोगकर्ता अंगीकरण के प्रति जुनून
              </li>
              <li>
                <strong>ग्राहक संतोष:</strong> कई कार्यान्वयन से CSAT रेटिंग ७/७
              </li>
            </ul>
          </div>

          {/* अनुभव */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">अनुभव</h2>

            {/* Cognizant Technology Limited */}
            <div className="mb-6">
              <h3 className="text-gray-900 font-bold">
                Cognizant Technology Limited
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                भूमिका: D365 F&O परियोजना प्रबंधक / वित्तीय नेतृत्व | कार्यकाल:
                २ वर्ष ३+ माह
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना २४ */}
                <li>
                  <strong>AUS-आधारित ग्राहक (२४)</strong> &lt;मेडिकल उपकरण और
                  स्वास्थ्य देखभाल&gt; (अगस्त’२४ – वर्तमान)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – परियोजना प्रबंधक | वित्तीय
                      नेतृत्व | SCM | MR | एकीकरण | DHL एकीकरण | २० इंटरफेस
                      एकीकरण
                    </li>
                    <li>
                      ईएमईए, कनाडा, और AUS कार्यान्वयन और समर्थन संभालने वाली ४०
                      सदस्यीय टीम का प्रबंधन
                    </li>
                    <li>अगली USA कार्यान्वयन पाइपलाइन में</li>
                  </ul>
                </li>
                {/* परियोजना २३ */}
                <li className="mt-2">
                  <strong>मल्टी-लोकेशन ग्राहक (२३)</strong> &lt;AI और Copilot
                  समाधान वास्तुकार और विकास&gt; (मार्च’२४ – जुलाई’२४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 FO Copilot – समाधान वास्तुकार | डेमो | AI | Copilot
                      और एकीकरण
                    </li>
                  </ul>
                </li>
                {/* परियोजना २२ */}
                <li className="mt-2">
                  <strong>कतर एयरवेज (२२)</strong> &lt;ड्यूटी फ्री और एयरवेज&gt;
                  (अप्रैल’२३ – फरवरी’२४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्व | SCM | MR |
                      एकीकरण
                    </li>
                  </ul>
                </li>
                {/* परियोजना २१ */}
                <li className="mt-2">
                  <strong>कम्युनिटी फाइबर (२१)</strong> &lt;नेटवर्क और फाइबर
                  नेट&gt; (सितंबर’२२ – वर्तमान)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्व | SCM | MR |
                      एकीकरण | UK स्थानीयकरण
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
                भूमिका: D365 Finance नेतृत्व / वरिष्ठ सलाहकार | कार्यकाल: ४ वर्ष
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना २० */}
                <li>
                  <strong>DRA Pacific & GSE Global (२०)</strong> &lt;अंडरग्राउंड
                  माइनिंग केमिकल्स उपकरण&gt; (मार्च’२१ – वर्तमान)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्व | MR |
                      एकीकरण
                    </li>
                    <li>मल्टी-कंट्री रोलआउट्स और एकीकरण का प्रबंधन</li>
                  </ul>
                </li>
                {/* परियोजना १९ */}
                <li className="mt-2">
                  <strong>DRA Global (१९)</strong> &lt;अंडरग्राउंड माइनिंग
                  केमिकल्स उपकरण&gt; (मार्च’२१ – वर्तमान)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्व | MR |
                      एकीकरण
                    </li>
                    <li>१००+ देशों में वैश्विक कार्यान्वयन का समर्थन</li>
                  </ul>
                </li>
                {/* परियोजना १८ और १७ */}
                <li className="mt-2">
                  <strong>Commodity Trading and Risk Management (१८,१९)</strong>{" "}
                  &lt;Commodity Trading and Risk Management&gt; (दिसंबर’१९ –
                  फरवरी’२१)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्व | SCM
                      नेतृत्व | नया मॉड्यूल Commodity Trading and Risk
                      Management
                    </li>
                  </ul>
                </li>
                {/* परियोजना १६ */}
                <li className="mt-2">
                  <strong>ETG Global (१६)</strong> &lt;Commodity Trading and
                  Risk Management&gt; (जून’२० – फरवरी’२१)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्व | SCM | MR
                    </li>
                    <li>अफ्रीका आधारित रोलआउट | एकीकृत Management Reporter</li>
                  </ul>
                </li>
                {/* परियोजना १५ */}
                <li className="mt-2">
                  <strong>Washington Football Team (१५)</strong> &lt;अमेरिकी
                  फुटबॉल टीम&gt; (फरवरी’२० – मई’२०)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्व वरिष्ठ
                      सलाहकार | MR
                    </li>
                    <li>
                      एक प्रमुख US खेल फ्रैंचाइज़ के लिए वित्तीय संचालन का
                      प्रबंधन
                    </li>
                  </ul>
                </li>
                {/* परियोजना १४ */}
                <li className="mt-2">
                  <strong>WSP / Louis Berger (१४)</strong> &lt;वैश्विक/राष्ट्रीय
                  महामारी और आपदा प्रबंधन&gt; (फरवरी’१९ – जनवरी’२०)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्व सलाहकार | MR
                      | परियोजना प्रबंधन और लेखांकन
                    </li>
                    <li>
                      मजबूत परियोजना लेखांकन और आपदा प्रबंधन संचालन का प्रबंधन
                    </li>
                  </ul>
                </li>
                {/* परियोजना १३ */}
                <li className="mt-2">
                  <strong>Normet Intl (१३)</strong> &lt;अंडरग्राउंड माइनिंग
                  केमिकल्स उपकरण&gt; (अगस्त’१८ – जनवरी’१९)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय | SCM | परियोजना
                      प्रबंधन और लेखांकन | बैंक एकीकरण | कार्यकारी PM एवं
                      नेतृत्व भूमिका
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
                भूमिका: वरिष्ठ AX/D365 सलाहकार | कार्यकाल: ३ वर्ष १० माह
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना १२ */}
                <li>
                  <strong>कृषि और खेती (१२)</strong> &lt;कृषि और खेती&gt;
                  (दिसंबर’१७ – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय | SCM | परियोजना
                      प्रबंधन और लेखांकन
                    </li>
                  </ul>
                </li>
                {/* परियोजना ११ */}
                <li className="mt-2">
                  <strong>
                    US Gov & Port & Property & Lease Management (११)
                  </strong>{" "}
                  &lt;US Gov & Port & Property & Lease Management&gt; (फरवरी’१८
                  – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2012 R3 वित्तीय</li>
                  </ul>
                </li>
                {/* परियोजना १० */}
                <li className="mt-2">
                  <strong>Research & Chemicals & Allergy (१०)</strong>{" "}
                  &lt;Research & Chemicals & Allergy&gt; (मई’१७ – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीय | परियोजना प्रबंधन और लेखांकन | उत्पादन
                      | सूची
                    </li>
                  </ul>
                </li>
                {/* परियोजना ९ */}
                <li className="mt-2">
                  <strong>
                    US Gov & Security & Scanning & Airports & Rockets &
                    Electronics (९)
                  </strong>{" "}
                  &lt;US Gov & Security & Scanning & Airports & Rockets &
                  Electronics&gt; (दिसंबर’१६ – अप्रैल’१७)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीय | परियोजना प्रबंधन और लेखांकन | सेवा
                      प्रबंधन
                    </li>
                  </ul>
                </li>
                {/* परियोजना ८ */}
                <li className="mt-2">
                  <strong>Franchise TV Stations (८)</strong> &lt;Franchise TV
                  Stations&gt; (अक्टूबर’१५ – नवंबर’१६)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीय | परियोजना प्रबंधन और लेखांकन | सुरक्षा
                      भूमिकाएँ | डेटा माइग्रेशन
                    </li>
                  </ul>
                </li>
                {/* परियोजना ७ */}
                <li className="mt-2">
                  <strong>Hitachi IP Construction EAM Mobile Apps (७)</strong>{" "}
                  &lt;Hitachi IP Construction EAM Mobile Apps&gt; (अक्टूबर’१४ –
                  अक्टूबर’१५)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R2/R3 | CTP 6 में वित्तीय | परियोजना प्रबंधन और
                      लेखांकन | सेवाएँ | उत्पाद विकास टीम
                    </li>
                    <li>
                      Hitachi + To-Increase Construction | Hitachi + Dynaway
                      Enterprise Asset Management
                    </li>
                    <li>
                      मूल्य प्रस्ताव | प्रेस रिलीज़ | मोबाइल ऐप विकास और परीक्षण
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
                भूमिका: AX कार्यात्मक सलाहकार | कार्यकाल: ४ वर्ष
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना ६ */}
                <li>
                  <strong>
                    क्रेडिट डेबिट कार्ड्स & मॉल & स्की दुबई & वाटरपार्क & मैजिक
                    प्लेनेट्स & हेल्थ & चैरिटी & टॉय स्टोर (६)
                  </strong>{" "}
                  &lt;क्रेडिट डेबिट कार्ड्स & मॉल & स्की दुबई & वाटरपार्क &
                  मैजिक प्लेनेट्स & हेल्थ & चैरिटी & टॉय स्टोर&gt; (मई’१३ -
                  सितंबर’१४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R2 वित्तीय | सुरक्षा भूमिकाएँ | डेटा माइग्रेशन
                    </li>
                  </ul>
                </li>
                {/* परियोजना ५ */}
                <li className="mt-2">
                  <strong>Steel Pipes (५)</strong> &lt;Steel Pipes&gt; (नवंबर’१२
                  – मई’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2009 वित्तीय | व्यापार और लॉजिस्टिक्स | बेसिक उत्पादन
                    </li>
                  </ul>
                </li>
                {/* परियोजना ४ */}
                <li className="mt-2">
                  <strong>Pens Manufacturing (४)</strong> &lt;Pens
                  Manufacturing&gt; (नवंबर’१२ – मई’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2009 वित्तीय | व्यापार और लॉजिस्टिक्स</li>
                  </ul>
                </li>
                {/* परियोजना ३ */}
                <li className="mt-2">
                  <strong>McDonalds Franchise (३)</strong> &lt;McDonalds
                  Franchise&gt; (जुलाई’१२ - अक्टूबर’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2012 वित्तीय | बेसिक उत्पादन</li>
                  </ul>
                </li>
                {/* परियोजना २ */}
                <li className="mt-2">
                  <strong>Jewelry (२)</strong> &lt;Jewelry&gt; (नवंबर’११ –
                  अगस्त’१२)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 4.0 से AX 2009 में वित्तीय | व्यापार और लॉजिस्टिक्स में
                      माइग्रेशन
                    </li>
                  </ul>
                </li>
                {/* परियोजना १ */}
                <li className="mt-2">
                  <strong>Automobiles & Dealer & POS (१)</strong>{" "}
                  &lt;Automobiles & Dealer & POS&gt; (अक्टूबर’१० - अक्टूबर’११)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX3.0 से AX 2009 में व्यापार और लॉजिस्टिक्स | X++
                      रिपोर्ट्स | BI और SSRS | AX स्थापना और विन्यास
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* शिक्षा */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              शिक्षा
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                १२ वर्षों का नियमित विद्यालय शिक्षा (Std. X = ८५%, Std. XII =
                ६५.६%)
              </li>
              <li>
                इलेक्ट्रॉनिक्स और संचार में बैचलर ऑफ टेक्नोलॉजी (२००६-२०१०):
                CGPA = ८.६/१०
              </li>
            </ul>
          </div>

          {/* अतिरिक्त विशेषताएँ */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              अतिरिक्त विशेषताएँ
            </h2>
            <div className="md:flex md:space-x-6">
              {/* प्रेरणा एवं नेतृत्व */}
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                  प्रेरणा एवं नेतृत्व
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>
                    ग्राहक सिफारिशें और २०२४ तथा हाल ही में २०२५ में ग्राहकों और
                    आंतरिक प्रबंधन से अत्यधिक सराहना प्राप्त
                  </li>
                  <li>
                    टीवी सुंदराम इय्यंगार एंड संस लिमिटेड, मदुरै में श्रेष्ठ
                    समर्थन सलाहकार (AX माइग्रेशन नवम्बर २०१० – अक्टूबर २०११)
                  </li>
                  <li>
                    श्रेष्ठ डिलीवरी आश्वासन रिपोर्ट के लिए सराहना प्राप्त और
                    बिना विलंब के UAT पूर्ण किया
                  </li>
                  <li>
                    ASPI, चेन्नई (AX 2009) और MAF, दुबई (AX 2012), D365 for
                    Agriculture Client से ग्राहकों द्वारा CSAT रेटिंग ७/७
                  </li>
                  <li>
                    Hitachi Solutions America Ltd. के साथ विशेष कौशल के लिए L1B
                    वीजा के लिए अनुशंसा प्राप्त (२०१६)
                  </li>
                  <li>
                    Sonata Software Solutions में दो बार पदोन्नति प्राप्त (२०१९
                    और २०२०) | वैश्विक कार्यान्वयन के लिए वित्तीय नेतृत्व में
                    तैनात
                  </li>
                  <li>बैचलर के दौरान ८ में से ६ सेमेस्टर में बैच टॉपर</li>
                  <li>
                    ३ बैचों (~१२०० छात्र) के लिए सामाजिक कारणों और न्याय के लिए
                    कॉलेज स्वयंसेवी टीमों का नेतृत्व किया
                  </li>
                  <li>
                    विद्यालय कैप्टन के लिए नामांकित (२००४-०५) और Std. X में
                    द्वितीय टॉपर
                  </li>
                  <li>
                    क्रिकेट और एथलेटिक्स में उत्कृष्ट उपलब्धियाँ:
                    <ul className="list-disc list-inside ml-5">
                      <li>सात लगातार छह सात गेंदों में</li>
                      <li>चार लगातार गेंदों में चार विकेट</li>
                      <li>
                        ७ बार हैट्रिक | ~११७ रनआउट्स | ~६०० कैचेस | ~४६० विकेट
                      </li>
                      <li>
                        टेस्ट मैच में उच्चतम स्कोर – २०१* | लिमिटेड ओवर में
                        स्ट्राइक रेट – ३००
                      </li>
                      <li>लिमिटेड ओवर में औसत स्कोर – ७० | कुल रन – १०,०००</li>
                      <li>७०० से अधिक छक्के और १,२०० चौके</li>
                      <li>
                        स्कूल अंतर-चैंपियनशिप में टीम का नेतृत्व किया; १०० मीटर
                        में कांस्य, ४०० मीटर रिले में स्वर्ण, और ट्रिपल जंप में
                        स्वर्ण जीतें
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* शैक्षिक एवं खेल उपलब्धियाँ */}
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                  शैक्षिक एवं खेल उपलब्धियाँ
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>बैचलर के दौरान ८ में से ६ सेमेस्टर में बैच टॉपर</li>
                  <li>
                    ३ बैचों (~१२०० छात्र) के लिए सामाजिक कारणों और न्याय के लिए
                    कॉलेज स्वयंसेवी टीमों का नेतृत्व किया
                  </li>
                  <li>
                    विद्यालय कैप्टन के लिए नामांकित (२००४-०५) और Std. X में
                    द्वितीय टॉपर
                  </li>
                  <li>
                    क्रिकेट और एथलेटिक्स में उत्कृष्ट उपलब्धियाँ:
                    <ul className="list-disc list-inside ml-5">
                      <li>सात लगातार छह सात गेंदों में</li>
                      <li>चार लगातार गेंदों में चार विकेट</li>
                      <li>
                        ७ बार हैट्रिक | ~११७ रनआउट्स | ~६०० कैचेस | ~४६० विकेट
                      </li>
                      <li>
                        टेस्ट मैच में उच्चतम स्कोर – २०१* | लिमिटेड ओवर में
                        स्ट्राइक रेट – ३००
                      </li>
                      <li>लिमिटेड ओवर में औसत स्कोर – ७० | कुल रन – १०,०००</li>
                      <li>७०० से अधिक छक्के और १,२०० चौके</li>
                      <li>
                        स्कूल अंतर-चैंपियनशिप में टीम का नेतृत्व किया; १०० मीटर
                        में कांस्य, ४०० मीटर रिले में स्वर्ण, और ट्रिपल जंप में
                        स्वर्ण जीतें
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* शौक/रुचियाँ */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                शौक/रुचियाँ
              </h3>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                <li>
                  अनुसंधान | कला/शिल्प | पर्यावरणीय और सामाजिक स्वयंसेवी कार्य
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* 
        4) DOWNLOAD BUTTON 
           - मुख्य सामग्री के नीचे और resumeRef के बाहर स्थित
      */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="bg-[#8DB600] hover:bg-[#6B8E23] text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300 flex items-center space-x-2"
        >
          {/* भारतीय डाउनलोड आइकन */}
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
          <span>PDF के रूप में डाउनलोड करें</span>
        </button>
      </div>

      {/* फुटर */}
      <footer className="bg-[#8DB600] text-center text-xs text-gray-200 py-3">
        © २०२५ भारतीय सांस्कृतिक थीम वाला रिज्यूमे। परिवर्तन की अग्रिम पंक्ति।
      </footer>
    </div>
  );
}

export function KunalSanskritResume() {
  // PDF निर्माणाय रिज़्यूमे सामग्री-संदर्भः
  const resumeRef = useRef(null);

  // PDF डाउनलोडस्य कार्यम्
  const handleDownloadPdf = () => {
    const input = resumeRef.current;

    if (!input) {
      console.error("कस्यापि रिज़्यूमे सामग्रीं ग्रहीतुम् न प्राप्तम्");
      alert("PDF निर्माणं विफलम्। कृपया पुनः प्रयासं कुर्वीत।");
      return;
    }

    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // आयाम गणना
        const imgWidth = 210; // A4 चौड़ाई मिमीमध्ये
        const pageHeight = 297; // A4 ऊर्ध्वमापनं मिमीमध्ये
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // प्रथम-पृष्ठम् योजय
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // यदि आवश्यकं स्यात्, अतिरिक्त-पृष्ठानि योजय
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("Kunal_Sanskrit_Resume.pdf");
      })
      .catch((error) => {
        console.error("PDF निर्माणे त्रुटिः:", error);
        alert("PDF निर्माणं विफलम्। कृपया पुनः प्रयासं कुर्वीत।");
      });
  };

  return (
    <div className="min-h-screen bg-[#F0EAD6] text-gray-900 font-sans">
      {/* 
        1) शीर्षलेखः / बैनरः
           - भारतीय सांस्कृतिक थीमेन सह बैनरः
      */}
      <header className="relative w-full h-48 bg-gradient-to-r from-[#FF9933] via-[#FFD700] to-[#FF9933] flex items-center justify-center">
        <div className="absolute inset-0 bg-white bg-opacity-10"></div>
        <div className="relative text-center">
          {/* भारतीय प्रतीक चिन्हम् */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Emblem_of_India.svg"
            alt="भारतीय प्रतीक चिन्हम्"
            className="mx-auto w-20 h-20 mb-2"
          />
          <p className="text-lg font-semibold text-white">
            परिवर्तनस्य अग्रिमपंक्ति
          </p>
        </div>
      </header>

      {/* 
        2) सम्पर्कपट्टिका
           - स्थानम्, ईमेल्, दूरवाणी, LinkedIn च प्रदर्शयति
      */}
      <div className="bg-[#8DB600] px-4 py-3 text-sm flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-white" />
          <span className="text-white">गुरुग्राम, भारतम्</span>
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
        3) मुख्य-सामग्री 
        - द्विस्तंभक् लेआउटः: वामपट्टिका च मुख्य सामग्री
      */}
      <main
        className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        ref={resumeRef}
      >
        {/* वामपट्टिका */}
        <aside className="md:col-span-1 bg-[#FFFACD] p-6 rounded-md space-y-6 shadow-lg">
          {/* फोटो अनुभागः */}
          <div className="relative text-center">
            <img
              src={kunalPhoto}
              alt="कुणालस्य फोटो"
              className="mx-auto w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#8DB600] transition-transform duration-300 transform hover:scale-105"
            />
            <p className="text-md font-medium mt-2 text-[#8DB600]">
              परिवर्तनस्य अग्रिमपंक्ति
            </p>
          </div>

          {/* कौशलम् */}
          <section>
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              कौशलम्
            </h2>
            {/* कार्यात्मक विशेषज्ञता */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                कार्यात्मक विशेषज्ञता
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  वित्तीयम् | व्यापार् च लॉजिस्टिक्स् | परियोजना प्रबंधनम् च
                  लेखांकनम् | सेवा प्रबंधनम्
                </li>
                <li>
                  कस्टम् सुरक्षा भूमिकाः | DMF द्वारा डेटा माइग्रेशन्, एक्सेल्
                  एड-इन्स्
                </li>
                <li>
                  बैंक् इंटीग्रेशन् – होस्ट् टू होस्ट् च API इंटीग्रेशन् |
                  भारतस्य GST ई-इनवॉइस् इंटीग्रेशन्
                </li>
                <li>
                  ISVs: हिटाची, टू-इंक्रीज़ कंस्ट्रक्शन्, डायनवे एंटरप्राइज्
                  एसेट् मैनेजमेंट्, SK बैंकिंग्, फास्ट् पाथ् रिपोर्टिंग्
                </li>
                <li>
                  दस्तावेजीकरणम्: BPD, FRD, Gap-Fit, FDD, TDD, SLD, परीक्षणम्,
                  उपयोगकर्ता मैनुअल्, मूल्य प्रस्तावः, प्रस्ताव् तयारी, प्रेस्
                  रिलीज़्, पायलट् इम्प्लीमेंटेशन्, ब्लॉग्, UAT, समर्थन नेतृत्वम्
                </li>
                <li>कंसल्टेंट्स् – डेवलपर्स् च कार्यात्मक्</li>
              </ul>
            </div>
            {/* तकनीकी विशेषज्ञता */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                तकनीकी विशेषज्ञता
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  Dynamics 365 Finance & Operations (D365FO) | बेसिक् C#.NET |
                  बेसिक् X++
                </li>
                <li>
                  AX टेबल् संरचना | AX स्थापना च विन्यासः | LCS | LCS कोड्
                  डिप्लॉयमेंट् | LCS BPM | बेसिक् Azure DevOps
                </li>
                <li>शुरुआती स्तरः: पाइथनम्, React, Django, Flask, Postgres</li>
                <li>
                  नवीनतम् AX संस्करणानि: D365FO, AX 2012 R2/R3, AX 2009, AX 4.0,
                  AX 3.0
                </li>
                <li>
                  कार्यं कृतम् ISVs: Commodity Trading and Risk Management,
                  Dataverse to External Web Apps (React), Construction
                  Management, Property Management
                </li>
              </ul>
            </div>
            {/* कार्यान्वयनम् */}
            <div>
              <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                कार्यान्वयनम्
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  कुल् कार्यान्वयनम्: २४ परियोजनाः | पूर्ण्-से-पूर्ण्: २०
                  परियोजनाः
                </li>
              </ul>
            </div>
          </section>

          {/* प्रमाणपत्रम् */}
          <section>
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              प्रमाणपत्रम्
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>Dynamics AX 2012 Financials मध्ये माइक्रोसॉफ्ट् प्रमाणितः</li>
              <li>
                Dynamics AX 2012 Project Management and Accounting मध्ये
                माइक्रोसॉफ्ट् प्रमाणितः
              </li>
              <li>
                Dynamics AX 2009 च AX 2012 Trade and Logistics मध्ये
                माइक्रोसॉफ्ट् प्रमाणितः
              </li>
              <li>
                Dynamics 365 for Finance and Operations – Financials मध्ये
                माइक्रोसॉफ्ट् प्रमाणितः
              </li>
              <li>
                Dynamics 365 for Finance and Operations – Retail मध्ये
                माइक्रोसॉफ्ट् प्रमाणितः
              </li>
            </ul>
          </section>

          {/* उपलब्धयः एवं मान्यता */}
          <section>
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              उपलब्धयः एवं मान्यता
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                परियोजना प्रबंधनस्य उत्कृष्टतायाः कारणेन २०२४-२५ मध्ये अत्यधिक्
                प्रशंसितः
              </li>
              <li>
                Sonata Software Solutions मध्ये द्वौ पदोन्नतयः प्राप्तौ (२०१९ च
                २०२०)
              </li>
              <li>कई ग्राहकेभ्यः CSAT् रेटिंग्: ७/७ प्राप्तम्</li>
              <li>
                Hitachi Solutions America Ltd. सह L1B वीजायाः विशेषकौशलस्य
                कारणेन अनुशंसितः (२०१६)
              </li>
              <li>
                टीवी सुंदराम् इय्यंगार् एंड् संस् परियोजनायाम् श्रेष्ठः समर्थन
                सलाहकारः
              </li>
              <li>
                क्रिकेट् च एथलेटिक्स् मध्ये व्यापक् क्रीडाङ्गीक् एवं शैक्षिक्
                सम्मानानि
              </li>
            </ul>
          </section>

          {/* स्वयंसेवकः */}
          <section>
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              स्वयंसेवकः
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                World Science Festival | World Science U | WWF | World Vision |
                Greenpeace | SGI | Ketto
              </li>
              <li>सामाजिककारणेषु च समुदायिक कार्यक्रमेषु सक्रियः</li>
            </ul>
          </section>
        </aside>

        {/* मुख्य-सामग्री */}
        <section className="md:col-span-2 space-y-6">
          {/* व्यावसायिक-सारांशः */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-[#8DB600] mb-4">
              व्यावसायिक-सारांशः
            </h1>
            <p className="text-sm leading-relaxed text-gray-800">
              मम शैक्षिक-पृष्ठभूमिः, १४.३+ वर्षोंस्य व्यावसायिकानुभवस्य सह, मम
              अहं भवति अत्यधिक् योग्यः उम्मीदवारः अस्मिन् भूमिकायाम्। मम
              कार्यजीवने, अहं निरन्तरं मम समर्पणं च प्रदर्शनम् अपि मान्यतां
              प्राप्तवान्, येन पदोन्नतयः च वर्धिताः जिम्मेदारयः च लभ्यन्ते।
              एतानि उपलब्धयः Functional Dynamics 365 Finance and Operations
              (पूर्वं Dynamics AX) मध्ये मम विशेषज्ञताया, निरन्तरं
              व्यावसायिक-विकासाय मम अटूटं प्रतिबद्धता, च मम दृढं लिखितं मौखिकं च
              संचार-कौशलम् इति प्रमाणानि भवन्ति।
            </p>
          </div>

          {/* मुख्य् क्षमताः */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              मुख्य् क्षमताः
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                <strong>कार्यात्मक् समाधान-नेतृत्वम्:</strong> D365 FO मध्ये
                व्यापक् ज्ञानम्
              </li>
              <li>
                <strong>परियोजना प्रबंधनम्:</strong> बहुसंख्यक्
                भौगोलिक-प्रदेशेषु ४०+ टीम् सदस्यान् नेतृत्त्वम्
              </li>
              <li>
                <strong>एकीकरण् विशेषज्ञता:</strong> बैंक् होस्ट्-टू-होस्ट्,
                DHL, AI/Copilot, कमोडिटी ट्रेडिंग्
              </li>
              <li>
                <strong>निरन्तरम् सुधारः:</strong> प्रक्रिया-अनुकूलनम्,
                परीक्षणम्, उपयोगकर्ता-अंगीकरणस्य प्रति प्रीति
              </li>
              <li>
                <strong>ग्राहक-सन्तोषः:</strong> अनेकानि कार्यान्वयनानि तः CSAT्
                रेटिंग् ७/७ प्राप्तम्
              </li>
            </ul>
          </div>

          {/* अनुभवम् */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              अनुभवम्
            </h2>

            {/* Cognizant Technology Limited */}
            <div className="mb-6">
              <h3 className="text-gray-900 font-bold">
                Cognizant Technology Limited
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                भूमिका: D365 F&O परियोजना प्रबंधक / वित्तीय नेतृत्वः |
                कार्यकालः: २ वर्षाः ३+ मासाः
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना २४ */}
                <li>
                  <strong>AUS-आधारित ग्राहक (२४)</strong> &lt;मेडिकल् उपकरणानि च
                  स्वास्थ्यसेवा&gt; (अगस्त’२४ – वर्तमानम्)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – परियोजना प्रबंधकः | वित्तीय
                      नेतृत्वः | SCM | MR | एकीकरणानि | DHL एकीकरणानि | २०
                      इंटरफेस् एकीकरणानि
                    </li>
                    <li>
                      ४०-समूहम् नेतृत्त्वं कृत्वा EMEA, कनाडा, AUS कार्यान्वयनं
                      च समर्थनम् संभालयति
                    </li>
                    <li>अगामी USA कार्यान्वयनम् पाइपलाइन्म् अस्ति</li>
                  </ul>
                </li>
                {/* परियोजना २३ */}
                <li className="mt-2">
                  <strong>मल्टी-लोकेशन ग्राहक (२३)</strong> &lt;AI च Copilot
                  समाधान-आर्किटेक्ट् च विकासम्&gt; (मार्च’२४ – जुलाई’२४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 FO Copilot – समाधान-आर्किटेक्ट् | डेमो | AI | Copilot
                      च एकीकरणानि
                    </li>
                  </ul>
                </li>
                {/* परियोजना २२ */}
                <li className="mt-2">
                  <strong>कतर् एयरवेज् (२२)</strong> &lt;ड्यूटी फ्री च
                  एयरवेज्&gt; (अप्रैल’२३ – फरवरी’२४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | SCM | MR
                      | एकीकरणानि
                    </li>
                  </ul>
                </li>
                {/* परियोजना २१ */}
                <li className="mt-2">
                  <strong>कम्युनिटी फाइबर् (२१)</strong> &lt;नेटवर्क् च फाइबर्
                  नेट&gt; (सितंबर’२२ – वर्तमानम्)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | SCM | MR
                      | एकीकरणानि | UK स्थानीयकरणानि
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
                भूमिका: D365 Finance नेतृत्वम् / वरिष्ठ सलाहकारः | कार्यकालः: ४
                वर्षाः
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना २० */}
                <li>
                  <strong>DRA Pacific & GSE Global (२०)</strong>{" "}
                  &lt;अंडरग्राउंड् माइनिंग् केमिकल्स् उपकरणानि&gt; (मार्च’२१ –
                  वर्तमानम्)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | MR |
                      एकीकरणानि
                    </li>
                    <li>बहु-देशीय रोलआउट् च एकीकरणानि प्रबन्धितवान्</li>
                  </ul>
                </li>
                {/* परियोजना १९ */}
                <li className="mt-2">
                  <strong>DRA Global (१९)</strong> &lt;अंडरग्राउंड् माइनिंग्
                  केमिकल्स् उपकरणानि&gt; (मार्च’२१ – वर्तमानम्)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | MR |
                      एकीकरणानि
                    </li>
                    <li>१००+ देशेषु वैश्विक् कार्यान्वयनानि समर्थनम्</li>
                  </ul>
                </li>
                {/* परियोजना १८ च १७ */}
                <li className="mt-2">
                  <strong>Commodity Trading and Risk Management (१८,१९)</strong>{" "}
                  &lt;Commodity Trading and Risk Management&gt; (दिसंबर’१९ –
                  फरवरी’२१)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | SCM
                      नेतृत्वः | नया मॉड्यूल Commodity Trading and Risk
                      Management
                    </li>
                  </ul>
                </li>
                {/* परियोजना १६ */}
                <li className="mt-2">
                  <strong>ETG Global (१६)</strong> &lt;Commodity Trading and
                  Risk Management&gt; (जून’२० – फरवरी’२१)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | SCM | MR
                    </li>
                    <li>
                      अफ्रीकास् आधारित रोलआउट् | एकीकृत् Management Reporter
                    </li>
                  </ul>
                </li>
                {/* परियोजना १५ */}
                <li className="mt-2">
                  <strong>Washington Football Team (१५)</strong> &lt;अमेरिकी्
                  फुटबॉल् टीम्&gt; (फरवरी’२० – मई’२०)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः वरिष्ठ
                      सलाहकारः | MR
                    </li>
                    <li>
                      एक प्रमुखं US खेल् फ्रैंचाइज़् वित्तीय संचालनं
                      प्रबन्धितवान्
                    </li>
                  </ul>
                </li>
                {/* परियोजना १४ */}
                <li className="mt-2">
                  <strong>WSP / Louis Berger (१४)</strong>{" "}
                  &lt;वैश्विक्/राष्ट्रीय् महामारी च आपदा प्रबंधनम्&gt; (फरवरी’१९
                  – जनवरी’२०)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः सलाहकारः |
                      MR | परियोजना प्रबंधनम् च लेखांकनम्
                    </li>
                    <li>
                      मजबूत् परियोजना लेखांकनम् च आपदा प्रबंधनम् प्रबन्धितम्
                    </li>
                  </ul>
                </li>
                {/* परियोजना १३ */}
                <li className="mt-2">
                  <strong>Normet Intl (१३)</strong> &lt;अंडरग्राउंड् माइनिंग्
                  केमिकल्स् उपकरणानि&gt; (अगस्त’१८ – जनवरी’१९)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीयम् | SCM | परियोजना
                      प्रबंधनम् च लेखांकनम् | बैंक् एकीकरणम् | कार्यकारी PM
                      नेतृत्वम्
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
                भूमिका: वरिष्ठ AX/D365 सलाहकारः | कार्यकालः: ३ वर्षाः १० माहाः
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना १२ */}
                <li>
                  <strong>कृषि च कृषिक्षेत्रे (१२)</strong> &lt;कृषि च
                  कृषिक्षेत्रे&gt; (दिसंबर’१७ – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीयम् | SCM | परियोजना
                      प्रबंधनम् च लेखांकनम्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ११ */}
                <li className="mt-2">
                  <strong>
                    US Gov & Port & Property & Lease Management (११)
                  </strong>{" "}
                  &lt;US Gov & Port & Property & Lease Management&gt; (फरवरी’१८
                  – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2012 R3 वित्तीयम्</li>
                  </ul>
                </li>
                {/* परियोजना १० */}
                <li className="mt-2">
                  <strong>Research & Chemicals & Allergy (१०)</strong>{" "}
                  &lt;Research & Chemicals & Allergy&gt; (मई’१७ – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीयम् | परियोजना प्रबंधनम् च लेखांकनम् |
                      उत्पादनम् | सूची
                    </li>
                  </ul>
                </li>
                {/* परियोजना ९ */}
                <li className="mt-2">
                  <strong>
                    US Gov & Security & Scanning & Airports & Rockets &
                    Electronics (९)
                  </strong>{" "}
                  &lt;US Gov & Security & Scanning & Airports & Rockets &
                  Electronics&gt; (दिसंबर’१६ – अप्रैल’१७)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीयम् | परियोजना प्रबंधनम् च लेखांकनम् |
                      सेवा प्रबंधनम्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ८ */}
                <li className="mt-2">
                  <strong>Franchise TV Stations (८)</strong> &lt;Franchise TV
                  Stations&gt; (अक्टूबर’१५ – नवंबर’१६)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीयम् | परियोजना प्रबंधनम् च लेखांकनम् |
                      सुरक्षा भूमिकाः | डेटा माइग्रेशन्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ७ */}
                <li className="mt-2">
                  <strong>Hitachi IP Construction EAM Mobile Apps (७)</strong>{" "}
                  &lt;Hitachi IP Construction EAM Mobile Apps&gt; (अक्टूबर’१४ –
                  अक्टूबर’१५)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R2/R3 | CTP 6 मध्ये वित्तीयम् | परियोजना प्रबंधनम्
                      च लेखांकनम् | सेवाः | उत्पाद विकास् टीम्
                    </li>
                    <li>
                      Hitachi + To-Increase Construction | Hitachi + Dynaway
                      Enterprise Asset Management
                    </li>
                    <li>
                      मूल्य प्रस्तावः | प्रेस् रिलीज़् | मोबाइल् ऐप् विकासम् च
                      परीक्षणम्
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
                भूमिका: AX कार्यात्मक् सलाहकारः | कार्यकालः: ४ वर्षाः
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना ६ */}
                <li>
                  <strong>
                    Credit Debit Cards & Mall & Ski Dubai & Waterpark & Magic
                    Planets & Health & Charity & Toy Store (६)
                  </strong>{" "}
                  &lt;Credit Debit Cards & Mall & Ski Dubai & Waterpark & Magic
                  Planets & Health & Charity & Toy Store&gt; (मई’१३ -
                  सितम्बर’१४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R2 वित्तीयम् | सुरक्षा भूमिकाः | डेटा माइग्रेशन्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ५ */}
                <li className="mt-2">
                  <strong>Steel Pipes (५)</strong> &lt;Steel Pipes&gt; (नवंबर’१२
                  – मई’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2009 वित्तीयम् | व्यापार् च लॉजिस्टिक्स् | बेसिक्
                      उत्पादनम्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ४ */}
                <li className="mt-2">
                  <strong>Pens Manufacturing (४)</strong> &lt;Pens
                  Manufacturing&gt; (नवंबर’१२ – मई’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2009 वित्तीयम् | व्यापार् च लॉजिस्टिक्स्</li>
                  </ul>
                </li>
                {/* परियोजना ३ */}
                <li className="mt-2">
                  <strong>McDonalds Franchise (३)</strong> &lt;McDonalds
                  Franchise&gt; (जुलाई’१२ - अक्टूबर’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2012 वित्तीयम् | बेसिक् उत्पादनम्</li>
                  </ul>
                </li>
                {/* परियोजना २ */}
                <li className="mt-2">
                  <strong>Jewelry (२)</strong> &lt;Jewelry&gt; (नवंबर’११ –
                  अगस्त’१२)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 4.0 से AX 2009 मध्ये वित्तीयम् | व्यापार् च
                      लॉजिस्टिक्स् मध्ये माइग्रेशन्
                    </li>
                  </ul>
                </li>
                {/* परियोजना १ */}
                <li className="mt-2">
                  <strong>Automobiles & Dealer & POS (१)</strong>{" "}
                  &lt;Automobiles & Dealer & POS&gt; (अक्टूबर’१० - अक्टूबर’११)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX3.0 से AX 2009 मध्ये व्यापार् च लॉजिस्टिक्स् | X++
                      रिपोर्ट्स् | BI च SSRS | AX स्थापना च विन्यासः
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* शिक्षा */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              शिक्षा
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                १२ वर्षोंस्य नियमित् विद्यालय् शिक्षाः (Std. X = ८५%, Std. XII =
                ६५.६%)
              </li>
              <li>
                इलेक्ट्रॉनिक्स् च संचार् मध्ये बैचलर् ऑफ् टेक्नोलॉजी
                (२००६-२०१०): CGPA = ८.६/१०
              </li>
            </ul>
          </div>

          {/* अतिरिक्त विशेषताः */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#8DB600] mb-4">
              अतिरिक्त् विशेषताः
            </h2>
            <div className="md:flex md:space-x-6">
              {/* प्रेरणा एवं नेतृत्वम् */}
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                  प्रेरणा एवं नेतृत्वम्
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>
                    ग्राहक-सिफारिशाः च ग्राहकानां च आंतरिक् प्रबंधनस्य च २०२४
                    एवं २०२५ मध्ये अत्यधिक् प्रशंसाः प्राप्ताः
                  </li>
                  <li>
                    TV Sundaram Iyengar & Sons Ltd. Madurai, Tamilnadu, India
                    मध्ये उत्कृष्ट् समर्थनः सलाहकारः (AX Migration Nov 2010 –
                    Oct 2011)
                  </li>
                  <li>
                    श्रेष्ठ् डिलीवरी आश्वासन-रिपोर्ट् च समयेन UAT सम्पादितम्
                  </li>
                  <li>
                    ASPI, Chennai (AX 2009) च MAF, Dubai (AX 2012), D365 for
                    Agriculture Client द्वारा CSAT् रेटिंग् ७/७
                  </li>
                  <li>
                    Hitachi Solutions America Ltd. सह L1B वीजायाः विशेषकौशलस्य
                    कारणेन अनुशंसितः (२०१६)
                  </li>
                  <li>
                    Sonata Software Solutions मध्ये द्वौ पदोन्नतयः प्राप्ताः
                    (२०१९ एवं २०२०) च वैश्विक् कार्यान्वयनानि वित्तीय् नेतृत्वेन
                    तैनाताः
                  </li>
                  <li>बैचलर् मध्ये ८ मध्ये ६ सेमेस्टर् मध्ये बैच् टॉपर्</li>
                  <li>
                    ३ बैच् (~१२०० छात्राः) कृते सामाजिक-कारणेषु न्यायस्य च
                    विश्वविद्यालय् स्वयंसेवी-टीम् नेतृत्वम् कृत्वा
                  </li>
                  <li>
                    विद्यालय् कप्तानस्य नामांकनम् (२००४-०५) च Std. X मध्ये
                    द्वितीय् टॉपर्
                  </li>
                  <li>
                    क्रिकेट् च एथलेटिक्स् मध्ये उत्कृष्ट् उपलब्धयः:
                    <ul className="list-disc list-inside ml-5">
                      <li>सात् लगातार् छक्काः सप्त् बॉल् मध्ये</li>
                      <li>चार् लगातार् बॉल् मध्ये चार् विकेट्</li>
                      <li>
                        ७ बार् हैट्रिक् | ~११७ रनआउट्स् | ~६०० कैचेस् | ~४६०
                        विकेट्
                      </li>
                      <li>
                        टेस्ट् मैच् मध्ये उच्चतम् स्कोर् – २०१* | लिमिटेड् ओवर्
                        मध्ये स्ट्राइक् रेट् – ३००
                      </li>
                      <li>
                        लिमिटेड् ओवर् मध्ये औसत् स्कोर् – ७० | कुल् रन् – १०,०००
                      </li>
                      <li>७०० से अधिकं छक्काः च १,२०० चौकाः</li>
                      <li>
                        स्कूल् अंतर्-चैंपियनशिप् मध्ये टीम् नेतृत्वम् कृत्वा;
                        १०० मिटर् मध्ये कांस्य्, ४०० मिटर् रिले् मध्ये स्वर्ण्,
                        च ट्रिपल् जंप् मध्ये स्वर्ण् जयितम्
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* शैक्षिक् एवं क्रीडाङ्गीक् उपलब्धयः */}
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                  शैक्षिक् एवं क्रीडाङ्गीक् उपलब्धयः
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>बैचलर् मध्ये ८ मध्ये ६ सेमेस्टर् मध्ये बैच् टॉपर्</li>
                  <li>
                    ३ बैच् (~१२०० छात्राः) कृते सामाजिक-कारणेषु न्यायस्य च
                    विश्वविद्यालय् स्वयंसेवी-टीम् नेतृत्वम् कृत्वा
                  </li>
                  <li>
                    विद्यालय् कप्तानस्य नामांकनम् (२००४-०५) च Std. X मध्ये
                    द्वितीय् टॉपर्
                  </li>
                  <li>
                    क्रिकेट् च एथलेटिक्स् मध्ये उत्कृष्ट् उपलब्धयः:
                    <ul className="list-disc list-inside ml-5">
                      <li>सात् लगातार् छक्काः सप्त् बॉल् मध्ये</li>
                      <li>चार् लगातार् बॉल् मध्ये चार् विकेट्</li>
                      <li>
                        ७ बार् हैट्रिक् | ~११७ रनआउट्स् | ~६०० कैचेस् | ~४६०
                        विकेट्
                      </li>
                      <li>
                        टेस्ट् मैच् मध्ये उच्चतम् स्कोर् – २०१* | लिमिटेड् ओवर्
                        मध्ये स्ट्राइक् रेट् – ३००
                      </li>
                      <li>
                        लिमिटेड् ओवर् मध्ये औसत् स्कोर् – ७० | कुल् रन् – १०,०००
                      </li>
                      <li>७०० से अधिकं छक्काः च १,२०० चौकाः</li>
                      <li>
                        स्कूल् अंतर्-चैंपियनशिप् मध्ये टीम् नेतृत्वम् कृत्वा;
                        १०० मिटर् मध्ये कांस्य्, ४०० मिटर् रिले् मध्ये स्वर्ण्,
                        च ट्रिपल् जंप् मध्ये स्वर्ण् जयितम्
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* शौकाः/रुचयः */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-[#556B2F] mb-2">
                शौकाः/रुचयः
              </h3>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                <li>
                  अनुसंधानम् | कला/शिल्पम् | पर्यावरणीय च सामाजिक् स्वयंसेवी
                  कार्यानि
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* 
        4) डाउनलोड् बटनम् 
           - मुख्य् सामग्रीस्य अधोभागे च resumeRef बाहिरे स्थितम्
      */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="bg-[#8DB600] hover:bg-[#6B8E23] text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300 flex items-center space-x-2"
        >
          {/* भारतीय् डाउनलोड् आइकनम् */}
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
          <span>PDF रूपेण डाउनलोड् कुर्वीत</span>
        </button>
      </div>

      {/* 
        5) पादलेखः
           - पृष्ठस्य अन्ते केन्द्रितम्
      */}
      <footer className="bg-[#8DB600] text-center text-xs text-gray-200 py-3">
        © २०२५ भारतीय् सांस्कृतिक् थीमः सह रिज़्यूमे। परिवर्तनस्य अग्रिमपंक्ति।
      </footer>
    </div>
  );
}

export function KunalFlagResume() {
  // PDF निर्माणाय रिज़्यूमे-सामग्री-संदर्भः
  const resumeRef = useRef(null);

  // PDF डाउनलोड् कार्यम्
  const handleDownloadPdf = () => {
    const input = resumeRef.current;

    if (!input) {
      console.error("कस्यापि रिज़्यूमे-सामग्रीं ग्रहीतुम् न प्राप्तम्");
      alert("PDF निर्माणं विफलम्। कृपया पुनः प्रयासं कुर्वीत।");
      return;
    }

    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // आयाम गणना
        const imgWidth = 210; // A4 पतले च्यवन् मिमीमध्ये
        const pageHeight = 297; // A4 ऊर्ध्वम् मिमीमध्ये
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // प्रथम-पृष्ठम् योजय
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // यदि आवश्यकं स्यात्, अतिरिक्त-पृष्ठानि योजय
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("कुणाल_भारतीय_रिज्यूमे.pdf");
      })
      .catch((error) => {
        console.error("PDF निर्माणे त्रुटिः:", error);
        alert("PDF निर्माणं विफलम्। कृपया पुनः प्रयासं कुर्वीत।");
      });
  };

  return (
    <div className="min-h-screen bg-[#F0EAD6] text-gray-900 font-sans">
      {/* 
        1) शीर्षलेखः / ध्वज-भागः
           - भारतीय् ध्वजस्य रंगानुसारं सज्जितः
      */}
      <header className="w-full">
        {/* ध्वजस्य त्रिभुजम् */}
        <div className="flex flex-col">
          {/* नारङ्गवर्णः भागः */}
          <div className="w-full h-16 bg-[#FF9933] flex items-center justify-center">
            <p className="text-lg font-semibold text-white">
              परिवर्तनस्य अग्रिमपंक्ति
            </p>
          </div>
          {/* श्वेतवर्णः भागः चक्रम् */}
          <div className="w-full h-16 bg-white flex items-center justify-center relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Emblem_of_India.svg" // Ashoka Chakra
              alt="आशोक चक्रम्"
              className="w-12 h-12 absolute"
            />
          </div>
          {/* हरितवर्णः भागः */}
          <div className="w-full h-16 bg-[#138808] flex items-center justify-center">
            <p className="text-lg font-semibold text-white">कुणाल्</p>
          </div>
        </div>
      </header>

      {/* 
        2) सम्पर्कपट्टिका
           - स्थानम्, ईमेल्, दूरवाणी, LinkedIn च प्रदर्शयति 
      */}
      <div className="bg-[#138808] px-4 py-3 text-sm flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-white" />
          <span className="text-white">गुरुग्राम, भारतम्</span>
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
            className="underline text-[#FFD700]"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/sample
          </a>
        </div>
      </div>

      {/* 
        3) मुख्य-सामग्री 
        - द्विस्तंभक् लेआउटः: वामपट्टिका च मुख्य सामग्री
      */}
      <main
        className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        ref={resumeRef}
      >
        {/* वामपट्टिका */}
        <aside className="md:col-span-1 bg-[#FFFACD] p-6 rounded-md space-y-6 shadow-lg">
          {/* फोटो अनुभागः */}
          <div className="relative text-center">
            <img
              src={kunalPhoto}
              alt="कुणालस्य फोटो"
              className="mx-auto w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#FF9933] transition-transform duration-300 transform hover:scale-105"
            />
            <p className="text-md font-medium mt-2 text-[#FF9933]">
              परिवर्तनस्य अग्रिमपंक्ति
            </p>
          </div>

          {/* कौशलम् */}
          <section>
            <h2 className="text-xl font-semibold text-[#138808] mb-4">
              कौशलम्
            </h2>
            {/* कार्यात्मक् विशेषज्ञता */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#FF9933] mb-2">
                कार्यात्मक् विशेषज्ञता
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  वित्तीयम् | व्यापार् च लॉजिस्टिक्स् | परियोजना प्रबंधनम् च
                  लेखांकनम् | सेवा प्रबंधनम्
                </li>
                <li>
                  कस्टम् सुरक्षा भूमिकाः | DMF द्वारा डेटा माइग्रेशन्, एक्सेल्
                  एड-इन्स्
                </li>
                <li>
                  बैंक् इंटीग्रेशन् – होस्ट् टू होस्ट् च API इंटीग्रेशन् |
                  भारतस्य GST ई-इनवॉइस् इंटीग्रेशन्
                </li>
                <li>
                  ISVs: हिटाची, टू-इंक्रीज़ कंस्ट्रक्शन्, डायनवे एंटरप्राइज्
                  एसेट् मैनेजमेंट्, SK बैंकिंग्, फास्ट् पाथ् रिपोर्टिंग्
                </li>
                <li>
                  दस्तावेजीकरणम्: BPD, FRD, Gap-Fit, FDD, TDD, SLD, परीक्षणम्,
                  उपयोगकर्ता मैनुअल्, मूल्य प्रस्तावः, प्रस्ताव् तयारी, प्रेस्
                  रिलीज़्, पायलट् कार्यान्वयनम्, ब्लॉग्, UAT, समर्थन नेतृत्वम्
                </li>
                <li>कंसल्टेंट्स् – डेवलपर्स् च कार्यात्मक्</li>
              </ul>
            </div>
            {/* तकनीकी् विशेषज्ञता */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#FF9933] mb-2">
                तकनीकी् विशेषज्ञता
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  Dynamics 365 Finance & Operations (D365FO) | बेसिक् C#.NET |
                  बेसिक् X++
                </li>
                <li>
                  AX टेबल् संरचना | AX स्थापना च विन्यासः | LCS | LCS कोड्
                  डिप्लॉयमेंट् | LCS BPM | बेसिक् Azure DevOps
                </li>
                <li>शुरुआती स्तरः: पाइथनम्, React, Django, Flask, Postgres</li>
                <li>
                  नवीनतम् AX संस्करणानि: D365FO, AX 2012 R2/R3, AX 2009, AX 4.0,
                  AX 3.0
                </li>
                <li>
                  कार्यं कृतम् ISVs: Commodity Trading and Risk Management,
                  Dataverse to External Web Apps (React), Construction
                  Management, Property Management
                </li>
              </ul>
            </div>
            {/* कार्यान्वयनम् */}
            <div>
              <h3 className="text-lg font-bold text-[#FF9933] mb-2">
                कार्यान्वयनम्
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
                <li>
                  कुल् कार्यान्वयनम्: २४ परियोजनाः | पूर्ण्-से-पूर्ण्: २०
                  परियोजनाः
                </li>
              </ul>
            </div>
          </section>

          {/* प्रमाणपत्रम् */}
          <section>
            <h2 className="text-xl font-semibold text-[#138808] mb-4">
              प्रमाणपत्रम्
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>Dynamics AX 2012 Financials मध्ये माइक्रोसॉफ्ट् प्रमाणितः</li>
              <li>
                Dynamics AX 2012 Project Management and Accounting मध्ये
                माइक्रोसॉफ्ट् प्रमाणितः
              </li>
              <li>
                Dynamics AX 2009 च AX 2012 Trade and Logistics मध्ये
                माइक्रोसॉफ्ट् प्रमाणितः
              </li>
              <li>
                Dynamics 365 for Finance and Operations – Financials मध्ये
                माइक्रोसॉफ्ट् प्रमाणितः
              </li>
              <li>
                Dynamics 365 for Finance and Operations – Retail मध्ये
                माइक्रोसॉफ्ट् प्रमाणितः
              </li>
            </ul>
          </section>

          {/* उपलब्धयः एवं मान्यता */}
          <section>
            <h2 className="text-xl font-semibold text-[#138808] mb-4">
              उपलब्धयः एवं मान्यता
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                परियोजना प्रबंधनस्य उत्कृष्टतायाः कारणेन २०२४-२५ मध्ये अत्यधिक्
                प्रशंसितः
              </li>
              <li>
                Sonata Software Solutions मध्ये द्वौ पदोन्नतयः प्राप्तौ (२०१९ च
                २०२०)
              </li>
              <li>कई ग्राहकेभ्यः CSAT् रेटिंग्: ७/७ प्राप्तम्</li>
              <li>
                Hitachi Solutions America Ltd. सह L1B वीजायाः विशेषकौशलस्य
                कारणेन अनुशंसितः (२०१६)
              </li>
              <li>
                टीवी सुंदराम् इय्यंगार् एंड् संस् परियोजनायाम् श्रेष्ठः समर्थनः
                सलाहकारः
              </li>
              <li>
                क्रिकेट् च एथलेटिक्स् मध्ये व्यापक् क्रीडाङ्गीक् एवं शैक्षिक्
                सम्मानानि
              </li>
            </ul>
          </section>

          {/* स्वयंसेवकः */}
          <section>
            <h2 className="text-xl font-semibold text-[#138808] mb-4">
              स्वयंसेवकः
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                World Science Festival | World Science U | WWF | World Vision |
                Greenpeace | SGI | Ketto
              </li>
              <li>सामाजिककारणेषु च समुदायिक् कार्यक्रमेषु सक्रियः</li>
            </ul>
          </section>
        </aside>

        {/* मुख्य् सामग्री */}
        <section className="md:col-span-2 space-y-6">
          {/* व्यावसायिक-सारांशः */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold text-[#138808] mb-4">
              व्यावसायिक-सारांशः
            </h1>
            <p className="text-sm leading-relaxed text-gray-800">
              मम शैक्षिक-पृष्ठभूमिः, १४.३+ वर्षोंस्य व्यावसायिकानुभवस्य सह, मम
              अहं अस्मिन् भूमिकायाम् अत्यधिक् योग्यः उम्मीदवारः भवति। मम
              कार्यजीवने, अहं निरन्तरं मम समर्पणं च प्रदर्शनम् अपि मान्यतां
              प्राप्तवान्, येन पदोन्नतयः च वर्धिताः जिम्मेदारयः च लभ्यन्ते।
              एतानि उपलब्धयः Functional Dynamics 365 Finance and Operations
              (पूर्वं Dynamics AX) मध्ये मम विशेषज्ञताया, निरन्तरं व्यावसायिक्
              विकासाय मम अटूटं प्रतिबद्धता, च मम दृढं लिखितं मौखिकं च
              संचार्-कौशलम् इति प्रमाणानि भवन्ति।
            </p>
          </div>

          {/* मुख्य् क्षमताः */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#138808] mb-4">
              मुख्य् क्षमताः
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                <strong>कार्यात्मक् समाधान-नेतृत्वम्:</strong> D365 FO मध्ये
                व्यापक् ज्ञानम्
              </li>
              <li>
                <strong>परियोजना प्रबंधनम्:</strong> बहुसंख्यक् भौगोलिक्
                प्रदेशेषु ४०+ टीम् सदस्यान् नेतृत्त्वम्
              </li>
              <li>
                <strong>एकीकरण् विशेषज्ञता:</strong> बैंक् होस्ट्-टू-होस्ट्,
                DHL, AI/Copilot, कमोडिटी ट्रेडिंग्
              </li>
              <li>
                <strong>निरन्तरम् सुधारः:</strong> प्रक्रिया-अनुकूलनम्,
                परीक्षणम्, उपयोगकर्ता-अंगीकरणस्य प्रति प्रीति
              </li>
              <li>
                <strong>ग्राहक-सन्तोषः:</strong> अनेकानि कार्यान्वयनानि तः CSAT्
                रेटिंग् ७/७ प्राप्तम्
              </li>
            </ul>
          </div>

          {/* अनुभवम् */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#138808] mb-4">
              अनुभवम्
            </h2>

            {/* Cognizant Technology Limited */}
            <div className="mb-6">
              <h3 className="text-gray-900 font-bold">
                Cognizant Technology Limited
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                भूमिका: D365 F&O परियोजना प्रबंधकः / वित्तीय नेतृत्वः |
                कार्यकालः: २ वर्षाः ३+ मासाः
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना २४ */}
                <li>
                  <strong>AUS-आधारित ग्राहक (२४)</strong> &lt;मेडिकल् उपकरणानि च
                  स्वास्थ्यसेवा&gt; (अगस्त’२४ – वर्तमानम्)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – परियोजना प्रबंधकः | वित्तीय
                      नेतृत्वः | SCM | MR | एकीकरणानि | DHL एकीकरणानि | २०
                      इंटरफेस् एकीकरणानि
                    </li>
                    <li>
                      ईएमईए, कनाडा, च AUS कार्यान्वयनम् च समर्थनम् संभालयन्
                      ४०-समूहम् नेतृत्त्वम्
                    </li>
                    <li>अगामी USA कार्यान्वयनम् पाइपलाइन्म् अस्ति</li>
                  </ul>
                </li>
                {/* परियोजना २३ */}
                <li className="mt-2">
                  <strong>मल्टी-लोकेशन ग्राहक (२३)</strong> &lt;AI च Copilot
                  समाधान-आर्किटेक्ट् च विकासम्&gt; (मार्च’२४ – जुलाई’२४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 FO Copilot – समाधान-आर्किटेक्ट् | डेमो | AI | Copilot
                      च एकीकरणानि
                    </li>
                  </ul>
                </li>
                {/* परियोजना २२ */}
                <li className="mt-2">
                  <strong>कतर् एयरवेज् (२२)</strong> &lt;ड्यूटी फ्री च
                  एयरवेज्&gt; (अप्रैल’२३ – फरवरी’२४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | SCM | MR
                      | एकीकरणानि
                    </li>
                  </ul>
                </li>
                {/* परियोजना २१ */}
                <li className="mt-2">
                  <strong>कम्युनिटी फाइबर् (२१)</strong> &lt;नेटवर्क् च फाइबर्
                  नेट&gt; (सितंबर’२२ – वर्तमानम्)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | SCM | MR
                      | एकीकरणानि | UK स्थानीयकरणानि
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
                भूमिका: D365 Finance नेतृत्वम् / वरिष्ठ् सलाहकारः | कार्यकालः: ४
                वर्षाः
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना २० */}
                <li>
                  <strong>DRA Pacific & GSE Global (२०)</strong>{" "}
                  &lt;अंडरग्राउंड् माइनिंग् केमिकल्स् उपकरणानि&gt; (मार्च’२१ –
                  वर्तमानम्)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | MR |
                      एकीकरणानि
                    </li>
                    <li>बहु-देशीय् रोलआउट् च एकीकरणानि प्रबन्धितवान्</li>
                  </ul>
                </li>
                {/* परियोजना १९ */}
                <li className="mt-2">
                  <strong>DRA Global (१९)</strong> &lt;अंडरग्राउंड् माइनिंग्
                  केमिकल्स् उपकरणानि&gt; (मार्च’२१ – वर्तमानम्)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | MR |
                      एकीकरणानि
                    </li>
                    <li>१००+ देशेषु वैश्विक् कार्यान्वयनानि समर्थनम्</li>
                  </ul>
                </li>
                {/* परियोजना १८ च १७ */}
                <li className="mt-2">
                  <strong>Commodity Trading and Risk Management (१८,१९)</strong>{" "}
                  &lt;Commodity Trading and Risk Management&gt; (दिसंबर’१९ –
                  फरवरी’२१)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | SCM
                      नेतृत्वः | नया मॉड्यूल Commodity Trading and Risk
                      Management
                    </li>
                  </ul>
                </li>
                {/* परियोजना १६ */}
                <li className="mt-2">
                  <strong>ETG Global (१६)</strong> &lt;Commodity Trading and
                  Risk Management&gt; (जून’२० – फरवरी’२१)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः | SCM | MR
                    </li>
                    <li>
                      अफ्रीकास् आधारित् रोलआउट् | एकीकृत् Management Reporter
                    </li>
                  </ul>
                </li>
                {/* परियोजना १५ */}
                <li className="mt-2">
                  <strong>Washington Football Team (१५)</strong> &lt;अमेरिकी्
                  फुटबॉल् टीम्&gt; (फरवरी’२० – मई’२०)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः वरिष्ठ्
                      सलाहकारः | MR
                    </li>
                    <li>
                      एकः प्रमुखः US क्रीडाफ्रैंचाइज़् वित्तीय् संचालनम्
                      प्रबन्धितवान्
                    </li>
                  </ul>
                </li>
                {/* परियोजना १४ */}
                <li className="mt-2">
                  <strong>WSP / Louis Berger (१४)</strong>{" "}
                  &lt;वैश्विक्/राष्ट्रीय् महामारी च आपदा प्रबंधनम्&gt; (फरवरी’१९
                  – जनवरी’२०)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीय नेतृत्वः सलाहकारः |
                      MR | परियोजना प्रबंधनम् च लेखांकनम्
                    </li>
                    <li>
                      मजबूत् परियोजना लेखांकनम् च आपदा प्रबंधनम् प्रबन्धितम्
                    </li>
                  </ul>
                </li>
                {/* परियोजना १३ */}
                <li className="mt-2">
                  <strong>Normet Intl (१३)</strong> &lt;अंडरग्राउंड् माइनिंग्
                  केमिकल्स् उपकरणानि&gt; (अगस्त’१८ – जनवरी’१९)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीयम् | SCM | परियोजना
                      प्रबंधनम् च लेखांकनम् | बैंक् एकीकरणम् | कार्यकारी PM
                      नेतृत्वम्
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
                भूमिका: वरिष्ठ् AX/D365 सलाहकारः | कार्यकालः: ३ वर्षाः १० माहाः
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना १२ */}
                <li>
                  <strong>कृषिः च कृषिक्षेत्रे (१२)</strong> &lt;कृषिः च
                  कृषिक्षेत्रे&gt; (दिसंबर’१७ – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      D365 Finance and Operations – वित्तीयम् | SCM | परियोजना
                      प्रबंधनम् च लेखांकनम्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ११ */}
                <li className="mt-2">
                  <strong>
                    US Gov & Port & Property & Lease Management (११)
                  </strong>{" "}
                  &lt;US Gov & Port & Property & Lease Management&gt; (फरवरी’१८
                  – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2012 R3 वित्तीयम्</li>
                  </ul>
                </li>
                {/* परियोजना १० */}
                <li className="mt-2">
                  <strong>Research & Chemicals & Allergy (१०)</strong>{" "}
                  &lt;Research & Chemicals & Allergy&gt; (मई’१७ – जुलाई’१८)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीयम् | परियोजना प्रबंधनम् च लेखांकनम् |
                      उत्पादनम् | सूची
                    </li>
                  </ul>
                </li>
                {/* परियोजना ९ */}
                <li className="mt-2">
                  <strong>
                    US Gov & Security & Scanning & Airports & Rockets &
                    Electronics (९)
                  </strong>{" "}
                  &lt;US Gov & Security & Scanning & Airports & Rockets &
                  Electronics&gt; (दिसंबर’१६ – अप्रैल’१७)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीयम् | परियोजना प्रबंधनम् च लेखांकनम् |
                      सेवा प्रबंधनम्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ८ */}
                <li className="mt-2">
                  <strong>Franchise TV Stations (८)</strong> &lt;Franchise TV
                  Stations&gt; (अक्टूबर’१५ – नवंबर’१६)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R3 वित्तीयम् | परियोजना प्रबंधनम् च लेखांकनम् |
                      सुरक्षा भूमिकाः | डेटा माइग्रेशन्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ७ */}
                <li className="mt-2">
                  <strong>Hitachi IP Construction EAM Mobile Apps (७)</strong>{" "}
                  &lt;Hitachi IP Construction EAM Mobile Apps&gt; (अक्टूबर’१४ –
                  अक्टूबर’१५)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R2/R3 | CTP 6 मध्ये वित्तीयम् | परियोजना प्रबंधनम्
                      च लेखांकनम् | सेवाः | उत्पाद विकास् टीम्
                    </li>
                    <li>
                      Hitachi + To-Increase Construction | Hitachi + Dynaway
                      Enterprise Asset Management
                    </li>
                    <li>
                      मूल्य प्रस्तावः | प्रेस् रिलीज़् | मोबाइल् ऐप् विकासम् च
                      परीक्षणम्
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
                भूमिका: AX कार्यात्मक् सलाहकारः | कार्यकालः: ४ वर्षाः
              </p>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                {/* परियोजना ६ */}
                <li>
                  <strong>
                    Credit Debit Cards & Mall & Ski Dubai & Waterpark & Magic
                    Planets & Health & Charity & Toy Store (६)
                  </strong>{" "}
                  &lt;Credit Debit Cards & Mall & Ski Dubai & Waterpark & Magic
                  Planets & Health & Charity & Toy Store&gt; (मई’१३ -
                  सितम्बर’१४)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2012 R2 वित्तीयम् | सुरक्षा भूमिकाः | डेटा माइग्रेशन्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ५ */}
                <li className="mt-2">
                  <strong>Steel Pipes (५)</strong> &lt;Steel Pipes&gt; (नवंबर’१२
                  – मई’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 2009 वित्तीयम् | व्यापार् च लॉजिस्टिक्स् | बेसिक्
                      उत्पादनम्
                    </li>
                  </ul>
                </li>
                {/* परियोजना ४ */}
                <li className="mt-2">
                  <strong>Pens Manufacturing (४)</strong> &lt;Pens
                  Manufacturing&gt; (नवंबर’१२ – मई’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2009 वित्तीयम् | व्यापार् च लॉजिस्टिक्स्</li>
                  </ul>
                </li>
                {/* परियोजना ३ */}
                <li className="mt-2">
                  <strong>McDonalds Franchise (३)</strong> &lt;McDonalds
                  Franchise&gt; (जुलाई’१२ - अक्टूबर’१३)
                  <ul className="list-disc list-inside ml-5">
                    <li>AX 2012 वित्तीयम् | बेसिक् उत्पादनम्</li>
                  </ul>
                </li>
                {/* परियोजना २ */}
                <li className="mt-2">
                  <strong>Jewelry (२)</strong> &lt;Jewelry&gt; (नवंबर’११ –
                  अगस्त’१२)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX 4.0 से AX 2009 मध्ये वित्तीयम् | व्यापार् च
                      लॉजिस्टिक्स् मध्ये माइग्रेशन्
                    </li>
                  </ul>
                </li>
                {/* परियोजना १ */}
                <li className="mt-2">
                  <strong>Automobiles & Dealer & POS (१)</strong>{" "}
                  &lt;Automobiles & Dealer & POS&gt; (अक्टूबर’१० - अक्टूबर’११)
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      AX3.0 से AX 2009 मध्ये व्यापार् च लॉजिस्टिक्स् | X++
                      रिपोर्ट्स् | BI च SSRS | AX स्थापना च विन्यासः
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* शिक्षा */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#138808] mb-4">
              शिक्षा
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-800 ml-4 space-y-1">
              <li>
                १२ वर्षोंस्य नियमित् विद्यालय् शिक्षाः (Std. X = ८५%, Std. XII =
                ६५.६%)
              </li>
              <li>
                इलेक्ट्रॉनिक्स् च संचार् मध्ये बैचलर् ऑफ् टेक्नोलॉजी
                (२००६-२०१०): CGPA = ८.६/१०
              </li>
            </ul>
          </div>

          {/* अतिरिक्त् विशेषताः */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#138808] mb-4">
              अतिरिक्त् विशेषताः
            </h2>
            <div className="md:flex md:space-x-6">
              {/* प्रेरणा एवं नेतृत्वम् */}
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-[#FF9933] mb-2">
                  प्रेरणा एवं नेतृत्वम्
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>
                    ग्राहक-सिफारिशाः च ग्राहकानां च आंतरिक् प्रबंधनस्य च २०२४
                    एवं २०२५ मध्ये अत्यधिक् प्रशंसाः प्राप्ताः
                  </li>
                  <li>
                    TV Sundaram Iyengar & Sons Ltd. Madurai, Tamilnadu, India
                    मध्ये उत्कृष्ट् समर्थनः सलाहकारः (AX Migration Nov 2010 –
                    Oct 2011)
                  </li>
                  <li>
                    श्रेष्ठ् डिलीवरी आश्वासन-रिपोर्ट् च समयेन UAT सम्पादितम्
                  </li>
                  <li>
                    ASPI, Chennai (AX 2009) च MAF, Dubai (AX 2012), D365 for
                    Agriculture Client द्वारा CSAT् रेटिंग् ७/७
                  </li>
                  <li>
                    Hitachi Solutions America Ltd. सह L1B वीजायाः विशेषकौशलस्य
                    कारणेन अनुशंसितः (२०१६)
                  </li>
                  <li>
                    Sonata Software Solutions मध्ये द्वौ पदोन्नतयः प्राप्तौ
                    (२०१९ एवं २०२०) च वैश्विक् कार्यान्वयनानि वित्तीय् नेतृत्वेन
                    तैनाताः
                  </li>
                  <li>बैचलर् मध्ये ८ मध्ये ६ सेमेस्टर् मध्ये बैच् टॉपर्</li>
                  <li>
                    ३ बैच् (~१२०० छात्राः) कृते सामाजिक्-कारणेषु न्यायस्य च
                    विश्वविद्यालय् स्वयंसेवी-टीम् नेतृत्वम् कृत्वा
                  </li>
                  <li>
                    विद्यालय् कप्तानस्य नामांकनम् (२००४-०५) च Std. X मध्ये
                    द्वितीय् टॉपर्
                  </li>
                  <li>
                    क्रिकेट् च एथलेटिक्स् मध्ये उत्कृष्ट् उपलब्धयः:
                    <ul className="list-disc list-inside ml-5">
                      <li>सात् लगातार् छक्काः सप्त् बॉल् मध्ये</li>
                      <li>चार् लगातार् बॉल् मध्ये चार् विकेट्</li>
                      <li>
                        ७ बार् हैट्रिक् | ~११७ रनआउट्स् | ~६०० कैचेस् | ~४६०
                        विकेट्
                      </li>
                      <li>
                        टेस्ट् मैच् मध्ये उच्चतम् स्कोर् – २०१* | लिमिटेड् ओवर्
                        मध्ये स्ट्राइक् रेट् – ३००
                      </li>
                      <li>
                        लिमिटेड् ओवर् मध्ये औसत् स्कोर् – ७० | कुल् रन – १०,०००
                      </li>
                      <li>७०० से अधिकं छक्काः च १,२०० चौकाः</li>
                      <li>
                        स्कूल् अंतर्-चैंपियनशिप् मध्ये टीम् नेतृत्वम् कृत्वा;
                        १०० मिटर् मध्ये कांस्य्, ४०० मिटर् रिले् मध्ये स्वर्ण्,
                        च ट्रिपल् जंप् मध्ये स्वर्ण् जयितम्
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* शैक्षिक् एवं क्रीडाङ्गीक् उपलब्धयः */}
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-[#FF9933] mb-2">
                  शैक्षिक् एवं क्रीडाङ्गीक् उपलब्धयः
                </h3>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                  <li>बैचलर् मध्ये ८ मध्ये ६ सेमेस्टर् मध्ये बैच् टॉपर्</li>
                  <li>
                    ३ बैच् (~१२०० छात्राः) कृते सामाजिक्-कारणेषु न्यायस्य च
                    विश्वविद्यालय् स्वयंसेवी-टीम् नेतृत्वम् कृत्वा
                  </li>
                  <li>
                    विद्यालय् कप्तानस्य नामांकनम् (२००४-०५) च Std. X मध्ये
                    द्वितीय् टॉपर्
                  </li>
                  <li>
                    क्रिकेट् च एथलेटिक्स् मध्ये उत्कृष्ट् उपलब्धयः:
                    <ul className="list-disc list-inside ml-5">
                      <li>सात् लगातार् छक्काः सप्त् बॉल् मध्ये</li>
                      <li>चार् लगातार् बॉल् मध्ये चार् विकेट्</li>
                      <li>
                        ७ बार् हैट्रिक् | ~११७ रनआउट्स् | ~६०० कैचेस् | ~४६०
                        विकेट्
                      </li>
                      <li>
                        टेस्ट् मैच् मध्ये उच्चतम् स्कोर् – २०१* | लिमिटेड् ओवर्
                        मध्ये स्ट्राइक् रेट् – ३००
                      </li>
                      <li>
                        लिमिटेड् ओवर् मध्ये औसत् स्कोर् – ७० | कुल् रन – १०,०००
                      </li>
                      <li>७०० से अधिकं छक्काः च १,२०० चौकाः</li>
                      <li>
                        स्कूल् अंतर्-चैंपियनशिप् मध्ये टीम् नेतृत्वम् कृत्वा;
                        १०० मिटर् मध्ये कांस्य्, ४०० मिटर् रिले् मध्ये स्वर्ण्,
                        च ट्रिपल् जंप् मध्ये स्वर्ण् जयितम्
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* शौकाः/रुचयः */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-[#FF9933] mb-2">
                शौकाः/रुचयः
              </h3>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-1">
                <li>
                  अनुसंधानम् | कला/शिल्पम् | पर्यावरणीय् च सामाजिक् स्वयंसेवी
                  कार्यानि
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* 
        4) डाउनलोड् बटनम् 
           - मुख्य् सामग्रीस्य अधोभागे च resumeRef बाहिरे स्थितम्
      */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="bg-[#FF9933] hover:bg-[#e68a00] text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300 flex items-center space-x-2"
        >
          {/* डाउनलोड् प्रतीकम् */}
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
          <span>PDF रूपेण डाउनलोड् कुर्वीत</span>
        </button>
      </div>

      {/* 
        5) पादलेखः
           - पृष्ठस्य अन्ते केन्द्रितम्
      */}
      <footer className="bg-[#138808] text-center text-xs text-gray-200 py-3">
        © २०२५ भारतीय् ध्वज-रंग-आधारित् रिज़्यूमे। परिवर्तनस्य अग्रिमपंक्ति।
      </footer>
    </div>
  );
}
