import { useEffect, useState } from "react";
import styled from "styled-components";

const SplashBar = ({ onFinish }) => {
  const [loading, setLoading] = useState(0);
  const [isLoadingDone, setIsLoadingDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading((prevLoading) => prevLoading + 5);
    }, 500);

    if (loading >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        setIsLoadingDone(true); // Mark loading as done
        onFinish(); // Trigger the onFinish callback
      }, 1000); // Wait for 1 second after loading is complete
    }

    return () => {
      clearInterval(timer);
    };
  }, [loading, onFinish]); // Include onFinish in the dependency array

  const Background = styled.div`
    background-image: url("/group-10.svg");
  `;

  return (
    <Background
      className={`flex flex-col items-center justify-center h-screen text-white `}
    >
      <h1 className={`text-4xl font-bold mt-32 mb-10`}>
        <img src="/logo.svg" className="w-34 h-36 ml-20" alt="" />
        Prophetic Tv 
      </h1>
      <div className={`w-1/2 mt-18 ${isLoadingDone ? "ease-out" : ""}`}>
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-white opacity-40"></div>
          <div className="h-2 bg-white" style={{ width: `${loading}%` }}></div>
        </div>
      </div>
    </Background>
  );
};

export default SplashBar;
