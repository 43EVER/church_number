const Zero = (f, x) => x;
const One = (f, x) => f(x);
const Add = (m, n) => (f, x) => m(f, n(f, x));
const Mul = (m, n) => (f, x) => n((x) => m(f, x), x);
const Exp = (m, n) => (f, x) => n((x) => Mul(m, x), One)(f, x);

const Two = Add(One, One)
const Four = Exp(Two, Two);
const Eight = Exp(Two, Add(Two, One));
const Sixteen = Mul(Four, Four);

// Write your code

// Example
function binarySucc(x) {
    return x.length == 0 ? [1] : (x.slice(-1)[0] == 0 ? x.slice(0, -1).concat([1]) : binarySucc(x.slice(0, -1)).concat([0]));
}

// 二进制的 2^16
console.log(Exp(Two, Sixteen)(binarySucc, []).join(""));

// 十进制的 2^10
console.log(Exp(Two, Add(Eight, Two))(x => x + 1, 0));

// 专业词汇运算
(() => {
    const zero = "复盘";
    const str = "复盘，抓手，对标，沉淀，对齐，拉通"
    const keys = str.split("，");
    const values = str.split("，").slice(1).concat(zero);
    const mp = {};
    keys.forEach((v, idx) => mp[v] = values[idx]);
    const succ = x => mp[x];
    console.log(Eight(succ, zero));
})();