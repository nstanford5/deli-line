'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('Admin', {
    getMax: UInt,
    launched: Fun([Contract], Null),
  });
  const B = API({
    getNum: Fun([], UInt),
    checkIn: Fun([], Bool),
  });
  init();
  A.only(() => {
    const max = declassify(interact.getMax);
  });
  A.publish(max);
  const customers = new Map(Address, UInt);
  A.interact.launched(getContract());
  const [num] = parallelReduce([0])// declare and instantiate loop variable
    .invariant(balance() == 0, "network token balance wrong")
    .while(true)// loop condition
    .api_(B.getNum, () => {
      check(num != max, "sorry, the line is full");
      check(isNone(customers[this]), "sorry, you can only have one number");
      return[0, (ret) => {
        customers[this] = num;// assign the user a number
        ret(num);// return value to the caller frontend
        return[num + 1];// update loop variable to parallelReduce
      }];
    })
    .api_(B.checkIn, () => {
      check(isSome(customers[this]), "sorry, you don't have a valid ticket. Please go to the back of the line");
      return[0, (ret) => {
        ret(true);// you passed the ledger check
        delete customers[this];// take users ticket
        return[num - 1];
      }];
    });

  commit();
  exit();
})