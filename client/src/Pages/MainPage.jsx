import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import "../styles/mainpage.css";
import school from "../assets/school.jpg";
import school1 from "../assets/school1.jpg";
import school2 from "../assets/school2.jpg";
import school3 from "../assets/school3.jpg";
import school4 from "../assets/school4.jpg";
 const MainPage = () => {
  const images = [
    school,
    school1,
    school2,
    school3,
    school4
   ];

  const el = useRef(null);
  const typed = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const options = {
      strings: [
        `LET'S BEGIN THE <br> JOURNEY WITH <br> <span>BEST</span> <br> SCHOOL  <br> RAJASINGHE <br> CENTRAL <br> COLLEGE <br> RUWANWELLA <br> ❤RCC❤ `,
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      smartBackspace: true,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <section className="main">
      <div className="main_container">
        <div className="image-container">
          <div className="text-container">
            <p ref={el}></p>
          </div>
          <div
            className="img1-container"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
