import { Request as Req, Response as Res, NextFunction } from "express";
import { Request, Response } from "oauth2-server";
import { server } from "@/service/OAuth";

export default async (req: Req, res: Res, next: NextFunction) => {
	try {
		const request = new Request(req);
		const response = new Response(res);
		const token = await server.authenticate(request, response);
		req.auth = { userId: token?.user?.id, sessionType: "oauth2" };
		next();
	} catch (err: any) {
		console.log("err", err);
		res.status(err.code || 500).json(
			err instanceof Error ? { error: err.message } : err,
		);
	}
};
