import { OAuthClient } from "@/models";

export const getClient = async (
	clientId: string,
	clientSecret: string,
): Promise<{
	id: string;
	grants: ("authorization_code" | "refresh_token")[];
	redirectUris: String[];
}> => {
	const client = await OAuthClient.findOne({
		clientId,
		...(clientSecret && { clientSecret }),
	}).lean();
	if (!client) throw new Error("Client not found");

	return {
		id: client.clientId,
		grants: client.grants,
		redirectUris: [client.callbackUrl],
	};
};
