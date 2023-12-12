// burger.component.ts
import { Component, OnInit } from '@angular/core';
import { BurgerDto } from '../../models/burger.interface';
import { BurgerService } from '../../services/burger.service';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {
  burgers: BurgerDto[] = [];
  burgerForm: BurgerDto = { id: null, name: '', price: null, imageUrl: null };
  isEditing = false;
  imagePreview: string | null = null;

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.getBurgers();
  }

  getBurgers() {
    this.burgerService.getAll().subscribe((data: BurgerDto[]) => {
      this.burgers = data;
    });
  }

  addBurger() {
    console.log('Adding burger...'); // Add this line
    this.burgerService.add(this.burgerForm).subscribe(() => {
      this.clearForm();
      this.getBurgers();
    });
  }
  editBurger(burger: BurgerDto) {
    this.burgerForm = { ...burger };
    this.isEditing = true;
  }

  updateBurger() {
    if (this.burgerForm.id !== null) {
      this.burgerService.update(this.burgerForm.id, this.burgerForm).subscribe(() => {
        this.clearForm();
        this.isEditing = false;
        this.getBurgers();
      });
    }
  }

  deleteBurger(id: number | null) {
    if (id !== null) {
      this.burgerService.delete(id).subscribe(() => {
        this.getBurgers();
      });
    }
  }

  clearForm() {
    this.burgerForm = { id: null, name: '', price: null, imageUrl: null };
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
        this.burgerForm.imageUrl = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  }
}
