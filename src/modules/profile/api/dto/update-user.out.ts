export interface UpdateUserOutDTO {
   user: User
 }
 
 export interface User {
   email: string
   password?: string
   username: string
   bio: string
   image: string
 }
 