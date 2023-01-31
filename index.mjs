import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
const stdlib = loadStdlib({REACH_NO_WARN:'Y'});
const sbal = stdlib.parseCurrency(100);
const MAX = 3;
console.log(`Welcome to the Reach Deli... \n\nOlive loaf anyone?`);

console.log(`Creating Admin...`);
const accs = await stdlib.newTestAccounts(6, sbal);
const [accA, acc1, acc2, acc3, acc4, acc5] = accs;


const startUp = async () => {
  const flag = "startup complete";
  try{
    await ctcA.p.Admin({
      getMax: MAX,
      launched: (c) => {
        throw flag;
      },
    });
  } catch (e) {
    if(e !== flag) throw e;
  };
}
const ctcA = accA.contract(backend);
const ctcinfo = ctcA.getInfo();
const [addrA, addr1, addr2, addr3, addr4, addr5] = accs.map(a => a.getAddress());
const ctc = (acc) => acc.contract(backend, ctcinfo);

const getNum = async (addr) => {
  const n = await ctc(addr).a.getNum();
  console.log(`Address ${stdlib.formatAddress(addr)} gets number: ${n}`);
};

const checkIn = async (addr) => {
  const b = await ctc(addr).a.checkIn();
  console.log(`Address ${stdlib.formatAddress(addr)} is at the counter`);
}

await startUp();
console.log(`Startup successful`);

await getNum(acc1);
await getNum(acc2);
await getNum(acc3);

try{
  await getNum(acc4);
} catch (e) {
  console.log(`Address ${stdlib.formatAddress(acc4)} received the following: \n${e}`);
};

await checkIn(acc1);
await getNum(acc4);// there is room in the line now

// no room
try{
  await getNum(acc5);
} catch (e) {
  console.log(`Address ${stdlib.formatAddress(acc5)} received the following: \n${e}`);
}

await checkIn(acc2);
await getNum(acc5);







  


