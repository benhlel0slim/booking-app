/**
 * To use with `useSearchParams`
 *
 * Convert UrlSearchParams to `[key,value]` tuple
 */
export const getKeyValuesFromUrlSearchParam = (
	searchParams: URLSearchParams
) => {
	let arr1: [string, string][] = [];
	for (const [key, value] of searchParams.entries()) {
		const arr: [string, string] = [key, value];

		arr1 = [...arr1, arr];
	}

	return arr1;
};
