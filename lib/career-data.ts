export type Career = {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  createdAt: string;
};

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'] as const;

export function formatCareerDate(date: Date) {
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
