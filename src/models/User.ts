import { Schema, model } from "mongoose";

export interface IUser {
	_id: string;
	username: string;
	role: "smart" | "stupid";
}

const UserSchema = new Schema<IUser>({
	username: { type: String },
	role: {
		type: String,
		required: true,
		enum: ["smart", "stupid"],
	},
});

export default model<IUser>("Users", UserSchema);
