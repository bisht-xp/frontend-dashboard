import React, { Suspense } from "react";
const CovidChart = React.lazy(() => import("../components/CovidChart"));

const Charts = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-[540px] mx-auto mb-5">
        <h2 className="text-center text-2xl md:text-[54px] md:leading-[60px] font-bold text-[#E0DEDA]">
          Covid line Chart
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <h2 className="text-xl text-white font-semibold mb-2">Global Cases of Covid</h2>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <CovidChart />
        </Suspense>
      </div>
    </div>
  );
};

export default Charts;
