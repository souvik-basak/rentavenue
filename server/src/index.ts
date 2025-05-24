import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middleware/auth.middleware";

// routing imports
import tenantRoutes from "./routes/tenant.routes";
import managerRoutes from "./routes/manager.routes";
import propertyRoutes from "./routes/property.routes";
import leaseRoutes from "./routes/lease.routes";
import applicationRoutes from "./routes/application.routes";

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// route
app.get("/", (req, res) => {
  res.send("Hello from home page!");
});
app.use("/applications", applicationRoutes);
app.use("/leases", leaseRoutes);
app.use("/properties", propertyRoutes);
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
