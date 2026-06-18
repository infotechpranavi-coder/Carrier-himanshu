export type CareerApplication = {
  id: string;
  careerId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  mobile: string;
  experience: string;
  message: string;
  createdAt: string;
};

export function formatApplicationDate(date: Date) {
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
