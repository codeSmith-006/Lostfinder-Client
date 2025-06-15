import React from "react";

const FAQ = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-transparent backdrop-blur-md  rounded-2xl shadow-lg text-white">
      <h2 className="text-3xl font-bold text-teal-400 text-center mb-8 flex items-center justify-center gap-3">
        <i className="fas fa-info-circle text-yellow-400"></i>
        How It Works / FAQ
        <i className="fas fa-question-circle text-pink-500"></i>
      </h2>

      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-gray-700 bg-transparent rounded-lg mb-4"
      >
        <input type="checkbox" />
        <div className="collapse-title text-teal-400 font-semibold text-lg">
          How do I add a lost or found item?
        </div>
        <div className="collapse-content text-gray-300">
          <p>
            After logging in, navigate to the "Add Item" page. Fill out the form
            with accurate details, including item type, description, location,
            and date. Submit the form to post your item.
          </p>
        </div>
      </div>

      <div
        tabIndex={1}
        className="collapse collapse-arrow border border-gray-700 bg-transparent rounded-lg mb-4"
      >
        <input type="checkbox" />
        <div className="collapse-title text-teal-400 font-semibold text-lg">
          How can I claim a found item?
        </div>
        <div className="collapse-content text-gray-300">
          <p>
            View the item details page for the found item and click the "This is
            Mine!" button. Fill in the recovery details to initiate the claim
            process.
          </p>
        </div>
      </div>

      <div
        tabIndex={2}
        className="collapse collapse-arrow border border-gray-700 bg-transparent rounded-lg mb-4"
      >
        <input type="checkbox" />
        <div className="collapse-title text-teal-400 font-semibold text-lg">
          Is my data safe and private?
        </div>
        <div className="collapse-content text-gray-300">
          <p>
            Yes! We use JWT authentication and secure your data on our backend.
            Only you can manage your posted items.
          </p>
        </div>
      </div>

      <div
        tabIndex={3}
        className="collapse collapse-arrow border border-gray-700 bg-transparent rounded-lg mb-4"
      >
        <input type="checkbox" />
        <div className="collapse-title text-teal-400 font-semibold text-lg">
          What happens when an item is recovered?
        </div>
        <div className="collapse-content text-gray-300">
          <p>
            The item status updates to "recovered", and the item is moved to
            your recovered items list. Others will no longer be able to claim
            it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
