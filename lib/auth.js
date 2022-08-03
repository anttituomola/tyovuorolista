import { hash } from "bcryptjs"
const hashPassword = async (password) => {
    const salt = await hash(password, 12)
    return salt
}
export default hashPassword