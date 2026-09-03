import { runQuery } from "./dbconnect.js";

// Insert comments using the pool-based runQuery function
export async function insertComments(commentsArray) {
  try {
    // Convert your array of objects into a single JSON string
    const jsonString = JSON.stringify(commentsArray);

    // Call your Oracle PL/SQL procedure using named binding
    await runQuery(`BEGIN insert_comments_simple(:p_json); END;`, {
      p_json: jsonString,
    });

    console.log(`Successfully saved all ${commentsArray.length} comments!`);
  } catch (err) {
    console.error("Database error during bulk insert:", err);
    throw err;
  }
}

// --- Your Original Input Data ---
const targetComments = [
  { postId: 1, userName: "aryan", text: "First dynamic comment!" },
  { postId: 1, userName: "rahul", text: "Second dynamic comment!" },
  { postId: 2, userName: "sneha", text: "Great content here." },
];
