export interface IStats {
    upvotes: number,
    downvotes: number
}


export interface IPost {
    author: string,
    content: string,
    created_at: Date
    stats: IStats
}