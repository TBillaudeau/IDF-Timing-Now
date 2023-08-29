import React, { useState } from 'react';

function AccordionItem({ id, title, content }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={`accordion-open-${id}`} data-accordion="open">
      <h2 id={`accordion-open-heading-${id}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border`}
          data-accordion-target={`#accordion-open-body-${id}`}
          aria-expanded={isOpen}
          aria-controls={`accordion-open-body-${id}`}
          onClick={toggleAccordion}
        >
          <span className="flex items-center">{title}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${isOpen ? 'rotate-180' : 'rotate-0'} shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-open-body-${id}`}
        className={`${isOpen ? '' : 'hidden'}`}
        aria-labelledby={`accordion-open-heading-${id}`}
      >
        {content}
      </div>
    </div>
  );
}

function AccordionWithMargin() {

  return (
    <div className="m-2 sm:m-6 bg-white">
      <AccordionItem
        id="1"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            What is IDF Timing Now?
          </span>
        }
        content={
          <div className="p-5 border border-b-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              IDF Timing Now is a website that provides real-time departure information for various modes of public transportation, including metro, tram, train, RER, and bus, in the Ile de France region.
            </p>
            <p className="text-gray-500">
              The website also offers traffic information and allows users to search for specific stations to get accurate departure times. Whether you're commuting or exploring the region, IDF Timing Now helps you plan your journey with ease.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="2"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            How to Use IDF Timing Now?
          </span>
        }
        content={
          <div className="p-5 border border-b-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              Using IDF Timing Now is easy. Simply enter the name of your desired station in the search bar, and the website will display real-time departure times for different transportation modes.
            </p>
            <p className="text-gray-500">
              You can also view traffic disruptions and find out the estimated time of arrival for your preferred stations. Whether you're a daily commuter or a visitor to the region, IDF Timing Now helps you stay informed and make informed travel decisions.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="3"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Stay Updated with Real-time Data
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              IDF Timing Now fetches real-time data from various transportation agencies to provide you with the most accurate departure times and traffic information.
            </p>
            <p className="mb-2 text-gray-500">
              The website updates in real-time, ensuring that you have access to the latest information about your selected stations and transportation modes. This helps you plan your journey efficiently and avoid unnecessary delays.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="4"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Customize Your Experience
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              IDF Timing Now allows you to customize your experience by saving your favorite stations for quick access.
            </p>
            <p className="text-gray-500">
              Simply add stations to your favorites, and the website will remember them for you. This feature makes it easy to stay up to date with departure times for the stations you frequent the most.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="5"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Plan Ahead with Traffic Information
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              In addition to departure times, IDF Timing Now also provides real-time traffic information for different transportation modes.
            </p>
            <p className="text-gray-500">
              Before you start your journey, check for any disruptions or delays that might affect your travel plans. Stay informed and make informed decisions with up-to-date traffic information.
            </p>
          </div>
        }
      />
            <AccordionItem
        id="6"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Accessible and User-Friendly
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              IDF Timing Now is designed with accessibility in mind, ensuring that all users, including those with disabilities, can easily access and use the website's features.
            </p>
            <p className="text-gray-500">
              The user-friendly interface and clear display of information make it simple for everyone to find the departure times, traffic information, and favorite stations they need.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="7"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Stay Informed with Notifications
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              Sign up for notifications to receive alerts about disruptions, delays, or important updates related to your favorite stations and selected transportation lines.
            </p>
            <p className="text-gray-500">
              With notifications, you can stay informed about any changes to your travel plans and adjust your route accordingly. Never miss important updates again!
            </p>
          </div>
        }
      />
      <AccordionItem
        id="8"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Feedback and Support
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              We value your feedback! If you have any suggestions, questions, or issues while using IDF Timing Now, feel free to reach out to our support team.
            </p>
            <p className="text-gray-500">
              Your feedback helps us continuously improve the website and provide you with the best experience possible. We're here to assist you every step of the way!
            </p>
          </div>
        }
      />
    </div>
  );

}


export default AccordionWithMargin;
