import axios from "axios";
import { useAppContext } from "../Context/CredentialsContext";

const [credentials, setCredentials] = useAppContext();

export const useRegisterClient = (clientData) => {
    e.preventDefault()
        setIsLoading(true)

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${id}`,
        headers: {
            'Authorization': ` Bearer ${credentials.token}}`
        },
        data: clientData
    };

    axios.request(config)
        .then((response) => {
            setIsEditing(false)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error);
        });
}