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
    fabricant: string;
    categorie: string;
    longueur: string;
    diametre: string;
    taille: string;
    composition: string;
    norme: string;
    image: string;
}