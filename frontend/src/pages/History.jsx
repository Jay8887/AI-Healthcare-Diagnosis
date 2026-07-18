import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getPredictionHistory } from "../services/historyService";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getPredictionHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      item.prediction.toLowerCase().includes(search.toLowerCase())
    );
  }, [history, search]);

  const badgeColor = (risk) => {
    if (!risk) return "bg-gray-400";

    switch (risk.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "moderate":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Prediction History
        </h1>

        <input
          type="text"
          placeholder="Search disease..."
          className="border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4">Disease</th>
              <th>Risk</th>
              <th>Confidence</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {filteredHistory.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {item.prediction}
                </td>

                <td>

                  <span
                    className={`text-white px-3 py-1 rounded-full ${badgeColor(
                      item.riskLevel
                    )}`}
                  >
                    {item.riskLevel}
                  </span>

                </td>

                <td>
                  {item.confidence}%
                </td>

                <td>
                  {new Date(item.createdAt).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </DashboardLayout>
  );
}

export default History;