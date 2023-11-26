import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})