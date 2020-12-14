import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkerComponent } from './marker.component';
import { MarkerService } from './marker.service';
import {MatSelectModule} from '@angular/material/select';

export const routes = [
  { path: '', component:MarkerComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeafletModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
  ],
  declarations: [
    MarkerComponent
  ],
  providers:[MarkerService]
})
export class MarkerModule { }
