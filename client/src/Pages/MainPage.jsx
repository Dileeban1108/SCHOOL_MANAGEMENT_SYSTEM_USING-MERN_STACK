import React, { useState, useEffect } from "react";
import "../styles/mainpage.css";
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const texts = [
  { part1: "LET'S", part2: "BEGIN THE", part3: "JOURNEY WITH", part4: "BEST", part5: "SCHOOL", part6: "RUWANWELLA", part7: "RAJASINGHE", part8: "CENTRAL", part9: "❤RCC❤", part10: "COLLEGE" },
  // Add more objects here to cycle through different texts if needed
];

const MainPage = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000); // Change text every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="main">
      <div className="main_container">
        <div className="image-container">
          <div className="text-conatiner">
            <p>
              <span>{texts[textIndex].part1}</span> {texts[textIndex].part2} <br />
              {texts[textIndex].part3} <br />
              <span>{texts[textIndex].part4}</span> <br />
              {texts[textIndex].part5} <br />
              <br />
              {texts[textIndex].part6} <br />
              {texts[textIndex].part7} <br />
              {texts[textIndex].part8} <br />
              {texts[textIndex].part9} <br />
              {texts[textIndex].part10} <br />
            </p>
          </div>
          <div className="img1-container"></div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
