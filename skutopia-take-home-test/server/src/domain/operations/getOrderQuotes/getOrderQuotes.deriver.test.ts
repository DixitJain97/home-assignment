import { deriveGetOrderQuotesOutcome, GetOrderQuotesResult } from './getOrderQuotes.deriver';
import { Carriers, OrderQuoteRequest } from '../../entities';
import { expect } from 'chai';

const mockOrderQuoteRequest: OrderQuoteRequest = {
    id: '123',
    customer: 'Sally Bob',
    status: 'RECEIVED',
    items: [
      {
        sku: 'SHOE-RED-1',
        quantity: 1,
        gramsPerItem: 100,
        price: 20,
      },
    ],
    quotes: [],
};

const mockOrderQuoteResult: GetOrderQuotesResult = {
    outcome: 'SUCCESS',
    order: {
        id: '123',
        customer: 'Sally Bob',
        status: 'QUOTED',
        items: [
          {
            sku: 'SHOE-RED-1',
            quantity: 1,
            gramsPerItem: 100,
            price: 20,
          },
        ],
        quotes: [
            {
                carrier: 'UPS',
                priceCents: 805, 
            },
            {
             carrier: 'FEDEX',
             priceCents: 1003,
            },
        ],
    },    
};

const mockCarriers = ['UPS', 'FEDEX'] as Carriers;

describe('getOrderQuotes.deriver', () => {
    it('returns ORDER HAS NO LINE ITEMS when the order has empty items array', () => {
        const result = deriveGetOrderQuotesOutcome({
            ...mockOrderQuoteRequest,
            items: [],
        }, mockCarriers);
        expect(result.outcome).to.eq('ORDER_HAS_NO_LINE_ITEMS');
    });

    it('returns SUCCESS when the quotes are successfully created', () => {
        const result = deriveGetOrderQuotesOutcome(mockOrderQuoteRequest, mockCarriers);
        expect(result.outcome).to.eq('SUCCESS');
        expect(result).to.deep.eq(mockOrderQuoteResult);
    });

    it('returns ORDER ALREADY BOOKED when the order is already booked', () => {
        const result = deriveGetOrderQuotesOutcome({
            ...mockOrderQuoteRequest,
            status: 'BOOKED',
        }, mockCarriers);
        expect(result.outcome).to.eq('ORDER_ALREADY_BOOKED');
    });
});