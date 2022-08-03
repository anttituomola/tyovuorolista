import prisma from "/lib/prisma"
import hashPassword from "/lib/auth"


const signupHandler = async (req, res) => {
    const data = req.body
    const { email, password } = data

    // Serveripuolen validointi
    if (!email || !email.includes("@") || !password) {
        return res.status(422).json({
            error: "Valid email and password are required"
        })
    }

    // Check if user already exists
    const userExist = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (userExist) {
        return res.status(422).json({
            error: "User already exists"
        })
    }

    // Luodaan prisman avulla uusi käyttäjä tietokantaan
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    })

    // Vastataan "uusi käyttäjä luotu" vastauksella
    res.status(201).json({
        user: user
    })
}
export default signupHandler