import React, { useEffect, useState, useContext, useRef } from "react";
import gsap from "gsap";
import { LoadContext } from "./App";
import { Circles } from "react-loader-spinner";

export default function Image(props) {
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const loadContext = useContext(LoadContext);
  const formatter_year = new Intl.DateTimeFormat("en-us", {
    year: "numeric"
  });
  const formatter_month = new Intl.DateTimeFormat("en-us", {
    month: "2-digit"
  });
  const formatter_date = new Intl.DateTimeFormat("en-us", {
    day: "2-digit"
  });
  const start_date =
    formatter_year.format(props.startDate) +
    "-" +
    formatter_month.format(props.startDate) +
    "-" +
    formatter_date.format(props.startDate);
  const end_date =
    formatter_year.format(props.endDate) +
    "-" +
    formatter_month.format(props.endDate) +
    "-" +
    formatter_date.format(props.endDate);
  const handleLikePress = (event) => {
    const button = document.querySelector(".button");
    button.classList.toggle("liked");
    if (button.classList.contains("liked")) {
      gsap.fromTo(
        button,
        {
          "--hand-rotate": 8
        },
        {
          ease: "none",
          keyframes: [
            {
              "--hand-rotate": -45,
              duration: 0.16,
              ease: "none"
            },
            {
              "--hand-rotate": 15,
              duration: 0.12,
              ease: "none"
            },
            {
              "--hand-rotate": 0,
              duration: 0.2,
              ease: "none",
              clearProps: true
            }
          ]
        }
      );
    }
  };

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${start_date}&end_date=${end_date}&api_key=jcvEYNlEa2Hx5YiQFutvXxKxQgy8blgFkbQbjpna`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          loadContext.setLoadState(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          loadContext.setLoadState(true);
          setError(error);
        }
      );
  }, [start_date, end_date, loadContext]);

  const loaded_Pictures = (
    <div className="flex font-sans flex-wrap">
      {items.map((item) => (
        <div
          key={item.date}
          className="flex-auto basis-1/3 flex flex-col m-4 justify-between bg-gray-900 text-white rounded-md"
        >
          {item.media_type === "image" ? (
            <img
              className="storm-images object-cover bg-black flex-1"
              src={item.url}
              alt={item.title}
            />
          ) : (
            <video
              className="storm-images object-cover bg-black flex-1"
              src={item.url}
              alt={item.title}
            />
          )}
          <div className="flex flex-col">
            <div className="p-4">
              <h1 className="text-xl font-bold">Title: {item.title}</h1>
              <h2 className="text-lg font-semibold">Date: {item.date}</h2>
              <div>{item.explanation.slice(0, 100)}...</div>
            </div>
            <div className="flex">
              <button className="button outline-0" onClick={handleLikePress}>
                <div className="hand">
                  <div className="thumb"></div>
                </div>
                <span>
                  Like<span>d</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <div>
        {loadContext.loaded ? (
          loaded_Pictures
        ) : (
          <Circles className="text-center" arialLabel="loading-indicator" />
        )}
      </div>
    </div>
  );
}
