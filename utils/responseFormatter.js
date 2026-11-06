/**
 * Response Formatter Utility
 * Chatbot Akademika
 */

/**
 * Format timestamp into ISO and readable local date string
 */
const getFormattedTimestamp = () => {
  const now = new Date();
  return {
    iso: now.toISOString(),
    local: now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
  };
};

/**
 * Standard Success Response Helper
 */
const formatSuccess = (message, data = null) => {
  return {
    status: 'success',
    message,
    timestamp: new Date().toISOString(),
    data
  };
};

/**
 * Standard Error Response Helper
 */
const formatError = (message, details = null) => {
  return {
    status: 'error',
    message,
    timestamp: new Date().toISOString(),
    details
  };
};

module.exports = {
  getFormattedTimestamp,
  formatSuccess,
  formatError
};
