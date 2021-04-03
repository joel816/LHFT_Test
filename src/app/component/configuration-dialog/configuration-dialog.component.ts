import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Configuration } from 'src/app/model/interface.model';

@Component({
  selector: 'app-configuration-dialog',
  templateUrl: './configuration-dialog.component.html',
  styleUrls: ['./configuration-dialog.component.scss']
})
export class ConfigurationDialogComponent implements OnInit {

  config: Configuration = new Configuration();

  constructor(
    public dialogRef: MatDialogRef<ConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.config.setValues(data.config.update_frequency_milliseconds, data.config.elements_per_update, data.config.symbols);
  }

  ngOnInit() { }

  cancel(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.dialogRef.close(this.config);
  }

}
