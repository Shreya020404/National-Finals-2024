"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface Report {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Report 1",
    description: "Description for report 1.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Report 2",
    description: "Description for report 2.",
    createdAt: new Date().toISOString(),
  },
];

export default function Reports() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating data fetching with a delay
    setLoading(true);
    const fetchReports = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setReports(mockReports);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadPDF = (report: Report) => {
    const doc = new jsPDF();
    doc.text(report.title, 10, 10);
    doc.text(report.description, 10, 20);
    doc.text(
      `Created at: ${new Date(report.createdAt).toLocaleDateString()}`,
      10,
      30
    );
    doc.save(`${report.title}.pdf`);
  };

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex min-w-screen p-4 flex-col items-center justify-between">
      <div className="flex flex-col mb-[5rem] w-full">
        <h1 className="text-3xl font-semibold tracking-tight">Your Reports</h1>
        <p className="leading-7 text-sm dark:text-gray-400">
          Below are the reports generated from the data you provided.
        </p>

        <div className="mt-[1rem] max-w-[600px] space-y-3">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div key={report.id} className="border p-4 rounded-md shadow-md">
                <h2 className="text-xl font-bold">{report.title}</h2>
                <p>{report.description}</p>
                <p className="text-sm text-gray-500">
                  Created at: {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <Button className="mt-2" onClick={() => downloadPDF(report)}>
                  Download PDF
                </Button>
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
