import { textStyles, inputStyles, buttonStyles } from "../styles/styles"
import Layout from "../components/gereral/layout"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig"
import {useAlert} from "@blaumaus/react-alert"
import Button from "../components/gereral/button";
import { useRouter } from "next/router";
import { useState } from "react";
import PasswordRecover from "../components/passwordRecover";

export default function Login () {
    const alert = useAlert()
    const router = useRouter()

    const login = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            router.push("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const mensagens = {
                "auth/invalid-email": "O email inserido é inválido",
                "auth/user-disabled": "O usuário está desabilitado",
                "auth/user-not-found": "O usuário não foi encontrado",
                "auth/wrong-password": "A senha está incorreta"
            }
            alert.error(mensagens[errorCode] || errorMessage)
        });
    }

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [recoverPopUp, setRecoverPopUp] = useState(false)

    return (
        <>
        {recoverPopUp ?
            <PasswordRecover setRecoverPopUp={setRecoverPopUp}/>
         : null}
        <Layout disableBackButton>
        <div className="flex h-full">
            <div className="m-auto flex flex-col gap-5 items-center mt-16">
                <i className="fa-solid fa-bowl-food text-3xl"/>
                <h1 className={textStyles.h1 + " text-center"}>Login</h1>
                <form onSubmit={login} className="flex flex-col gap-3 mt-3">
                    <input type="email" name="email" id="email" className={inputStyles.text}
                    placeholder="Endereço de email" required/>

                    <div className="relative">
                        <input type={passwordVisible ? "text" : "password"} name="password" id="password" className={inputStyles.text}
                        placeholder="Sua senha" required/>
                        <i onClick={() => setPasswordVisible(ps => !ps)} className={`fa-solid
                        ${passwordVisible ? "fa-eye-slash" : "fa-eye"}
                        absolute text-gray-light right-1 top-0.5 text-sm p-2 cursor-pointer`}/>
                    </div>


                    <Button type="submit" style={buttonStyles.primary + " mt-5"}>
                        Entrar
                    </Button>
                    <div onClick={() => setRecoverPopUp(true)}
                    className="text-xs text-center cursor-pointer hover:underline font-medium text-gray-light">
                        Esqueceu sua senha?
                    </div>
                </form>
            </div>
        </div>
        </Layout>
        </>
    )
}