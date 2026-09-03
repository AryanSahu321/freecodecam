// insert.js
import { runQuery } from "./dbconnect.js";

// Insert complaints using the pool-based runQuery function
export async function insertComplaints(complaintsArray) {
  try {
    // Convert array of objects into a single JSON string
    const jsonString = JSON.stringify(complaintsArray);

    // Call Oracle PL/SQL procedure using named binding
    await runQuery(`BEGIN insert_complaints_simple(:p_json); END;`, {
      p_json: jsonString,
    });
    console.log(`Successfully saved all ${complaintsArray.length} complaints!`);
  } catch (err) {
    console.error("Database error during bulk insert:", err);
    throw err;
  }
}
