import React, { Suspense } from "react";
const CovidMap = React.lazy(() => import("../components/CovidMap"));

const Maps: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-[540px] mx-auto mb-10">
        <h2 className="text-center text-2xl md:text-[54px] md:leading-[60px] font-bold text-[#E0DEDA]">
          Want to create new contacts
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">Global Cases Map</h2>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <CovidMap />
        </Suspense>
      </div>
    </div>
  );
};

export default Maps;
