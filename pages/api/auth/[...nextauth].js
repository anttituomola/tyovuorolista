import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "/lib/prisma"
import { verifyPassword } from "/lib/auth"
// next-authin sisäänrakennettu funktio
export default NextAuth({
		// Määritellään token-tyypiksi JSON web tokens
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
								// Etsitään tietokannasta käyttäjää vastaavalla emaililla
                const response = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                })
                if (!response) {
                    throw new Error("Could not find user")
                }
								// Validoidaan salasana
                const isValid = await verifyPassword(credentials.password, response.password)
                if (!isValid) {
                    throw new Error("Something wrong with password")
                }
                return {
                    email: response.email,
                }
            }
        })
    ]
})