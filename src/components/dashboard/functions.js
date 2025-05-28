// Helper functions for the dashboard component

// Format a date for display
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const dateFormatted = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const timeFormatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${dateFormatted} at ${timeFormatted}`;
};

// Get CSS class for appointment status
export const getAppointmentStatusColor = (status) => {
  switch (status) {
    case 'scheduled':
      return 'status-scheduled';
    case 'completed':
      return 'status-completed';
    case 'cancelled':
      return 'status-cancelled';
    case 'pending':
      return 'status-pending';
    case 'in-progress':
      return 'status-in-progress';
    case 'missed':
      return 'status-missed';
    default:
      return '';
  }
};
