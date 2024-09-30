declare namespace NodeJS{
    interface  ProcessEnv {
        readonly PORT: number;
        readonly DB: string;
        readonly NODE_ENV: 'dev' | 'prod';
        readonly JWT_KEY: string;
        readonly  JWT_EXPIRES_IN: number;
        readonly EMAIL_HOST:string;
        readonly EMAIL_ADDRESS: string;
        readonly PASSWORD_EMAIL:string;
        readonly APP_NAME:string;
    }
}