import OAuthAccessToken, { IOAuthAccessToken } from "@/models/OAuthAccessToken";
import OAuthRefreshToken, {
	IOAuthRefreshToken,
} from "@/models/OAuthRefreshToken";
import { v4 as uuid } from "uuid";

export const revokeToken = async ({
	refreshToken,
}: {
	refreshToken: string;
}): Promise<boolean> => {
	const res = await OAuthAccessToken.deleteOne({ refreshToken });
	return res.deletedCount === 1;
};

export const saveToken = async (
	token: IOAuthAccessToken & Partial<IOAuthRefreshToken>,
	client: {
		id: string;
	},
	user: {
		id: string;
	},
): Promise<{
	accessToken: string;
	accessTokenExpiresAt: Date;
	refreshToken: string | undefined;
	refreshTokenExpiresAt: Date | undefined;
	scope: string;
	client: {
		id: string;
	};
	user: {
		id: string;
	};
}> => {
	console.log("token", token);
	console.log("client", client);
	console.log("user", user);
	await OAuthAccessToken.create({
		accessToken: token.accessToken,
		accessTokenExpiresAt: token.accessTokenExpiresAt,
		scope: token.scope,
		_id: uuid(),
		clientId: client.id,
		userId: user.id,
	});

	if (token.refreshToken) {
		await OAuthRefreshToken.create({
			refreshToken: token.refreshToken,
			refreshTokenExpiresAt: token.refreshTokenExpiresAt,
			scope: token.scope,
			_id: uuid(),
			clientId: client.id,
			userId: user.id,
		});
	}

	return {
		accessToken: token.accessToken,
		accessTokenExpiresAt: token.accessTokenExpiresAt,
		refreshToken: token?.refreshToken,
		refreshTokenExpiresAt: token?.refreshTokenExpiresAt,
		scope: token.scope,
		client: { id: client.id },
		user: { id: user.id },
	};
};

export const getAccessToken = async (
	accessToken: string,
): Promise<{
	accessToken: string;
	accessTokenExpiresAt: Date;
	scope: string;
	client: {
		id: string;
	};
	user: {
		id: string;
	};
}> => {
	const token = await OAuthAccessToken.findOne({ accessToken }).lean();
	if (!token) throw new Error("Access token not found");
	return {
		accessToken: token.accessToken,
		accessTokenExpiresAt: token.accessTokenExpiresAt,
		scope: token.scope,
		client: { id: token.clientId },
		user: { id: token.userId },
	};
};

export const getRefreshToken = async (
	refreshToken: string,
): Promise<{
	refreshToken: string;
	refreshTokenExpiresAt: Date;
	scope: string;
	client: {
		id: string;
	};
	user: {
		id: string;
	};
}> => {
	const token = await OAuthRefreshToken.findOne({
		refreshToken,
	}).lean();
	if (!token) throw new Error("Refresh token not found");

	return {
		refreshToken: token.refreshToken,
		refreshTokenExpiresAt: token.refreshTokenExpiresAt, // never expires
		scope: token.scope,
		client: { id: token.clientId },
		user: { id: token.userId },
	};
};
