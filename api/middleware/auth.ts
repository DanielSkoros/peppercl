import { JwtPayload, jwtDecode } from "jwt-decode";
import { BlacklistTokenModel } from "../db/models/blacklistToken";

interface JWTAuthPayload extends JwtPayload {
    data?: string
}

export const loginRequiredMiddleware = async (req: { headers: { auth: string; }; }, res: { status: (arg0: number) => {
    json(arg0: { error: string; }): unknown; (): any; new(): any; send: { (): void; new(): any; }; 
}; }, next: () => void) => {
    const token = req.headers.auth;
    const isBlacklisted = await BlacklistTokenModel.findOne({token})
    if (token == 'null' || isBlacklisted) return res.status(401).json({"error": "Please log in"});
    else next();   
}

export const getUserFromToken = (token: string): string | undefined => {
    const decodedToken: JWTAuthPayload = jwtDecode(token)
    return decodedToken.data
}