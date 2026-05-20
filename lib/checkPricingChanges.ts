import { flattenPricing } from "./flattenPricing";

export function checkPricingChanges(
    oldSnapshot: Record<string, number>
) {

    const current =
        flattenPricing();

    const changedKeys: string[] = [];

    (
        Object.keys(current) as Array<
            keyof typeof current
        >
    ).forEach((key) => {

        if (
            oldSnapshot[key] !==
            current[key]
        ) {
            changedKeys.push(key);
        }
    });

    return {
        hasChanges:
            changedKeys.length > 0,

        changedKeys,

        current,
    };
}