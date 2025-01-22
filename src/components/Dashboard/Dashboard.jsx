import React, { useEffect, useState } from "react";
import PieCharts from "../chart/PieCharts";
import SearchFilter from "./SearchFilter";
import Leaderboard from "./Leaderboard";
import CommonCard from "./CommonCard";
import BarChart from "../chart/BarCharts";
import { FaTachometerAlt } from "react-icons/fa";
import { MdOutlineFilterAltOff, MdOutlineFilterAlt } from "react-icons/md";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/1LUSTIL");

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
          const uniqueData = data.filter((value, index, self) =>
            index === self.findIndex((t) => t.title === value.title && t.year === value.year)
          );
          setData(uniqueData);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white p-6 mb-3 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center border-b-orange-500 border-b-2">
          <FaTachometerAlt className="text-4xl text-blue-500 mr-4" />
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
        </div>

      </header>


      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 w-full max-h-[calc(100vh-160px)] overflow-y-auto">


        <div className="w-full">
          <CommonCard title="Oscar Statistics Overview" loading={loading}>
            <BarChart data={data} />
          </CommonCard>
        </div>
        <div className="w-full">
          <CommonCard title="Leaderboard" loading={loading}>
            <Leaderboard data={data || []} loading={loading} />
          </CommonCard>
        </div>
        <div className="w-full">
          <CommonCard
            title={
              <div className="flex items-center">

                <div
                  className="cursor-pointer border-b-2 border-b-borderInput"
                  onClick={() => setShowFilters(prev => !prev)}
                  title={showFilters ? "Hide Search & Filter" : "Show Search & Filter"}
                >
                  {showFilters ? (
                    <MdOutlineFilterAltOff className="mr-2 text-blue-400" />
                  ) : (
                    <MdOutlineFilterAlt className="mr-2 text-blue-400" />
                  )}
                </div>

                <span className="ml-2">Search & Filter</span>
              </div>
            }

            loading={loading}
          >
            <SearchFilter
              data={data}
              showFilters={showFilters}

            />
          </CommonCard>
        </div>
        <div className="w-full">
          <CommonCard title="Country and Language Insights" loading={loading}>
            <PieCharts data={data || []} loading={loading} />
          </CommonCard>
        </div>






      </div>
    </div>

  );
};

export default Dashboard;
