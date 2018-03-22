import {AfterViewInit, Component, OnDestroy, OnInit, ViewChildren, ElementRef} from '@angular/core';
import {FormBuilder, FormControlName, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {RatingValidator} from '../../shared/rating-validator';
import {Product} from '../product';
import {GenericValidator} from '../../shared/generic-validator';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  private sub: Subscription;
  private product: Product;
  private errorMessage: string;
  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };
  productEditForm: FormGroup;
  displayMessage: { [key: string]: string } = {};

  constructor(private _fb: FormBuilder,
              private productService: ProductService,
              private _route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.productEditForm = this._fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      description: '',
      starRating: ['', RatingValidator.ratingRange(1, 5)]
    });


    this.sub = this._route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getProducts(id);
      }
    );

    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.productEditForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productEditForm);
    });
  }


  public save(): void {
    if (this.productEditForm.dirty && this.productEditForm.valid) {
      // Copy the form values over the product object values
      const p = Object.assign({}, this.product, this.productEditForm.value);
      console.log(p);
      this.productService.saveProduct(p)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.productEditForm.dirty) {
      this.onSaveComplete();
    }
  }

  private getProducts(id: number) {
    this.productService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        this.productEditForm.patchValue({
          productName: product.productName,
          productCode: product.productCode,
          description: product.description,
          starRating: product.starRating
        });
      });
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productEditForm.reset();
    this.router.navigate(['/products']);
  }

}
