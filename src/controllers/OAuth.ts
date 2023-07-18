import { Request as Req, Response as Res } from "express";
import { Request, Response } from "oauth2-server";
import {
	autorizeService,
	authTokenService,
	getUserInfoForAuthService,
} from "@/service/OAuth";

export const authorize = async (req: Req, res: Res) => {
	try {
		const request = new Request(req);
		const response = new Response(res);
		const { client_id } = req.query || {};
		if (!client_id) throw new Error("Client ID not found");
		const { userId } = req.auth || {};

		const code = await autorizeService(
			request,
			response,
			String(client_id),
			String(userId),
		);

		res.json(code);
	} catch (err: any) {
		console.log("err", err);
		res.status(err.code || 500).json(
			err instanceof Error ? { error: err.message } : err,
		);
	}
};

export const token = async (req: Req, res: Res) => {
	try {
		const request = new Request(req);
		const response = new Response(res);
		const token = await authTokenService(request, response);

		res.json(token);
	} catch (err: any) {
		console.log(err);
		res.status(err.code || 500).json(
			err instanceof Error ? { error: err.message } : err,
		);
	}
};

export const getUserInfoAuth = async (req: Req, res: Res) => {
	try {
		const { userId } = req.auth || {};
		if (!userId) throw new Error("User not found");
		const user = await getUserInfoForAuthService(userId);
		res.json({ _id: user._id, username: user.username });
	} catch (err: any) {
		console.log(err);
		res.status(err.code || 500).json(
			err instanceof Error ? { error: err.message } : err,
		);
	}
};
