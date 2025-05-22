"use client";

import { useState } from "react";
import {
  Star,
  CheckCircle,
  MessageSquare,
  Users,
  Briefcase,
} from "lucide-react";

export default function FeedbackTab({ employeeId }: { employeeId: any }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("performance");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (feedback.trim() === "") {
      alert("Please provide feedback");
      return;
    }

    // In a real app, you would submit this to an API
    console.log({
      employeeId,
      rating,
      feedback,
      feedbackType,
    });

    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setRating(0);
      setFeedback("");
      setFeedbackType("performance");
      setSubmitted(false);
    }, 3000);
  };

  const feedbackTypes = [
    { value: "performance", label: "Performance Review", icon: MessageSquare },
    { value: "project", label: "Project Feedback", icon: Briefcase },
    { value: "peer", label: "Peer Feedback", icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Feedback Form Card */}
      <div className=" rounded-xl border border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 ">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-2xl font-bold">Provide Feedback</h3>
              <p className="text-xs text-zinc-400">
                Your feedback helps improve employee performance and development
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Feedback Type Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold ">Feedback Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {feedbackTypes.map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className={`relative flex items-center p-3 border border-zinc-800 rounded-lg cursor-pointer transition-all duration-200 ${
                      feedbackType === value ? " bg-zinc-800" : " "
                    }`}
                  >
                    <input
                      type="radio"
                      name="feedbackType"
                      value={value}
                      checked={feedbackType === value}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="sr-only"
                    />
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="text-sm font-medium">{label}</span>
                    {feedbackType === value && (
                      <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-zinc-300" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Section */}
            <div className="space-y-3">
              <label className="block text-sm font-bold ">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="rounded-lg transition-colors duration-200"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      className={`h-4 w-4 transition-colors duration-200 ${
                        (hoverRating || rating) >= value
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-gray-400"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-3 text-sm font-medium">
                    {rating} out of 5 stars
                  </span>
                )}
              </div>
            </div>

            {/* Feedback Text Area */}
            <div className="space-y-3">
              <label htmlFor="feedback" className="block text-sm font-bold">
                Feedback
              </label>
              <textarea
                id="feedback"
                placeholder="Provide detailed feedback about performance, achievements, areas for improvement..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 resize-none text-sm placeholder-gray-500 transition-colors duration-200"
              />
              <p className="text-xs">{feedback.length} / 500 characters</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={submitted}
              className={`px-4 py-2 rounded-lg border border-zinc-800 cursor-pointer font-medium transition-all duration-200 ${
                submitted
                  ? "bg-zinc-800 cursor-not-allowed"
                  : " hover:bg-zinc-800 shadow-sm hover:shadow-md"
              }`}
            >
              {submitted ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Feedback Submitted
                </span>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Previous Feedback Card */}
      <div className="rounded-xl border border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-2xl font-bold">Previous Feedback</h3>
              <p className="text-xs text-zinc-400">
                Recent feedback provided for this employee
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {generatePreviousFeedback().map((item, index) => (
              <div
                key={index}
                className="pb-6 border-b border-zinc-800 last:border-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full font-bold">
                        {item.type}
                      </span>
                    </div>
                    <div className="text-zinc-400 text-xs mb-1">
                      {item.from} • {item.date}
                    </div>
                    <p className="text-sm leading-relaxed">{item.comment}</p>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < item.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-600">
                        {item.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function generatePreviousFeedback() {
  return [
    {
      type: "Performance Review",
      from: "Sarah Johnson (Manager)",
      date: "May 10, 2023",
      rating: 4,
      comment:
        "Consistently delivers high-quality work and meets deadlines. Shows initiative and problem-solving skills. Could improve on documentation and knowledge sharing with the team.",
    },
    {
      type: "Project Feedback",
      from: "Alex Chen (Team Lead)",
      date: "March 15, 2023",
      rating: 5,
      comment:
        "Excellent contribution to the recent product launch. Took ownership of key features and collaborated effectively with cross-functional teams. Technical expertise was invaluable to the project's success.",
    },
    {
      type: "Peer Feedback",
      from: "Michael Rodriguez (Colleague)",
      date: "January 22, 2023",
      rating: 4,
      comment:
        "Great team player who's always willing to help others. Communicates clearly and brings positive energy to the team. Sometimes takes on too many tasks at once which can impact delivery timelines.",
    },
  ];
}
