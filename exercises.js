//Functional Programming In Scala In Javascript
//=============================================
//Functional Programming In Scala In Javascript.
//Based on the book "Functional Programming in Scala".

// ***
// *I'm skipping many problems and focusing only in ones I'm interested on.*
// Also, testing is not the main point so the tests are very superficial.
// ***

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
  // ````scala def fib(n: Int): Int ````
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
    }

    function fib2(n) {
      var loop = (n, prev, cur) => {
        if (n === 0) return prev;
        return loop(n - 1, cur, prev + cur);
      };
      return loop(n, 0, 1);
    }

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

  // ### Exercise 2.2
  // Implement isSorted, which checks whether an Array[A] is sorted according to a
  // given comparison function:
  // ````scala def isSorted[A](as: Array[A], ordered: (A,A) => Boolean): Boolean ````

  // ````scala
  // def isSorted[A](as: Array[A], gt: (A,A) => Boolean): Boolean = {
  //   @annotation.tailrec
  //   def go(i: Int, prev: A): Boolean =
  //     if (i == as.length) true
  //     else if (gt(as(i), prev)) go(i + 1, as(i))
  //     else false
  //   if (as.length == 0) true
  //   else go(1, as(0))
  // }
  // ````

  it('Exercise 2.2', () => {
    function isSorted(as, gt) {
      if (as.length < 2) return true;
      else if (gt(as[1], as[0])) {
        var rest = R.drop(1, as);
        return isSorted(rest, gt);
      }
      return false;
    }

    expect(isSorted([1,2,3,4], R.gte)).toBeTruthy();
    expect(isSorted([1,1,1,1,1,2,3,4], R.gte)).toBeTruthy();
    expect(isSorted([1,2,3,1], R.gte)).toBeFalsy();
  });

  // ***
  // I did not find it interesting to continue working on this chapter.
  // ***
});
//Chapter 3
//---------------------
describe("Chapter 3", () => {

  // ### Exercise 3.1
  // What will be the result of the following match expression?
  // ````scala
  // val x = List(1,2,3,4,5) match {
  //   case Cons(x, Cons(2, Cons(4, _))) => x
  //   case Nil => 42
  //   case Cons(x, Cons(y, Cons(3, Cons(4, _)))) =>x+y
  //   case Cons(h, t) => h + sum(t)
  //   case _ => 101
  // }
  // `````
  // This level of destructing seems completely possible with ES6.
  // I think this feature is only available in FF at the time of writing.
  it('Exercise 3.1', () => {
    var answer = 3;
    expect(3).toBe(3);
  });

  // ### Exercise 3.2
  // Implement the function tail for removing the first element of a List. Note that the
  // function takes constant time. What are different choices you could make in your
  // implementation if the List is Nil? We’ll return to this question in the next chapter.
  // ***
  // This is supposed to be a destructuring problem. I solved it in Scala
  // since this feature of ES6 is not in Chrome yet.
  it('Exercise 3.2', () => {
    expect(true).toBeTruthy();   
  });

  // ### Exercise 3.9
  // Compute the length of a list using foldRight.
  // ````scala
  // def length[A](as: List[A]): Int
  // ````
  it('Exercise 3.9', () => {
    // Functions in Ramda (R) is curried. Here Javascript seems more succint
    // and elegant. Though part of it is due to lack of type syntax.
    var length = R.reduceRight(R.add(1))(0);
    
    expect(length([1,2,3,4])).toBe(4);
    expect(length([])).toBe(0);
    expect(length(['a,b', 'second'])).toBe(2);
  });
  // ````scala
  // def length[A](l: List[A]): Int = 
  // foldRight(l, 0)((_,acc) => acc + 1)
  // ````

  // ### Exercise 3.10
  // Our implementation of foldRight is not tail-recursive and will result in a StackOverflowError
  // for large lists (we say it’s not stack-safe). Convince yourself that this is the
  // case, and then write another general list-recursion function, foldLeft, that is
  // tail-recursive, using the techniques we discussed in the previous chapter. Here is its
  // signature:
  //
  // ````scala def foldLeft[A,B](as: List[A], z: B)(f: (B, A) => B): B ````
  it('Exercise 3.10', () => {
    function foldLeft(as, z, f) {
      if (R.length(as) === 0) return z;
      var rest = R.drop(1, as);
      return foldLeft(rest, f(z, as[0]), f);
    }

    expect(foldLeft([1,2,3], 0, R.add)).toBe(6);
    expect(foldLeft(['1','2','3'], 0, R.add)).toBe('0123');
  });
  // ````scala
  // @annotation.tailrec
  // def foldLeft[A,B](l: List[A], z: B)(f: (B, A) => B): B = l match { 
  //   case Nil => z
  //   case Cons(h,t) => foldLeft(t, f(z,h))(f)
  // }
  // ````

  // ### Exercise 3.11
  // Write sum, product, and a function to compute the length of
  // a list using foldLeft.
  // ````scala
  // def sum3(l: List[Int]) = foldLeft(l, 0)(_ + _)
  // def product3(l: List[Double]) = foldLeft(l, 1.0)(_ * _)
  // def length2[A](l: List[A]): Int = foldLeft(l, 0)((acc,h) => acc + 1)
  // ````
  // Scala's pattern-matching-looking-shortcuts are very expressive
  // and I don't think the same level of shorthanded expressiveness
  // is achievable in Javascript. Thankfully we can wrap those in a
  // well named function (e.g., ````R.add````) and make it even more readable.
  it('Exercise 3.11', () => {
    var sum = R.reduce(R.add, 0);

    expect(sum([1,1,1])).toBe(3);
    expect(sum([10, -15])).toBe(-5);
    expect(sum([])).toBe(0);

    var product = R.reduce(R.multiply, 1);

    expect(product([1,1,1,1])).toBe(1);
    expect(product([10,1,0,1])).toBe(0);
    expect(product([10,10,5])).toBe(500);

    var length = R.reduce(R.add(1), 0);

    expect(length([10])).toBe(1);
    expect(length([10,1,2,3,4,5,2,8,'12',{}])).toBe(10);
  });

  // ### Exercise 3.12
  // Write a function that returns the reverse of a list 
  // (given ````List(1,2,3)```` it returns
  // ````List(3,2,1))````. See if you can write it using a fold.
  // ````scala
  // def reverse[A](l: List[A]): List[A] = 
  //   foldLeft(l, List[A]())((acc,h) => Cons(h,acc))
  // ````
  // The way arrays can be constructed in Scala leads to a more natural
  // foldLeft solution. I initially did a reduceRight in Javascript, and
  // implemented the one with reduceLeft after.
  it('Exercise 3.12', () => {
    var reverse = R.reduceRight((acc, x) => acc.concat(x), []);
    var reverse2 = R.reduce((acc, x) => [x].concat(acc), [])

    expect(reverse([1,2,3])).toEqual([3,2,1]);
    expect(reverse([])).toEqual([]);

    expect(reverse2([1,2,3])).toEqual([3,2,1]);
    expect(reverse2([])).toEqual([]);
  });

  // ### Exercise 3.13
  // Hard: Can you write foldLeft in terms of foldRight? How about the other way
  // around? Implementing foldRight via foldLeft is useful because it lets us 
  // implement foldRight tail-recursively, which means it works even for large
  // lists without overflowing the stack.
  it('Exercise 3.13', () => {
    // ````scala
    // def foldLeftViaFoldRight[A,B](l: List[A], z: B)(f: (B,A) => B): B = 
    //   foldRight(l, (b:B) => b)((a,g) => b => g(f(b,a)))(z)
    //
    // def foldRightViaFoldLeft_1[A,B](l: List[A], z: B)(f: (A,B) => B): B = 
    //   foldLeft(l, (b:B) => b)((g,a) => b => g(f(a,b)))(z)
    //
    // def foldLeftViaFoldRight[A,B](l: List[A], z: B)(f: (B,A) => B): B = 
    //   foldRight(l, (b:B) => b)((a,g) => b => g(f(b,a)))(z)
    // ````
    // It's crazy to see how much types get in the "visual" way. They do add
    // rigor and may foster understanding. It's an interesting comparison.
    // Reduce can be implemented with both left and right fold, as seen 
    // in Exercise 3.12. I'm taking advatange of that.
    function reduceLeftViaRight(f, acc, ls) {
      return R.reduceRight(f, acc, R.reverse(ls));
    }

    expect(reduceLeftViaRight(R.add, '', ['a', 'b'])).toBe('ab');
    expect(reduceLeftViaRight(R.add, '00', ['a', 'b'])).toBe('00ab');

    function reduceRightViaLeft(f, acc, ls) {
      return R.reduce(f, acc, R.reverse(ls));
    }

    expect(reduceRightViaLeft(R.add, '', ['a', 'b'])).toBe('ba');
    expect(reduceRightViaLeft(R.add, '00', ['a', 'b'])).toBe('00ba');    
  });

  // ### EXERCISE 3.14
  // Implement append in terms of either ````foldLeft````
  // or ````foldRight````.
  // ````
  // def appendViaFoldRight[A](l: List[A], r: List[A]): List[A] = 
  //   foldRight(l, r)(Cons(_,_))
  // ````
  it('Exercise 3.14', () => {
    var append = R.reduce((ns, v) => { return ns.concat(v) });

    expect(append([0], [1,2,3])).toEqual([0,1,2,3]);
  });

  // ### EXERCISE 3.15
  // Hard: Write a function that concatenates a list of lists into a single list.
  // Its runtime should be linear in the total length of all lists.
  // Try to use functions we have already defined.
  // ````scala
  // def concat[A](l: List[List[A]]): List[A] = 
  //   foldRight(l, Nil:List[A])(append)
  // ````
  it('Exercise 3.15', () => {
    var flatten = R.reduce(R.concat, []);

    expect(flatten([[1,2], [3,4]])).toEqual([1,2,3,4]);
  });

  // ### Exercise 3.16
  // Write a function that transforms a list of integers by adding 1 to each element.
  // (Reminder: this should be a pure function that returns a new List!)
  // ````scala
  // def add1(l: List[Int]): List[Int] = 
  //   foldRight(l, Nil:List[Int])((h,t) => Cons(h+1,t))
  // ````
  it('Exercise 3.16', () => {
    var plus1 = R.reduce((acc, n) => acc.concat(n+1), []);

    var original = [1,2,3];
    expect(plus1(original)).toEqual([2,3,4]);
    expect(original).toEqual([1,2,3]);
  });

  // ### Exerxise 3.17
  // Write a function that turns each value in a List[Double] into a String. You can use
  // the expression d.toString to convert some d: Double to a String.
  // ````scala
  // def doubleToString(l: List[Double]): List[String] = 
  //   foldRight(l, Nil:List[String])((h,t) => Cons(h.toString,t))
  // ````
  it('Exercise 3.17', () => {
    var doubleToString = R.reduce((acc, n) => acc.concat(n.toString()), []);

    expect(doubleToString([1,2,3])).toEqual(['1', '2', '3']);
  });

  // ### Exercise 3.18
  // Write a function map that generalizes modifying each element in a list while maintaining
  // the structure of the list. Here is its signature:12
  // ````scala def map[A,B](as: List[A])(f: A => B): List[B] ````
  // ````scala
  // def map[A,B](l: List[A])(f: A => B): List[B] = 
  //   foldRight(l, Nil:List[B])((h,t) => Cons(f(h),t))
  //
  // def map_1[A,B](l: List[A])(f: A => B): List[B] = 
  //   foldRightViaFoldLeft(l, Nil:List[B])((h,t) => Cons(f(h),t))
  //
  // def map_2[A,B](l: List[A])(f: A => B): List[B] = {
  //   val buf = new collection.mutable.ListBuffer[B]
  //   def go(l: List[A]): Unit = l match {
  //     case Nil => ()
  //     case Cons(h,t) => buf += f(h); go(t)
  //   }
  //   go(l)
  //   List(buf.toList: _*) // converting from the standard Scala list to the list we've defined here
  // }
  // ````
  it('Exercise 3.18', () => {
    function map(f, xs) {
      return R.reduce((acc, x) => acc.concat(f(x)), [], xs);
    }

    expect(map(R.add(10), [1,2,3])).toEqual([11,12,13]);
  });

  // ### Exercise 3.19
  // Write a function filter that removes elements from a list unless they satisfy a given
  // predicate. Use it to remove all odd numbers from a ```` List[Int] ````.
  //
  // ```` def filter[A](as: List[A])(f: A => Boolean): List[A] ````
  xit('Exercise 3.19', () => {

    // CONTINUE HERE

    function filter(f, xs) {
      return R.reduce(
        (acc, x) => { 
          if(f(x)) acc.concat(x);
          return acc;
        },
        [],
        xs);
    }

    var isEven = (n) => n % 2 === 0;
    expect(isEven(2)).toBeTruthy()
    expect(isEven(3)).toBeFalsy()
    expect(filter(isEven, [1,2,3,4,5,6])).toEqual([2,4,6]);
  });
});
