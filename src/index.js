import app from "./app.js";
import connectDB from "./db.js";
const PORT = process.env.PORT || 8080;

connectDB();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} http://localhost:${PORT}`);
});
