import { Component, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {

    //public forecasts: WeatherForecast[];
    public forecasts: object;

    _querystring: string;
    _http: Http;
    _baseUrl: string;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {

        this._http = http;
        this._baseUrl = baseUrl;
    }

    runQuery() {

        //console.log(this._querystring);
        let body: any = { "queryString": this._querystring };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let response: any;
        
        this._http.post(this._baseUrl + 'api/SampleData/WeatherForecasts', body).subscribe(result => {

            //console.log(result);

            var objec = result.json();

            console.log(JSON.parse(objec)["aggregations"]["2"]["buckets"]);

            this.forecasts = JSON.parse(objec)["aggregations"]["2"]["buckets"];

        }, error => console.error(error));

    }

}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
