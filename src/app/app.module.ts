
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CuisineComponent } from './components/cuisine/cuisine.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TitreComponent } from './components/titre/titre.component';
import { LoginComponent } from './contact/login/login.component';
import { RegisterComponent } from './contact/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BurgerComponent } from './components/burger/burger.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { AppetizersComponent } from './components/appetizers/appetizers.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CuisineComponent,
    BurgerComponent,
    LoginComponent,
    RegisterComponent,
    TitreComponent,
    DishesComponent,
    AppetizersComponent,
    AboutUsComponent,

  ],
  imports:[
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: CuisineComponent},
      { path: 'burger', component: BurgerComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'appetizers', component:AppetizersComponent},
      { path: 'dishes', component:DishesComponent},
      { path: 'about-us', component:AboutUsComponent},
  ])],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
