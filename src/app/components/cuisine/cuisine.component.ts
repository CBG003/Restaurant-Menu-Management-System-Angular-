import { Component, OnInit } from '@angular/core';
import { BurgerDto } from '../../models/burger.interface';
import { BurgerService } from '../../services/burger.service';
import { AppetizerDto } from '../../models/appetizers.interface';
import { AppetizerService } from '../../services/appetizers.service';
import { DishDto } from '../../models/dishes.interface';
import { DishesService } from '../../services/dishes.service';
@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.css']
})
export class CuisineComponent implements OnInit {

  burgers: BurgerDto[] = [];
  appetizers: AppetizerDto[] = [];
  dishes: DishDto[] = [];
  constructor(private burgerService: BurgerService,private appetizerService: AppetizerService,private DishesService: DishesService) { }

  ngOnInit(): void {
    this.getBurgers();
    this.getAppetizers();
    this.getDishes();
  }

  getBurgers() {
    this.burgerService.getAll().subscribe((data: BurgerDto[]) => {
      this.burgers = data;
    });
  }
  getAppetizers() {
    this.appetizerService.getAll().subscribe((data: AppetizerDto[]) => {
      this.appetizers = data;
    });
  }
  getDishes() {
    this.DishesService.getAll().subscribe((data: DishDto[]) => {
      this.dishes = data;
    });
  }
}
