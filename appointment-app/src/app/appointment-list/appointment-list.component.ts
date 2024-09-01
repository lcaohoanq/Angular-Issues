import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
 
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
  
    alert(this.appointments.length)

  }
}
