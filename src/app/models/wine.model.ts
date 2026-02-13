export type WineType = 'red' | 'white' | 'rose' | 'sparkling' | 'sweet';
export type WineRegion = 'alsace' | 'bordeaux' | 'bourgogne' | 'champagne' | 'loire' | 'rhone' | 'sudouest' | 'autre';

export interface WineBottle {
    id: number;
    name: string;
    domaine: string;
    vintage: number;
    startMaturity: number;
    endMaturity: number;
    region: WineRegion;
    type: WineType;
    foodPairingKeywords: string;
    isFavorite: boolean;
    quantity: number;
}

