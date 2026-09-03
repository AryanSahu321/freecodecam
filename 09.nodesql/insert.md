Here is the step-by-step flow of how your application takes a JavaScript list of objects, converts it, and saves it into Oracle using your PL/SQL procedure:

---

### Step-by-Step Execution Flow

1. **Input Array (JavaScript)**

- You start with an array containing one or more comment objects:

```javascript
const commentsArray = [
  { postId: 1, userName: "aryan", text: "First dynamic comment!" },
];
```

2. **JSON Serialization (`JSON.stringify`)**

- Inside `insertComments()`, JavaScript runs `JSON.stringify(commentsArray)`.
- This flattens your array of objects into a single JSON-formatted text string so it can easily cross the boundary into the database:

```json
[{ "postId": 1, "userName": "aryan", "text": "First dynamic comment!" }]
```

3. **Query Binding (`runQuery`)**

- The text string is passed into your `runQuery` function inside an object payload to map to a bind variable:

```javascript
{
  p_json: jsonString;
}
```

- `runQuery` borrows an active database connection from your pool and executes an anonymous PL/SQL block:

```sql
BEGIN insert_comments_simple(:p_json); END;

```

- Oracle receives the JSON string safely through the `:p_json` parameter without any risk of SQL injection.

4. **Database Processing (PL/SQL Procedure)**

- Inside your Oracle database, the `insert_comments_simple` procedure receives the string, parses the JSON, loops through the records, and performs the actual `INSERT INTO comments` operations into your table.

5. **Response & Connection Release**

- Once Oracle finishes processing, `runQuery` catches the success, hits its `finally` block to **automatically return the connection back to the pool**, and logs success to your console.

`{ p_json: jsonString }` is a JavaScript object used as a **bind parameter container** when executing your database query.

### Breakdown of How It Works

1. **`p_json` (The Key)**:

- This matches the placeholder name used in your SQL statement: `BEGIN insert_comments_simple(:p_json); END;`.
- The colon (`:p_json`) tells Oracle: _"Look for a bind variable named `p_json` in the object I am passing you."_

2. **`jsonString` (The Value)**:

- This is the actual data variable containing your stringified array of comments (e.g., `"[{\"postId\":1,...}]"`).

---

### Why Use This Instead of Direct Interpolation?

Instead of concatenating strings like this:

```javascript
// BAD & UNSECURE: SQL Injection risk & breaks with special characters
await runQuery(`BEGIN insert_comments_simple('${jsonString}'); END;`);
```

Using a bind object (`{ p_json: jsonString }`) sends the code and the data **separately** to Oracle:

- **Safety**: It completely prevents SQL injection attacks because Oracle treats `jsonString` strictly as raw data, never as executable code.
- **Special Characters**: If your comment text contains single quotes (`it's`, `don't`), direct string concatenation will crash your SQL query. Bind variables handle special characters automatically without breaking.
