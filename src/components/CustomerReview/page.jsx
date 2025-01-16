import React from "react";

const CustomerReview = () => {
  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-16 mx-auto">
        {/* Header */}
        <div className="flex flex-col text-center w-full mb-12">
          <h2 className="text-sm text-indigo-500 tracking-widest font-medium title-font mb-1 uppercase">
            Customer Testimonials
          </h2>
          <h1 className="sm:text-4xl text-3xl font-bold title-font text-gray-900">
            What Our Customers Say
          </h1>
        </div>
        
        {/* Reviews Grid */}
        <div className="flex flex-wrap -m-4">
          {[
            {
              name: "Brian Lara",
              image:
                "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
              review:
                "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.",
            },
            {
              name: "Sachin Tendulkar",
              image:
                "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
              review:
                "Authentic live-edge heirloom plaid synth. Hammock activated charcoal scenester vice direct trade art party selfies.",
            },
            {
              name: "Ms Dhoni",
              image:
                "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
              review:
                "Brooklyn tilde artisan narwhal. Freegan copper mug prism farm-to-table, post-ironic adaptogen unicorn artisan.",
            },
          ].map((customer, index) => (
            <div className="p-4 md:w-1/3 sm:w-1/2 w-full" key={index}>
              <div className="flex flex-col items-center rounded-lg shadow-md h-full bg-white p-6 transition-transform hover:scale-105 hover:shadow-lg">
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="w-16 h-16 mb-4 rounded-full shadow-md"
                />
                <h2 className="text-gray-900 text-lg font-semibold mb-2">
                  {customer.name}
                </h2>
                <p className="text-center text-gray-600 leading-relaxed mb-4">
                  {customer.review}
                </p>
                <a
                  href="#"
                  className="text-indigo-500 inline-flex items-center font-medium hover:underline"
                >
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
