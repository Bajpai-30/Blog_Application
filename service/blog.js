const blogModel = require("../model/blog");
const { logger } = require("../utils/logger.js");
const {
	ERROR_MESSAGE,
	REQ_HEADER,
	SUCCESS_MESSAGE
} = require("../utils/constants.js");


const registerBlog = async (data) => {
	try {
		
		// Save admin in the database
		const blog = new blogModel(data);
		console.log("blog",blog)
		const result = await blog.save(blog);
		console.log("result",result)
		return { isSuccess: true, data: result };
	} catch (err) {
		return { isSuccess: false, data: err };
	}
};


const checkBlogRecord = async (data) => {
	try {
		const blogRecord = await blogModel.find(data).exec();
	console.log(SUCCESS_MESSAGE.BLOG_RECORD_CHECKED);
		return { isSuccess: true, data: blogRecord.length > 0 ? true : false };
	} catch (err) {
		console.log(ERROR_MESSAGE.CHECKING_BLOG_ERROR + err);
		return { isSuccess: false, data: ERROR_MESSAGE.CHECKING_BLOG_ERROR };
	}
};


const fetchBlogRec = async (data) => {
	try {
		const blogRecord = await blogModel.find(data).exec();

		if (!blogRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.BLOG_NOT_EXIST };
		} else {
			return { isSuccess: true, data: blogRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_USER_ERROR};
	}
};

const updateBlogRecord = async (data) => {
	try {
		const blogRecord = await blogModel.updateOne({ blogId: data.blogId }, { $set: data });
		if (blogRecord.nModified == 0) {
			return { isSuccess: false, data: ERROR_MESSAGE.ERROR_UPDATE_BLOG };
		} else {
			return { isSuccess: true, data: blogRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.ERROR_UPDATE_BLOG };
	}
};


const deleteBlogRecord = async (data) => {
	try {
		const blogRecord = await blogModel.findOneAndDelete(data).exec();
		if (!blogRecord) {
			return { isSuccess: false, data: ERROR_MESSAGE.BLOG_NOT_EXIST };
		} else {
			return { isSuccess: true, data: blogRecord };
		}
	} catch (err) {
		return { isSuccess: false, data: ERROR_MESSAGE.FETCHING_ADMIN_ERROR };
	}
};

module.exports = {
	registerBlog,
    checkBlogRecord,
    fetchBlogRec,
    updateBlogRecord,
    deleteBlogRecord
};
