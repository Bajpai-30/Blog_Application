const userModel = require("../model/user");
const bcrypt = require('bcryptjs');
const crypto = require('../utils/crypto.js');
const { OTHERCONFIG } = require('../config/other.js');
const SECRET_KEY = OTHERCONFIG.SECRET;
const { logger } = require('../utils/logger.js');
const {
	ERROR_MESSAGE,
	REQ_HEADER,
	SUCCESS_MESSAGE,
	HTTP_STATUS_CODE,
	HEADER_KEY_TOKEN,
	MESSAGES,
} = require('../utils/constants.js');

const registerUser = async (data) => {
	try{
    // Save user in the database
	const user = new userModel(data);
	console.log("user",user)
	const result = await user.save(user);
	return { isSuccess: true, data: result };
	} catch (err) {
		return { isSuccess: false, data: err };
	}
};

const checkUserByMail = async (email,phoneNumber) => {
	try {
		const query = {
			$or:[{phoneNumber:phoneNumber},{email:email}]
		}
		const userRecord = await userModel.find(query).count();
		console.log("userRecord",userRecord)
		logger.info(SUCCESS_MESSAGE.RECORD_CHECKED);
		return { isSuccess: true, data: userRecord > 0 ? true : false };
	} catch (err) {
		logger.error("Error In Check User");
		return { isSuccess: false, data: err };
	}
}

const fetchUserRecord = async (data) => {
	try {
		const userRecord = await userModel.findOne({ email: data.email }).exec();

		if (!userRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.PHONE_NUMBER_NOT_EXIST };
		} else {
			const userData = {
				phoneNumber: userRecord.phoneNumber,
				username: userRecord.usernamename,
				email: userRecord.email,
				password: userRecord.password,
				userId: userRecord.userId,
			};
			return { isSuccess: true, data: userData };
		}
	} catch (err) {
		logger.error(ERROR_MESSAGE.FETCHING_USER_ERROR + err);
		return { isSuccess: false, data: err };
	}
};


module.exports = {
	registerUser,
	checkUserByMail,
	fetchUserRecord
};


