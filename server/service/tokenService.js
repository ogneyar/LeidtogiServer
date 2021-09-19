const jwt = require('jsonwebtoken');
const Token = require('../models/Token');


class tokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '24h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '90d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where:{userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where:{refreshToken}})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({where:{refreshToken}})
        return tokenData;
    }
}

module.exports = new tokenService();
