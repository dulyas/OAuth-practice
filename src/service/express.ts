import express, { Express } from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import mongoose, { ConnectOptions } from "mongoose";
import router from "@/router/index";
import config from "@/config/index";
import http from "http";
import bodyParser from "body-parser";

declare global {
	namespace Express {
		interface Request {
			auth?: {
				userId: string;
				sessionType: string;
			};
		}
	}
}

const PORT: string | number = config.PORT ?? 5000;
const app: Express = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(
// 	cors({
// 		credentials: true,
// 		origin: "*",
// 	}),
// );
app.use("/", router);

const server = http.createServer(app);

const start = async (): Promise<void> => {
	try {
		await mongoose.connect(config.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions);
		server.listen(PORT, () => console.log(`server listen on ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

export default start;
