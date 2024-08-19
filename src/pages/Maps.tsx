import React, { Suspense } from "react";
const CovidMap = React.lazy(() => import("../components/CovidMap"));

const Maps: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-[540px] mx-auto mb-10">
        <h2 className="text-center text-2xl md:text-[54px] md:leading-[60px] font-bold text-[#E0DEDA]">
          Global COVID-19 Impact Map
        </h2>
        <p className="text-white/50 text-sm md:text-xl text-center mt-5">
          Visualizing the Worldwide Spread: Total Cases, Deaths, and Recoveries
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Suspense fallback={<p>Loading...</p>}>
          <CovidMap />
        </Suspense>
      </div>
    </div>
  );
};

export default Maps;
