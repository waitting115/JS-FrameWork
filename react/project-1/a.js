// export const a = 12;
// export const b = 13;

// const a = 12;
// const b = 5;

// export {a, b}

// export {a as aa, b as bb}

// export default {
//     a : a,
//     b : b
// }

let json = {
    a : 'hello',
    b : 'webpack'
}
let a = 5, b = 10, c = 15;

export default json;//导出对象用export default，只导出变量用export即可
export{
    a, b, c
}