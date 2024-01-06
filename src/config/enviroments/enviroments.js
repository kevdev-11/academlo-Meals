import 'dotenv/config';
import env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    DB: env.get('DB').required().asString(),
    DEV_ENV: env.get('DEV_ENV').required().asString(),
    JWT_EXPIRE_IN: env.get('JWT_EXPIRE_IN').required().asString(),
    SEED_JWT: env.get('SEED_JWT').required().asString()
};
