/**
 * To use with `useSearchParams`
 *
 * Convert UrlSearchParams to `{key,value}`
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
