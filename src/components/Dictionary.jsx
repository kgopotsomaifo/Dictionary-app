import React, { useState } from "react";

function Dictionary() {
  const [inputWord, setInputWord] = useState("");
  const [defWord, setDefWord] = useState("");
  const [exampleWord, setExampleWord] = useState("");
  const [error, setError] = useState("");
  async function fetchDictionaryData() {
    try {
      let response = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${inputWord}?key=${process.env.React_App_Api_Key}`
      );
      // Parse the data to JSON
      let data = await response.json();
      // console.log(data);
      if (Array.isArray(data) && data.length > 0) {
        // definition
        setDefWord(data[0].shortdef);
        console.log("Definition:", data[0].shortdef);
        // example usage
        setExampleWord(data[1].shortdef);
        console.log("Example:", data[1].shortdef);
      }
    } catch (error) {
      setError("An error occured. Please try again later");
    }
  }
  return (
    <div>
      <div>
        <h1>Dictionary</h1>

        <input
          type="text"
          placeholder="search for a word"
          onChange={(e) => setInputWord(e.target.value)}
        />
        <button onClick={fetchDictionaryData}>SEARCH</button>
        <br></br>
        {inputWord}
      </div>
      <span>{error && <p>Error: {error}</p>}</span>
      <div>{defWord && <p>Definition: {defWord}</p>}</div>
      <div>{exampleWord && <p>Example usage: {exampleWord}</p>}</div>
    </div>
  );
}
export default Dictionary;
