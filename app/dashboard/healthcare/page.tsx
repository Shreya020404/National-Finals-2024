"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

// Example healthcare report interface
interface HealthcareReport {
  id: string;
  platform: string;
  dataUsage: string;
  lastLogin: string;
}

// Mock data for the healthcare platforms
const mockHealthcareReports: HealthcareReport[] = [
  {
    id: "1",
    platform: "MyChart",
    dataUsage:
      "Used for managing appointments, prescriptions, and accessing medical history.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    platform: "Fitbit",
    dataUsage:
      "Data used to track health metrics such as heart rate, steps, sleep patterns, and activity levels.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "3",
    platform: "Apple Health",
    dataUsage:
      "Aggregates health data from various sources to monitor fitness, nutrition, and wellness.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "4",
    platform: "Google Fit",
    dataUsage:
      "Used for tracking physical activity, workouts, and health goals.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "5",
    platform: "HealthKit",
    dataUsage:
      "Used for collecting and sharing health-related data between apps and devices.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "6",
    platform: "Zocdoc",
    dataUsage:
      "Used for finding healthcare providers, scheduling appointments, and managing medical records.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "7",
    platform: "Headspace",
    dataUsage:
      "Data used for mental health tracking, meditation practices, and wellness routines.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "8",
    platform: "Noom",
    dataUsage:
      "Used for weight management, nutrition tracking, and health coaching.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "9",
    platform: "Telehealth Services",
    dataUsage:
      "Used for virtual consultations, appointment management, and remote patient monitoring.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "10",
    platform: "MyFitnessPal",
    dataUsage: "Data used for tracking diet, exercise, and nutrition goals.",
    lastLogin: new Date().toISOString(),
  },
];


export default function HealthcareReports() {
  const [reports, setReports] = useState<HealthcareReport[]>(
    mockHealthcareReports
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
          setReports(mockHealthcareReports);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadPDF = (report: HealthcareReport) => {
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
          Healthcare Data Reports
        </h1>
        <p className="leading-7 text-sm dark:text-gray-400 mb-6">
          Below are the Healthcare platforms where you have logged in. Click on
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
