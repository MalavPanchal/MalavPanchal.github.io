import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Product[]=[];
  filteredProducts: Product[]=[];
  cart$: Observable<ShoppingCart>;
  category: string;

   constructor(
    private route: ActivatedRoute,
    private  shoppingCartService: ShoppingCartService,
    private productService: ProductService,
    ) { 
  
  

    

  }
  async ngOnInit(){

    this.cart$ =await this.shoppingCartService.getCart();
    this.populateProduct();
   
    

  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) : 
    this.products;
  }
  private populateProduct(){


    this.productService .getAll().subscribe(products => {
      this.products = products;
      this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
  
     
  
  });
  
  });
  

  }
}
