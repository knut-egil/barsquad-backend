// Import
import mongoose from "mongoose";

/**
 * Initialize and connect to database
 */
async function init(): Promise<boolean> {
  // Database connection uri
  const DATABASE_URI =
    process.env.DATABASE_URI ?? "mongodb://127.0.0.1:27017/barsquad";

  try {
    // Establish connection
    await mongoose.connect(DATABASE_URI);
    return true; // Success
  } catch (err) {
    const { stack, message } = err as Error;
    console.error(
      `[${new Date().toISOString()}] Failed initializing database! Error: ${
        stack ?? message
      }`
    );
  }

  return false; // Failure
}

export default { init };
