// ERROR MESSAGE CONSTANTS
const ERROR_MESSAGE = {
	POPUP_PRIORITY_ERROR:'Priority should be between 1 to 3',
	NOTICE_ID_UPDATE_ERROR: 'Could not update notice id',
	FAQ_ID_UPDATE_ERROR: 'Could not update FAQ id',
	SUPPLIER_ID_UPDATE_ERROR: 'Could not update Supplier id',
	INPUT_ERROR: 'Please choose Atlest One Service',
	PDF_ERROR: 'Please Upload only PDF Files',
	FILE_ERROR: 'Please Upload Valid Files',
	PRESS_ID_UPDATE_ERROR: 'Could not update press id',
	POPUP_ID_UPDATE_ERROR: 'Could not update popup id',
	QUESTION_ID_UPDATE_ERROR: 'Could not update question id',
	NOTICE_NOT_EXIST: 'Notice does not exist',
	BLOG_NOT_EXIST: 'Blog does not exist',
	NOTICE_NOT_EXIST: 'Notice does not exist',
	ALREADY_EXIST: 'Record already exists',
	NOT_EXIST: 'Phone number does not exist / Card information already exist',
	USERNAME_PASSWORD_INCORRECT: 'Username or Password is Incorrect',
	CONTACT_PASSWORD_INCORRECT: 'Contact or Password is Incorrect',
	INVALID_INPUT: 'Invalid Input format',
	REQUIRE_TOKEN: 'Required Token',
	REQUIRED_PARAMETERS_MISSING: 'REQUIRED API REQUEST PARAMETERS ARE MISSING',
	INTERNAL_SERVER: 'Internal server error',
	DB_CONNECTION: 'Failed to connect to DB on startup: ',
	ID_INSERT_FAIL: 'Error in inserting identity record',
	FETCHING_ID_FAIL: 'Error in fetching identity',
	AMOUNT_DID_TOKEN_CALLER_MISSING: 'Amount or ReceiveDID or Token or Caller not Exist!',
	INVALID_URL: 'Invalid URL',
	TRANSACTION_FAILED_AGAINST: 'Transaction has been failed against ',
	PAYMENT_DONE_MINTING_FAILED: 'Payment Done but Minting Token Failed against',
	MINTING_FAILED_TRANSACTIONID: 'Minting Failed against TransactionId ',
	TRY_MANUALLY: ' Try Manually!',
	ERROR_UPDATE_USERINFO: 'ERROR updating User Information!',
	ERROR_UPDATE_BLOG: 'ERROR updating Blog!',
	ERROR_UPDATE_TRANSACTION: 'ERROR updating Transaction!',
	ERROR_FETCHING_TRANSACTION: 'ERROR Fetching Transaction!',
	ERROR_FETCHING_TRANSACTIONS: 'ERROR Fetching Transactions!',
	SAVE_TRANSACTION_DB_FAILED: 'Save Transaction in DB Failed!',
	PG_DB_CONNECTION_ERROR: 'PG DB Connection Error!',
	UNABLE_TO_MAKE_CALL: 'Unable to make call!',
	UNABLE_TO_MAKE_PAYMENT: 'Unable to make payment',
	INTERNAL_SERVER_ERROR: 'Internal Server Error',
	FAILED_CARD_VERIFICATION: 'Failed Card Verification',
	FAILED_FETCHING_PAYMENT_HISTORY: 'Failed fetching payment history',
	FAILED_FETCH_BALANCE: 'Failed fetch balance',
	FAILED_USER_DID_CREATION: 'Failed user DID creation',
	TRANSFER_TOKEN_FAILED: 'Transfer token failed',
	LOGIN_MIDDLELAYER_FAILED: 'Login_Middlelayer_Failed',
	LOGIN_FAILED: 'User successfully registered on E3DA/MID-DID,wait for sometime',
	LOGIN_AGAIN:"Please login",
	PHONE_NUMBER_NOT_EXIST: 'Entered Contact number does not exist',
	FETCH_CARD_DETAILS: 'Failed to fetch card details',
	FETCH_PAYMENT_DETAILS: 'Failed to fetch payment hisory details',
	REGISTERING_PAYMENT_CARD: 'Failed to register card',
	GET_PAYMENT_CARD: 'Get payment card failed',
	GET_PAYMENT_HISTORY: 'Get payment hisory failed',
	DECRYPTION_FAILED: 'Failed to decrypt string',
	CHECKING_BLOG_ERROR: "User Blog does not exists",
	CHECKING_ADMIN_NOTICE_ERROR: "Admin notice record does not exists",
	CHECKING_ADMIN_FAQ_ERROR: "Admin FAQ record does not exists",
	CHECKING_ADMIN_PRESS_ERROR: "Admin Press Release record does not exists",
	FETCHING_ADMIN_ERROR: "Error in admin record fetch",
	FETCHING_OPERATOR_ERROR: "Error in Operator record fetch",
	FETCHING_USER_ERROR: "Error in user record fetch",
	FETCHING_QUESTION_ERROR: "Error in questions record fetch",
	FETCHING_SUPPLIER_NAME_ERROR: "Error in supplier name record fetch",
	FETCHING_SUPPLIER_ERROR: "Error in supplier all record fetch",
	ADMIN_NOT_EXISTS: "Admin does not exist",
	OPERATOR_NOT_EXISTS: "Operator does not exist",
	MODIFIER_NOT_EXISTS: "Modifier does not exist",
	RESPONDENT_NOT_EXISTS: "Respondent does not exist",
	WRITER_NOT_EXISTS: "Writer does not exist",
	USER_NOT_EXISTS: "User does not exist",
	WRITER_NAME_NOT_MATCH: "Writer does not match with existing name",
	RESPONDENT_NAME_NOT_MATCH: "Respondent name does not match with existing name",
	ERROR_UPDATE_ADMININFO: 'ERROR updating Admin Information!',
	ERROR_UPDATE_OPERATOR_INFO: 'ERROR updating Operator Information!',
	ERROR_FETCHING_SUPPLIER_ID: 'Error fetching admin supplier ids',
	INVALID_INPUT: 'Invalid email id',
	TOKEN_FAILED: 'Token creation failed',
	TITLE_NOT_EXIST: "Title is not exist",
	POPUPID_NOT_EXIST: "POPUP ID not exist",
	ID_NOT_EXIST: "ID is not exist",
	INVALID_PAGE:'Invalid Page',
	ERROR_UPDATE_SUPPLIER_INFO: 'ERROR updating Supplier Information!',
	INVALID_FILE:"Not a pdf. Only pdf can be uploaded.",
	NO_PERMISSION_TO_ACCESS:"YOU HAVE NOT PERMISSION TO ACCESS"
};

