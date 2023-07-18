import { Request, Response } from "express";
import { User, OAuthClient } from "@/models";
import { v4 as uuid } from "uuid";

export const createUser = async (req: Request, res: Response) => {
	try {
		const { username, role } = req.body;
		const user = await User.create({
			username,
			role,
		});

		const client = await OAuthClient.create({
			userId: user._id,
			_id: uuid(),
			clientId: uuid(),
			clientSecret: uuid(),
			callbackUrl: "http://test.com/",
			grants: ["authorization_code", "refresh_token"],
		});

		res.json({
			user,
			client,
		});
	} catch (e) {
		console.log(e);
		res.json({ error: e });
	}
};
