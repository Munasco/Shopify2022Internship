import React, { useEffect, useState } from "react";

export default function Image() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState({});
  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=jcvEYNlEa2Hx5YiQFutvXxKxQgy8blgFkbQbjpna"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const loaded_Pictures = <div>{JSON.stringify(items)}</div>;
  return (
    <div className="App">
      <div> {isLoaded ? loaded_Pictures : null} </div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
