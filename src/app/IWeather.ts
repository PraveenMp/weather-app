
   export interface IMain {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    }

    export interface IWeather {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

    export interface IClouds {
        all: number;
    }

    export interface IWind {
        speed: number;
        deg: number;
    }

    export interface IRain {
        h: number;
    }

    export interface ISys {
        pod: string;
    }

    export interface IList {
        dt: number;
        main: IMain;
        weather: IWeather[];
        clouds: IClouds;
        wind: IWind;
        rain: IRain;
        sys: ISys;
        dt_txt: string;
    }

    export interface ICoord {
        lat: number;
        lon: number;
    }

    export interface ICity {
        id: number;
        name: string;
        coord: ICoord;
        country: string;
    }

    export interface IWeatherModel {
        cod: string;
        message: number;
        cnt: number;
        list: IList[];
        city: ICity;
    }
