const l = 3, m = 8, n = 9;

const sl = Math.sin(Math.PI / l) ** 2;
const sm = Math.sin(Math.PI / m) ** 2;
const sn = Math.sin(Math.PI / n) ** 2;

const cl = Math.cos(Math.PI / l) ** 2;
const cm = Math.cos(Math.PI / m) ** 2;
const cn = Math.cos(Math.PI / n) ** 2;


const cosh_phi = (cl - sn * sm) / (cl - sn);
const cosh_theta = (cn * cl) / (sn * (sm - cl));

const tanh_theta = 1 - 1 / cosh_theta;
const tanh_phi = 1 - 1 / cosh_phi;

console.log("phi")
console.log("cosh", cosh_phi)
console.log("tanh", tanh_phi)

console.log(Math.sqrt((sn * cm) / (cl - sn * sm)))


console.log("theta")
console.log("cosh", cosh_theta)
console.log("tanh", tanh_theta)

//console.log(Math.sqrt((cl - sn * sm) / (cn * cl)))


console.log(Math.sqrt((cl - sn * sm) / (cn * cl)))

// console.log((cl - sn * sm) / (cn * cl))

// console.log(tanh_theta * tanh_phi, Math.tan(Math.PI / n) * Math.cos(Math.PI / m) / Math.cos(Math.PI / l))


// console.log((cm - sl * sn) / (cl * sn))