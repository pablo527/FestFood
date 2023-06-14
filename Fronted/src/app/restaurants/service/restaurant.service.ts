import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantResponse } from '../interface/restaurant.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { VoteResponse } from '../interface/valueVote.interface';

@Injectable({ providedIn: 'root' })
export class RestaurantService {

    private baseUrl = environment.baseUrl;
    constructor(private httpClient: HttpClient) { }

    getRestaurant(): Observable<RestaurantResponse[]> {
        return this.httpClient.get<RestaurantResponse[]>(`${this.baseUrl}/api/restaurants`)
    }

    getRestaurantById(id: string): Observable<RestaurantResponse | undefined> {
        return this.httpClient.get<RestaurantResponse>(`${this.baseUrl}/api/restaurants/${id}`)
            .pipe(
                catchError(error => of(undefined)
                ))
    }
    
    getSuggestions(query : string) : Observable<RestaurantResponse[]> {
        return this.httpClient.get<RestaurantResponse[]>(`${this.baseUrl}/api/restaurants/?q=${query}&_limit=9`);
    }

    sendData(personName: string, personCel: string, rest: any, ratingValue: number): Observable<string[]> {
        console.log('sendData', personName, personCel, rest, ratingValue);
        const id = rest.id;
        const data = { personName, personCel, restId: id, ratingValue };
        const url = `${this.baseUrl}/api/vote/${id}/`;
        return this.httpClient.post<string[]>(url, data)
    }


}