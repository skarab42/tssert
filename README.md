# @skarab/tssert

Micro TypeScript assertion (test) library.

> Add your assertions to your usual test suite and run `tsc --noEmit`, enjoy!

📌 Please note that this library does not perform any check at runtime, but only at compile time (or in your IDE).

# Why ?

An attempt to reduce the [verbosity](https://github.com/colinhacks/zod/blob/51e93e7dd30b161d55e2f17d0907ecdd2f526c60/src/__tests__/default.test.ts#L51-L56) of type testing.

# Install

```bash
pnpm add @skarab/tssert typescript
```

# Usages

## With a full description of the error

```ts
import { expectType } from '@skarab/tssert';

expectType<boolean>().toAccept(true);
expectType<true>().toAccept(false); // ts-error with description
```

## Without error description, but stricter and more flexible

```ts
expectType('Hello').toExtend('42').toBe(true);
expectType<string>().toExtend('42').toBe(true);
expectType('Hello').toExtend<string>().toBe(true);
expectType<string>().toExtend<string>().toBe(true);

expectType<boolean>().toExtend<true>().toBe(true); // ts-error
expectType<true>().toExtend<boolean>().toBe(true);
```

> When you move the mouse over `toAccept`, `toExtend` and `toEqual` you can see the expected and received values.
>
> ![Sans titre](https://user-images.githubusercontent.com/62928763/177138437-c9b271dd-e99f-41b7-9415-146cd2981076.png)

# API

## toExtend()

```ts
interface TypeA {
	a: 42;
	b: string | number;
}

interface TypeB {
	a: 42;
	b: number;
}

expectType<TypeB>().toExtend<TypeA>().toBe(true);
expectType<TypeA>().toExtend<TypeB>().toBe(true); // ts-error
```

## toEqual()

```ts
expectType<TypeA>().toEqual<TypeA>().toBe(true);
expectType<TypeA>().toEqual<TypeB>().toBe(true); // ts-error
expectType<TypeB>().toEqual<TypeA>().toBe(true); // ts-error
```

## Types ...

```ts
import type { ExpectExtend, ExpectEqual } from '@skarab/tssert';

type A = ExpectExtend<TypeB, TypeA>; // true
type B = ExpectEqual<TypeA, TypeB>; // false
```

# TypeScript ~~god~~ strict mode

It is strongly recommended to activate the [strict](https://www.typescriptlang.org/tsconfig#strict) mode of TypeScript which will activate all checking behaviours that results in stronger guarantees of the program's correctness.

# Contributing 💜

See [CONTRIBUTING.md](https://github.com/skarab42/tssert/blob/main/CONTRIBUTING.md)
