/* eslint-disable prettier/prettier */
export interface Blog {
    id: string;
    title: string;
    content: string;
    author: string;
    status:BlogStatus;
    date: Date;
}

export enum BlogStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    POSTEĐ = 'POSTED',
}