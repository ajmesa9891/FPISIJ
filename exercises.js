"use strict";
//Functional Programming In Scala In JavaScript
//=============================================
//Functional Programming In Scala In JavaScript.
//Based on the book "Functional Programming in Scala".

// ***
// *I'm skipping many problems and focusing only in ones I'm interested on.*
// Also, testing is not the main point so the tests are very superficial.
// ***

//Chapter 1 What is functional programming?
//---------------------
// No exercises.
describe("Chapter 1", function() {

  it("has no exercises.", function() {
    expect(1).toBe(1);
  });

});

//Chapter 2 Getting started with functional programming in Scala
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
//Chapter 3 Functional data structures
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
    // Functions in Ramda (R) is curried. Here JavaScript seems more succint
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
  // is achievable in JavaScript. Thankfully we can wrap those in a
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
  // foldLeft solution. I initially did a reduceRight in JavaScript, and
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
  // ````scala def filter[A](as: List[A])(f: A => Boolean): List[A] ````
  // ````scala
  // def filter[A](l: List[A])(f: A => Boolean): List[A] = 
  //   foldRight(l, Nil:List[A])((h,t) => if (f(h)) Cons(h,t) else t)
  // ````
  it('Exercise 3.19', () => {

    function filter(f, xs) {
      return R.reduce(
        (acc, x) => { 
          if(f(x)) acc = acc.concat(x);
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

  // ### Exercise 3.20
  // Write a function ```` flatMap ```` that works like map except
  // that the function given will return a list instead of a single result,
  // and that list should be inserted into the final resulting list.
  // Here is its signature:
  // ````scala 
  // def flatMap[A,B](as: List[A])(f: A => List[B]): List[B] 
  // ````
  // For instance, 
  // ````scala flatMap(List(1,2,3))(i => List(i,i)) ````
  // should result in ````scala List(1,1,2,2,3,3) ```` . 
  // ````scala
  // def flatMap[A,B](l: List[A])(f: A => List[B]): List[B] = 
  //   concat(map(l)(f))
  // ````
  it('Exercise 3.20', () => {
    var flatMap = (f, xs) => {
      return R.reduce(
        (acc, x) => acc.concat(f(x)),
        [],
        xs);
    };

    var flatMap2 = (f, xs) => R.flatten(R.map(f, xs));

    var duplicate = (n) => [n, n];
    expect(flatMap(duplicate, [1,2,3])).toEqual([1,1,2,2,3,3]);
    expect(flatMap2(duplicate, [1,2,3])).toEqual([1,1,2,2,3,3]);
  });

  // ### Exercise 3.21
  // Use ````flatMap```` [(````R.chain````)] to implement ````filter````.
  // ````scala
  // def filterViaFlatMap[A](l: List[A])(f: A => Boolean): List[A] =
  //   flatMap(l)(a => if (f(a)) List(a) else Nil)
  // ````
  it('Exercise 3.21', () => {
    var filter = (f, xs) => R.chain((x) => f(x) ? [x] : [], xs);

    var isEven = (n) => n % 2 === 0;
    expect(isEven(2)).toBeTruthy()
    expect(isEven(3)).toBeFalsy()
    expect(filter(isEven, [1,2,3,4,5,6])).toEqual([2,4,6]);
  });

  // ### Exercise 3.22
  // Write a function that accepts two lists and constructs a new list by 
  // adding corresponding elements. For example, 
  // ````scala List(1,2,3) ````
  // and ````scala List(4,5,6) ```` become ````scala List(5,7,9) ````.
  // ````scala
  // def addPairwise(a: List[Int], b: List[Int]): List[Int] = (a,b) match {
  //   case (Nil, _) => Nil
  //   case (_, Nil) => Nil
  //   case (Cons(h1,t1), Cons(h2,t2)) => Cons(h1+h2, addPairwise(t1,t2))
  // }
  // ````
  it('Exercise 3.22', () => {
    var t = (l1, l2) => R.map(R.apply(R.add), R.zip(l1,l2));

    expect(t([1,2,3], [4,5,6])).toEqual([5,7,9]);
  });

  // ### Exercise 3.23
  // Generalize the function you just wrote so that it’s not specific to
  // integers or addition. Name your generalized 
  // function ````scala zipWith ````.
  // ````scala
  // def zipWith[A,B,C](a: List[A], b: List[B])(f: (A,B) => C): List[C] = (a,b) match {
  //   case (Nil, _) => Nil
  //   case (_, Nil) => Nil
  //   case (Cons(h1,t1), Cons(h2,t2)) => Cons(f(h1,h2), zipWith(t1,t2)(f))
  // }
  // ````
  it('Exercise 3.23', () => {
    var zipWith = (f, l1, l2) => R.map(R.apply(f), R.zip(l1, l2));

    expect(zipWith(R.add, [1,2,3], [4,5,6])).toEqual([5,7,9]);
  });

  // ### Exercise 3.24
  // Hard: As an example, implement ```` hasSubsequence ```` for checking 
  // whether a ```` List ```` contains another ```` List ```` as a subsequence.
  // For instance, ```` List(1,2,3,4) ```` would have 
  // ````List(1,2) ````, ```` List(2,3) ````, and ```` List(4) ```` as
  // subsequences, among others. You may have some difficulty finding a
  // concise purely functional implementation that is also efficient.
  // That’s okay. Implement the function however comes most naturally. 
  // We’ll return to this implementation in chapter 5 and hopefully 
  // improve on it. Note: Any two values x and y can be compared for
  // equality in Scala using the expression x == y.
  // ````scala 
  // def hasSubsequence[A](sup: List[A], sub: List[A]): Boolean
  // ````
  // ````scala
  // def startsWith[A](l: List[A], prefix: List[A]): Boolean = (l,prefix) match {
  //   case (_,Nil) => true
  //   case (Cons(h,t),Cons(h2,t2)) if h == h2 => startsWith(t, t2)
  //   case _ => false
  // }
  // @annotation.tailrec
  // def hasSubsequence[A](l: List[A], sub: List[A]): Boolean = l match {
  //   case Nil => false
  //   case Cons(h,t) if startsWith(l, sub) => true
  //   case Cons(h,t) => hasSubsequence(t, sub)  
  // }
  // ````
  it('Exercise 3.24', () => {
    function startsWith(l, sub) {
      if (R.isEmpty(sub)) return true;
      if (l[0] === sub[0]) return startsWith(R.drop(1, l), R.drop(1, sub));
      return false;
    }

    function hasSub(l, sub) {
      if (R.isEmpty(l)) return false;
      return startsWith(l, sub) || hasSub(R.drop(1, l), sub);
    }

    expect(hasSub([1,2,3], [1,2])).toBeTruthy();
    expect(hasSub([1,2,3], [1,2,3])).toBeTruthy();
    expect(hasSub([1,2,3,4,5], [3,4])).toBeTruthy();
    
    expect(hasSub([1,2,3,4,5], [4,3])).toBeFalsy();
    expect(hasSub([1,2,3,4,5], [0,1,2,3])).toBeFalsy();
  });

  // ### Exercise 3.25
  // Write a function ```` size ```` that counts the number of nodes
  // (leaves and branches) in a tree.
  it('Exercise 3.25', () => {
    // For this exercise we need to first define Tree, Leaf, and Branch in
    // JavaScript. Here is how the book defines it in Scala:
    // ````scala
    // sealed trait Tree[+A]
    // case class Leaf[A](value: A) extends Tree[A]
    // case class Branch[A](left: Tree[A], right: Tree[A]) extends Tree[A]
    // ````
    // In Scala, functions would be able to pattern match the subclasses
    // and change behavior based on that. I don't know of a simlar construct
    // in JavaScript. I'm using classes and instanceof, you should let me
    // know if there's a better alternative!
    class Tree { };
    class Leaf extends Tree {
      constructor(value) { 
        super();
        this.value = value; 
      }
    }
    class Branch extends Tree {
      constructor(l, r) { 
        super();
        this.l = l; 
        this.r = r;
      }
    }
    // JavaScript seems nasty and inadequate here. There's too much noise,
    // and the lack of types reduces rigor and understanding to new
    // readers. Let's try to solve the problem now.
    function size(tree) {
      if (tree instanceof Leaf) return 1;
      if (tree instanceof Branch) return 1 + size(tree.l) + size(tree.r);
    }
    // ````scala
    // def size[A](t: Tree[A]): Int = t match {
    //   case Leaf(_) => 1
    //   case Branch(l,r) => 1 + size(l) + size(r)
    // }
    // ````
    // Visually the JavaScript implementation of size is not terrible (but
    // the implementation of Tree, Leaf, and Branch are). And even beyond the
    // visual aspect, the Scala implementation is guaranteed to have a case
    // for any given input. The JavaScript implementation would "silently"
    // fail when given, say, a Monkey instead of a Branch.
    //
    // This adds to the lack of rigor caused by JavaScript's typeless nature.
    // I would research for alternatives that compile down to JavaScript, but
    // I'm going to keep this a purely JavaScript solution for now.
    var t1 = new Branch(new Leaf(2), new Leaf(10));
    expect(size(t1)).toBe(3);
    var t2 = new Leaf(1);
    expect(size(t2)).toBe(1);
    var t3 = 
    new Branch(
      new Branch(
        new Leaf(2),
        new Leaf(10)), 
      new Branch(
        new Branch(
          new Leaf(1),
          new Branch(
            new Leaf(898),
            new Leaf(1209))),
        new Leaf(7908)));
    expect(size(t3)).toBe(11);

    // The Folktale library deals with it by adding a ```` isType ```` 
    // method to the super class. For example, the ```` Either ````
    // has subclasses ```` Left ```` and ```` Right ```` and properties 
    // ```` isLeft ```` and ```` isRight ````. In our case, that would add
    // even more noise to the Tree/Branch/Leaf implementations, 
    // but it does make it a bit nicer to write client implementations.
    // Let's try it out.
    class Tree2 {
      static isLeaf() { return false; }
      static isBranch() { return false; }
    };
    class Leaf2 extends Tree2 {
      static isLeaf() { return true; }

      constructor(value) { 
        super();
        this.value = value; 
      }
    }
    class Branch2 extends Tree2 {
      static isBranch() { return true; }

      constructor(l, r) { 
        super();
        this.l = l; 
        this.r = r;
      }
    }

    window.Tree = Tree2;
    window.Leaf = Leaf2;
    window.Branch = Branch2;

    // The implementation is slightly nicer, but it does add quite a bit of noise
    // to the classes. I'm split as to which way to pick, but I don't think
    // it's important.
    //
    // It may be worth skipping the class definitions to take advantage
    // of mixins with the prototype. I may look into this at a later point.
    // The idea is there may be a mixin we can write that adds this details
    // to the prototype of any class automatically.
    function size2(tree) {
      if (tree.constructor.isLeaf()) return 1;
      if (tree.constructor.isBranch()) return 1 + size2(tree.l) + size2(tree.r);
    }

    t1 = new Branch2(new Leaf2(2), new Leaf2(10));
    expect(size2(t1)).toBe(3);
    t2 = new Leaf2(1);
    expect(size2(t2)).toBe(1);
    t3 = 
    new Branch2(
      new Branch2(
        new Leaf2(2),
        new Leaf2(10)), 
      new Branch2(
        new Branch2(
          new Leaf2(1),
          new Branch2(
            new Leaf2(898),
            new Leaf2(1209))),
        new Leaf2(7908)));
    expect(size2(t3)).toBe(11);

  });

  

  // ### Exercise 3.26
  // Write a function ```` maximum ```` that returns the maximum element in a
  // ```` Tree[Int] ````.
  // ````scala
  // def maximum(t: Tree[Int]): Int = t match {
  //   case Leaf(n) => n
  //   case Branch(l,r) => maximum(l) max maximum(r)
  // }
  // ````
  // Again, same inadequacy as in exercise 3.25. I'm not going to keep
  // writing about it, but it's something to keep in mind.
  it('Exercise 3.26', () => {
    function maximum(tree) {
      if (tree.constructor.isLeaf()) return tree.value;
      if (tree.constructor.isBranch()) 
        return R.max(maximum(tree.l), maximum(tree.r));
    }

    var t1 = new Leaf(4);
    expect(maximum(t1)).toBe(4);
    var t3 = 
    new Branch(
      new Branch(
        new Leaf(20),
        new Leaf(10)), 
      new Branch(
        new Branch(
          new Leaf(1),
          new Branch(
            new Leaf(898),
            new Leaf(109))),
        new Leaf(7908)));
    expect(maximum(t3)).toBe(7908);
  });

  // ### Exercise 3.27
  // Write a function ```` depth ```` that returns the maximum path length
  // from the root of a tree to any leaf.
  // ````scala
  // def depth[A](t: Tree[A]): Int = t match {
  //   case Leaf(_) => 0
  //   case Branch(l,r) => 1 + (depth(l) max depth(r))
  // }
  // ````
  it('Exercise 3.27', () => {
    function depth(tree) {
      if (tree.constructor.isLeaf()) return 0;
      if (tree.constructor.isBranch())
        return 1 + R.max(depth(tree.l), depth(tree.r));
    }

    var t1 = new Leaf(4);
    expect(depth(t1)).toBe(0);
    var t3 = 
    new Branch(
      new Branch(
        new Leaf(20),
        new Leaf(10)), 
      new Branch(
        new Branch(
          new Leaf(1),
          new Branch(
            new Leaf(898),
            new Leaf(109))),
        new Leaf(7908)));
    expect(depth(t3)).toBe(4);
  });

  // ### Exercise 3.28
  // Write a function ```` map ````, analogous to the method of the same name
  // on ```` List ````, that modifies each element in a tree with
  // a given function.
  // ````scala
  // def map[A,B](t: Tree[A])(f: A => B): Tree[B] = t match {
  //   case Leaf(a) => Leaf(f(a))
  //   case Branch(l,r) => Branch(map(l)(f), map(r)(f))
  // }
  // ````
  it('Exercise 3.28', () => {
    function map(f, tree) {
      if (tree.constructor.isLeaf())
        return new Leaf(f(tree.value));
      if (tree.constructor.isBranch())
        return new Branch(map(f, tree.l), map(f, tree.r));
    }

    var t1 = new Leaf(4);
    expect(map(R.add(1), t1)).toEqual(new Leaf(5));

    var t3 = 
    new Branch(
      new Branch(
        new Leaf(20),
        new Leaf(10)), 
      new Branch(
        new Branch(
          new Leaf(1),
          new Branch(
            new Leaf(898),
            new Leaf(109))),
        new Leaf(7908)));
    var t3Plus1 = 
    new Branch(
      new Branch(
        new Leaf(21),
        new Leaf(11)), 
      new Branch(
        new Branch(
          new Leaf(2),
          new Branch(
            new Leaf(899),
            new Leaf(110))),
        new Leaf(7909)));
    expect(map(R.add(1), t3)).toEqual(t3Plus1);
  });

  // ### Exercise 3.29
  // Generalize ```` size ````, ```` maximum ````, ```` depth ````, and
  // ```` map ````, writing a new function ```` fold ```` that abstracts
  // over their similarities. Reimplement them in terms of this more
  // general function. Can you draw an analogy between this ```` fold ````
  // function and the left and right folds for ```` List ````?
  it('Exercise 3.29', () => {
    // ````scala
    // def fold[A,B](t: Tree[A])(f: A => B)(g: (B,B) => B): B = t match {
    //   case Leaf(a) => f(a)
    //   case Branch(l,r) => g(fold(l)(f)(g), fold(r)(f)(g))
    // }
    // ````
    function fold(m, f, tree) {
      if (tree.constructor.isLeaf())
        return m(tree);
      if (tree.constructor.isBranch()){
        return f(f(m(tree), fold(m, f, tree.l)), fold(m, f, tree.r));
      }
    }

    fold = R.curry(fold);

    // ````scala
    // def sizeViaFold[A](t: Tree[A]): Int = 
    //   fold(t)(a => 1)(1 + _ + _)
    // ````
    var size = fold(t => 1)(R.add);

    var t1 = new Branch(new Leaf(2), new Leaf(10));
    expect(size(t1)).toBe(3);
    var t2 = new Leaf(1);
    expect(size(t2)).toBe(1);
    var t3 = 
    new Branch(
      new Branch(
        new Leaf(2),
        new Leaf(10)), 
      new Branch(
        new Branch(
          new Leaf(1),
          new Branch(
            new Leaf(898),
            new Leaf(1209))),
        new Leaf(7908)));
    expect(size(t3)).toBe(11);

    // I cannot simply use ```` R.prop('value') ```` because ```` R.max ````
    // value may be undefined and ```` R.max(undefined, x) ```` is always
    // undefined. So I had to default to a minimum value so undefined
    // is turned to ```` Number.MIN_VALUE ````.
    // ````scala
    // def maximumViaFold(t: Tree[Int]): Int = 
    //   fold(t)(a => a)(_ max _)
    // ````
    var getValue = R.pipe(R.prop('value'), R.defaultTo(Number.MIN_VALUE));
    var maximum = fold(getValue)(R.max);
    

    var t1 = new Leaf(4);
    expect(maximum(t1)).toBe(4);
    var t3 = 
    new Branch(
      new Branch(
        new Leaf(20),
        new Leaf(10)), 
      new Branch(
        new Branch(
          new Leaf(1),
          new Branch(
            new Leaf(898),
            new Leaf(109))),
        new Leaf(7908)));
    expect(maximum(t3)).toBe(7908);

    // I thnink this is enough, so I won't continue implementing the other
    // functions.
  });
});


//Chapter 4 Handling errors without exceptions
//---------------------

describe("Chapter 4", function() {

  // ### Exercise 4.1
  // Implement all of the preceding functions on ```` Option ```` .
  // As you implement each function, try to think about what it means and
  // in what situations you’d use it. We’ll explore when
  // to use each of these functions next.
  it('Exercise 4.1', () => {
    // Folktale's ```` data.maybe ```` is the equivalent of 
    // ```` Option ```` in scala. I'm 
    // using ````data.maybe ```` in most exercises. Here I'm implementing 
    // it myself to implement the functions that are already in
    // ```` data.maybe ````'s prototype.
    class Maybe {
      static isNothing() { return false; }
      static isJust() { return false; }

      // ````scala
      // def getOrElse[B>:A](default: => B): B = this match {
      //   case None => default
      //   case Some(a) => a
      // }
      // ````
      getOrElse(def) {
        if (this.constructor.isNothing()) return def;
        if (this.constructor.isJust()) return this.value;
      }

      // ````scala
      // def orElse_1[B>:A](ob: => Option[B]): Option[B] = this match {
      //   case None => ob 
      //   case _ => this
      // }
      // ````
      orElse(getMaybe) {
        if (this.constructor.isNothing()) return getMaybe();
        if (this.constructor.isJust()) return this;
      }

      // ````scala
      // def map[B](f: A => B): Option[B] = this match {
      //   case None => None
      //   case Some(a) => Some(f(a))
      // }
      // ````
      map(f) {
        if (this.constructor.isNothing()) return this;
        if (this.constructor.isJust()) return new Just(f(this.value));
      }

      // ````scala
      // def flatMap[B](f: A => Option[B]): Option[B] = 
      //   map(f) getOrElse None
      // ````
      // The above is a better way to solve this problem. And Scala and
      // languages where everything is curried lend itself to these type of
      // solutions, though it can also be done in JavaScript.
      flatMap(f) {
        if (this.constructor.isNothing()) return this;
        if (this.constructor.isJust()) return f(this.value);
      }

      //````scala
      // def filter_1(f: A => Boolean): Option[A] =
      //   flatMap(a => if (f(a)) Some(a) else None)
      //````
      filter(p) {
        return this.flatMap((v) => p(v) ? new Just(v) : new Nothing());
      }
    }
    class Nothing extends Maybe {
      static isNothing() { return true; }

      constructor() { super(); }
    }
    class Just extends Maybe {
      static isJust() { return true; }

      constructor(value) {
        super();
        this.value = value;
      }
    }

    // Overall I think the JavaScript implementations are good and not
    // awkward; it feels like any other functional language.
    // My main worry is the lack of rigor that comes with no types.
    // The functions that get passed in are expected to have a certain
    // signatures but they are not defined explicitely and there's no compiler
    // to enforce strictness. This has its advatages, sepcially for fast
    // prototypes, but I have found it to be dangerous in large projects.
    expect(new Nothing().getOrElse(10)).toBe(10);
    expect(new Just(87).getOrElse(10)).toBe(87);

    expect(new Nothing().orElse(() => new Just(10)).getOrElse(1))
      .toEqual(10);
    expect(new Just(33).orElse(() => new Just(22)).getOrElse(1))
      .toEqual(33);
    expect(new Just(88).orElse(() => new Nothing()).getOrElse(1))
      .toEqual(88);

    expect(new Nothing().map(v => v)).toEqual(new Nothing());
    expect(new Just(3).map(v => v + 3)).toEqual(new Just(6));

    expect(new Nothing().flatMap(v => new Just(v))).toEqual(new Nothing());
    expect(new Just(3).flatMap(v => new Just(v + 3))).toEqual(new Just(6));
    expect(new Just(3).flatMap(v => new Nothing())).toEqual(new Nothing());

    expect(new Nothing().filter(R.equals(1))).toEqual(new Nothing());
    expect(new Just(2).filter(R.equals(1))).toEqual(new Nothing());
    expect(new Just(1).filter(R.equals(1))).toEqual(new Just(1));


    // To be more concrete, this is a possible application of the Maybe
    // construct.
    function getAge(id) {
      return id == 1 ? new Just(10) : new Nothing();
    }

    var getBirthdayMessage = function (id) {
      return getAge(id)
        .map(age => "Happy birthday! You/re now " + age)
        .getOrElse("Could you please update your profile?");
    }

    expect(getBirthdayMessage(1)).toBe("Happy birthday! You/re now 10");
    expect(getBirthdayMessage(2)).toBe("Could you please update your profile?");

    // This is another way to approach the problem: separate the functions
    // from the class definition and have them take a data (objects).
    // This allows for easier composition through piping of functions,
    // as seen in the new definition of the getBirthdayMessage. We no longer
    // even need to explicitely create a function.

    var lib = {
      getOrElse: R.curry(function(def, maybe) {
        if (maybe.constructor.isNothing()) return def;
        if (maybe.constructor.isJust()) return maybe.value;
      }),

      orElse: R.curry(function(getMaybe, maybe) {
        if (maybe.constructor.isNothing()) return getMaybe();
        if (maybe.constructor.isJust()) return maybe;
      }),

      map: R.curry(function(f, maybe) {
        if (maybe.constructor.isNothing()) return maybe;
        if (maybe.constructor.isJust()) return new Just(f(maybe.value));
      }),

      flatMap: R.curry(function(f, maybe) {
        if (maybe.constructor.isNothing()) return maybe;
        if (maybe.constructor.isJust()) return f(maybe.value);
      }),

      filter: R.curry(function(p, maybe) {
        return maybe.flatMap((v) => p(v) ? new Just(v) : new Nothing());
      })
    };

    getBirthdayMessage = R.pipe(getAge,
      lib.map(age => "Happy birthday! You/re now " + age),
      lib.getOrElse("Could you please update your profile?"));

    expect(getBirthdayMessage(1)).toBe("Happy birthday! You/re now 10");
    expect(getBirthdayMessage(2)).toBe("Could you please update your profile?");
  });

  // ### Exercise 4.2
  // Implement the ```` variance ```` function in terms of ```` flatMap ````.
  // If the mean of a sequence is ```` m ````, the variance is the mean of
  // ```` math.pow(x - m, 2) ```` for each element ```` x ```` in the sequence.
  // See the definition of variance on Wikipedia (http://mng.bz/0Qsr).
  // ````scala
  // def variance(xs: Seq[Double]): Option[Double] 
  // ````
  // ````scala
  // ````
  it('Exercise 4.2', () => {

  });

  // ### Exercise 
  // 
  // ````scala
  // ````
  it('Exercise ', () => {

  });
});

//TODO
//=============================================
// * Write blog post on setup.
// * Write blog post on exercise 3.25 + prototype mixins + other alternatives.
// * Write blog post on exercise in 4.1
// * Use TypeScript and reconsider the type issues.
