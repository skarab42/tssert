import { expectType } from '../src';

expectType<boolean>().toAccept(true);
// @ts-expect-error invalid type
expectType<true>().toAccept(false);

expectType('Hello').toExtend('42').toBe(true);
expectType<string>().toExtend('42').toBe(true);
expectType('Hello').toExtend<string>().toBe(true);
expectType<string>().toExtend<string>().toBe(true);

// @ts-expect-error invalid type
expectType<boolean>().toExtend<true>().toBe(true);
expectType<true>().toExtend<boolean>().toBe(true);

interface TypeA {
	a: 42;
	b: string | number;
}

interface TypeB {
	a: 42;
	b: number;
}

expectType<TypeB>().toExtend<TypeA>().toBe(true);

// @ts-expect-error invalid type
expectType<TypeA>().toExtend<TypeB>().toBe(true);

expectType<TypeA>().toEqual<TypeA>().toBe(true);

// @ts-expect-error invalid type
expectType<TypeA>().toEqual<TypeB>().toBe(true);

// @ts-expect-error invalid type
expectType<TypeB>().toEqual<TypeA>().toBe(true);
