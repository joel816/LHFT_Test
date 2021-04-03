export class Configuration {

    symbols: Array<string>;
    update_frequency_milliseconds: number;
    elements_per_update: number;

    constructor() { }

    setValues(update_frequency_milliseconds?: number, elements_per_update?: number, symbols?: Array<string>) {
        if (update_frequency_milliseconds) {
            this.update_frequency_milliseconds = update_frequency_milliseconds;
        }
        if (elements_per_update) {
            this.elements_per_update = elements_per_update;
        }
        if (symbols) {
            this.symbols = symbols;
        }
    }

}

export class DataElement {

    symbol: string;
    price: number;
    create_time: Date;

}