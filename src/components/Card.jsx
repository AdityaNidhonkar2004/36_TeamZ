import React, { useState } from "react";
import axios from "axios";

const Card = ({ title, status, errorLog }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [solution, setSolution] = useState(""); // Solution state

  // Define the question based on the error log
  const question = `${errorLog}, explain the error log from apache server and explain the steps to troubleshoot it?`;

  // Handle the click event and make the POST request
  const handleClick = async () => {
    setShowSolution(!showSolution);

    if (!showSolution && !solution) {
      // Only fetch if solution is not already available
      setLoading(true); // Start loader
      try {
        const response = await axios.post(
          "https://200d-34-143-170-232.ngrok-free.app/ask",
          {
            question: question, // Question is passed in the body
          },
          {
            headers: {
              'ngrok-skip-browser-warning': 'true', // Custom headers
            },
          }
        );
        console.log(response.data);
        // Update the solution with the response
        setSolution(response.data.answer.data || "No solution found.");
      } catch (error) {
        console.error("Error during POST request:", error);
        setSolution("Failed to fetch solution.");
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };

  // Determine tag color based on status
  const statusColors = {
    Critical: "bg-red-500 text-white",
    "Non-Critical": "bg-green-500 text-white",
    Warning: "bg-yellow-500 text-black",
  };

  return (
    <div className="w-full flex flex-col border rounded-lg shadow-md p-6 mb-4">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Title */}
        <h2 className="text-xl font-bold">{title}</h2>
        {/* Status Tag */}
        <span
          className={`text-sm font-semibold py-1 px-3 rounded-full ${
            statusColors[status] || "bg-gray-500 text-white"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Error Log */}
      <p className="text-gray-600 mb-4">{errorLog}</p>

      {/* Enter Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-28"
        onClick={handleClick}
      >
        {showSolution ? "Hide Solution" : "Enter"}
      </button>

      {/* Solution Section (conditionally rendered) */}
      {showSolution && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Solution:
          </h3>

          {/* Show Loader while fetching */}
          {loading ? (
            <p className="text-gray-700">Loading solution...</p>
          ) : (
            // Split the solution by new lines and render each line
            solution.split('\n').map((line, index) => (
              <p key={index} className="text-gray-700">
                {line}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
