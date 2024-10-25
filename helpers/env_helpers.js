import dotenv from "dotenv";
dotenv.config();

const env = process.env;

const SECRET_INIT = env.SECRET_INIT;
const INIT_VECTOR = env.INIT_VECTOR;


export { SECRET_INIT, INIT_VECTOR};


