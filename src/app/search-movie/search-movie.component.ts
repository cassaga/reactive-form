import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  templateUrl: './search-movie.component.html',
  selector: 'app-search-movie',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent {

  searchForm: FormGroup;
  minYear = 1900;
  maxYear = new Date().getFullYear();
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      infos: this.formBuilder.group({
        id: [''],
        title: ['']
      }, {
        validator: this.isRequiredValidator('title', 'id')
      }),
      type: ["film"],
      releaseYear: ['', [Validators.required, this.rangeDateValidator(this.minYear, this.maxYear)]],
      sheet: [''],
      episodeNumber: [''],
      plateformStream : [''],
    });

    this.searchForm.patchValue({ sheet: 'courte' });
  }

  submit() {
    this.isSubmitted = true;
    const model = this.searchForm.value;
    console.log(JSON.stringify(model));
  }

  isRequiredValidator(title: string, id: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const idControl = control.get(id);
      const titleControl = control.get(title);

      if (idControl?.value && titleControl?.value) {
        return null;
      }

      return { 'isRequired': true };
    };
  }

  rangeDateValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const triggerYear = control.value;
      if (triggerYear >= min && triggerYear <= max) {
        return null;
      }
      return { 'min': { min, max } };
    };
  }
}
