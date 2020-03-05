export interface Animal {
    id?: number;
    nom?: string;
    type?: string;
    proprietaire?: Personne;
}

export interface Personne {
    id?: number;
    nom?: string;
    prenom?: string;
    age?: string;
    animaux?: Array<Animal>;
}
