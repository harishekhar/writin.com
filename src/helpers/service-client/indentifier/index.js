const axios = require("axios").default;

// const axios = AxiosInstance;

class Identifier {
  constructor(appId) {
    this.v1 = "V1";
    this.appId = appId;
  }

  createOtp = (params, payload) => {
    const { appId, baseUrl } = params;
    return axios({
      method: post,
      url: `${baseUrl}/${this.v1}/identifier/send-otp`,
      data: payload,
    });
  };

  verifyOtp = (params, payload) => {
    const { appId, baseUrl } = params;
    return axios({
      method: post,
      url: `${baseUrl}/${this.v1}/identifier/verify-otp`,
      data: payload,
    });
  };
}
module.exports = {
  Identifier,
};
