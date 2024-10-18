"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

// Example healthcare report interface
interface FinanceReport {
  id: string;
  platform: string;
  dataUsage: string;
  lastLogin: string;
}

// Mock data for the healthcare platforms
const mockFinanceReports: FinanceReport[] = [
  {
    id: "1",
    platform: "Paypal",
    dataUsage: "Used for financial history, transactions, and credit history.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    platform: "Stripe",
    dataUsage: "Used for processing payments and managing online transactions.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "3",
    platform: "Square",
    dataUsage: "Used for point of sale transactions and sales analytics.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "4",
    platform: "Venmo",
    dataUsage: "Used for peer-to-peer payments and transaction history.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "5",
    platform: "QuickBooks",
    dataUsage: "Used for accounting, invoicing, and financial reporting.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "6",
    platform: "Mint",
    dataUsage: "Used for budgeting, expense tracking, and financial planning.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "7",
    platform: "Zelle",
    dataUsage: "Used for fast money transfers between bank accounts.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "8",
    platform: "Robinhood",
    dataUsage: "Used for stock trading and portfolio management.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "9",
    platform: "Coinbase",
    dataUsage: "Used for buying, selling, and managing cryptocurrency.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "10",
    platform: "Plaid",
    dataUsage:
      "Used for connecting bank accounts to apps for transaction data.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "11",
    platform: "Chime",
    dataUsage: "Used for banking services and mobile payments.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "12",
    platform: "Cash App",
    dataUsage: "Used for peer-to-peer payments and investing.",
    lastLogin: new Date().toISOString(),
  },
];


export default function HealthcareReports() {
  const [reports, setReports] = useState<FinanceReport[]>(
    mockFinanceReports
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
          setReports(mockFinanceReports);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadPDF = (report: FinanceReport) => {
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
          Financial Data Reports
        </h1>
        <p className="leading-7 text-sm dark:text-gray-400 mb-6">
          Below are the Financial platforms where you have logged in. Click on
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
