"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

// Example social media report interface
interface SocialMediaReport {
  id: string;
  platform: string;
  dataUsage: string;
  lastLogin: string;
}

// Mock data for the social media platforms
const mockSocialMediaReports: SocialMediaReport[] = [
  {
    id: "1",
    platform: "Instagram",
    dataUsage:
      "Used for ad targeting, content recommendation, and user engagement analytics.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    platform: "Facebook",
    dataUsage:
      "Data utilized for creating personalized ads, friend suggestions, and community insights.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "3",
    platform: "Twitter",
    dataUsage:
      "Used for trend analysis, sentiment tracking, and ad performance metrics.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "4",
    platform: "LinkedIn",
    dataUsage:
      "Data used for professional networking, job recommendations, and targeted advertising.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "5",
    platform: "TikTok",
    dataUsage:
      "Used for content discovery, ad targeting, and user engagement metrics.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "6",
    platform: "Snapchat",
    dataUsage:
      "Data used for ad targeting, user demographics, and engagement analytics.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "7",
    platform: "Pinterest",
    dataUsage:
      "Used for visual discovery, ad targeting, and user interest profiling.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "8",
    platform: "Reddit",
    dataUsage:
      "Data utilized for community insights, ad targeting, and user behavior analysis.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "9",
    platform: "YouTube",
    dataUsage:
      "Used for video performance analytics, content recommendations, and targeted ads.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "10",
    platform: "WhatsApp",
    dataUsage:
      "Used for user engagement metrics and customer service interactions.",
    lastLogin: new Date().toISOString(),
  },
];


export default function SocialMediaReports() {
  const [reports, setReports] = useState<SocialMediaReport[]>(
    mockSocialMediaReports
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
          setReports(mockSocialMediaReports);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadPDF = (report: SocialMediaReport) => {
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
          Social Media Data Reports
        </h1>
        <p className="leading-7 text-sm dark:text-gray-400 mb-6">
          Below are the Social Media platforms where you have logged in. Click on
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
