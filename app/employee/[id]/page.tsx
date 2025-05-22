"use client";
import FeedbackTab from "@/app/components/employee-tabs/FeedbackTab";
import OverviewTab from "@/app/components/employee-tabs/OverviewTab";
import ProjectTab from "@/app/components/employee-tabs/ProjectsTab";
import Loader from "@/app/components/Loader";
import { useBookmarks } from "@/app/context/BookmarkContext";
import { useEmployees, useEmployeeById } from "@/app/hooks/useEmployees";
import {
  generatePerformanceHistory,
  getPerformanceColor,
} from "@/app/lib/utils";
import Badge from "@/app/ui/Badge";
import { ArrowLeft, Bookmark, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmployeeDetails() {
  const params = useParams();
  const { id } = params;
  const { employee, loading, error } = useEmployeeById(id);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [activeTab, setActiveTab] = useState("overview");
  const [performanceHistory, setPerformanceHistory] = useState<any>([]);

  const isBookmarked = bookmarks.includes(employee?.id);

  useEffect(() => {
    if (employee) {
      setPerformanceHistory(generatePerformanceHistory(employee.id));
    }
  }, [employee]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    const err = error as Error;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500">
          Error loading employee details
        </h2>
        <p className="text-gray-400">{err.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            Employee Details
          </h1>
        </div>
        <button
          onClick={() => toggleBookmark(employee?.id)}
          className={`inline-flex items-center border border-zinc-800 cursor-pointer px-4 py-2 rounded-lg ${
            isBookmarked ? "bg-zinc-800 " : ""
          }`}
        >
          <Bookmark
            className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current " : ""}`}
          />
          <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        <div className="md:col-span-1 border border-zinc-800 rounded-lg shadow-sm  p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-bold">Profile</div>
            <Badge className={getPerformanceColor(employee.performanceRating)}>
              {employee.performanceRating.toFixed(1)}
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-3 pt-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <img
                  src={employee.image || "/placeholder.svg"}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 text-center">
                <h2 className="text-xl font-bold">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {employee.department}
                </p>
                <div className="flex justify-center">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = employee.performanceRating;
                    if (i < Math.floor(rating)) {
                      return (
                        <Star
                          key={i}
                          className="h-4 w-4 text-blue-500 fill-current"
                        />
                      );
                    } else if (
                      i < Math.ceil(rating) &&
                      !Number.isInteger(rating)
                    ) {
                      return (
                        <StarHalf
                          key={i}
                          className="h-4 w-4 text-blue-500 fill-current"
                        />
                      );
                    }
                    return <Star key={i} className="h-4 w-4 text-gray-800" />;
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm text-muted-foreground">
                  {employee.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Phone:</span>
                <span className="text-sm text-muted-foreground">
                  {employee.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Age:</span>
                <span className="text-sm text-muted-foreground">
                  {employee.age}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Address:</span>
                <span className="text-sm text-muted-foreground truncate max-w-[180px]">
                  {employee.address.address}, {employee.address.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="w-full grid grid-cols-3 gap-2 mb-4 bg-zinc-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("overview")}
              className={` px-4 rounded text-sm text-center font-medium cursor-pointer transition-colors duration-200 ${
                activeTab === "overview"
                  ? "bg-black text-white"
                  : " text-gray-400 "
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 rounded text-sm text-center font-medium cursor-pointer transition-colors duration-200 ${
                activeTab === "projects"
                  ? "bg-black text-white"
                  : " text-gray-400 "
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`py-1 px-4 text-sm rounded text-center font-medium cursor-pointer transition-colors duration-200 ${
                activeTab === "feedback"
                  ? "bg-black text-white"
                  : " text-gray-400 "
              }`}
            >
              Feedback
            </button>
          </div>

          <div>
            {activeTab === "overview" && (
              <OverviewTab
                employee={employee}
                performanceHistory={performanceHistory}
              />
            )}
            {activeTab === "projects" && (
              <ProjectTab employeeId={employee.id} />
            )}

            {activeTab === "feedback" && (
              <FeedbackTab employeeId={employee.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
