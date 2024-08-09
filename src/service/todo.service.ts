import authService from "./auth.service";

const todoService = {
    create: async(data:{content:string, isDone:boolean}, accessToken:string, refreshToken:string) => {
        // verify the token
        const userId = authService.authorize(accessToken, refreshToken)
    }
};

export default todoService;
