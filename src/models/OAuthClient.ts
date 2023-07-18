import { Schema, model } from "mongoose";

export interface IOAuthClient {
	_id: string;
	userId: string;
	clientId: string;
	clientSecret: string;
	callbackUrl: String;
	grants: ("authorization_code" | "refresh_token")[];
}

const OAuthClientSchema = new Schema<IOAuthClient>({
	_id: { type: String, auto: true },
	userId: { type: String },
	clientId: { type: String },
	clientSecret: { type: String },
	callbackUrl: { type: String },
	grants: {
		type: [String],
		required: true,
		enum: ["authorization_code", "refresh_token"],
	},
});

export default model<IOAuthClient>("OAuthClients", OAuthClientSchema);
