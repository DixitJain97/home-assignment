import { ordersRepo } from '../../../repos/ordersRepo';
import { Order, Carriers } from '../../entities';
import { deriveGetOrderQuotesOutcome, GetOrderQuotesResult } from './getOrderQuotes.deriver';

export const getOrderQuotes = async (
  orderId: Order['id'],
  carriers: Carriers
): Promise<GetOrderQuotesResult> => {
  const order = await ordersRepo.getOrder(orderId);

  const result = deriveGetOrderQuotesOutcome(order, carriers);

  if (result.outcome === 'SUCCESS') {
    await ordersRepo.updateOrder({ ...result.order });
  }
  return result;
};

export { GetOrderQuotesResult };