import { Order, OrderQuoteRequest, Carriers } from "../../entities";
import { generateQuote } from '../../../../../api-tests/util';

type OrderNotFound = {
    outcome: 'ORDER_NOT_FOUND';
};
type Success = {
    outcome: 'SUCCESS';
    order: OrderQuoteRequest;
  };
type OrderAlreadyBooked = {
    outcome: 'ORDER_ALREADY_BOOKED';
};
type OrderHasNoLineItems = {
    outcome: 'ORDER_HAS_NO_LINE_ITEMS';
};


export type GetOrderQuotesResult = OrderNotFound | Success | OrderAlreadyBooked | OrderHasNoLineItems; 

export const deriveGetOrderQuotesOutcome = (
    order: Order | undefined,
    carriers: Carriers
): GetOrderQuotesResult => {
    if (!order) {
        return {
            outcome: 'ORDER_NOT_FOUND',
        };
    }

    if(order.status === 'BOOKED') {
        return {
            outcome: 'ORDER_ALREADY_BOOKED',
        };
    };

    if(order.items.length === 0) {
        return {
            outcome: 'ORDER_HAS_NO_LINE_ITEMS',
        };
    }

    const generatedQuotes = carriers.map((carrier) => generateQuote(order, carrier));

    return {
        outcome: 'SUCCESS',
        order: {
            ...order,
            status: 'QUOTED',
            quotes: generatedQuotes,
        },
    };
}
