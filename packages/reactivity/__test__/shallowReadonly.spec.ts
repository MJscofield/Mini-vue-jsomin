import { isReactive, isReadonly, readonly, shallowReadonly } from "../src/reactive";

describe("shallowReadonly", () => {
  test("should not make non-reactive properties reactive", () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });

  it("should call console.warn when set",()=>{
    console.warn = jest.fn()
    const user  = shallowReadonly({
      age:10
    });
    user.age = 11;
    expect(console.warn).toHaveBeenCalled()
  })
  // test("should differentiate from normal readonly calls", async () => {
  //   const original = { foo: {} };
  //   const shallowProxy = shallowReadonly(original);
  //   const reactiveProxy = readonly(original);
  //   expect(shallowProxy).not.toBe(reactiveProxy);
  //   expect(isReadonly(shallowProxy.foo)).toBe(false);
  //   expect(isReadonly(reactiveProxy.foo)).toBe(true);
  // });
});
