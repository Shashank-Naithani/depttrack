import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUiLoading } from "../../app/features/uiFeatures/uiSlice";
import {
  addTaskThunk,
  deleteTaskThunk,
  getAllTasksThunk,
  updateTaskThunk,
} from "../../app/features/taskFeatures/taskThunks";
import { getAllDepartmentsThunk } from "../../app/features/department/departmentThunks";
import { toast } from "react-toastify";
import { clearAllTasks } from "../../app/features/taskFeatures/taskSlice";
import { clearAllDepartments } from "../../app/features/department/departmentSlice";

const ManageTasks = () => {
  // Redux
  const dispatch = useDispatch();
  const { allDepartments } = useSelector((state) => state.department);
  const { allDepartmentsStatus } = useSelector((state) => state.department);
  const { allTasks } = useSelector((state) => state.task);
  const { allTasksStatus } = useSelector((state) => state.task);

  // Supporting States
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Filter tasks based on department name search
  const filteredTasks = allTasks?.filter((task) => {
    const department = allDepartments?.find(
      (dept) => dept.id === task.department
    );
    return department?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get department name by ID
  const getDepartmentName = (deptId) => {
    const department = allDepartments?.find((dept) => dept.id === deptId);
    return department?.name || "Unknown Department";
  };

  // Handle task creation
  const handleAddTask = (newTask) => {
    dispatch(setUiLoading(true));
    const task = {
      ...newTask,
      status: "pending",
    };
    dispatch(addTaskThunk(task))
      .unwrap()
      .then(() => dispatch(getAllTasksThunk()))
      .then(() => {
        toast.success("Task added successfully.");
      })
      .catch((err) => {
        toast.error("Error adding task. Please try again.");
      })
      .finally(() => {
        setIsAddTaskModalOpen(false);
        dispatch(setUiLoading(false));
      });
  };

  // Handle task editing
  const handleEditTask = (updatedTask) => {
    dispatch(setUiLoading(true));

    const task = {
      ...selectedTask, // keep id and original props
      ...updatedTask, // overwrite with new values
    };

    dispatch(updateTaskThunk(task))
      .unwrap()
      .then(() => {
        toast.success("Task updated successfully.");
        dispatch(getAllTasksThunk());
      })
      .catch((err) => {
        toast.error("Error updating task. Please try again.");
      })
      .finally(() => {
        setIsEditTaskModalOpen(false);
        setSelectedTask(null);
        dispatch(setUiLoading(false));
      });
  };

  // Open edit modal
  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditTaskModalOpen(true);
  };

  // handleDeleteTask function
  const handleDeleteTask = () => {
    if (taskToDelete) {
      dispatch(setUiLoading(true));

      dispatch(deleteTaskThunk(taskToDelete.id))
        .unwrap()
        .then(() => {
          toast.success("Task deleted successfully.");
          dispatch(getAllTasksThunk()); // refresh tasks
        })
        .catch((err) => {
          toast.error("Error deleting task. Please try again.");
        })
        .finally(() => {
          setIsDeleteConfirmModalOpen(false);
          setTaskToDelete(null);
          dispatch(setUiLoading(false));
        });
    }
  };

  // function to open the delete confirmation modal
  const openDeleteConfirmModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteConfirmModalOpen(true);
  };

  // Create a function to close the modal without deleting
  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setTaskToDelete(null);
  };

  // Toggle task description expansion
  const toggleDescription = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
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
            Manage Tasks
          </h1>
          <p className="text-gray-600">
            View and manage all tasks across departments
          </p>
        </div>

        {/* Search and Add Task Section */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by department name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Add Task Button */}
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-text">All Tasks</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-text">
                          {task.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {getDepartmentName(task.department)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleDescription(task.id)}
                          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
                        >
                          {expandedTask === task.id
                            ? "Hide Details"
                            : "View Details"}
                          <svg
                            className={`ml-1 h-4 w-4 transition-transform ${
                              expandedTask === task.id ? "rotate-180" : ""
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
                                expandedTask === task.id
                                  ? "M5 15l7-7 7 7"
                                  : "M19 9l-7 7-7-7"
                              }
                            />
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openEditModal(task)}
                            className="text-primary hover:text-primary/80 p-1 rounded-lg hover:bg-primary/10 transition-colors"
                            title="Edit Task"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => openDeleteConfirmModal(task)}
                            className="text-secondary hover:text-secondary/80 p-1 rounded-lg hover:bg-secondary/10 transition-colors"
                            title="Delete Task"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedTask === task.id && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 bg-gray-50">
                          <div className="text-sm text-gray-600">
                            <h4 className="font-medium text-text mb-2">
                              Task Description:
                            </h4>
                            <p className="whitespace-pre-line">
                              {task.description}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <h3 className="mt-2 text-sm font-medium text-text">
                {searchTerm ? "No tasks found" : "No tasks available"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search term"
                  : "Get started by creating a new task"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <TaskModal
          departments={allDepartments}
          onClose={() => setIsAddTaskModalOpen(false)}
          onSave={handleAddTask}
          title="Add New Task"
        />
      )}

      {/* Edit Task Modal */}
      {isEditTaskModalOpen && (
        <TaskModal
          departments={allDepartments}
          task={selectedTask}
          onClose={() => {
            setIsEditTaskModalOpen(false);
            setSelectedTask(null);
          }}
          onSave={handleEditTask}
          title="Edit Task"
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && (
        <DeleteConfirmModal
          task={taskToDelete}
          onClose={closeDeleteConfirmModal}
          onConfirm={handleDeleteTask}
        />
      )}
    </div>
  );
};

// --------------------------------------------
// Task Modal Component (for both Add and Edit)
// --------------------------------------------
const TaskModal = ({ departments, task, onClose, onSave, title }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    department: task?.department || "",
    dueDate: task?.dueDate
      ? new Date(
          task.dueDate.seconds
            ? task.dueDate.seconds * 1000 // Firestore Timestamp
            : task.dueDate // normal Date string
        )
          .toISOString()
          .split("T")[0]
      : "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...formData,
      dueDate: formData.dueDate, // keep string
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Task Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.title ? "border-secondary" : "border-gray-300"
                }`}
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-secondary">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter detailed task description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.department ? "border-secondary" : "border-gray-300"
                }`}
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-secondary">
                  {errors.department}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Due Date *
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.dueDate ? "border-secondary" : "border-gray-300"
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-secondary">{errors.dueDate}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -----------------------------------
// Delete Confirmation Modal Component
// -----------------------------------
const DeleteConfirmModal = ({ task, onClose, onConfirm }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">Confirm Delete</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete the task{" "}
            <strong>"{task?.title}"</strong>? This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-lg hover:bg-secondary/90"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
