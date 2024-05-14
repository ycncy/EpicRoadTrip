import axios from "axios"

const axiosService = axios.create({
    baseURL: "http://localhost:5001"
})
 
const register = async (data: any) => {

    const response = await axiosService.post("/authentication/register", data);

    if (response.status === 201) {
        return response.data;
    }
    else {
        throw new Error("Failed to register");
    }

}

const login = async (data: any) => {

    const response = await axiosService.post("/authentication/login", data);
    
    if (response.status === 200) {
        return response.data;
    }
    else {
        throw new Error("Failed to login");
    }
}

export const authService = {
    register,
    login
}