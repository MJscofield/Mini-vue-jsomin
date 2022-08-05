import { isReactive, isReadonly, reactive,isProxy } from "../src/reactive";
describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(original).not.toBe(observed);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true)
    expect(isReadonly(observed)).toBe(false)
    expect(isProxy(observed)).toBe(true)
  });
});
