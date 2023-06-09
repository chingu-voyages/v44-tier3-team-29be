import passport from 'passport'
import passportJWT, { StrategyOptions } from 'passport-jwt'
import { UserModel } from '../models/UserSchema'
import { IUser } from '../models/contracts/IUser'
import { config } from 'dotenv'

const jwtOptions: StrategyOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_ACCESS_KEY
}

passport.use(
  new passportJWT.Strategy(jwtOptions, async (payload, done) => {
    // Check if the user exists
    const user = await UserModel.findOne({ _id: payload.id })
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  })
)

export default passport
