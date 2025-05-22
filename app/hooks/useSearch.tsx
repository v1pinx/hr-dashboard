import { useState, useMemo } from "react";

export default function useSearch(employees) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "",
  });

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];

    return employees.filter((employee) => {
      const searchMatch =
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.company.department
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const departmentMatch = filters.department
        ? employee.company.department.toLowerCase() ===
          filters.department.toLowerCase()
        : true;

      return searchMatch && departmentMatch;
    });
  }, [employees, searchTerm, filters]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredEmployees,
  };
}
