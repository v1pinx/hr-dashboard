"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Briefcase,
  Target,
  AlertCircle,
  Plus,
  Filter,
  Search,
} from "lucide-react";

export default function ProjectTab({ employeeId }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    deadline: "",
    priority: "medium",
    status: "not-started",
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Creating project:", { ...newProject, employeeId });
    setShowCreateForm(false);
    setNewProject({
      name: "",
      description: "",
      deadline: "",
      priority: "medium",
      status: "not-started",
    });
  };

  const projects = generateMockProjects();

  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "on-hold":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="rounded-xl border border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold">Projects</h3>
            <p className="text-xs text-zinc-400">
              Track employee project assignments and progress
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div>
          <div className="p-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No projects found matching your criteria
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="pb-6 border-b border-zinc-800 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h5 className="text-lg font-bold mb-1">
                              {project.name}
                            </h5>
                            <p className="text-sm text-zinc-400 mb-3">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              project.status
                            )}`}
                          >
                            {getStatusIcon(project.status)}
                            {project.status
                              .replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </div>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                              project.priority
                            )}`}
                          >
                            {project.priority.charAt(0).toUpperCase() +
                              project.priority.slice(1)}{" "}
                            Priority
                          </div>
                          <div className="flex items-center gap-1 text-xs text-zinc-400">
                            <Calendar className="w-3 h-3" />
                            Due: {project.deadline}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-zinc-400">
                            <Users className="w-3 h-3" />
                            {project.teamMembers} members
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-zinc-400">Progress</span>
                            <span className="font-medium">
                              {project.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div
                              className="bg-gray-300 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="text-xs text-zinc-400">
                          <span className="font-medium">Assigned by:</span>{" "}
                          {project.assignedBy} •
                          <span className="font-medium"> Created:</span>{" "}
                          {project.createdDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function generateMockProjects() {
  return [
    {
      name: "E-commerce Platform Redesign",
      description:
        "Complete overhaul of the customer-facing e-commerce platform with focus on mobile responsiveness and user experience improvements.",
      status: "in-progress",
      priority: "high",
      progress: 75,
      deadline: "2024-06-15",
      startDate: "2024-03-01",
      createdDate: "2024-02-15",
      assignedBy: "Sarah Johnson (Project Manager)",
      teamMembers: 5,
    },
    {
      name: "API Integration Module",
      description:
        "Develop and implement third-party API integration module for customer data synchronization with CRM system.",
      status: "completed",
      priority: "medium",
      progress: 100,
      deadline: "2024-04-30",
      startDate: "2024-02-01",
      createdDate: "2024-01-20",
      assignedBy: "Alex Chen (Tech Lead)",
      teamMembers: 3,
    },
    {
      name: "Database Optimization",
      description:
        "Optimize database queries and implement caching strategies to improve application performance by 40%.",
      status: "on-hold",
      priority: "medium",
      progress: 45,
      deadline: "2024-07-20",
      startDate: "2024-04-15",
      createdDate: "2024-04-01",
      assignedBy: "Michael Rodriguez (Database Admin)",
      teamMembers: 2,
    },
    {
      name: "Mobile App Development",
      description:
        "Develop cross-platform mobile application for iOS and Android using React Native framework.",
      status: "not-started",
      priority: "high",
      progress: 0,
      deadline: "2024-09-15",
      startDate: "2024-06-01",
      createdDate: "2024-05-20",
      assignedBy: "Jennifer Lee (Product Owner)",
      teamMembers: 4,
    },
    {
      name: "Security Audit Implementation",
      description:
        "Implement security recommendations from recent audit including authentication improvements and data encryption.",
      status: "in-progress",
      priority: "high",
      progress: 30,
      deadline: "2024-08-01",
      startDate: "2024-05-01",
      createdDate: "2024-04-20",
      assignedBy: "David Park (Security Officer)",
      teamMembers: 3,
    },
  ];
}
