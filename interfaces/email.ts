export interface EmailOptions{
    email:string;
    subject: string;
    message: string;
}

export interface SendEmailOptions{
    from:string;
    to:string;
    subject:string;
    text:string;
    html?:string;
    attachments?:any;
}