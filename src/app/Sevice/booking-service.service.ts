import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Booking{
  orderID : string,
  bookingDate : string,
  reservationTime : string,
  numberOfGuests : number,
  nameOfGuest : string,
  phoneNumber : number,
  totalPrice : number,
  deposit : number,
  statusName : string
}
@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7097/api/BookingManagament';

  getall(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

}
