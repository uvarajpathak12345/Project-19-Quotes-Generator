import React, { useState } from "react";
import Loader from "./Loader";
import "../Stylesheet/card.css";
import { IoSearch } from "react-icons/io5";

export default function Crad() {
  const [input, setinput] = useState(""); // Input state for the search term
  const [val, setval] = useState(null); // Data state to store the fetched quotes
  const [loading, setLoading] = useState(false); // Loading state to show while fetching
  const [error, setError] = useState(null); // Error state to handle any API errors
  const [suggestion, setsuggestion] = useState([]); //sugesstion comes here
  const [suggestionbox, setsuggestionbox] = useState(true);
  const categories = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "equality",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "fitness",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "good",
    "government",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "hope",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "jealousy",
    "knowledge",
    "leadership",
    "learning",
    "life",
    "love",
    "marriage",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "movies",
    "success",
    "patience",
    "peace",
    "pet",
    "politics",
    "power",
    "science",
    "sports",
    "strength",
    "student",
    "technology",
    "time",
    "travel",
    "trust",
    "truth",
    "wisdom",
    "work",
  ];

  const fetchdata = async () => {
    if (input) {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/quotes?category=${input}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": "hQNr54M7y6eCZxzlmDgT6Q==IjHbrxxjJxgQcohb",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("API response is not good");
        }

        const data = await response.json();
        setval(data); // Set the fetched data
        setError(null); // Clear any previous error

      } catch (err) {
        setError(err.message); // Set error if the fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
  };

  const handlechange = (e) => {
    const data = e.target.value;
    setsuggestionbox(true);
    setinput(data);

    if (data.length > 0) {
      const settingsuggestion = categories.filter((values) => {
        return values.toLowerCase().includes(data.toLowerCase());
      });
      setsuggestion(settingsuggestion);
    } else {
      setsuggestion([]);
    }
  };

  const handleSubmit = (e) => {
    setsuggestionbox(false);
    e.preventDefault();
    fetchdata(); // Fetch data when the form is submitted
  };

  return (
    <div className="containers">
      <h2 className="font-bold my-1 pt-2 text-[1.75rem]">Quotes</h2>
      <div className="bg-red-600 items-center m-auto md:w-[17rem] h-[0.2rem]"></div>

      <form onSubmit={handleSubmit}>
        <div>
          <div className="input-box mt-3">
            <input
              placeholder="Search quotes by categorie"
              className="px-2 py-1"
              type="text"
              value={input}
              onChange={handlechange}
            />
            <button type="submit">
              <IoSearch className="icon"></IoSearch>
            </button>
          </div>

          {suggestion.length > 0 && suggestionbox && (
            <div className="search-data">
              <ul>
                {suggestion.map((value, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setinput(value);
                        setsuggestionbox(false);
                      }}
                    >
                      {value}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

        </div>
      </form>

      {/* Handle loading state */}
      {loading && (
        <>
          <div className="flex justify-center mt-2">
            <Loader></Loader>
          </div>
        </>
      )}

      {/* Handle error state */}
      {error && (
        <div>
          <p className="py-6">Error: {error}</p>
        </div>
      )}

      {/* Display the fetched data */}
      {val && val.length > 0 ? (
        <>
          <div className="flex justify-center items-center mt-14 px-4 text-center">
            <p>{val[0].quote}</p> {/* Display the first quote */}
          </div>
          <div className="grid justify-end px-6 mt-28 pb-9 text-left">
            <h3>
              Author: <span className="text-blue-700"> {val[0].author}</span>{" "}
            </h3>{" "}
            {/* Display the author */}
            <h3>
              Category:{" "}
              <span className="text-blue-700"> {val[0].category}</span>
            </h3>{" "}
            {/* Display the category (input value) */}
          </div>
        </>
      ) : (
        // Show a message if no data has been fetched
        !loading &&
        !error && (
          <div>
            <p className="py-6">
              No quotes found. Please search for a valid category.
            </p>
          </div>
        )
      )}
    </div>
  );
}