// SUCCESS MESSAGE CONSTANTS
const SUCCESS_MESSAGE = {
	MONGO_CONNECTION_SUCCESS: 'Mongo Connection Succeeded.',
	LOGIN: "User logged in successfully",
	PASSWORD_UPDATE: "Password has been updated successfully",
	RECORD_CHECKED: "User record checked successfully.",
	RECORD_FETCHED: "User record fetched successfully.",
	RECORD_UPDATED: "User record updated successfully.",
	RECORD_SAVED: "User record saved successfully.",
	DB_CONNECTION_SUCCESS: "MongoDB connection established successfully.",
	SUCCESS: "success",
	RECOVERY_KEY_GENERATED: "Recovery key generated successfully.",
	ACCOUNT_RECOVERED: "Account recovered successfully.",
	GIVEAWAY_RECORD_CHECKED: "Admin record checked successfully",
	GIVEAWAY: "Admin logged in successfully",
	BLOG_RECORD_CHECKED: "Blog record Checked successfully"
};

// WARNING MESSAGE CONSTANT
const WARN_MESSAGE = {
	DB_CONNECTION_TERMINATED: "Mongoose default connection to DB Terminated.",
	EMPTY_BODY: "Empty body!",
};

// HTTP STATUS CODES
const HTTP_STATUS_CODE = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOW: 405,
	CONFLICT: 409,
	INTERNAL_SERVER: 500,
};

// CURRENCY CODES
const PAYMENTS = {
	CURRENCY: 'USD',
};

// PAYMENT STATUS MESSAGES
const PAYMENTS_STATUS = {
	CREATED: 'CREATED',
	APPROVED: 'APPROVED',
	COMPLETED: 'COMPLETED',
};

const MESSAGES = {
	AFTER_PAYMENT_PROCEED: 'After Payment, Proceed with txnId ',
	DID: ' & DID ',
};

// CONSTANTS
const SUCCESS = "successfully executed";

// HEADERS
const REQ_HEADER = {
	X_AUTH_TOKEN: "x-auth-token",
	CONTENT_TYPE: "Content-Type",
	CONTENT_LENGTH: "Content-Length",
	APPLICATION_JSON: "application/json",
};

// CRYPTO PARAMETERS
const CRYPTO_PARAMETER = {
	ALGO_SHA: "sha256",
	BASE_VALUE: "base64",
	HEX: "hex",
	UTF: "utf-8",
	ALGO_AES: "aes",
};


// EXPORT MODULE
module.exports = {
	ERROR_MESSAGE,
	SUCCESS_MESSAGE,
	HTTP_STATUS_CODE,
	PAYMENTS,
	PAYMENTS_STATUS,
	MESSAGES,
	SUCCESS,
	REQ_HEADER,
	CRYPTO_PARAMETER,
	WARN_MESSAGE
};
