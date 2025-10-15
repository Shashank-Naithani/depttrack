import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setUiLoading } from "../app/features/uiFeatures/uiSlice";
import { getCurrentDepartmentById } from "../app/features/department/departmentThunks";
import { clearCurrentDepartment } from "../app/features/department/departmentSlice";
import {
  changeTaskStatusThunk,
  getAllTasksThunk,
  getCurrentDepartmentTasksThunk,
} from "../app/features/taskFeatures/taskThunks";
import { clearCurrentDepartmentTasks } from "../app/features/taskFeatures/taskSlice";
import { toast } from "react-toastify";

const DepartmentDashboard = () => {
  // Getting department id from params
  const { departmentId } = useParams();

  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Department Data
  const { currentDepartment } = useSelector((state) => state.department);
  const { currentDepartmentStatus } = useSelector((state) => state.department);

  // Tasks Data
  const { currentDepartmentTasks } = useSelector((state) => state.task);
  const { currentDepartmentTasksStatus } = useSelector((state) => state.task);

  //   state to toggle description
  const [expandedTasks, setExpandedTasks] = useState({});

  // Status options
  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "text-secondary",
      bgcolor: "bg-secondary/20",
    },
    {
      value: "in-progress",
      label: "In Progress",
      color: "text-blue-600",
      bgcolor: "bg-blue-600/20",
    },
    {
      value: "completed",
      label: "Completed",
      color: "text-green-600",
      bgcolor: "bg-green-600/20",
    },
  ];

  // Handle status change
  const handleStatusChange = (taskId, newStatus) => {
    dispatch(setUiLoading(true));
    dispatch(changeTaskStatusThunk({ taskId, newStatus }))
      .unwrap()
      .then(() => dispatch(getCurrentDepartmentTasksThunk(departmentId)))
      .then(() => {
        dispatch(getAllTasksThunk());
        toast.success("Task status updated successfully.");
      })
      .catch(() => {
        toast.error("Error updating task status. Please try again.");
      })
      .finally(() => {
        dispatch(setUiLoading(false));
      });
  };

  // Get status info
  const getStatusInfo = (status) => {
    return statusOptions.find((option) => option.value === status);
  };

  // On dashboard mount
  useEffect(() => {
    dispatch(setUiLoading(true));
    if (currentDepartmentStatus === "idle") {
      dispatch(getCurrentDepartmentById(departmentId));
    }
    if (currentDepartmentTasksStatus === "idle") {
      dispatch(getCurrentDepartmentTasksThunk(departmentId));
    }
    dispatch(setUiLoading(false));
    // Cleanup
    return () => {
      dispatch(clearCurrentDepartment());
      dispatch(clearCurrentDepartmentTasks());
    };
  }, [departmentId, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text">Department Dashboard</h1>
          <p className="text-gray-600">
            Manage tasks and track progress for {currentDepartment?.name}
          </p>
        </div>

        {/* Department Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-text mb-2">Department</h3>
            <p className="text-2xl font-bold text-primary">
              {currentDepartment?.name}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-text mb-2">
              Task Overview
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-text">
                  {currentDepartmentTasks?.length}
                </div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {
                    currentDepartmentTasks?.filter(
                      (task) => task.status === "completed"
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {
                    currentDepartmentTasks?.filter(
                      (task) => task.status !== "completed"
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-text">
              Department Tasks
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {(user.department.id.toLowerCase() === "admin" ||
                    user.department.id.toLowerCase() === "human-resource") && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDepartmentTasks?.map((task) => {
                  const statusInfo = getStatusInfo(task.status);
                  const showDescription = expandedTasks[task.id] || false;

                  return (
                    <React.Fragment key={task.id}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-text">
                            {task.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              setExpandedTasks((prev) => ({
                                ...prev,
                                [task.id]: !prev[task.id],
                              }))
                            }
                            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center min-w-max"
                          >
                            {showDescription ? "Hide Details" : "View Details"}
                            <svg
                              className={`ml-1 h-4 w-4 transition-transform ${
                                showDescription ? "rotate-180" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  showDescription
                                    ? "M5 15l7-7 7 7"
                                    : "M19 9l-7 7-7-7"
                                }
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString()
                              : "No due date"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color} ${statusInfo.bgcolor}`}
                          >
                            {statusInfo.label}
                          </span>
                        </td>
                        {(user.department.id.toLowerCase() === "admin" ||
                          user.department.id.toLowerCase() ===
                            "human-resource") && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <select
                              value={task.status}
                              onChange={(e) =>
                                handleStatusChange(task.id, e.target.value)
                              }
                              className="block min-w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
                            >
                              {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </td>
                        )}
                      </tr>
                      {showDescription && (
                        <tr>
                          <td
                            colSpan={
                              user.department.id.toLowerCase() === "admin" ||
                              user.department.id.toLowerCase() ===
                                "human-resource"
                                ? 5
                                : 4
                            }
                            className="px-6 py-4 bg-gray-50"
                          >
                            <div className="text-sm text-gray-600">
                              <h4 className="font-medium text-text mb-2">
                                Task Description:
                              </h4>
                              <p className="mb-2">
                                {task.description ||
                                  "No description available for this task."}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {currentDepartmentTasks?.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-text">No tasks</h3>
              <p className="mt-1 text-sm text-gray-500">
                No tasks have been assigned to this department yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;
