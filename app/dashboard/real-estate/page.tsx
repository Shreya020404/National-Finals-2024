"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

// Example real estate report interface
interface RealEstateReport {
  id: string;
  platform: string;
  dataUsage: string;
  lastLogin: string;
}

// Mock data for the real estate platforms
const mockRealEstateReports: RealEstateReport[] = [
  {
    id: "1",
    platform: "Zillow",
    dataUsage:
      "Used to recommend properties, analyze market trends, and improve user search experience.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    platform: "RealtyTrac",
    dataUsage:
      "Data used for property valuation, historical records, and foreclosure listings.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "3",
    platform: "Realtor.com",
    dataUsage:
      "Used to list properties, provide market insights, and enhance user experience.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "4",
    platform: "Redfin",
    dataUsage:
      "Data used for home sales analytics, property recommendations, and agent performance tracking.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "5",
    platform: "Trulia",
    dataUsage:
      "Used for property listings, neighborhood insights, and user reviews.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "6",
    platform: "LoopNet",
    dataUsage:
      "Data used for commercial real estate listings and market analysis.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "7",
    platform: "Movoto",
    dataUsage:
      "Used for residential property listings and market trend analysis.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "8",
    platform: "Opendoor",
    dataUsage: "Used for instant home buying, selling, and pricing analytics.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "9",
    platform: "PropertyNest",
    dataUsage:
      "Used to track real estate listings, market data, and user engagement.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "10",
    platform: "Compass",
    dataUsage:
      "Data used for luxury property listings and personalized real estate services.",
    lastLogin: new Date().toISOString(),
  },
];


export default function RealEstateReports() {
  const [reports, setReports] = useState<RealEstateReport[]>(
    mockRealEstateReports
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<string | null>(null); // Track selected platform

  useEffect(() => {
    setLoading(true);
    const fetchReports = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setReports(mockRealEstateReports);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadPDF = (report: RealEstateReport) => {
    const doc = new jsPDF();
    doc.text(report.platform, 10, 10);
    doc.text(report.dataUsage, 10, 20);
    doc.text(
      `Last Login: ${new Date(report.lastLogin).toLocaleDateString()}`,
      10,
      30
    );
    doc.save(`${report.platform}-report.pdf`);
  };

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex min-w-screen p-4 flex-col items-center justify-between">
      <div className="flex flex-col mb-[5rem] w-full">
        <h1 className="text-3xl font-semibold tracking-tight mb-6">
          Real Estate Data Reports
        </h1>
        <p className="leading-7 text-sm dark:text-gray-400 mb-6">
          Below are the real estate platforms where you have logged in. Click on
          any platform to see how your data is being used.
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report.id}
                className={`border p-4 rounded-md shadow-md transition-all ${
                  selectedReport === report.id
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{report.platform}</h2>
                  <Button
                    variant="link"
                    onClick={() =>
                      setSelectedReport(
                        selectedReport === report.id ? null : report.id
                      )
                    }
                  >
                    {selectedReport === report.id
                      ? "Hide Details"
                      : "View Details"}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last Login: {new Date(report.lastLogin).toLocaleDateString()}
                </p>

                {/* Show details when the platform is clicked */}
                {selectedReport === report.id && (
                  <div className="mt-4">
                    <p className="text-sm">{report.dataUsage}</p>
                    <Button
                      className="mt-2 w-full"
                      onClick={() => downloadPDF(report)}
                    >
                      Download PDF
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No reports found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
