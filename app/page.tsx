"use client";
import { useEmployees } from "./hooks/useEmployees";
import InfiniteScroll from "react-infinite-scroll-component";
import EmployeeCard from "./components/EmployeeCard";
import Loader from "./components/Loader";
import useSearch from "./hooks/useSearch";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const { employees, loading, error, hasMore, fetchEmployees } = useEmployees();
  const { searchTerm, filteredEmployees, setSearchTerm, setFilters } =
    useSearch(employees);

  if (error) {
    const err = error as Error;
    return (
      <div className="flex justify-center items-center h-[50vh] text-red-500 font-semibold">
        Error loading employees: {err.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight">
            Employee Dashboard
          </h1>
          <p className="mt-2 text-lg text-zinc-400">
            Manage and explore your team members
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      {/* Show initial loading state */}
      {loading && employees.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={filteredEmployees.length}
          next={fetchEmployees}
          hasMore={hasMore && !loading}
          loader={
            <div className="flex items-center justify-center py-6">
              <Loader />
            </div>
          }
          endMessage={
            <p className="text-center text-zinc-400 py-6">
              No more users to load.
            </p>
          }
        >
          {filteredEmployees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center sm:place-items-stretch">
              {filteredEmployees.map((employee: any) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          ) : !loading && employees.length > 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h2 className="text-2xl font-bold text-center">No employees found</h2>
              <p className="text-zinc-400 text-center mt-2">
                Try with different search terms.
              </p>
            </div>
          ) : null}
        </InfiniteScroll>
      )}
    </div>
  );
}