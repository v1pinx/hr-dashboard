import { useState, useEffect, useCallback } from "react";

export function useEmployees() {
  const [employees, setEmployees] = useState<any>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LIMIT = 20;

  const fetchEmployees = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/users?limit=${LIMIT}&skip=${skip}`
      );
      const data = await response.json();

      const updatedData = data.users.map((user: any) => ({
        ...user,
        performanceRating: generatePerformanceRating(),
      }));
      setEmployees((prev: any) => [...prev, ...updatedData]);
      setSkip((prev) => prev + LIMIT);

      if (skip + LIMIT >= data.total) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  }, [skip, hasMore, loading]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, hasMore, fetchEmployees };
}

export function useEmployeeById(id: any) {
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch employee");
        }

        const data = await response.json();
        const enhancedEmployee = {
          ...data,
          performanceRating: generatePerformanceRating(),
        };

        setEmployee(enhancedEmployee);
      } catch (err) {
        console.error("Error fetching employee:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

  return { employee, loading, error };
}

function generatePerformanceRating() {
  return Math.round((Math.random() * 2.5 + 2.5) * 10) / 10; // Generates between 2.5 and 5.0
}
