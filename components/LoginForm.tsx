import InputUnstyled from '@mui/base/InputUnstyled'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import { ChangeEvent, useState } from 'react'

type Props = {}
const LoginForm = (props: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false)

    const submitHandler = async () => {
        if (isCreatingNewAccount && email && password) {
          try {
            const result = await createUser()
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
            {isCreatingNewAccount ? <h1>Create new account</h1> : <h1>Login</h1>}
            <InputUnstyled type="email" onChange={(event) => setEmail(event?.target.value)} />
            <InputUnstyled type="password" onChange={(event) => setPassword(event?.target.value)} />
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
