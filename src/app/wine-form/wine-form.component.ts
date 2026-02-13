import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WineBottle } from '../models/wine.model';

@Component({
  selector: 'app-wine-form',
  templateUrl: './wine-form.component.html'
})
export class WineFormComponent implements OnInit, OnChanges {
  @Input() wine: WineBottle | null = null;
  @Input() isEditMode: boolean = false;

  @Output() onSave = new EventEmitter<WineBottle>();
  @Output() onCancel = new EventEmitter<void>();

  wineForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.wineForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      domain: ['', Validators.required],
      vintage: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      region: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      color: ['Rouge']
    });
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wine'] && this.wine) {
      this.wineForm.patchValue(this.wine);
    }
  }

  submit(): void {
    if (this.wineForm.valid) {
      this.onSave.emit(this.wineForm.value);
      this.wineForm.reset({ quantity: 1, color: 'Rouge' });
    }
  }

  cancel(): void {
    this.onCancel.emit();
    this.wineForm.reset();
  }
}