import jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwtSign=(user)=>{
    const token  = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

    return token
}

export default jwtSign