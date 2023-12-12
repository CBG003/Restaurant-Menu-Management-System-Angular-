// appetizers.component.ts
import { Component, OnInit } from '@angular/core';
import { AppetizerDto } from '../../models/appetizers.interface';
import { AppetizerService } from '../../services/appetizers.service';

@Component({
  selector: 'app-appetizers',
  templateUrl: './appetizers.component.html',
  styleUrls: ['./appetizers.component.css']
})
export class AppetizersComponent implements OnInit {
  appetizers: AppetizerDto[] = [];
  appetizerForm: AppetizerDto = { id: null, name: '', price: null, imageUrl: null };
  isEditing = false;
  imagePreview: string | null = null;

  constructor(private appetizerService: AppetizerService) { }

  ngOnInit(): void {
    this.getAppetizers();
  }

  getAppetizers() {
    this.appetizerService.getAll().subscribe((data: AppetizerDto[]) => {
      this.appetizers = data;
    });
  }

  addAppetizer() {
    console.log('Adding appetizer...'); // Add this line
    this.appetizerService.add(this.appetizerForm).subscribe(() => {
      this.clearForm();
      this.getAppetizers();
    });
  }

  editAppetizer(appetizer: AppetizerDto) {
    this.appetizerForm = { ...appetizer };
    this.isEditing = true;
  }

  updateAppetizer() {
    if (this.appetizerForm.id !== null) {
      this.appetizerService.update(this.appetizerForm.id, this.appetizerForm).subscribe(() => {
        this.clearForm();
        this.isEditing = false;
        this.getAppetizers();
      });
    }
  }

  deleteAppetizer(id: number | null) {
    if (id !== null) {
      this.appetizerService.delete(id).subscribe(() => {
        this.getAppetizers();
      });
    }
  }

  clearForm() {
    this.appetizerForm = { id: null, name: '', price: null, imageUrl: null };
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
        this.appetizerForm.imageUrl = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  }
}
