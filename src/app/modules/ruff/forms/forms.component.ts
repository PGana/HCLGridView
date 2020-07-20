import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  fg: FormGroup;
  fControlName: FormControl;
  skills: any;
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.formControlInit();
    this.formGroupInit();
  }



  /** ---------------------------------------------
   * Form Control : Example
   * @param val Form Control value
   */

  /// FC init
  formControlInit() {
    this.fControlName = new FormControl('Gana', [Validators.required, Validators.email]);
    this.fg = this.fb.group({});
  }
  /// On Submi
  onFormControlSubmit(val: FormControl) {
    if (val && val.valid) {
      console.log('Form Control Value: ', val.value);
    } else {
      console.log('Form Not valid');
    }
    /// ...End FC
  }


  /** ----------------------------------------
   *  Form Group : Example
   * @param val Form Control value
   */

  /// FG Init
  formGroupInit() {
    this.fg = new FormGroup(
      {
        name: new FormControl('Tharun', [Validators.required]),
        age: new FormControl(28, [Validators.required]),
        skills: new FormArray(
          [
            new FormControl()

          ]
        )

      });
    this.skills = this.fg.get('skills') as FormArray;
  }

  /// Add New formArray
  onAddSkill() {
    this.skills.push(new FormControl());
  }

  /// FG Submit
  onFormGroupSubmit(val: FormGroup) {
    if (val) {
      console.log('Form Group Val: ', JSON.stringify(val.value));
    } else {
      console.log('Form group Invalid');
    }
  }


}
