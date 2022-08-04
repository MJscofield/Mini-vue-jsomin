import { extend, isObject } from "../../shared";
import { track, trigger } from "./effect";
import { reactive, ReactiveFlags, readonly, shallowReadonly } from "./reactive";
 const get = CreateGetter()
 const set = CreateSetter()
 const readonlyGetter= CreateGetter(true)
 const shallowReadonlyGet = CreateGetter(true,true)
// 封装Getter函数
function CreateGetter(isReadonly = false, shallow = false){
    return function get(target,key){
        console.log(key)
        if(key=== ReactiveFlags.IS_REACTIVE){
            return !isReadonly
        }else if(key=== ReactiveFlags.IS_READONLY){
          return isReadonly
        }

      const res = Reflect.get(target, key);
      if(!isReadonly){
        // TODO 依赖收集
      track(target,key)
      }
      if(shallow){
        return res
      }
      if(isObject(res)){
        return isReadonly? readonly(res):reactive(res)
      }
      
      return res;
    }
  }

// 封装Setter函数
function CreateSetter(){
    return function  set(target,key,value){
        const res = Reflect.set(target,key,value)
  
        // TODO 触发依赖
        trigger(target,key)
        return res
      }
}


export const mutableHandlers = {
    get,
    set
}
export const readonlyHandlers = {
    get:readonlyGetter,
    set(target,key,value){
        console.warn(`${key} set操作失败， 因为target 是readonly`,target)
      return true
    }
}

export const shallowReadonlyHandlers = extend({},readonlyHandlers,{
  get: shallowReadonlyGet
})