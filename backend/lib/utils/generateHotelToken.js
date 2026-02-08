import jwt from 'jsonwebtoken';

export const generateHotelTokenAndSetCookie = (email, res) => {
  const token = jwt.sign(
    { email }, 
    process.env.HOTEL_JWT_SECRET, 
    { expiresIn: '15d' }
  );

  res.cookie('hotelJwt', token, {
    httpOnly: true,
    secure: false,      // set true in production (HTTPS)
    sameSite: 'lax',
    maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
  });
};
