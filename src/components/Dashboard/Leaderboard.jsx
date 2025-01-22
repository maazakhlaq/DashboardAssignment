import React from "react";

const Leaderboard = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
    <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
  

    <div className="overflow-y-auto h-[335px]">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-white sticky top-0 z-10">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Movie Name & Year</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Wins</th>
          </tr>
        </thead>
        <tbody>
          {data
            .sort((a, b) => b.oscar_winning - a.oscar_winning) 
            .map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.title+" ( "+item.year+' )'}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.oscar_winning}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  
  
  );
};

export default Leaderboard;
