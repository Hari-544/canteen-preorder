// Namespace, module, generic constraint and interface practical
namespace Canteen { export interface Item { name: string; price: number } export function total<T extends Item>(items: T[]): number { return items.reduce((sum,item)=>sum+item.price,0); } }
const order: Canteen.Item[] = [{name:"Idly",price:20},{name:"Tea",price:15}];
console.log(Canteen.total(order));
export {};
