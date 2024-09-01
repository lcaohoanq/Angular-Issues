import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
 
  newAppointmentTitle: string = ""
  newAppointmentDate: Date = new Date()

  appointments: Appointment[] = []
  
  // id = 0;

  addAppointment(){

    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }

      this.appointments.push(newAppointment)
    }

    //reset the form visualization
    this.newAppointmentTitle = ""
    this.newAppointmentDate = new Date()
    
    // this.appointments.push({
    //   "id": this.id++,
    //   "title": this.newAppointmentTitle,
    //   "date": this.newAppointmentDate
    // })

    localStorage.setItem("appointments", JSON.stringify(this.appointments));

  }

  deleteAppointment(index: number){
    this.appointments.splice(index, 1)
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments")
  
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

}
 