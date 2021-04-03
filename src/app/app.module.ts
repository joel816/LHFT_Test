import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurationDialogComponent } from './component/configuration-dialog/configuration-dialog.component'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationDialogComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  entryComponents: [ ConfigurationDialogComponent ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
