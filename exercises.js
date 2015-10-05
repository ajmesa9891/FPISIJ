//Functional Programming In Scala In Javascript
//=============================================
//Functional Programming In Scala In Javascript. Based on the book "Functional Programming in Scala".

//Chapter 1
//---------------------
// No exercises.
describe("Chapter 1", function() {

  it("has no exercises.", function() {
    expect(1).toBe(1);
  });

});
//Chapter 2
//---------------------
describe("Chapter 2", () => {
  // ### Exercise 2.1
  // Write a recursive function to get the nth Fibonacci number (http://mng.bz/C29s).
  // The first two Fibonacci numbers are 0 and 1. The nth number is always the sum of the
  // previous two—the sequence begins 0, 1, 1, 2, 3, 5. Your definition should use a
  // local tail-recursive function.
  // def fib(n: Int): Int
  it("Exercise 2.1", () => {
  //   ````scala
  // def fib(n: Int): Int = {
  //   @annotation.tailrec
  //   def loop(n: Int, prev: Int, cur: Int): Int =
  //     if (n == 0) prev
  //     else loop(n - 1, cur, prev + cur)
  //   loop(n, 0, 1)
  // }
  //   ````
  // fib1 seems more succint, thought it cannot take advantage of tail end recursion.
    function fib1(n) {
      if (n < 2) return n;
      return fib1(n-1) + fib1(n-2);
    };

    function fib2(n) {
      var loop = (n, prev, cur) => {
        if (n === 0) return prev;
        return loop(n - 1, cur, prev + cur);
      };
      return loop(n, 0, 1);
    };

    expect(fib1(0)).toBe(0);
    expect(fib1(1)).toBe(1);
    expect(fib1(2)).toBe(1);
    expect(fib1(3)).toBe(2);
    expect(fib1(4)).toBe(3);
    expect(fib1(5)).toBe(5);
    expect(fib1(6)).toBe(8);

    expect(fib2(0)).toBe(0);
    expect(fib2(1)).toBe(1);
    expect(fib2(2)).toBe(1);
    expect(fib2(3)).toBe(2);
    expect(fib2(4)).toBe(3);
    expect(fib2(5)).toBe(5);
    expect(fib2(6)).toBe(8);
  });
});
