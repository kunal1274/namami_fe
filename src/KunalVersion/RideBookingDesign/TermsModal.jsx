import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      {/* Modal container */}
      <div
        className="
        bg-white rounded-xl shadow-xl 
        w-11/12 md:w-2/3 lg:w-1/2 
        h-3/4 flex flex-col
      "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Terms & Conditions</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        {/* Scrollable content */}
        <div className="px-4 py-4 overflow-y-auto text-gray-700 text-sm space-y-2">
          <h3 className="text-base font-semibold text-center">
            TAXI CUSTOMER TERMS & CONDITIONS
          </h3>
          <p className="leading-6">
            IMPORTANT: THESE TERMS AND CONDITIONS (“Conditions”) DEFINE THE
            BASIS UPON WHICH GETT WILL PROVIDE YOU WITH ACCESS TO THE GETT
            MOBILE APPLICATION PLATFORM, PURSUANT TO WHICH YOU WILL BE ABLE TO
            REQUEST CERTAIN TRANSPORTATION SERVICES... Introduction to the
            Mapbox platform Mapbox supports maps and location services for a
            wide variety of web, mobile, automotive, and gaming applications.
            This section describes the core technologies that make Mapbox
            services work. Our map data is the foundation for many of our
            location services. Our data processing pipelines ingest new data
            from mobile sensors, driver feedback, cameras with computer vision,
            and aerial imagery into our data processing pipelines, and combine
            this data with open and proprietary sources to keep our map data
            up-to-date as the world changes. We also offer premium Boundaries,
            Traffic, and Movement data products. We rely on vector tiles to
            store and serve most of our map data. The vector tile format is
            compact and is designed for caching, scaling, and serving map data
            rapidly. Vector tiles contain the geometries and metadata that can
            be rendered on a map. Read more about our Vector Tile Specification
            below. Our graphics libraries tell web and mobile devices how to
            draw maps as visual graphics using two key specification documents:
            Our open source Mapbox Vector Tile Specification describes how the
            geometries and attributes within geospatial data must be stored and
            encoded within vector tiles. Our open source Mapbox Style
            Specification describes how you must write a map style to tell our
            graphic libraries what data to draw, the order to draw it in, and
            what colors, opacity levels, and other properties to apply when
            drawing the data. The Mapbox Studio style editor is a visual tool
            for creating a style document that adheres to this specification.
            Our platform includes powerful APIs for Maps, Search, Navigation,
            Vision, and Accounts services. We provide SDKs to make these
            services accessible to web, mobile, game, and embedded device
            developers. Our developer tools include Mapbox GL JS, our JavaScript
            SDK for web developers; Mapbox Studio, a free map style editor with
            live visual previews; Mapbox SDK for Android and iOS, our SDKs for
            mobile application developers; and Mapbox Atlas, our on-premise
            application for customers with restrictive network requirements. For
            a complete list of tools, see our documentation. How to use Mapbox
            Try a playground Our playgrounds are interactive tools designed to
            help you explore our APIs or understand specific development
            workflows. Playgrounds usually take input from you, then return a
            helpful code snippet, like an API request or response, that you can
            use in your webpage or application. Geocoding API Playground Search
            for addresses and places by name or coordinates. Static API
            playground Generate a static map. Directions API Playground Generate
            turn-by-turn instructions. Isochrone API playground Show travel
            distance by time. Get inspired Inspiration is an important part of
            building with Mapbox tools. We offer several resources to spark your
            imagination and fuel your creativity. Read our blog to learn about
            new features and products. See our Solutions page to explore
            location use cases across industries. Browse our Impact tools for
            free project templates for nonprofits. Join our live webinars to
            learn what other developers are building. Follow us @Mapbox on
            Twitter for beautiful map tweets. Understand pricing Mapbox offers a
            developer-centric pricing model that starts with a generous free
            tier for initial development and transitions to metered services for
            production applications, ensuring you only pay as you grow. Read
            more about our per-product pricing here. For personalized solutions
            and to learn about annual payment discounts and other options, start
            a conversation with our sales team. Get support We offer free and
            paid technical support plans to help developers build with Mapbox
            tools. See our technical support options guide to learn more about
            how to get technical support. his guide is an introduction to access
            tokens for developers getting started with Mapbox. To learn more
            about access tokens, see our full access tokens guide in the Dive
            Deeper section. What is an access token? An Access Token is a string
            that associates API requests with your Mapbox account and gives your
            websites/applications access to Mapbox services. You will usually
            add your default public token somewhere in your source code or set
            it as an environment variable when you start building a project that
            uses Mapbox. Where do I find my access tokens? Access tokens are
            located on the Access Token page of your Developer Console. Public
            Tokens Public tokens are designed to be used in client-side
            applications, meaning they can be safely exposed in web browsers,
            mobile apps, and other client environments. Public tokens limit
            users to read-only access, preventing them from changing, deleting,
            or creating resources. Your Default Public Token Your default public
            token provides a quick way to get started with Mapbox services,
            especially for initial testing and development. Your default public
            token is located on the right side of your Developer Console or at
            the top of Access Token page as seen in the video below: Additional
            Public Tokens When your app is ready for deployment, you should
            create a new public token to use instead of your default public
            token. When creating a token, you can limit its access to only the
            services it needs, and limit its use to certain URLs. To learn how
            to create additional public tokens, view the Creating additional
            access tokens section of our Dive Deeper guide. Secret Tokens Secret
            tokens allow you access to more secure systems at Mapbox, for
            example the ability to gain download access of our mobile SDKs. To
            learn how to create a secret access token, view our the Creating
            secret access tokens section of our Dive Deeper guide. Additional
            Resources See the following guides for more information on Mapbox
            access tokens. Dive Deeper with Access Tokens Rotating tokens Using
            Mapbox securely
          </p>
          {/* Repeat or fill with actual T&C text */}
          <p className="leading-6">... (very long text continuing) ...</p>
        </div>
      </div>
    </div>
  );
}
