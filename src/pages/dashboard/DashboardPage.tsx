import React from 'react';
import { TrendingUp, TrendingDown, Flame, BookOpen, AlertCircle } from 'lucide-react';
import { AppLayout } from '../../layouts/AppLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useDashboard } from '../../hooks/useDashboard';
import { useNavigate } from 'react-router-dom';
import {
  GpaTrendChart,
  WeeklyTasksChart,
  StudyTimeByCourseChart,
} from '../../components/dashboard';

const DASHBOARD_HERO_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663445009235/mqrjtnLTPuV8W9rpRJHu95/neural_canvas_dashboard_hero-dhThs236mvJXuRKrAjSRGc.webp';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  variant = 'default',
}) => {
  const borderColors = {
    default: 'border-l-indigo-neon-600',
    success: 'border-l-success',
    warning: 'border-l-warning',
  };

  return (
    <Card variant="elevated" className={`border-l-4 ${borderColors[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-4xl font-bold text-white">{value}</p>
          {trend && (
            <p className="text-teal-neon-600 text-xs mt-2 font-medium">{trend}</p>
          )}
        </div>
        <div className="text-indigo-neon-600 opacity-50">{icon}</div>
      </div>
    </Card>
  );
};

interface TimelineItemProps {
  priority: 'high' | 'medium' | 'low';
  title: string;
  dueDate: string;
  course?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  priority,
  title,
  dueDate,
  course,
}) => {
  const priorityColors = {
    high: 'bg-danger',
    medium: 'bg-warning',
    low: 'bg-success',
  };

  return (
    <div className="flex gap-4 items-start py-3 border-b border-void-700 last:border-b-0">
      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${priorityColors[priority]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-gray-500 text-xs">Due {dueDate}</p>
          {course && <Badge variant="default">{course}</Badge>}
        </div>
      </div>
    </div>
  );
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { overview, loading, error } = useDashboard();

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 lg:p-12">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-glass rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-glass rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="p-6 lg:p-12">
          <Card variant="glass" className="border-danger/30 bg-danger/5">
            <div className="flex gap-4">
              <AlertCircle className="text-danger flex-shrink-0" size={24} />
              <div>
                <h3 className="text-white font-bold mb-1">Failed to load dashboard</h3>
                <p className="text-gray-400 text-sm">Please try refreshing the page</p>
              </div>
            </div>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const gpa = overview?.gpa || 0;
  const gpaTrend = overview?.gpa_trend || 0;
  const assignmentsDue = overview?.assignments_due || 0;
  const studyStreak = overview?.study_streak || 0;
  const upcomingDeadlines = overview?.upcoming_deadlines || [];
  const courses = overview?.courses || [];

  return (
    <AppLayout>
      <div className="p-6 lg:p-12">
        {/* Hero Zone */}
        <div
          className="rounded-2xl bg-cover bg-center relative mb-12 overflow-hidden"
          style={{
            backgroundImage: `url(${DASHBOARD_HERO_IMAGE})`,
            minHeight: '200px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-void-950/60 to-transparent" />
          <div className="relative z-10 flex flex-col justify-center h-full p-8 lg:p-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              Good morning, Alex
            </h1>
            <p className="text-gray-300">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <div className="mt-4">
              <Badge variant="info">GPA: {gpa.toFixed(2)}</Badge>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Current GPA"
            value={gpa.toFixed(2)}
            trend={gpaTrend > 0 ? `+${gpaTrend.toFixed(2)}` : `${gpaTrend.toFixed(2)}`}
            icon={<TrendingUp size={24} />}
            variant={gpaTrend > 0 ? 'success' : 'warning'}
          />
          <StatCard
            title="Assignments Due"
            value={assignmentsDue}
            trend="This week"
            icon={<BookOpen size={24} />}
          />
          <StatCard
            title="Study Streak"
            value={`${studyStreak} days`}
            trend="Keep it up!"
            icon={<Flame size={24} />}
            variant="success"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card variant="glass">
            <h3 className="text-xl font-bold text-white mb-6">GPA Trend</h3>
            <GpaTrendChart />
          </Card>

          <Card variant="glass">
            <h3 className="text-xl font-bold text-white mb-6">Study Time by Course</h3>
            <StudyTimeByCourseChart />
          </Card>
        </div>

        {/* Weekly Tasks Chart */}
        <Card variant="glass" className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6">Weekly Tasks</h3>
          <WeeklyTasksChart />
        </Card>

        {/* Next Tasks Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Next Tasks</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/planner')}
              >
                View all →
              </Button>
            </div>
            <div className="space-y-0">
              {upcomingDeadlines.slice(0, 5).map((deadline: any, i: number) => (
                <TimelineItem
                  key={i}
                  priority={deadline.priority || 'medium'}
                  title={deadline.title}
                  dueDate={new Date(deadline.due_date).toLocaleDateString()}
                  course={deadline.course}
                />
              ))}
            </div>
          </Card>

          {/* Courses Overview */}
          <Card variant="glass">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Your Courses</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/planner')}
              >
                View all →
              </Button>
            </div>
            <div className="space-y-3">
              {courses.slice(0, 5).map((course: any, i: number) => (
                <div
                  key={i}
                  className="bg-void-800 rounded-lg p-3 flex items-center justify-between hover:bg-void-750 transition-all cursor-pointer"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{course.name}</p>
                    <p className="text-gray-500 text-xs">{course.instructor}</p>
                  </div>
                  <Badge variant="default">{course.grade || 'N/A'}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
