import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUiLoading } from "../../app/features/uiFeatures/uiSlice";
import { getAllTasksThunk } from "../../app/features/taskFeatures/taskThunks";
import { getAllDepartmentsThunk } from "../../app/features/department/departmentThunks";
import { clearAllTasks } from "../../app/features/taskFeatures/taskSlice";
import { clearAllDepartments } from "../../app/features/department/departmentSlice";
import { toast } from "react-toastify";

const AdminHrDashboard = () => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allTasks } = useSelector((state) => state.task);
  const { allTasksStatus } = useSelector((state) => state.task);
  const { allDepartments } = useSelector((state) => state.department);
  const { allDepartmentsStatus } = useSelector((state) => state.department);

  // Supporting Hooks
  const navigate = useNavigate();

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = allTasks.filter(
    (task) => task.status !== "completed"
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // TODO:Get department stats ******************
  const getDepartmentStats = (deptId) => {
    const deptTasks = allTasks.filter((task) => task.department === deptId);
    const completed = deptTasks.filter(
      (task) => task.status === "completed"
    ).length;
    const total = deptTasks.length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, completionRate };
  };

  //   load data on mount
  useEffect(() => {
    dispatch(setUiLoading(true));
    if (allTasksStatus === "idle") {
      dispatch(getAllTasksThunk());
    }
    if (allDepartmentsStatus === "idle") {
      dispatch(getAllDepartmentsThunk());
    }
    dispatch(setUiLoading(false));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text">
            {user?.department.name} Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of all departments and task progress
          </p>
        </div>

        {/* Quick Actions */}
        {user.department.id === "admin" && (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 mb-8">
            <h2 className="text-xl font-semibold text-text mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Manage Task Button */}
              <button
                onClick={() => navigate("/admin/manage-tasks")}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="rounded-lg bg-accent/10 p-3 mb-2">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-text text-center">
                  Manage Tasks
                </span>
              </button>

              {/* Manage Departments Button */}
              {/* <button
                onClick={() => navigate("/manage-departments")}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="rounded-lg bg-green-100 p-3 mb-2">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-text text-center">
                  Manage Departments
                </span>
              </button> */}

              {/* Manage Volunteers Button */}
              <button
                onClick={() => toast("Comming Soon!")}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="rounded-lg bg-blue-100 p-3 mb-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-text text-center">
                  Manage Volunteers
                </span>
              </button>

              {/* Change Admin Password Button */}
              <button
                onClick={() => toast("Comming Soon!")}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="rounded-lg bg-secondary/10 p-3 mb-2">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-text text-center">
                  Change Admin Password
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-primary/10 p-3 mr-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <h3 className="text-xl font-bold text-text">{totalTasks}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 p-3 mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed Tasks</p>
                <h3 className="text-xl font-bold text-text">
                  {completedTasks}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="rounded-lg bg-secondary/10 p-3 mr-4">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <h3 className="text-xl font-bold text-text">{pendingTasks}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-text mb-4">
            Overall Progress
          </h2>
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-text">
              Completion Rate
            </span>
            <span className="text-sm font-medium text-text">
              {completionRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Completed: {completedTasks}</span>
            <span>Pending: {pendingTasks}</span>
          </div>
        </div>

        {/* Department Progress Cards */}
        <h2 className="text-xl font-semibold text-text mb-4">
          Department Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          {allDepartments?.map((department) => {
            const stats = getDepartmentStats(department.id);

            return (
              <div
                key={department.id}
                className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-text mb-2">
                  {department.name}
                </h3>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-text">
                      {stats.completionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${stats.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center p-2 bg-primary/5 rounded-lg">
                    <p className="text-sm text-gray-600">Total Tasks</p>
                    <p className="text-lg font-bold text-primary">
                      {stats.total}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-green-100 rounded-lg">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-lg font-bold text-green-600">
                      {stats.completed}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/department/${department.id}`)}
                  className="w-full mt-4 py-2 text-sm font-medium text-primary hover:text-primary/80 border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                >
                  View Department
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHrDashboard;
