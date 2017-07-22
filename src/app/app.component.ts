import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import { IWeatherModel, IList } from './Iweather';

export class WeatherModel {
  constructor(
    public city: string,
  ) { }

}
export interface IWeather {
  city: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  public model: WeatherModel;
  public weather: IWeatherModel;
  constructor(private http: Http) {
  }
  ngOnInit() {
    this.model = new WeatherModel('');
    // this.getDataFromLocal().subscribe(result => {
    //   this.weather = result;
    // });
  }
  onSubmit() {
    this.getWeatherDetailService(this.model.city).subscribe(result => {
      const currentTime = Math.round(new Date().getTime() / 1000);
      result.list = result.list.filter((res: IList) => res.dt > currentTime );
      this.weather = result;
      console.log(this.weather);
    });
  }

  getWeatherDetailService(city: string, units = 'metric'): Observable<IWeatherModel> {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const appid = '1ca57754955adb45edc2b8a855684429';
     const url = `${baseUrl}?appid=${appid}&q=${city}&units=${units}`;
    return this.http.request(new Request({ method: RequestMethod.Get, url: url }))
      .map((res: Response) => {
        if (res.status === 204) { return null; }
        return res.json();
      })
      .catch(err => {
        console.log('Error');
        return 'error'; // this.handleError(err, url, this.http, this.settings);
      });
  }

  getDataFromLocal(): Observable<IWeatherModel> {
      return this.http.request(new Request({
        url: './assets/data.json',
        method: 'Get'
      })).map((res: Response) => {
        return res.json();
      })
  }
}
