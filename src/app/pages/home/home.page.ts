import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [IonicModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit() {
    this.currentDate = new Date().toISOString().split('T')[0];
  }

  selectedDate: string | null = null;
  currentDate: string | null = null;
  years: number = 0;
  months: number = 0;
  days: number = 0;

  onBirthDateChange(event: any) {
    this.selectedDate = event.detail.value.split('T')[0];
    this.calculateAge();
  }

  onCurrentDateChange(event: any) {
    const selectedCurrentDate = event.detail.value.split('T')[0];

    // Prevent the current date from being the same as the date of birth
    if (this.selectedDate && selectedCurrentDate === this.selectedDate) {
      alert('Current date cannot be the same as the Date of Birth.');
      return; // Do not update the current date if it overlaps with birthdate
    }

    this.currentDate = selectedCurrentDate; // Set the selected current date
    this.calculateAge(); // Recalculate the age after changing current date
  }

  // Function to calculate age from selected and current dates
  calculateAge() {
    if (this.selectedDate && this.currentDate) {
      const birthDate = new Date(this.selectedDate);
      const today = new Date(this.currentDate);

      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();

      // Adjust for negative month or day difference
      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }
      if (ageDays < 0) {
        ageMonths--;
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          0
        );
        ageDays += lastMonth.getDate(); // Get the number of days in the previous month
      }
      this.years = ageYears;
      this.months = ageMonths;
      this.days = ageDays;
    }
  }
}
