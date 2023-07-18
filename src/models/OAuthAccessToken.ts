import { Schema, model } from "mongoose";

export interface IOAuthAccessToken {
	_id: string;
	accessToken: string;
	accessTokenExpiresAt: Date;
	scope: string;
	clientId: string;
	userId: string;
}

const OAuthAccessTokenSchema = new Schema<IOAuthAccessToken>({
	_id: { type: String },
	accessToken: { type: String },
	accessTokenExpiresAt: { type: Date },
	scope: { type: String }, // not sure if this is needed
	clientId: { type: String },
	userId: { type: String },
});

export default model<IOAuthAccessToken>(
	"OAuthAccessTokens",
	OAuthAccessTokenSchema,
);
