import { Schema, model } from "mongoose";

export interface IOAuthRefreshToken {
	_id: string;
	refreshToken: string;
	refreshTokenExpiresAt: Date;
	scope: string;
	clientId: string;
	userId: string;
}

const OAuthRefreshTokenSchema = new Schema<IOAuthRefreshToken>({
	_id: { type: String },
	refreshToken: { type: String },
	refreshTokenExpiresAt: { type: Date },
	scope: { type: String }, // not sure if this is needed
	clientId: { type: String },
	userId: { type: String },
});

export default model<IOAuthRefreshToken>(
	"OAuthRefreshTokens",
	OAuthRefreshTokenSchema,
);
