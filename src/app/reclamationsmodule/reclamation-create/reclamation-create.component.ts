import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { ObjectService } from '../services/object.service'; // optional API service
import { MyApiService } from '../services/my-api.service'; // adjust path as needed

@Component({
  selector: 'app-reclamation-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './reclamation-create.component.html',
 
   styleUrls: ['./reclamation-create.component.scss']
})
export class ReclamationCreateComponent implements OnInit {
  issueForm!: FormGroup;
  descriptionForm!: FormGroup;
  showOtherInput = false;
  todayString: string = '';
  issueTypes: any[]=[];


  constructor(
    private fb: FormBuilder,
    private myApiService: MyApiService
  ) {}

  ngOnInit(): void {
    this.issueForm = this.fb.group({
      object: ['', Validators.required],
      level: ['', Validators.required],
      //creationDate: [{ value: new Date(), disabled: true }],
      creationdate: [{ value: this.formatDateToInput(new Date()), disabled: true }],
      otherDetail: [''] // hidden unless "Other" is selected
    });
    this.descriptionForm = this.fb.group({
      description: ['', Validators.required]
    });

    this.myApiService.getIssueTypes().subscribe(data => {
      this.issueTypes = data;
    });

  }

  // Triggered when the user selects an issue type
  onIssueTypeChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.showOtherInput = selectedValue === 'Other';

    const otherControl = this.issueForm.get('otherDetail');

    if (this.showOtherInput) {
      otherControl?.setValidators([Validators.required]);
    } else {
      otherControl?.clearValidators();
      otherControl?.setValue('');
    }

    otherControl?.updateValueAndValidity();
  }

  // Convert a Date object to a yyyy-MM-dd string
  formatDateToInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // When "Save new object" is clicked (optional behavior)
  onSaveNewObject(): void {
    const customObject = this.issueForm.get('otherDetail')?.value?.trim();

    if (customObject) {
      console.log('Saving new object:', customObject);

      this.myApiService.postData_objets({ corps_objet: customObject }).subscribe({
        next: () => {
          console.log('New object saved!');

          // 🔁 Refresh the dropdown options
          this.myApiService.getIssueTypes().subscribe(data => {
            this.issueTypes = data;

            // ✅ Select the newly added object
            this.issueForm.get('object')?.setValue(customObject);

            // ✅ Hide the "Other" input
            this.showOtherInput = false;
          });
        },
        error: err => console.error('Error saving object', err)
      });
    }
  }

  showDescriptionModal = false;

  onSubmit(): void {
    const formData = this.issueForm.getRawValue();
    console.log(formData)
   const objet33 = this.showOtherInput
      ? this.issueForm.value.otherDetail
      : this.issueForm.value.object;
    // If "Other" selected, use the typed value
    if (this.showOtherInput && formData.otherDetail?.trim()) {
      formData.object = formData.otherDetail.trim();
    }
    // Optional: send it to backend via service
    this.myApiService.postData_reclamation(formData,objet33).subscribe({
      next: () => console.log('New object saved!'),
      error: err => console.error('Error saving object', err)
    });
    this.showDescriptionModal = true;
  }

  closeDescriptionModal(): void {
    this.showDescriptionModal = false;
  }
  submitDescription(): void {
    const formData = this.descriptionForm.getRawValue();
    this.myApiService.postData_Commentaire(formData).subscribe({
        next: () => console.log('New object saved!'),
        error: err => console.error('Error saving object', err)
      });
      console.log('Submitted form:', this.descriptionForm.value);
      // Optional: attach this to your main form, or send it directly to the API
      this.closeDescriptionModal();
    }
}
