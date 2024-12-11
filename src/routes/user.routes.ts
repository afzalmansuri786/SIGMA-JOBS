import express from 'express'
import { createToDoListForUserController, deleteToDoListForUserController, getAllUserController, updateToDoListForUserController, updateUserProfileController, userLoginController, userRegisterController } from '../controller/user.controlller'
import { verifyUser } from '../auth/auth'

export const userRouter = express.Router()

userRouter.post('/register', userRegisterController)
userRouter.post('/login', userLoginController)
userRouter.put('/update/profile', verifyUser, updateUserProfileController)
userRouter.get('/all-users', verifyUser, getAllUserController);

userRouter.post('/to-do/create', verifyUser, createToDoListForUserController)
userRouter.put('/to-do/:id', verifyUser, updateToDoListForUserController)
userRouter.delete('/to-do/:id/:userId', verifyUser, deleteToDoListForUserController)
userRouter.get('/to-do/:id', verifyUser, deleteToDoListForUserController)

