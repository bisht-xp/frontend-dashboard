import React, { Suspense } from "react";
const CovidChart = React.lazy(() => import("../components/CovidChart"));

const Charts = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-[540px] mx-auto mb-10">
        <h2 className="text-center text-2xl md:text-[54px] md:leading-[60px] font-bold text-[#E0DEDA]">
          COVID-19 Global Trends: 2020-2023
        </h2>
        <p className="text-white/50 text-sm md:text-xl text-center mt-5">
          Charting the Course: Cases, Deaths, and Recoveries Over Time
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Suspense fallback={<p>Loading...</p>}>
          <CovidChart />
        </Suspense>
      </div>
    </div>
  );
};

export default Charts;
