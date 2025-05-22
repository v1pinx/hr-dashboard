import React from "react";

const Loader = () => {
  return (
    <>
      <div className="relative w-12 h-12 rotate-[45deg] perspective-[1000px] rounded-full text-white">
        <div className="absolute top-0 left-0 w-full h-full rounded-full animate-spinX"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full text-[#FF3D00] animate-spinY"></div>
      </div>

      <style>{`
        @keyframes spin {
          0%, 100% {
            box-shadow: 0.2em 0 0 0 currentcolor;
          }
          12% {
            box-shadow: 0.2em 0.2em 0 0 currentcolor;
          }
          25% {
            box-shadow: 0 0.2em 0 0 currentcolor;
          }
          37% {
            box-shadow: -0.2em 0.2em 0 0 currentcolor;
          }
          50% {
            box-shadow: -0.2em 0 0 0 currentcolor;
          }
          62% {
            box-shadow: -0.2em -0.2em 0 0 currentcolor;
          }
          75% {
            box-shadow: 0 -0.2em 0 0 currentcolor;
          }
          87% {
            box-shadow: 0.2em -0.2em 0 0 currentcolor;
          }
        }

        .animate-spinX {
          transform: rotateX(70deg);
          animation: spin 1s linear infinite;
        }

        .animate-spinY {
          transform: rotateY(70deg);
          animation: spin 1s linear infinite;
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
};

export default Loader;
