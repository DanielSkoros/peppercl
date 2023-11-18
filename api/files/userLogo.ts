import path from "node:path";
import { BaseFile } from "./baseFile";

export class UserLogo extends BaseFile{
    user: string | undefined;
    constructor(name: string, user?: string | undefined) {
        super();
        this.name = name;
        if (this.user) {
            this.user = user;
            this.path = path.join(this.path, String(this.user), this.name)
        }
        
    }

    
}