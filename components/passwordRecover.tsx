import { buttonStyles, inputStyles, textStyles } from "../styles/styles";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAlert } from "@blaumaus/react-alert";
import { auth } from "../utils/firebaseConfig";
import Button from "./gereral/button";

export default function PasswordRecover ({ setRecoverPopUp }) {
    const alert = useAlert()

    const onSubmit = (e) => {
        e.preventDefault()

        const email = e.target.email.value
        sendPasswordResetEmail(auth, email).then(() => {
            alert.success("Email enviado com sucesso")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const mensagens = {
                "auth/invalid-email": "O email inserido é inválido",
                "auth/user-disabled": "O usuário está desabilitado",
                "auth/user-not-found": "O usuário não foi encontrado",
            }
            alert.error(mensagens[errorCode] || errorMessage)
        })
    }

    return (
        <div className="absolute h-screen w-screen bg-black/40 flex z-10">
            <div className="rounded-lg lg:px-16 px-10 lg:w-fit
             w-full py-12 bg-white m-auto relative">
                <i onClick={() => setRecoverPopUp(false)} className="fa-solid fa-times absolute right-4 top-4 cursor-pointer"/>
                <h1 className={textStyles.h1}>Recuperar senha</h1>
                <p className="text-sm text-gray">Digite seu email para recuperar sua senha</p>
                <form onSubmit={onSubmit} className="mt-4">
                    <input type="email" name="email" id="email"
                    placeholder="Endereço de email" className={inputStyles.text}/>
                    <Button type="submit" style={buttonStyles.primary + " mt-3"}>
                        Enviar email
                    </Button>
                </form>
            </div>
        </div>
    )
}