import { useEffect, useState, useMemo, useCallback, useRef } from "react";

import { useLoggedUser } from "../../shared/hooks/UseLoggedUser";
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";

export const Login = () => {
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const {userName} = useLoggedUser();

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
                
                <p>{userName}</p>
                
                <InputLogin 
                    label="Email" 
                    value={email} 
                    onChange={newValue => setEmail(newValue)}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                />

                <InputLogin 
                    label="Senha" 
                    type="password"
                    value={password}
                    ref={inputPasswordRef} 
                    onChange={newValue => setPassword(newValue)}
                />

                <ButtonLogin type="button" onClick={handleLogin}>Entrar</ButtonLogin>
            </form>
        </div>
    );
};