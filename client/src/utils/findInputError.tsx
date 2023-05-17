/*-------------------------------------------------------------------
|  🐼 Function findInputError
|
|  🐯 Purpose: GIVEN AN ERRORS OBJECT AND AN INPUT NAME, THIS FUNCTION
|              FILTERS THE ERRORS OBJECT AND RETURN THE ERROR OF THE 
|              GIVEN INPUT.
|
|  🐸 Returns:  OBJECT
*-------------------------------------------------------------------*/

type Error = {
	errors: string;
	name: string;
};

// go through the errors object and find the error related to the input
export function findInputError(errors, name: Error) {
	const filtered = Object.keys(errors)
		.filter((key) => key.includes(name))
		.reduce((cur, key) => {
			return Object.assign(cur, { error: errors[key] });
		}, {});
	return filtered;
}
