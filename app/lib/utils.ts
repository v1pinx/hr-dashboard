export function getPerformanceColor(rating: number) {
  if (rating >= 4.5) return "bg-green-500 ";
  if (rating >= 3.5) return "bg-emerald-500 ";
  if (rating >= 2.5) return "bg-yellow-500";
  if (rating >= 1.5) return "bg-orange-500 ";
  return "bg-red-500 ";
}

export function generatePerformanceHistory(employeeId: number) {
  const periods = [
    "Q1 2023",
    "Q4 2022",
    "Q3 2022",
    "Q2 2022",
    "Q1 2022",
    "Q4 2021",
  ];

  const evaluators = [
    "John Smith (Manager)",
    "Sarah Johnson (Director)",
    "Michael Brown (Team Lead)",
    "Emily Davis (HR)",
    "David Wilson (Department Head)",
  ];

  const statuses = [
    "Exceeds Expectations",
    "Meets Expectations",
    "Needs Improvement",
  ];

  // Generate 3-5 performance records
  const numRecords = Math.floor(Math.random() * 3) + 3;
  const history = [];

  for (let i = 0; i < numRecords; i++) {
    // Generate a rating between 2.0 and 5.0
    const rating = Math.round((Math.random() * 3 + 2) * 10) / 10;

    // Determine status based on rating
    let status;
    if (rating >= 4.0) {
      status = statuses[0]; // Exceeds Expectations
    } else if (rating >= 3.0) {
      status = statuses[1]; // Meets Expectations
    } else {
      status = statuses[2]; // Needs Improvement
    }

    history.push({
      period: periods[i],
      evaluator: evaluators[Math.floor(Math.random() * evaluators.length)],
      rating,
      status,
    });
  }

  return history;
}

export function generateSkills(department: any) {
  const commonSkills = [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Time Management",
  ];

  const departmentSkills: any = {
    Engineering: [
      "JavaScript",
      "React",
      "Node.js",
      "System Design",
      "API Development",
    ],
    Marketing: [
      "Content Strategy",
      "SEO",
      "Social Media",
      "Analytics",
      "Campaign Management",
    ],
    Sales: [
      "Negotiation",
      "CRM",
      "Client Relations",
      "Sales Strategy",
      "Lead Generation",
    ],
    Product: [
      "Product Strategy",
      "User Research",
      "Roadmapping",
      "Agile",
      "Wireframing",
    ],
    Design: [
      "UI/UX",
      "Figma",
      "Design Systems",
      "User Testing",
      "Visual Design",
    ],
    Finance: [
      "Financial Analysis",
      "Budgeting",
      "Forecasting",
      "Risk Assessment",
      "Excel",
    ],
    HR: [
      "Recruitment",
      "Employee Relations",
      "Training",
      "Compensation",
      "Policy Development",
    ],
    Operations: [
      "Process Optimization",
      "Project Management",
      "Resource Allocation",
      "Vendor Management",
    ],
  };

  const skills = [...commonSkills];
  if (departmentSkills[department]) {
    skills.push(...departmentSkills[department]);
  }
  return skills;
}
