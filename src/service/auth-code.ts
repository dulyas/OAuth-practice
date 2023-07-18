import { v4 as uuid } from "uuid";
import OAuthAuthorizationCode, {
	IOAuthAuthorizationCode,
} from "@/models/OAuthAuthorizationCode";
import { IUser } from "@/models/User";
import { IOAuthClient } from "@/models/OAuthClient";

export const saveAuthorizationCode = async (
	code: IOAuthAuthorizationCode,
	client: {
		id: string;
	},
	user: IUser,
): Promise<{
	authorizationCode: string;
	expiresAt: Date;
	redirectUri: string;
	scope: string;
	clientId: string;
	userId: string;
}> => {
	const authorizationCode = {
		authorizationCode: code.authorizationCode,
		expiresAt: code.expiresAt,
		redirectUri: code.redirectUri,
		scope: code.scope,
		clientId: client.id,
		userId: user._id,
	};

	await OAuthAuthorizationCode.create({
		_id: uuid(),
		...authorizationCode,
	});
	return authorizationCode;
};

export const getAuthorizationCode = async (
	authorizationCode: string,
): Promise<{
	code: string;
	expiresAt: Date;
	redirectUri: string;
	scope: string;
	client: {
		id: string;
	};
	user: {
		id: string;
	};
}> => {
	const code = await OAuthAuthorizationCode.findOne({
		authorizationCode,
	}).lean();
	if (!code) throw new Error("Authorization code not found");
	return {
		code: code.authorizationCode,
		expiresAt: code.expiresAt,
		redirectUri: code.redirectUri,
		scope: code.scope,
		client: { id: code.clientId },
		user: { id: code.userId },
	};
};

export const revokeAuthorizationCode = async ({
	code,
}: {
	code: string;
}): Promise<boolean> => {
	const res = await OAuthAuthorizationCode.deleteOne({
		authorizationCode: code,
	});
	return res.deletedCount === 1;
};
