import React, { useRef, useState, useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/footer";

const Layout = ({ children }) => {
  const elementRef = useRef();

  //to help lazyload background image
  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //The eement is visible...
          }
        });
      },
      {
        threshold: 0,
      }
    );
    observer.observe(element);

    return (): void => {
      observer.unobserve(element);
    };
  }, []);
  return (
    <div>
      <Header showNav />
      <div ref={elementRef} data-background-src={`../../images/BG.png`}>
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
