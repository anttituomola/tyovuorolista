import InputUnstyled from '@mui/base/InputUnstyled'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import { useState } from 'react'
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"

type Props = {}
const LoginForm = (props: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false)
    const { data: session, status } = useSession()

    const submitHandler = async () => {
        if (isCreatingNewAccount) {
            try {
                const result = await createUser()
                setEmail('')
                setPassword('')
                setIsCreatingNewAccount(false)
            } catch (error) {
                console.log(error)
            }
        } else {
            // Kutsutaan next-authin signIn-funktiota
            try {
                const result = await signIn("credentials", {
                    redirect: false,
                    email: email,
                    password: password
                })
                console.log(result)
                setEmail('')
                setPassword('')
            } catch (error) {
                console.log(error)
            }
        }
    }
    // Tämä funktio soittaa tekemäämme rajapintaan, joka puolestaan soittaa tietokantaan
    const createUser = async () => {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        return data
    }

    return (
        <div>
            {session ? <p>You are logged in</p> : <p>You are not logged in</p>}
            {isCreatingNewAccount ? <h1>Create new account</h1> : <h1>Login</h1>}
            <InputUnstyled value={email} placeholder="Email" type="email" required={true} autoFocus={true} onChange={(event) => setEmail(event?.target.value)} />
            <InputUnstyled value={password} placeholder="Password" type="password" required={true} onChange={(event) => setPassword(event?.target.value)} />
            {isCreatingNewAccount ?
                <ButtonUnstyled onClick={() => submitHandler()}>Create account</ButtonUnstyled> :
                <ButtonUnstyled onClick={() => submitHandler()}>Login</ButtonUnstyled>}
            {isCreatingNewAccount ?
                <p className="toggleSignin" onClick={() => setIsCreatingNewAccount(false)}>Already have account? Sign in instead!</p> :
                <p className="toggleSignin" onClick={() => setIsCreatingNewAccount(true)}>Don&apos;t have an account? Create one!</p>}
        </div>
    )
}
export default LoginForm
