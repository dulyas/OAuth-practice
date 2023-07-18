import { Schema, model } from "mongoose";

export interface IOAuthAuthorizationCode {
	_id: string;
	authorizationCode: string;
	expiresAt: Date;
	redirectUri: string;
	scope: string;
	clientId: string;
	userId: string;
}

const OAuthAuthorizationCodeSchema = new Schema<IOAuthAuthorizationCode>({
	_id: { type: String, auto: true },
	authorizationCode: { type: String },
	expiresAt: { type: Date },
	redirectUri: { type: String },
	scope: { type: String },
	clientId: { type: String },
	userId: { type: String },
});

export default model<IOAuthAuthorizationCode>(
	"OAuthAuthorizationCodes",
	OAuthAuthorizationCodeSchema,
);
