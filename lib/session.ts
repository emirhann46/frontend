import { User } from "@/app/constans/type";

export const startSession= (user:User,jwt:string)=>{
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem("jwt",jwt)
}

export const endSession= ()=>{
  localStorage.removeItem('user');
  localStorage.removeItem("jwt");
}
