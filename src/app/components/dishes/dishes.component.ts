import { Component, OnInit } from '@angular/core';
import { DishDto } from '../../models/dishes.interface';
import { DishesService } from '../../services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: DishDto[] = [];
  dishForm: DishDto = { id: null, name: '', price: null, imageUrl: null };
  isEditing = false;
  imagePreview: string | null = null;

  constructor(private DishesService: DishesService) { }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes() {
    this.DishesService.getAll().subscribe((data: DishDto[]) => {
      this.dishes = data;
    });
  }

  addDish() {
    console.log('Adding Dish...'); // Add this line
    this.DishesService.add(this.dishForm).subscribe(() => {
      this.clearForm();
      this.getDishes();
    });
  }
  editDish(burger: DishDto) {
    this.dishForm = { ...burger };
    this.isEditing = true;
  }

  updateDish() {
    if (this.dishForm.id !== null) {
      this.DishesService.update(this.dishForm.id, this.dishForm).subscribe(() => {
        this.clearForm();
        this.isEditing = false;
        this.getDishes();
      });
    }
  }

  deleteDish(id: number | null) {
    if (id !== null) {
      this.DishesService.delete(id).subscribe(() => {
        this.getDishes();
      });
    }
  }

  clearForm() {
    this.dishForm = { id: null, name: '', price: null, imageUrl: null };
    this.isEditing = false;
  }

  handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File | null = (target.files as FileList)[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        this.imagePreview = imageUrl;
        this.dishForm.imageUrl = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  }
}


