/**
 * To use with `useSearchParams`
 *
 * Convert UrlSearchParams to `{key:value,key2:value2}`
 */
export const getKeyValuesFromUrlSearchParam = (
	searchParams: URLSearchParams
) => {
	let initParam: Record<string, string> = {};
	for (const [key, value] of searchParams.entries()) {
		initParam = { ...initParam, [key]: value };
	}

	return initParam;
};
