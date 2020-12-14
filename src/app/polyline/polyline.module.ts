import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PolylineComponent } from './polyline.component';
import { PolylineService } from './polyline.service';

export const routes = [
  { path: '', component: PolylineComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeafletModule,
  ],
  declarations: [
    PolylineComponent
  ],
  providers:[PolylineService]
})
export class PolylineModule { }
