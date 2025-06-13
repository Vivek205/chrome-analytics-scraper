export function parseCompactNumber(input: string): number {
    const match = input.trim().match(/^([\d,.]+)\s*([KMBT])?$/i);
    if (!match) return NaN;

    const num = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2]?.toUpperCase();

    const multipliers: Record<string, number> = {
        K: 1e3,
        M: 1e6,
        B: 1e9,
        T: 1e12,
    };

    return suffix ? num * (multipliers[suffix] || 1) : num;
}