/**
 * Logger Middleware
 * Mencatat setiap request HTTP yang masuk ke backend:
 * - Metode HTTP (GET, POST, etc.)
 * - Path / Endpoint URL
 * - Status response HTTP
 * - Waktu request / Timestamp
 */

const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const requestTime = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;

  // Dengarkan event finish ketika response selesai dikirim
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    
    // Format log: [Timestamp] [METHOD] Path - Status: CODE (Duration ms)
    console.log(
      `[${requestTime}] [${method}] ${url} - Status: ${statusCode} (${duration}ms)`
    );
  });

  next();
};

module.exports = loggerMiddleware;
