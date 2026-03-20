import { FormEvent, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookOpen, FileText, CheckSquare, AlertCircle, Check, Pencil, Trash2 } from "lucide-react";
import {
  PageShell,
  PageSection,
  Heading,
  Text,
  Card,
  Button,
  EmptyState,
  SkeletonCard,
  Modal,
  Input,
  Select,
} from "../../components";
import { plannerApi, type Course, type Assignment, type Task, type CreateCoursePayload, type CreateAssignmentPayload, type CreateTaskPayload } from "../../api/plannerApi";
import { useToast } from "../../context/ToastContext";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] } },
};

export const PlannerPage = () => {
  const { showSuccess, showError } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [showDone, setShowDone] = useState(false);
  const [showDoneTasks, setShowDoneTasks] = useState(false);

  const load = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [c, a, t] = await Promise.all([
        plannerApi.listCourses(),
        plannerApi.listAssignments(),
        plannerApi.listTasks(),
      ]);
      setCourses(c);
      setAssignments(a);
      setTasks(t);
    } catch (err: any) {
      setLoadError(err?.response?.data?.detail || "Failed to load planner data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  // ── Add Course modal ──────────────────────────────────────────────────────
  const [courseOpen, setCourseOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTerm, setCourseTerm] = useState("");
  const [courseCredits, setCourseCredits] = useState<string>("");
  const [savingCourse, setSavingCourse] = useState(false);

  const handleCreateCourse = async () => {
    if (!courseName.trim() || !courseCode.trim() || !courseTerm.trim()) return;
    setSavingCourse(true);
    try {
      const payload: CreateCoursePayload = {
        name: courseName.trim(),
        code: courseCode.trim(),
        term: courseTerm.trim(),
        credits: courseCredits.trim() ? Number(courseCredits) : null,
      };
      await plannerApi.createCourse(payload);
      showSuccess("Course added", `${courseCode} has been added.`);
      setCourseOpen(false);
      setCourseName("");
      setCourseCode("");
      setCourseTerm("");
      setCourseCredits("");
      void load();
    } catch (err: any) {
      showError("Failed to add course", err?.response?.data?.detail || "Please try again.");
    } finally {
      setSavingCourse(false);
    }
  };

  // ── Edit Course modal ─────────────────────────────────────────────────────
  const [editCourseOpen, setEditCourseOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [editCourseName, setEditCourseName] = useState("");
  const [editCourseCode, setEditCourseCode] = useState("");
  const [editCourseTerm, setEditCourseTerm] = useState("");
  const [editCourseCredits, setEditCourseCredits] = useState<string>("");
  const [savingEditCourse, setSavingEditCourse] = useState(false);
  const [deletingCourseId, setDeletingCourseId] = useState<number | null>(null);

  const handleEditCourse = (c: Course) => {
    setEditCourse(c);
    setEditCourseName(c.name);
    setEditCourseCode(c.code);
    setEditCourseTerm(c.term);
    setEditCourseCredits(c.credits != null ? c.credits.toString() : "");
    setEditCourseOpen(true);
  };

  const handleSaveEditCourse = async () => {
    if (!editCourse || !editCourseName.trim() || !editCourseCode.trim() || !editCourseTerm.trim()) return;
    setSavingEditCourse(true);
    try {
      await plannerApi.updateCourse(editCourse.id, {
        name: editCourseName.trim(),
        code: editCourseCode.trim(),
        term: editCourseTerm.trim(),
        credits: editCourseCredits.trim() ? Number(editCourseCredits) : null,
      });
      showSuccess("Course updated", `${editCourseCode} has been updated.`);
      setEditCourseOpen(false);
      setEditCourse(null);
      void load();
    } catch (err: any) {
      showError("Failed to update course", err?.response?.data?.detail || "Please try again.");
    } finally {
      setSavingEditCourse(false);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    setDeletingCourseId(id);
    try {
      await plannerApi.deleteCourse(id);
      showSuccess("Course deleted", "The course has been removed.");
      void load();
    } catch (err: any) {
      showError("Failed to delete course", err?.response?.data?.detail || "Please try again.");
    } finally {
      setDeletingCourseId(null);
    }
  };

  // ── Add Assignment modal ──────────────────────────────────────────────────
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentCourse, setAssignmentCourse] = useState<string>("");
  const [assignmentDue, setAssignmentDue] = useState("");
  const [assignmentWeight, setAssignmentWeight] = useState<string>("");
  const [savingAssignment, setSavingAssignment] = useState(false);

  const handleCreateAssignment = async () => {
    if (!assignmentTitle.trim() || !assignmentCourse || !assignmentDue) return;
    setSavingAssignment(true);
    try {
      const payload: CreateAssignmentPayload = {
        title: assignmentTitle.trim(),
        course_id: Number(assignmentCourse),
        due_at: new Date(assignmentDue).toISOString(),
        weight: assignmentWeight.trim() ? Number(assignmentWeight) : null,
      };
      await plannerApi.createAssignment(payload);
      showSuccess("Assignment added", `${assignmentTitle} has been added.`);
      setAssignmentOpen(false);
      setAssignmentTitle("");
      setAssignmentCourse("");
      setAssignmentDue("");
      setAssignmentWeight("");
      void load();
    } catch (err: any) {
      showError("Failed to add assignment", err?.response?.data?.detail || "Please try again.");
    } finally {
      setSavingAssignment(false);
    }
  };

  // ── Add Task modal ────────────────────────────────────────────────────────
  const [taskOpen, setTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [savingTask, setSavingTask] = useState(false);

  const handleCreateTask = async () => {
    if (!taskTitle.trim() || !taskDue) return;
    setSavingTask(true);
    try {
      const payload: CreateTaskPayload = {
        title: taskTitle.trim(),
        due_at: new Date(taskDue).toISOString(),
        priority: taskPriority as "low" | "medium" | "high",
      };
      await plannerApi.createTask(payload);
      showSuccess("Task added", `${taskTitle} has been added.`);
      setTaskOpen(false);
      setTaskTitle("");
      setTaskDue("");
      setTaskPriority("medium");
      void load();
    } catch (err: any) {
      showError("Failed to add task", err?.response?.data?.detail || "Please try again.");
    } finally {
      setSavingTask(false);
    }
  };

  // ── Complete Task ────────────────────────────────────────────────────────
  const handleCompleteTask = async (id: number) => {
    setCompletingId(id);
    try {
      await plannerApi.completeTask(id);
      showSuccess("Task completed", "Great work!");
      void load();
    } catch (err: any) {
      showError("Failed to complete task", err?.response?.data?.detail || "Please try again.");
    } finally {
      setCompletingId(null);
    }
  };

  // ── Delete Assignment ────────────────────────────────────────────────────
  const [deletingAssignmentId, setDeletingAssignmentId] = useState<number | null>(null);

  const handleDeleteAssignment = async (id: number) => {
    setDeletingAssignmentId(id);
    try {
      await plannerApi.deleteAssignment(id);
      showSuccess("Assignment deleted", "The assignment has been removed.");
      void load();
    } catch (err: any) {
      showError("Failed to delete assignment", err?.response?.data?.detail || "Please try again.");
    } finally {
      setDeletingAssignmentId(null);
    }
  };

  // ── Delete Task ──────────────────────────────────────────────────────────
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const handleDeleteTask = async (id: number) => {
    setDeletingTaskId(id);
    try {
      await plannerApi.deleteTask(id);
      showSuccess("Task deleted", "The task has been removed.");
      void load();
    } catch (err: any) {
      showError("Failed to delete task", err?.response?.data?.detail || "Please try again.");
    } finally {
      setDeletingTaskId(null);
    }
  };

  if (loading && courses.length === 0 && assignments.length === 0 && tasks.length === 0) {
    return (
      <PageShell>
        <PageSection className="space-y-6">
          <SkeletonCard />
          <SkeletonCard />
        </PageSection>
      </PageShell>
    );
  }

  if (loadError && courses.length === 0 && assignments.length === 0 && tasks.length === 0) {
    return (
      <PageShell>
        <PageSection className="space-y-6">
          <Card variant="default" padding="md" className="border-error-500/30 bg-error-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-error-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-error-400">Failed to load planner</p>
                <p className="mt-1 text-xs text-slate-400">{loadError}</p>
              </div>
              <Button size="sm" variant="primary" onClick={() => load()}>
                Try again
              </Button>
            </div>
          </Card>
        </PageSection>
      </PageShell>
    );
  }

  const completedAssignments = assignments.filter(a => a.completed);
  const visibleAssignments = showDone ? assignments : assignments.filter(a => !a.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const visibleTasks = showDoneTasks ? tasks : tasks.filter(t => !t.completed);
  const displayedAssignments = visibleAssignments;
  const displayedTasks = showDoneTasks ? tasks : visibleTasks;

  return (
    <PageShell>
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <PageSection className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900/20 via-slate-900/10 to-accent-900/10 border border-slate-700/30 p-8 lg:p-10"
          >
            <div className="relative z-10">
              <Heading level="h1" className="text-slate-50">Planner</Heading>
              <Text variant="body" color="muted" className="mt-2">
                Organize your courses, assignments, and tasks for the semester.
              </Text>
            </div>
          </motion.div>

          {/* ── Courses ──────────────────────────────────────────────────── */}
          <Card variant="elevated">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary-400" />
                <Heading level="h2" className="text-lg">Courses</Heading>
              </div>
              <Button size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => setCourseOpen(true)}>
                Add Course
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/20 p-3 hover:bg-slate-800/40 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-slate-100">{course.code}</p>
                      <p className="text-xs text-slate-400">{course.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Pencil className="h-3.5 w-3.5" />}
                        onClick={() => handleEditCourse(course)}
                        className="text-slate-400 hover:text-slate-200"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Trash2 className="h-3.5 w-3.5" />}
                        onClick={() => handleDeleteCourse(course.id)}
                        disabled={deletingCourseId === course.id}
                        className="text-slate-400 hover:text-danger-400"
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <EmptyState
                  icon={<BookOpen className="h-8 w-8" />}
                  title="No courses yet"
                  description="Add your first course to get started."
                />
              )}
            </div>
          </Card>

          {/* ── Assignments ──────────────────────────────────────────────── */}
          <Card variant="elevated">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent-400" />
                <Heading level="h2" className="text-lg">Assignments</Heading>
              </div>
              <div className="flex items-center gap-2">
                {completedAssignments.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowDone(!showDone)}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    {showDone ? "Hide" : "Show"} completed ({completedAssignments.length})
                  </Button>
                )}
                <Button size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => setAssignmentOpen(true)}>
                  Add Assignment
                </Button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {displayedAssignments.length > 0 ? (
                displayedAssignments.map((assignment) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/20 p-3 hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-100">{assignment.title}</p>
                      <p className="text-xs text-slate-400">
                        Due {new Date(assignment.due_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<Trash2 className="h-3.5 w-3.5" />}
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      disabled={deletingAssignmentId === assignment.id}
                      className="text-slate-400 hover:text-danger-400"
                    />
                  </motion.div>
                ))
              ) : (
                <EmptyState
                  icon={<FileText className="h-8 w-8" />}
                  title="No assignments"
                  description="Add assignments to track your coursework."
                />
              )}
            </div>
          </Card>

          {/* ── Tasks ────────────────────────────────────────────────────── */}
          <Card variant="elevated">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-primary-400" />
                <Heading level="h2" className="text-lg">Tasks</Heading>
              </div>
              <div className="flex items-center gap-2">
                {completedTasks.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowDoneTasks(!showDoneTasks)}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    {showDoneTasks ? "Hide" : "Show"} completed ({completedTasks.length})
                  </Button>
                )}
                <Button size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => setTaskOpen(true)}>
                  Add Task
                </Button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {displayedTasks.length > 0 ? (
                displayedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/20 p-3 hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-100">{task.title}</p>
                      <p className="text-xs text-slate-400">
                        Due {new Date(task.due_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!task.completed && (
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Check className="h-3.5 w-3.5" />}
                          onClick={() => handleCompleteTask(task.id)}
                          disabled={completingId === task.id}
                          className="text-slate-400 hover:text-primary-400"
                        />
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Trash2 className="h-3.5 w-3.5" />}
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={deletingTaskId === task.id}
                        className="text-slate-400 hover:text-danger-400"
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <EmptyState
                  icon={<CheckSquare className="h-8 w-8" />}
                  title="No tasks"
                  description="Add tasks to stay organized and on track."
                />
              )}
            </div>
          </Card>

          {/* ── Modals ────────────────────────────────────────────────────── */}
          <Modal isOpen={courseOpen} onClose={() => setCourseOpen(false)} title="Add Course">
            <div className="space-y-4">
              <Input
                label="Course Code"
                placeholder="CS101"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
              <Input
                label="Course Name"
                placeholder="Introduction to Computer Science"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              <Input
                label="Term"
                placeholder="Fall 2024"
                value={courseTerm}
                onChange={(e) => setCourseTerm(e.target.value)}
              />
              <Input
                label="Credits (optional)"
                type="number"
                placeholder="3"
                value={courseCredits}
                onChange={(e) => setCourseCredits(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setCourseOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCreateCourse} loading={savingCourse}>
                  Add Course
                </Button>
              </div>
            </div>
          </Modal>

          <Modal isOpen={editCourseOpen} onClose={() => setEditCourseOpen(false)} title="Edit Course">
            <div className="space-y-4">
              <Input
                label="Course Code"
                placeholder="CS101"
                value={editCourseCode}
                onChange={(e) => setEditCourseCode(e.target.value)}
              />
              <Input
                label="Course Name"
                placeholder="Introduction to Computer Science"
                value={editCourseName}
                onChange={(e) => setEditCourseName(e.target.value)}
              />
              <Input
                label="Term"
                placeholder="Fall 2024"
                value={editCourseTerm}
                onChange={(e) => setEditCourseTerm(e.target.value)}
              />
              <Input
                label="Credits (optional)"
                type="number"
                placeholder="3"
                value={editCourseCredits}
                onChange={(e) => setEditCourseCredits(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setEditCourseOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveEditCourse} loading={savingEditCourse}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Modal>

          <Modal isOpen={assignmentOpen} onClose={() => setAssignmentOpen(false)} title="Add Assignment">
            <div className="space-y-4">
              <Input
                label="Assignment Title"
                placeholder="Midterm Exam"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
              />
              <Select
                label="Course"
                value={assignmentCourse}
                onChange={(e) => setAssignmentCourse(e.target.value)}
              >
                <option value="">Select a course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}
                  </option>
                ))}
              </Select>
              <Input
                label="Due Date"
                type="datetime-local"
                value={assignmentDue}
                onChange={(e) => setAssignmentDue(e.target.value)}
              />
              <Input
                label="Weight (optional)"
                type="number"
                placeholder="0.3"
                value={assignmentWeight}
                onChange={(e) => setAssignmentWeight(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setAssignmentOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCreateAssignment} loading={savingAssignment}>
                  Add Assignment
                </Button>
              </div>
            </div>
          </Modal>

          <Modal isOpen={taskOpen} onClose={() => setTaskOpen(false)} title="Add Task">
            <div className="space-y-4">
              <Input
                label="Task Title"
                placeholder="Study for midterm"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Input
                label="Due Date"
                type="datetime-local"
                value={taskDue}
                onChange={(e) => setTaskDue(e.target.value)}
              />
              <Select
                label="Priority"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setTaskOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCreateTask} loading={savingTask}>
                  Add Task
                </Button>
              </div>
            </div>
          </Modal>
        </PageSection>
      </motion.div>
    </PageShell>
  );
};
