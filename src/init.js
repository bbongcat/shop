import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Product";
import "./models/Order";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 👂`);

app.listen(PORT, handleListening);