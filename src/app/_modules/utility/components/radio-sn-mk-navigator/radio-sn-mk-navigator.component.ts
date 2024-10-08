import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radio-sn-mk-navigator',
  templateUrl: './radio-sn-mk-navigator.component.html',
  styleUrls: ['./radio-sn-mk-navigator.component.css']
})
export class RadioSnMkNavigatorComponent {

  
  radioForm = new FormGroup({
    serialNumber: new FormControl<string>('', { nonNullable: true }),
    model: new FormControl<string>('', { nonNullable: true})
  });

  constructor(
    private router: Router,
  ) { }

  navigateToSerialRadio() {
    if (this.radioForm.valid) {
      const { serialNumber, model } = this.radioForm.value;

      this.router.navigate(['/radio-results', serialNumber, model]);
      this.radioForm.patchValue({
        serialNumber: '',
        model: ''
      });
    }
  };

}
