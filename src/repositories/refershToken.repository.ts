import refreshTokenModel from "../schemas/refreshtoken.schema";

const refreshTokenRepository = {
  create: async (data: { userId: string; token: string }) => {
    const { userId, token } = data;
    const newRefreshToken = await new refreshTokenModel({
      userId,
      token,
    }).save();
    return newRefreshToken;
  },
  delete: async (token: string) => {
    const deletedRefreshToken = await refreshTokenModel.findOneAndDelete({
      token,
    });
    return deletedRefreshToken;
  },
  get: async (token: string) => {
    const tokenDB = await refreshTokenModel.findOne({ token });
    return tokenDB;
  },
};

export default refreshTokenRepository;
