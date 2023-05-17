/*-------------------------------------------------------------------
|  🐼 Function isFormInvalid
|
|  🐯 Purpose: CHECKS IF FORM IS VALID OR NOT
|
|  🐸 Returns:  OBJECT
*-------------------------------------------------------------------*/

// receives the error object created by react hook form and returns if the form value is invalid
export const isFormInvalid = (err: string) => {
	if (Object.keys(err).length > 0) return true;
	return false;
};
