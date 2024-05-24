"use server"
import { connectToDatabase } from "@/lib/database"
import User, { IUser } from "@/lib/database/model/user.model"
import { revalidatePath } from "next/cache"



/* export const createUser = async({user}:createUserParams)=>{
    try {
        await connectToDatabase();

        const newUser =  await User.create({userId:user.userId ,fullName:user.fullName, username:user.userName, email:user.email});
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error)
    }
} */

/* export async function createUser(user: any) {
    try {
      await connectToDatabase();
      console.log(user)
      const newUser = await User.create(user);
      return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
      console.log(error);
    }
  } */
  
  export  const createUser = async (user: any) => {
    try {
      await connectToDatabase();
  
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  };

/* export const updateUser = async({user}:updateUserParams) =>{
    try {
        await connectToDatabase();
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {...user},
            {new:true}
        );
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error)
    }
}

export const getAllUser = async()=>{
    try {
        await connectToDatabase();
        const users = await User.find();
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        handleError(error)
    }
}
 */
/* export async function getUserById(userId:string){
    try {
        await connectToDatabase();
        const user = await User.findById(userId);
        if(!user) throw new Error("user not found");
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error)
    }
} */