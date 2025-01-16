import jwt from 'jsonwebtoken'
const secret_key = process.env.JWT_SECRET || "mysecretkey";

export function generatetoken(payload)  {
    return jwt.sign(payload, secret_key, { expiresIn: '1d' });
}

export function verifyToken(token) {
    try {
      return jwt.verify(token, secret_key);
    } catch (error) {
      return null;
    }
  }
