interface IWeather {
    coord: {
      lon: string;
      lat: string;
    };
    weather: [
      {
        id: number;
        main: "";
        description: "";
        icon: "04n";
      }
    ];
    base: "stations";
    main: {
      temp: 0.12;
      feels_like: -5.51;
      temp_min: -1.11;
      temp_max: 1.11;
      pressure: 1018;
      humidity: 44;
    };
    visibility: 10000;
    wind: {
      speed: 3.6;
      deg: 60;
    };
    clouds: {
      all: 90;
    };
    dt: 1611656647;
    sys: {
      type: 1;
      id: 5141;
      country: "US";
      sunrise: 1611663063;
      sunset: 1611698757;
    };
    timezone: number;
    id: number;
    name: "New York";
    cod: 200;
  }

export default IWeather;