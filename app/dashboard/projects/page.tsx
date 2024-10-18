"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

// Example healthcare report interface
interface ProjectPage {
  id: string;
  platform: string;
  dataUsage: string;
  lastLogin: string;
}

// Mock data for the healthcare platforms
const mockProjectpageReports: ProjectPage[] = [
  {
    id: "1",
    platform: "Personal Blog",
    dataUsage:
      "Used for sharing personal insights, tutorials, and creative writing.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    platform: "GitHub",
    dataUsage:
      "Data used for version control and collaboration on coding projects.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "3",
    platform: "Trello",
    dataUsage:
      "Used for organizing tasks, managing projects, and tracking progress.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "4",
    platform: "Notion",
    dataUsage:
      "Used for note-taking, project management, and personal organization.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "5",
    platform: "LinkedIn",
    dataUsage:
      "Used for networking, showcasing professional skills, and job searching.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "6",
    platform: "YouTube Channel",
    dataUsage: "Used for sharing video content, tutorials, and vlogs.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "7",
    platform: "Medium",
    dataUsage: "Used for publishing articles and essays on various topics.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "8",
    platform: "Instagram Portfolio",
    dataUsage: "Used for showcasing photography and creative projects.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "9",
    platform: "Twitter",
    dataUsage:
      "Used for sharing quick thoughts, engaging with followers, and networking.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "10",
    platform: "Pinterest",
    dataUsage:
      "Used for collecting inspiration and ideas for personal projects.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "11",
    platform: "Slack",
    dataUsage:
      "Used for team collaboration and communication on various projects.",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "12",
    platform: "Facebook Group",
    dataUsage:
      "Used for connecting with communities around personal interests and hobbies.",
    lastLogin: new Date().toISOString(),
  },
];


export default function ProjectPage() {
  const [reports, setReports] = useState<ProjectPage[]>(
    mockProjectpageReports
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
          setReports(mockProjectpageReports);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadPDF = (report: ProjectPage) => {
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
          My Personal Project Data Reports
        </h1>
        <p className="leading-7 text-sm dark:text-gray-400 mb-6">
          Below are the Personal Project platforms where you have logged in. Click on
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
