import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {GridmoviesComponent} from "./gridmovies/gridmovies.component";
import {AddmovieComponent} from "./addmovie/addmovie.component";
import {ListmoviesComponent} from "./listmovies/listmovies.component";
import {MoviepageComponent} from "./moviepage/moviepage.component";
import {ListgenresComponent} from "./listgenres/listgenres.component";
import { CreateAccount } from './usermanagementmodule/pages/create-account/create-account';
import { AdminUserManagement } from './usermanagementmodule/pages/UserManagement/admin-user-management/admin-user-management';
import { AddUser } from './usermanagementmodule/pages/UserManagement/add-user/add-user';
import { EditUser } from './usermanagementmodule/pages/UserManagement/edit-user/edit-user';
import { UserProfile } from './usermanagementmodule/pages/user-profile/user-profile';
import { Login } from './usermanagementmodule/pages/login/login';
import { ReclamationCreateComponent } from './reclamationsmodule/reclamation-create/reclamation-create.component';
import { ReclamationDetailUserComponent } from './reclamationsmodule/reclamation-detail-user/reclamation-detail-user.component';
import { ReclamationDetailComponent } from './reclamationsmodule/reclamation-detail/reclamation-detail.component';
import { ReclamationHomeComponent } from './reclamationsmodule/reclamation-home/reclamation-home.component';
import { BookingComponent } from './roomsmodule/booking/booking.component';
import { CreateRoomComponent } from './roomsmodule/create-room/create-room.component';
import { DashboardComponent } from './roomsmodule/dashboard/dashboard.component';
import { RoomsAdminDashboardComponent } from './roomsmodule/rooms-admin-dashboard/rooms-admin-dashboard.component';
import { SuccessComponent } from './roomsmodule/success/success.component';

const routes: Routes = [
 { path: 'reclamationHome', component: ReclamationHomeComponent },
  { path: 'reclamationDetails', component: ReclamationDetailComponent },
  { path: 'reclamationCreate', component: ReclamationCreateComponent },
  { path: 'reclamation-detail/:id', component: ReclamationDetailComponent },
  { path: 'reclamation-user-detail/:id', component: ReclamationDetailUserComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'addmovie', component: AddmovieComponent },
  { path: 'listmovies', component: ListmoviesComponent },
  { path: 'gridmovies', component: GridmoviesComponent },
  { path: 'movie/:id', component: MoviepageComponent },
  { path: 'listgenres', component: ListgenresComponent },
 
   { path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: Login },
  { path: 'CreateAccount', component: CreateAccount } ,  
{ path: 'admin/users', component: AdminUserManagement },
{ path: 'admin/users/adduser', component: AddUser },
{ path: 'edit-user/:id', component: EditUser },
{ path: 'profile', component: UserProfile },
  // <- Modifié ici
  
    { path: 'booking/:id', component: BookingComponent },
        { path: 'createRoom', component: CreateRoomComponent },
        { path: 'success', component: SuccessComponent },
        { path: 'dashboard', component: DashboardComponent , children : [ 
                { path: 'RoomDashboard', component: RoomsAdminDashboardComponent },

        ] },
         { path: '**', component: Login },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
