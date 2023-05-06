import { Request, Response } from 'express'
import { UserModel, UserInfoModel } from '../models/UserSchema'
import { hash } from 'bcrypt'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    // Hashing password
    hash(password, 10, (err, hash) => {
        
        if (err) throw new Error('Error while hashing password')

        //save to db
        const user = UserModel.create({
            email, password: hash
        })

        //response will be changed when discussed with the team
        res.status(200).json({
            message: 'User created successfully',
        })

    })
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    
}