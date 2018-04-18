import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Product[]=[];
  filteredProducts: Product[]=[];
  cart: any;
  category: string;
  Subscription: Subscription;

   constructor(
    route: ActivatedRoute,
   private  shoppingCartService: ShoppingCartService,
    productService: ProductService,
    ) { 
  
      productService .getAll().subscribe(products => {
          this.products = products;
          
           

      
    
          route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) : 
        this.products;

    });
  
  });
    

    

  }
  async ngOnInit(){

    this.Subscription =(await this.shoppingCartService.getCart())
    .subscribe(cart => this.cart = cart);

  }
ngonDestroy(){
  this.Subscription.unsubscribe();
}
  
}
