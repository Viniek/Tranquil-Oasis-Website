import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, emailaddress, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                emailaddress: emailaddress,
                password: hashedPassword
            }
        });
        res.status(201).json({ success: true, message: "Hurray!! User created successfully..." });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ success: false, message: e.message });
    }
};

export const loginUser = async (req, res) => {
    const { emailaddress, password } = req.body;
    console.log('Login attempt:', emailaddress); // Log the email address being attempted

    try {
        const user = await prisma.user.findFirst({
            where: { emailaddress }
        });
        console.log('User found:', user); // Log the user object if found

        if (user) {
            const passwordMatch = bcrypt.compareSync(password, user.password);
            console.log('Password match:', passwordMatch); // Log if the password matches

            if (passwordMatch) {
                const payload = {
                    user_id: user.user_id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    emailaddress: user.emailaddress
                };

                console.log('User payload:', payload); // Log the payload before signing the token

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
                res.cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
                res.status(200).json({ success: true, data: payload });
            } else {
                console.error('Invalid password');
                return res.status(400).json({ success: false, message: "Oops! Wrong login credentials..." });
            }
        } else {
            console.error('User not found');
            return res.status(404).json({ success: false, message: "User not found..." });
        }
    } catch (e) {
        console.error('Login error:', e.message);
        return res.status(500).json({ success: false, message: e.message });
    }
};