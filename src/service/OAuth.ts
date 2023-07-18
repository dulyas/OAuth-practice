import OAuth2Server from "oauth2-server";
import {
	saveToken,
	revokeToken,
	getAccessToken,
	getRefreshToken,
} from "./tokens";
import {
	saveAuthorizationCode,
	revokeAuthorizationCode,
	getAuthorizationCode,
} from "./auth-code";
import { getClient } from "./clients";
import { Request, Response } from "oauth2-server";
import { OAuthClient, User } from "@/models";

const OAuth = {
	saveToken,
	saveAuthorizationCode,
	revokeAuthorizationCode,
	revokeToken,
	getAuthorizationCode,
	getAccessToken,
	getClient,
	getRefreshToken,
};

export const server = new OAuth2Server({
	model: OAuth as any, // косяк
});

export const autorizeService = async (
	request: Request,
	response: Response,
	client_id: string,
	userId: string | undefined,
): Promise<OAuth2Server.AuthorizationCode> => {
	const code = await server.authorize(request, response, {
		authenticateHandler: {
			handle: async () => {
				const client = await OAuthClient.findOne({
					clientId: client_id,
				});
				if (!client) throw new Error("Client not found");
				if (!client.userId && !userId) return {};
				const user = await User.findOne({
					...(client.userId && { _id: client.userId }),
				});
				if (!user) throw new Error("User not found");
				return { _id: user._id };
			},
		},
	});

	return code;
};

export const authTokenService = async (
	request: Request,
	response: Response,
): Promise<OAuth2Server.Token> => {
	return await server.token(request, response, {
		alwaysIssueNewRefreshToken: false,
	});
};

export const getUserInfoForAuthService = async (userId: string) => {
	const user = await User.findOne({ _id: userId }).lean();
	if (!user) throw new Error("User not found");
	return user;
};
