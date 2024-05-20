import axios from "axios";


const axiosService = axios.create({
    baseURL: "http://localhost:5001"
})
const register = async (data: any) => {

    const response = await axiosService.post("/authentication/register", data);

    if (response.status === 201) {
        return response.data;
    }
    else {
        console.log(response);
        throw new Error("Failed to register");
    }

}
const login = async (data: any) => {
    try {
        const response = await axiosService.post("/authentication/login", data);

        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        } else {
            console.log(response);
            throw new Error("Failed to login");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Validation error:", error.response ? error.response.data : error.message);
        } else {
            console.error("Error during login:", error);
        }
        throw error;
    }
};
export const authService = {
    register,
    login
}