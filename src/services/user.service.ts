import mongoose from "mongoose";
import { singToken } from "../auth/auth";
import { todoListModel } from "../models/to-list.model";
import { userModel } from "../models/user.model";

try { } catch (error) {
    console.log({ error })
}

export const userRegister = async (userInput: { email: string, password: string, phonNo: number, role: string }) => {
    try {
        const userRole = userInput?.role === 'admin' ? 'Admin' : 'User'
        if (!userInput?.email || !userInput?.password) {
            throw new Error("Unable to register user")
        }
        const userCreate = await userModel.create({
            ...userInput
        })

        await userCreate.save();

        return { message: `${userRole} registered successfully` }
    } catch (error) {
        console.log({ error })
        throw new Error("Unable to register user.")
    }

}

export const userLogin = async (userInput: { email: string, password: string }) => {
    try {
        const findsUser = await userModel.findOne({
            email: userInput?.email
        }).lean()

        if (findsUser) {
            if (userInput?.password === findsUser.password) {
                const token = await singToken({ id: findsUser?._id })
                return {
                    message: "Login successfull",
                    user: token
                }
            } else {
                throw new Error("Password invalid")
            }
        }



    } catch (error) {
        console.log({ error })
        throw new Error("Error in login")
    }
}


export const updateUserProfile = async (email: string, userUpdateInput: { password: string, phonNo: number }) => {
    try {

        const updateUserDetails = await userModel.findOneAndUpdate({
            email
        },
            userUpdateInput,
            {
                new: true
            }
        )

        if (!updateUserDetails) {
            throw new Error("User updation failed")
        }

        return {
            message: "User profile update successfully"
        }
    } catch (error) {
        console.log({ error })
        throw new Error("User updation failed")
    }
}



export const getAllUser = async (userInput: { search?: string }) => {
    try {

        let query: any = {};

        if (userInput?.search !== null && userInput?.search !== undefined) {
            query = {
                email: { $regexp: userInput?.search, $options: 'i' }
            }
        }
        const findUsers = await userModel.find(query).sort({
            createdAt: -1
        });

        return {
            message: 'success',
            users: findUsers
        }
    } catch (error) {
        console.log({ error })
        throw new Error('Error in fethcing users')
    }
}

export const createToDoListForUser = async (userInput: { title: string, description: string, userId: string }) => {
    try {
        const createToDoList = await todoListModel.create({
            ...userInput,
            user: userInput?.userId
        })

        await createToDoList.save()

        return {
            message: "ToDoList created successfully"
        }
    } catch (error) {
        console.log({ error })
        throw new Error("Error in task creation")
    }
}

export const updateToDoListForUser = async (userInput: { id: string, title?: string, description?: string, userId?: string }) => {
    try {
        const userId = userInput?.userId || '';
        delete userInput.userId;

        const findTask = await todoListModel.findById(new mongoose.Types.ObjectId(userInput.id)).lean();
        console.log({ findTask })

        if (findTask?.user.toString() !== userId) {
            throw new Error("You are not owner of this todo list")
        }

        const updateToDoList = await todoListModel.findByIdAndUpdate(new mongoose.Types.ObjectId(userInput?.id), userInput)

        if (!updateToDoList) {
            throw new Error("Update task failed")
        }
        return {
            message: "ToDoList update successfully"
        }
    } catch (error) {
        console.log({ error })
        throw new Error("Error in task updation")
    }
}

export const deleteToDoListForUser = async (id: string, userId: string) => {
    try {
        const findTask = await todoListModel.findOne({ _id: new mongoose.Types.ObjectId(id), user: new mongoose.Types.ObjectId(userId) }).lean();

        if (!findTask) {
            throw new Error("You are not owner of this todo list")
        }
        const deleteToDoList = await todoListModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

        if (!deleteToDoList) {
            throw new Error("Delete task failed")
        }
        return {
            message: "ToDoList deleted successfully"
        }
    } catch (error) {
        console.log({ error })
        throw new Error("Error in task deletion")
    }
}

export const getToDoListForUserById = async (id: string) => {
    try {
        const findTask = await todoListModel.findOne(new mongoose.Types.ObjectId(id));

        if (!findTask) {
            throw new Error("Task not found")
        }
        return {
            message: "Success",
            findTask
        }
    } catch (error) {
        console.log({ error })
        throw new Error("Error in task fetching")
    }
}
