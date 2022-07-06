export interface User {
    id: number;
    username: string;
}
// 
export interface TokenUserPayload {
    token: string;
    user: User;
}

export interface Product {
    id: number;
    name: string;
    imagePath: string;
}