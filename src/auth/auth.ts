import * as jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model'

export const singToken = async (payload: any) => {
    try {
        const signTokenData = await jwt.sign(payload, 'secreteKey', { expiresIn: '2h' })

        return signTokenData
    } catch (error) {
        console.log({ error })
        return { error }
    }
}

export const verifyToken = async (token: string) => {
    try {
        const validToken = await jwt.verify(token, 'secreteKey');

        return validToken
    } catch (error) {
        console.log({ error })
        return { error }
    }
}


export const verifyUser = async (req: any, res: any, next: any) => {
    try {

        const token = req.headers.authorization;

        const tokenDetails: any = await jwt.decode(token);
        console.log({ tokenDetails })

        const userId = tokenDetails?.id ?? null;

        const userDetails = await userModel.findById(userId).lean()
        console.log({ userDetails })

        if (userId == null) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (userDetails?.role !== 'admin') {
            req['user'] = { email: userDetails?.email, userId: userId, role: 'user' }
            next()
        } else {
            req['user'] = { email: userDetails?.email, role: 'admin', userId: userId }
            next();

        }


    } catch (error) {
        console.log({ error })
        return res.status(500).json({ error: "Unauthtorized request" })
    }
}