import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { predictDisease } from "../services/diagnosisService";

function Diagnosis() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();

    if (!symptoms.trim()) {
      alert("Please enter symptoms.");
      return;
    }

    try {
      setLoading(true);

      const response = await predictDisease(symptoms);

      setResult(response);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    if (!risk) return "bg-gray-500";

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
      <h1 className="text-4xl font-bold mb-8">
        AI Disease Diagnosis
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <form onSubmit={handlePredict}>

            <label className="block font-semibold mb-3">
              Enter Symptoms
            </label>

            <textarea
              rows="8"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full border rounded-lg p-4"
              placeholder="Example:
Fever
Cough
Headache
Body Pain"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
            >
              {loading ? "Predicting..." : "Predict Disease"}
            </button>

          </form>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">

          {!result ? (
            <div className="text-gray-500 text-center mt-20">
              Prediction will appear here.
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Prediction Result
              </h2>

              <div className="space-y-5">

                <div>
                  <p className="text-gray-500">
                    Disease
                  </p>

                  <h3 className="text-3xl font-bold">
                    {result.prediction}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Confidence
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{
                        width: `${result.confidence}%`,
                      }}
                    ></div>
                  </div>

                  <p className="mt-2">
                    {result.confidence}%
                  </p>
                </div>

                <div>
                  <span
                    className={`text-white px-4 py-2 rounded-full ${getRiskColor(
                      result.riskLevel
                    )}`}
                  >
                    {result.riskLevel} Risk
                  </span>
                </div>

                <div>
                  <h4 className="font-bold">
                    Description
                  </h4>

                  <p>{result.description}</p>
                </div>

                <div>
                  <h4 className="font-bold">
                    Recommendation
                  </h4>

                  <p>{result.recommendation}</p>
                </div>

              </div>
            </>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Diagnosis;