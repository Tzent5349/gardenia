import { Schema, Document, models, model } from "mongoose";


export interface IUser extends Document {
  userId: string;
  userName: string;
  email: string;
  profilePicture?: string;
  shippingAddress?: string;
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String, },
  reviews: [{ type: Schema.Types.ObjectId, ref:"review" }],
  wishList: [{ type: Schema.Types.ObjectId, ref:"product" }],
  shippingAddress: { type: String, default: '' },
});

const User = models.User || model("User", UserSchema)

export default User;