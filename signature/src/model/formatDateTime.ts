export function getDateTime(date: Date)
{
    if (date === undefined)
    {
        throw new Error('Date cannot be undefined!');
    }
    const year = date.getUTCFullYear();
    const month = formatDigits(date.getUTCMonth() + 1);
    const day = formatDigits(date.getUTCDate());
    const hour = formatDigits(date.getUTCHours());
    const minute = formatDigits(date.getMinutes());
    const second = formatDigits(date.getSeconds());
    // YYYYMMDD'T'HHMMSS'Z'
    return year.toString() + month + day + 'T' + hour + minute + second + 'Z';
}

function formatDigits(time: number)
{
    let result = time.toString();
    if (time < 10)
    {
        result = '0' + time.toString();
    }
    return result;
}
