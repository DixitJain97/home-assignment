import { withAsyncErrorHandling } from './withAsyncErrorHandling';
import { carrierCodeSchema } from '../domain/entities';
import { z } from 'zod-http-schemas';
import { getOrderQuotes, GetOrderQuotesResult } from '../domain/operations/getOrderQuotes';

const carrierQuoteRequestSchema = z.object({
    carriers: carrierCodeSchema.array(),
});

const urlParamsSchema = z.object({
    id: z.string().nonempty(),
});


export const handlePostOrderQuotes = withAsyncErrorHandling(
    async (req, res) => {
        const bodyParseResult = carrierQuoteRequestSchema.safeParse(req.body);
        if (!bodyParseResult.success) {
            res.status(400).json({
                error: 'INVALID_REQUEST_BODY',
                validationError: bodyParseResult.error,
            });
            return;
        }

        if(!bodyParseResult.data.carriers || bodyParseResult.data.carriers.length === 0) {
            res.status(400).json({
                error: 'INVALID_REQUEST_BODY',
                validationError: 'carriers must be a non-empty array',
            });
            return;
        }

        const urlParamsParseResult = urlParamsSchema.safeParse(req.params);
        if (!urlParamsParseResult.success) {
            res.status(400).json({
                error: 'INVALID_URL_PARAMETER',
                validationError: urlParamsParseResult.error,
            });
            return;
        }

        const orderId = urlParamsParseResult.data.id;
        const { carriers } = bodyParseResult.data;

        const result = await getOrderQuotes(orderId, carriers);

        const outcomeStatusCodeMap: Record<GetOrderQuotesResult['outcome'], number> = {
            SUCCESS: 200,
            ORDER_NOT_FOUND: 404,
            ORDER_ALREADY_BOOKED: 400,
            ORDER_HAS_NO_LINE_ITEMS: 400,
        };

        res.status(outcomeStatusCodeMap[result.outcome]).json(result);
    }
);