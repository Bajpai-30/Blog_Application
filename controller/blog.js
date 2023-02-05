const { decryptJwe, verifyJws } = require('../utils/jsonToken.js');
const {
	successResponse,
	errorResponse,
	errorHandler,
} = require("../utils/response.js");
const {
	ERROR_MESSAGE,
	SUCCESS_MESSAGE,
	HTTP_STATUS_CODE,
	REQ_HEADER,
} = require("../utils/constants.js");
const {
	registerBlog,
	checkBlogRecord,
    fetchBlogRec,
    updateBlogRecord,
    deleteBlogRecord
} = require("../service/blog");
const {checkUserByMail}= require("../service/user")


const addBlog = async (request, response) => {
	try {
		//CHECK IF DATA IS PROVIDED
		if (
			!("title" in request.body) ||
			!("body" in request.body) ||
			!(request.body.title != "") ||
			!(request.body.body != "")
		) {
			return response
				.status(HTTP_STATUS_CODE.BAD_REQUEST)
				.json(errorResponse(ERROR_MESSAGE.REQUIRED_PARAMETERS_MISSING));
		}

		const token = request.header(REQ_HEADER.X_AUTH_TOKEN)
		console.log(token)


		// Verify Token
		const verifiedToken = await verifyJws(token);
		if (!verifiedToken.isSuccess) {
			return response
				.status(HTTP_STATUS_CODE.UNAUTHORIZED)
				.json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
		}

		// Decrypt Jwe Token
		const decryptedData = await decryptJwe(verifiedToken.data);
		const email = decryptedData.data.email;
		console.log("email",email)

		const data = {
			title: request.body.title,
			body: request.body.body,
			email:email
		};
		console.log("data",data)

		// Check admin does exist or not inside DB
		const title = request.body.title;
		console.log(title)
		const checkBlogResponse = await checkBlogRecord({ title: title });
		if (!checkBlogResponse.isSuccess) {
			return response
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER)
				.json(errorResponse(ERROR_MESSAGE.INTERNAL_SERVER_ERROR));
		}
		if (checkBlogResponse.data) {
			return response
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER)
				.json(errorResponse(ERROR_MESSAGE.ALREADY_EXIST));
		}


		const result1 = await registerBlog(data);
		console.log("result1", result1)

		if (!result1.isSuccess) {
			return response.json(errorResponse(result1.data.message));
		} else {
			return response.status(HTTP_STATUS_CODE.OK).json(successResponse(result1.data));
		}
	} catch (err) {
		errorHandler(err, response);
	}
};

const fetchBlog = async (request, response) => {
	try {
		const token = request.header(REQ_HEADER.X_AUTH_TOKEN);

		// Verify Token
		const verifiedToken = await verifyJws(token);
		if (!verifiedToken.isSuccess) {
			return response
				.status(HTTP_STATUS_CODE.UNAUTHORIZED)
				.json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
		}

		// Decrypt Jwe Token
		const decryptedData = await decryptJwe(verifiedToken.data);
		const email = decryptedData.data.email;

		const fetchBlogResponse = await fetchBlogRec({ email: email });

		if (!fetchBlogResponse.isSuccess) {
			return response
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER)
				.json(errorResponse(fetchBlogResponse.data));
		} else {
			return response.status(HTTP_STATUS_CODE.OK).json(successResponse(fetchBlogResponse));
		}
	} catch (err) {
		errorHandler(err, response);
	}
};

const updateBlog = async (request, response) => {
	const token = request.header(REQ_HEADER.X_AUTH_TOKEN);
	const title = request.body.title;
	const body = request.body.body;

	// Verify Token
	const verifiedToken = await verifyJws(token);
	if (!verifiedToken.isSuccess) {
		return response
			.status(HTTP_STATUS_CODE.UNAUTHORIZED)
			.json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
	}

	// Decrypt Jwe Token
	const decryptedData = await decryptJwe(verifiedToken.data);
	const email = decryptedData.data.email;
	const blogId= request.body.blogId
	const data = {
		blogId: blogId,
		email: email,
		title: title,
		body: body,
	};


	const updateData = {};
	for (var attributename in data) {
		if (data[attributename] != null) {
			updateData[attributename] = data[attributename];
		}
	}
	console.log("updateData",updateData)


	const updateBlogResponse = await updateBlogRecord(updateData);
	if (!updateBlogResponse.isSuccess) {
		return response
			.status(HTTP_STATUS_CODE.INTERNAL_SERVER)
			.json(errorResponse(ERROR_MESSAGE.EMAIL_NOT_EXIST));
	} else {
		return response.status(HTTP_STATUS_CODE.OK).json(successResponse(updateBlogResponse));
	}
};


const deleteBlog = async (request, response) => {
	try {
		const token = request.header(REQ_HEADER.X_AUTH_TOKEN);

		// Verify Token
		const verifiedToken = await verifyJws(token);
		if (!verifiedToken.isSuccess) {
			return response
				.status(HTTP_STATUS_CODE.UNAUTHORIZED)
				.json(errorResponse(ERROR_MESSAGE.INVALID_TOKEN));
		}

		// Decrypt Jwe Token
		const decryptedData = await decryptJwe(verifiedToken.data);
		const email = decryptedData.data.email;
		const title = request.body.title;
		console.log("mail",email)

		const userExists = await checkUserByMail(email);
		console.log("userExists",userExists)
		if (!userExists.data) {
			return response
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER)
				.json(errorResponse(ERROR_MESSAGE.MODIFIER_NOT_EXISTS));
		} else {
			
			const deleteBlogResponse = deleteBlogRecord({ title });
			return response
				.status(HTTP_STATUS_CODE.OK)
				.json(successResponse(SUCCESS_MESSAGE.DELETE_FAQ_RECORD));
		}
	} catch (err) {
		errorHandler(err, response);
	}
};


module.exports={
    addBlog,
    fetchBlog,
    updateBlog,
    deleteBlog
}
