export interface Article {
    $key: string;
    libelle: string;
    shortTag: string;
    quantity: number;
    [key: string]: any;
}
