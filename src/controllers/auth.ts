import { Request, Response } from 'express'
import { UserModel, UserInfoModel } from '../models/UserSchema'
import { hash } from 'bcrypt'
import { validate } from '../libs/Validation'
import { RULES } from '../libs/Rules'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, confirm_password } = req.body

    //validation
    const emailRequired = validate("E-mail Address", RULES.REQUIRED, {
        value: email
    })
    
    if(!emailRequired.success) {
        res.status(400).json(emailRequired)
        return;
    }

    const passwordRequred = validate("Password", RULES.REQUIRED, {
        value: password
    })

    if(!passwordRequred.success) {
        res.status(400).json(passwordRequred)
        return;
    }

    const confirmPasswordRequred = validate("Confirm Password", RULES.REQUIRED, {
        value: confirm_password
    })

    if(!confirmPasswordRequred.success) {
        res.status(400).json(confirmPasswordRequred)
        return;
    }

    const emailValid = validate("E-mail Address", RULES.EMAIL, {
        value: email
    })

    if(!emailValid.success) {
        res.status(400).json(emailValid)
        return;
    }

    const passwordLength = validate("Password", RULES.PASSWORD_MIN_LENGTH, {
        value: password,
        min: "8"
    })

    if(!passwordLength.success) {
        res.status(400).json(passwordLength)
        return;
    }

    const passwordIdentical = validate("Password", RULES.IDENTICAL, {
        value: password,
        otherfield: "Confirm Password",
        othervalue: confirm_password
    })

    if(!passwordIdentical.success) {
        res.status(400).json(passwordIdentical)
        return;
    }

    // Hashing password
    const hashed_password = await hash(password, 10)


    if (!hashed_password) throw new Error('Error while hashing password')

    //check if there is identical email
    

    //save to db
    await UserModel.create({
        email, password: hashed_password
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    })


    //response will be changed when discussed with the team
    res.status(200).json({
        message: 'User created successfully',
        success: true
    })
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    
    const {email, password} = req.body;


}