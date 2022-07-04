/**
Test if a type extends another type.
 
@return boolean
*/

export type ExpectExtend<TType, TBaseType> = [TType] extends [TBaseType] ? true : false;

/**
Test if a type is strictly equal to another type.
 
@return boolean
*/
export type ExpectEqual<TTypeA, TTypeB> = ExpectExtend<TTypeA, TTypeB> extends true
	? ExpectExtend<TTypeB, TTypeA>
	: false;

/**
Create a test API around the given type.

@example
```
expectType<boolean>().toAccept(true);
expectType<true>().toAccept(false); // ts-error

expectType('Hello').toExtend('42').toBe(true);
expectType<string>().toExtend('42').toBe(true);
expectType('Hello').toExtend<string>().toBe(true);
expectType<string>().toExtend<string>().toBe(true);

expectType<boolean>().toExtend<true>().toBe(true); // ts-error
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
expectType<TypeA>().toExtend<TypeB>().toBe(true); // ts-error

expectType<TypeA>().toEqual<TypeA>().toBe(true);
expectType<TypeA>().toEqual<TypeB>().toBe(true); // ts-error
expectType<TypeB>().toEqual<TypeA>().toBe(true); // ts-error
```

@param expected 
@returns 
*/
export function expectType<TType>(expected?: TType) {
	return {
		expected,
		toExtend<TBaseType>(recived?: TBaseType) {
			return {
				expected,
				recived,
				toBe(valid: ExpectExtend<TType, TBaseType>) {
					return valid;
				},
			};
		},
		toEqual<TOtherType>(recived?: TOtherType) {
			return {
				expected,
				recived,
				toBe(valid: ExpectEqual<TType, TOtherType>) {
					return valid;
				},
			};
		},
		toAccept(expected?: TType) {
			return {
				expected,
			};
		},
	};
}
