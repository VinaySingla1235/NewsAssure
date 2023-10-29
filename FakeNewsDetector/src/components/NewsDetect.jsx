import React, { useState } from "react";
import bgImage from "../assets/top-view-old-french-newspaper-pieces.jpg";
import Spinner from "./Spinner";
const NewsDetect = () => {
  const [newsFeed, setNewsFeed] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const clearFeed = () => {
    setNewsFeed({
      title: "",
      description: "",
    });
  };
  const [credibilityScore, setCredibilityScore] = useState(null);
  const handleOnChange = (e) => {
    setNewsFeed({
      ...newsFeed, // Copy the current state
      [e.target.name]: e.target.value,
    });
  };
  const fetchScore = async () => {
    const url = "http://127.0.0.1:8000/predictNews/";
    let data = {};
    if (newsFeed.description.length >= 5) {
      data = {
        title: newsFeed.title,
        description: newsFeed.description,
      };
    } else {
      data = {
        title: newsFeed.title,
      };
    }
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Adjust content type as needed
          // Add other headers if necessary
        },
        body: JSON.stringify(data), // Convert the data to JSON string
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      setCredibilityScore(responseData.score);
      console.log(credibilityScore);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleSubmit = () => {
    console.log(newsFeed);
    fetchScore();
  };
  const getScoreColour = () => {
    if (credibilityScore == null) {
      return "";
    } else if (credibilityScore >= 80) {
      return "text-green-800";
    } else if (credibilityScore <= 30) {
      return "text-red-500";
    } else {
      return "text-yellow-500";
    }
  };
  return (
    <div className="relative h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {isLoading == true ? (
          <Spinner/>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-300">
            {/* Input field should be inside this div */}
            <div className="form-container mt-8 flex flex-col items-center">
              <div className="items-container px-10 md:px-0">
                <h1 className="font-bold text-5xl text-center">
                  Fake News Detector
                </h1>
                <div className="mb-6 mt-3">
                  <label
                    for="default-input"
                    className="block mb-2 text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Headline
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="default-input"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Headline of the News"
                    value={newsFeed.title}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-6 my-2">
                  <label
                    for="message"
                    className="block mb-2 text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Description(optional)
                  </label>
                  <textarea
                    id="message"
                    name="description"
                    rows="8"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write description of the news here"
                    value={newsFeed.description}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
                <div className="button-container">
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={clearFeed}
                  >
                    Clear
                  </button>
                </div>
                <h1 className="font-bold text-3xl text-center mt-5">
                  Credibility Score
                </h1>
                <h1
                  className={`text-center my-2 font-bold ${getScoreColour()} text-${
                    credibilityScore == null ? "2xl" : "5xl"
                  }`}
                >
                  {credibilityScore == null
                    ? "Submit a news feed to get it's credibility score out of 100"
                    : credibilityScore}
                </h1>
                <span className="font-bold text-lg">Discuss this news and more on our News Social Platform <a href="http://localhost:3000/" target="_blank" className="text-blue-600 underline cursor-pointer">Go to News Platform</a></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetect;
