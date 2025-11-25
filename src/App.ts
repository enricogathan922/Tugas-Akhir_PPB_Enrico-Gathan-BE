import express, {
  Application,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import indexRoutes from "./routes/index.route";
import cors from "cors";




export class App {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeNotFoundHandler();
    this.initializeErrorHandler();
  }

  private initializeMiddleware(): void {

    const allowedOrigins = [
      "https://tugas-akhir-ppb-enrico-gathan.vercel.app",
      "https://tugas-akhir-ppb-enrico-gathan-be.vercel.app",
      "http://localhost:5173",
    ];

    this.app.use((req, res, next) => {
      const origin = req.headers.origin;

      if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
      }

      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.header("Access-Control-Allow-Credentials", "true");

      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }

      next();
    });

    this.app.use(express.json());
  }


  private initializeRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        status: true,
        message: "api running!",
      });
    });

    this.app.use("/api", indexRoutes);
  }

  private initializeNotFoundHandler(): void {
    this.app.use("/", (_req: Request, res: Response): void => {
      res.status(404).json({
        status: 404,
        message: "Route not found",
        data: null,
      });
    });
  }

  private initializeErrorHandler(): void {
    this.app.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
        console.error(err);
        res.status(500).json({
          status: 500,
          message: "Internal server error",
          error: err.message,
        });
      },
    );
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
