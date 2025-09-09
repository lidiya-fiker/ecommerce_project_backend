import { Controller, Get } from '@nestjs/common';
import { paymentSummaryService } from '../service/paymetnSummery.service';

@Controller('payment-summary')
export class paymetnSummaryController {
  constructor(private readonly paymentSummaryService: paymentSummaryService) {}

  @Get()
  async getSummary() {
    return this.paymentSummaryService.getCartSummary();
  }
}
