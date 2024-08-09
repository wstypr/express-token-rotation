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
    await refreshTokenModel.findOneAndDelete({
      token,
    });
  },
  deleteAll: async (userId: string) => {
    await refreshTokenModel.deleteMany({ userId });
  },
  get: async (token: string) => {
    const tokenDB = await refreshTokenModel.findOne({ token });
    return tokenDB;
  },
};

export default refreshTokenRepository;
