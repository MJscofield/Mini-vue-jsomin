import { reactive} from '../src/reactive'
import { effect} from '../src/effect'
describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });
    let newAge;
    effect(() => {
      newAge = user.age + 1;
    });
    expect(newAge).toBe(11);
    user.age++;
    expect(newAge).toBe(12);
  });
});
