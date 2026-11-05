---
titulo: Property-based testing found me a bug with Somali numerals I didn't even know existed
titulo_seo: Property-Based Testing in Python: A Bug with Somali Numerals
fecha: 2026-11-04
actualizado: 2026-11-04
descripcion: Property-based testing with Hypothesis (Python) and fast-check (TypeScript): two examples and a Somali numerals bug I would never have written by hand.
destacado: Somali numerals
secciones: Python, TypeScript
link_linkedin: https://www.linkedin.com/pulse/property-based-testing-me-encontr%C3%B3-un-bug-con-n%C3%BAmeros-asdr%C3%BAbal-su%C3%A1rez-sgoyc
link_x: https://x.com/AsdrubalCodes/status/2118015250947850743
traduccion_de: property-based-testing
---

Imagine that you are learning to form plurals in English. Your teacher asks you: cat, cats, dog, dogs, book, books.

Now imagine that instead of 3 they give you hundreds of nouns, some regular, others irregular, words that end in -y, -s, -x.

Suddenly child, childs with an s shows up, and there we find something that the previous 3 examples didn't detect.

That is how property-based testing works. Instead of writing specific cases, you define a property that your code must satisfy and you let a tool generate many inputs to try to find examples that break what you are testing.

There are different libraries for this. In Python there is Hypothesis. In TypeScript there is fast-check.

Let's go with 2 examples.

### Example 1: Python with Hypothesis

Let's start with a simple function, which calculates the average of a list of numbers:

```python
def average(numbers):
    return sum(numbers) / len(numbers)
```

Normally you would test it with a couple of lists, like `[2, 4, 6]` and `[10]`, and both pass.

With property-based testing the question changes: what always has to be true, no matter the list? In this case, the average can never be less than the smallest number or greater than the largest.

```python
from hypothesis import given, strategies as st

@given(st.lists(st.integers(min_value=-1000, max_value=1000)))
def test_average_is_between_min_and_max(numbers):
    result = average(numbers)
    assert min(numbers) <= result <= max(numbers)
```

`@given` tells Hypothesis to generate the lists of integers for me, so I don't write any of them. I run it and it fails:

```text
numbers = []
ZeroDivisionError: division by zero
```

It hadn't even crossed my mind to try the empty list. Hypothesis found it on its own, and also showed it to me as the smallest case that breaks the function.

Now I have to decide what should happen with an empty list. For me it is an error, so I say it explicitly:

```python
def average(numbers):
    if not numbers:
        raise ValueError("Cannot average an empty list")
    return sum(numbers) / len(numbers)
```

And with `min_size=1` I tell the test that the lists must have at least one number:

```python
@given(st.lists(st.integers(min_value=-1000, max_value=1000), min_size=1))
```

With that, it passes.

### Example 2: TypeScript with fast-check

The second example is a function that applies a discount to a price:

```ts
function applyDiscount(price: number, percentage: number): number {
  return price - price * (percentage / 100);
}
```

If I test it with `applyDiscount(100, 10)`, it gives 90. All good.

The property I want to always hold is that the final price is never negative and never greater than the original price.

```ts
import fc from "fast-check";

fc.assert(
  fc.property(
    fc.integer({ min: 0, max: 10_000 }), // price
    fc.integer(),                        // percentage, any integer
    (price, percentage) => {
      const final = applyDiscount(price, percentage);
      return final >= 0 && final <= price;
    }
  )
);
```

fast-check tries many prices and percentages, and it fails:

```text
Counterexample: [1,101]
Shrunk 36 time(s)
```

A price of 1 with a 101% discount gives a negative price. Look at `Shrunk 36 time(s)`: fast-check first found a big case that failed, and it kept shrinking that case down to the simplest one. That way I don't have to decipher a weird number.

If one day a bad percentage gets loaded into the database, the store ends up paying the customer.

The fix is to validate the percentage so it stays between 0 and 100:

```ts
function applyDiscount(price: number, percentage: number): number {
  const p = Math.min(Math.max(percentage, 0), 100);
  return price - price * (p / 100);
}
```

With that, the property passes.

Note from November 4, 2026: I said "validate" here, but that code only clamps the value. `applyDiscount(100, 101)` returns `0`, so the property passes and the store gives the product away without warning. Actually validating means rejecting the bad value, as in the Python example:

```ts
function applyDiscount(price: number, percentage: number): number {
  if (!(percentage >= 0 && percentage <= 100)) {
    throw new RangeError("The percentage must be between 0 and 100");
  }
  return price - price * (percentage / 100);
}
```

And with `fc.integer({ min: 0, max: 100 })` I tell the test that percentages must be between 0 and 100. With that, it passes.

Something like this happened to me while validating numerals in Python. Hypothesis found that the system failed with Somali numerals, which I didn't even know existed. I would never have thought to write that case by hand.
