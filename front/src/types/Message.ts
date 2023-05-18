export interface ReadBy {
    userId: string, username: string
}

export interface Message {
    message?: string;
    sender?: string;
    roomId?: string;
    senderId?: string;
    _id?: string;
    readBy?: ReadBy[]
}