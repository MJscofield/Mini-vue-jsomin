import { trackEffects, triggerEffects} from './effect'
class RefImpl {
    private _value :any
    public dep;
    constructor(value){
        this._value = value
        this.dep = new Set()
    }
    get value(){
        trackEffects(this.dep)
        return this._value
    }
    set value(newValue){
        // 先修改value
        this._value = newValue
        triggerEffects(this.dep)
    }
}

export function ref(value){
    return new RefImpl(value)
}