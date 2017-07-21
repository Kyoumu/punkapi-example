//@flow
interface Volume {
    value: number;
    unit: string
}

export default class Beer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: Volume;
    boil_volume: Volume;
    method: any;
    ingredients: any;
    food_pairing: Array<string>;
    brewers_tips: string;
    contributed_by: string;

    constructor(params: any) {
        for (let name: string in params) {
            (this: Object)[name] = params[name];
        }
    }

    getFormattedABV() {
        return (Math.round(this.abv*100) / 100) + '%';
    }

    getFormatedVolume() {
        if (this.volume) {
            if (this.volume.unit === 'liters') {
                return Math.round(this.volume.value) + 'l';
            }
        }

        return '?';
    }
}