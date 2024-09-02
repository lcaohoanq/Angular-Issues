import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder, 
    private reservationService: ReservationService) {

  }

  ngOnInit() {
    //must specify exactly the same name as the formControlName in the html file
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });
  }

  onSubmit(){
    //if the above form is valid
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value
      this.reservationService.addReservation(reservation)
    }
  }

}
