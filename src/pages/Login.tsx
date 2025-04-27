import {Link} from "react-router-dom";
import styles from "../css/signup.module.css"
import {useState, FormEvent} from "react";
import api from "../services/api.ts";
import {useAuthContext} from "../contexts/AuthContext.tsx";
import axios from "axios";

function Login() {
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuthContext();

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!username) {
            setError("Username is required");
            return
        }
        if (!password) {
            setError("Password is required");
            return
        }

        // Async function to handle logging in
        try{
            const { data } = await api.post("/auth/login/", { username, password });
            login(data)
            setError(null);
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data) {
                    setError(error.response.data.message);
                    console.log(error.response.data);
                } else {
                    setError("An error occurred. Please try again.");
                }
            } else {
                setError("An unknown error occurred.");
                console.error(error);
            }

        }


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <div className={styles.alert}>{error}</div>}

                <div className={styles.formGroup}>
                    <input type="text"
                           placeholder="Username"
                           name={"username"} required
                           onChange={(e) => setUsername(e.target.value)} />
                    <input type="password"
                           placeholder="Password"
                           name={"password1"} required
                           onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button type="submit" className={styles.submit}>Submit</button>
            </form>
            <span className={"dark:text-white"}>Don't have an account? <Link to={"/signup"}>Signup</Link></span>
        </>
    )
}

export default Login;