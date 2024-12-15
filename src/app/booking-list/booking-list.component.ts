import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Booking, BookingServiceService } from '../Sevice/booking-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { jsDocComment } from '@angular/compiler';
export interface Status {
  paymentStatusID: string,
  paymentStatusName: string,
}
export interface updateStatusModel {
  orderID: string,
  statusID: string
}
@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss'
})

export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  bookingStatuses: Status[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  selectedStatus: string = ''

  constructor(private bookingService: BookingServiceService, private http: HttpClient) { }
  getStatuses() {
    this.http.get("https://localhost:7097/api/PaymentStatus").subscribe((res: any) => {
      this.bookingStatuses = res.$values
    })
  }
  ngOnInit() {
    this.getBookings();
    this.getStatuses();
  }

  getBookings() {
    this.bookingService.getall().subscribe((res: any) => {
      this.bookings = res.$values;
    });
  }

  searchBookings() {

  }

  resetSearch() {
    this.searchTerm = '';
    this.getBookings();
  }
  urlToPutStatus: string = "https://localhost:7097/api/BookingManagament/update-status/";

  updateBookingStatus(orderId: string, statusId: string) {
    const updateStatus: updateStatusModel = {
      orderID: orderId,
      statusID: statusId
    }

    this.http.put(this.urlToPutStatus, updateStatus).subscribe((res: any) => {
      alert("cập nhập thành công")
      this.getBookings()
    })

  }

  deleteBooking(booking: Booking) {
  }
}
