import { z } from 'zod-http-schemas';

export const carrierCodeSchema = z.enum(['UPS', 'FEDEX', 'USPS']);

export const carrierQuoteSchema = z.object({
  carrier: carrierCodeSchema,
  priceCents: z.number().int(),
});

export const carrierQuoteRequestSchema = z.object({
  carriers: carrierCodeSchema.array(),
});

export type CarrierCode = z.infer<typeof carrierCodeSchema>;
export type CarrierQuote = z.infer<typeof carrierQuoteSchema>;
export type CarrierQuoteRequest = z.infer<typeof carrierQuoteRequestSchema>;
export type Carriers = ('UPS' | 'FEDEX' | 'USPS')[];