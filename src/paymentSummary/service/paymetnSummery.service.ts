import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/cart/entity/cartItem.entity';
import { DeliveryOption } from 'src/deliveryOption/entity/deliveryOption.entity';
import { Product } from 'src/product/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class paymentSummaryService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(DeliveryOption)
    private deliveryOptionRepo: Repository<DeliveryOption>,
  ) {}

  async getCartSummary() {
    const cartItems = await this.cartItemRepo.find();

    let totalItems = 0;
    let productCostCents = 0;
    let shippingCostCents = 0;

    for (const item of cartItems) {
      const product = await this.productRepo.findOneBy({ id: item.product.id });
      const deliveryOption = await this.deliveryOptionRepo.findOneBy({
        id: item.deliveryOption.id,
      });

      if (!product || !deliveryOption) continue;

      totalItems += item.quantity;
      productCostCents += product.priceCents * item.quantity;
      shippingCostCents += deliveryOption.priceCents;
    }

    const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
    const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
    const totalCostCents = totalCostBeforeTaxCents + taxCents;

    return {
      totalItems,
      productCostCents,
      shippingCostCents,
      totalCostBeforeTaxCents,
      taxCents,
      totalCostCents,
    };
  }
}
