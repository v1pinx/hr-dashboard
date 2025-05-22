import { generateSkills, getPerformanceColor } from "@/app/lib/utils";
import Badge from "@/app/ui/Badge";

export default function OverviewTab({
  employee,
  performanceHistory,
}: {
  employee: any;
  performanceHistory: any[];
}) {
  const bio = `${employee.firstName} ${employee.lastName} is a ${employee.age}-year-old professional working as a ${employee.company.title} in the ${employee.company.department} department at ${employee.company.name}. With a strong background from ${employee.university}, ${employee.firstName} brings valuable experience to the team. Based in ${employee.address.city}, ${employee.address.state}, ${employee.firstName} is known for dedication, professionalism, and a commitment to excellence.`;

  return (
    <div className="space-y-6">
      <div className="border p-6 rounded-lg border-zinc-800 shadow-sm">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Bio</h2>
        </div>
        <div>
          <p>{bio}</p>
        </div>
      </div>

      <div className="border p-6 rounded-lg border-zinc-800 shadow-sm">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Performance History</h2>
          <p className="text-sm text-zinc-400">Past performance evaluations</p>
        </div>
        <div>
          <div className="space-y-4">
            {performanceHistory.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2 last:border-0 border-zinc-800"
              >
                <div>
                  <h4 className="font-medium">{record.period}</h4>
                  <p className="text-sm text-zinc-400">{record.evaluator}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPerformanceColor(record.rating)}>
                    {record.rating.toFixed(1)}
                  </Badge>
                  <span className="text-sm">{record.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border  p-6 rounded-lg border-zinc-800 shadow-sm">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Skills & Expertise</h2>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {generateSkills(employee.company.department).map((skill, index) => (
              <Badge key={index} className="">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
