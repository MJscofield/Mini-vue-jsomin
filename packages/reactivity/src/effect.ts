let activeEffect;

class ReactiveEffect{
    constructor(public fn){
    }
    run(){
        activeEffect = this
        return this.fn()
    }
}
const targetMap = new Map()
export function track(target,key){
    let depsMap = targetMap.get(target)
    if(!depsMap){
         depsMap = new Map()
        // 这一步不懂
        targetMap.set(target,depsMap)
    }

    let dep = depsMap.get(key)
    if(!dep){
         dep = new Set()
         depsMap.set(key,dep)
    }
    dep.add(activeEffect)
}
export function trigger(target, key){
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    for(const effect of dep){
        effect.run()
    }
} 
export function effect(fn){
    // fn
    const _effect = new ReactiveEffect(fn)

    _effect.run()
}