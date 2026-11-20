export interface User{id:string;name:string;email:string;role:"student"|"admin"}
export interface MenuItem{_id:string;name:string;category:string;price:number;available:boolean}
export interface CartLine{item:MenuItem;quantity:number}
export interface TodoItem{_id:string;title:string;completed:boolean}
export interface QuizQuestion{_id:string;question:string;options:string[]}