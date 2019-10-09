import * as formatDT from './formatDateTime';
import {} from 'jasmine';

describe('signing/formatDateTime.ts', () =>
{

    it('It correctly produces a formatted date time.', () =>
    {
        const date = new Date(1999, 11, 31, 15, 59, 59, 999);
        const result = formatDT.getDateTime(date);
        expect(result)
            .toBe('19991231T235959Z');
    });

    it('It throws an error when the input is undefined.', () =>
    {
        const date: any = undefined;
        try
        {
            formatDT.getDateTime(date);
            fail();
        }
        catch (err)
        {
           // pass
        }
    });

});
