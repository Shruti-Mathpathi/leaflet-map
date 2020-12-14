import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   {
    path:'',
    redirectTo:'marker',
    pathMatch:'full'
  },
  {
    path: 'marker', loadChildren: () => import('./marker/marker.module').then(
      m => m.MarkerModule)
  },
  {
    path: 'polyline', loadChildren: () => import('./polyline/polyline.module').then(
      m => m.PolylineModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
