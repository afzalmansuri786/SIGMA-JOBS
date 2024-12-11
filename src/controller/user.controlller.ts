import { createToDoListForUser, deleteToDoListForUser, getAllUser, getToDoListForUserById, updateToDoListForUser, updateUserProfile, userLogin, userRegister } from "../services/user.service"


export const userRegisterController = async (req: any, res: any) => {
    try {
        const { email, password, phonNo, role } = req.body;
        const data = await userRegister({ email, password, phonNo, role })

        res.status(201).json({ data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
export const userLoginController = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const data = await userLogin({ email, password })

        res.status(201).json({ data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const updateUserProfileController = async (req: any, res: any) => {
    try {
        const { email, password, phonNo
        } = req.body;
        const data = await updateUserProfile(email, { password, phonNo })

        res.status(301).json({ data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getAllUserController = async (req: any, res: any) => {
    try {

        const user = req.user ?? null;
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden" })
        }
        const { search
        } = req.query;
        const data = await getAllUser({ search })

        res.status(201).json({ data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const createToDoListForUserController = async (req: any, res: any) => {
    try {
        const user = req.user ?? null;
        if (user.role !== 'user') {
            return res.status(403).json({ message: "Forbidden" })
        }
        const { title, description } = req.body;
        const data = await createToDoListForUser({ title, description, userId: user.userId })

        res.status(201).json({ data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const updateToDoListForUserController = async (req: any, res: any) => {
    try {
        const user = req.user ?? null;
        if (user.role !== 'user') {
            return res.status(403).json({ message: "Forbidden" })
        }
        const { id } = req.params;
        const { title, description, userId } = req.body;
        const data = await updateToDoListForUser({ id, title, description, userId: user?.userId })

        res.status(201).json({ data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const deleteToDoListForUserController = async (req: any, res: any) => {
    try {
        const user = req.user ?? null;
        if (user.role !== 'user') {
            return res.status(403).json({ message: "Forbidden" })
        }
        const { id, userId } = req.params;
        const data = await deleteToDoListForUser(id, user?.userId)

        res.status(201).json({ data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }

}

export const getToDoListForUserByIdController = async (req: any, res: any) => {
    try {
        const user = req.user ?? null;
        if (user.role !== 'user') {
            return res.status(403).json({ message: "Forbidden" })
        }
        const { id } = req.params;
        const data = await getToDoListForUserById(id)

        res.status(201).json({ data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}