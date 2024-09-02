import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

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

    //check the current url id to find existed reservation
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      //load the data
      let reservation = this.reservationService.getReservation(id)
      if (reservation) {
        //pathValue mean that you path all the value 
        //from this reservation to the reservationForm
        this.reservationForm.patchValue(reservation)

      }
    }

  }

  onSubmit() {
    //if the above form is valid
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value

      //we need to identify which action is adding, updating
      let id = this.activatedRoute.snapshot.paramMap.get('id')
      if (id) {
        //update
        this.reservationService.updateReservation(id, reservation)
      } else {
        //add
        this.reservationService.addReservation(reservation)
      }

      this.router.navigate(['/list'])
    }
  }

}
