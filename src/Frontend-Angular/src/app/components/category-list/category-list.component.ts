import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ModalService } from '../../helpers/modal.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { displayContentOverview } from '../../helpers/showNoteOverview';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

  categoriesService = inject(CategoriesService);
  modalService = inject(ModalService); 
  router = inject(Router);

  ngOnInit() {
    this.categoriesService.obtainAll();
  }

  categories = computed(() => {
    const categories = this.categoriesService.Categories();
    // Agregar la categoria 'Otras' al final de la lista
    categories.push(categories.shift()!);
    
    return categories.filter(category => {
      if (this.searchTerm().length === 0) return true;
      return (category.name.toLowerCase().includes(this.searchTerm().toLowerCase()));
    });
  });

  selectedCategory = signal<Category | null>(null);

  // Funcion para mostrar una vista previa de la nota
  displayContentOverview = displayContentOverview;

  selectCategory(category: Category) {
    this.selectedCategory.set(category);
  }

  searchTerm = signal<string>('');

  // Señal que guarda el nombre de la categoria que el usuario quiere agregar
  categoryName = signal<string>('');

  updateCategoryName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.categoryName.set(input.value);
  }


  categoryNameValid = computed(() => {
    return this.categoryName().length > 0 && this.categoryName().length < 20;
  })

  uniqueCategoryName = computed(() => {
    return !this.categories().some(category => category.name === this.categoryName());
  })

  updateSearchTerm(value: string | null) {
    this.searchTerm.set(value || '');
  }
  
  openDeleteModal(){
    if( this.selectedCategory() === null) 
      return;
    this.modalService.open('DeleteCategoryModal');
  }

  deleteCategory(){
    if( this.selectedCategory() === null) 
      return;
    this.categoriesService.delete(this.selectedCategory()?.id!);
  }


}
