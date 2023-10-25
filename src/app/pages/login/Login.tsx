import { useEffect, useState, useMemo, useCallback } from "react";
import { InputLogin } from "./components/InputLogin";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        console.log(email)
    }, [email]);

    useEffect(() => {
        console.log(password)
    }, [password]);

    const emailLength = useMemo(() => {
        console.log("executado");
        return email.length * 1000;
    }, [email.length]);

    const handleLogin = useCallback(() => {
        console.log(email);
        console.log(password);
    }, [email, password])

    return(
        <div>
            <form>
                <p>Quantidade de caracteres do email: {emailLength}</p>
                
                <InputLogin 
                    label="Email" 
                    value={email} 
                    onChange={newValue => setEmail(newValue)}
                />

                <InputLogin 
                    label="Senha" 
                    type="password"
                    value={password} 
                    onChange={newValue => setPassword(newValue)}
                />

                <button 
                    type="button" 
                    onClick={handleLogin}
                >
                    Entrar
                </button>

            </form>
        </div>
    );
};