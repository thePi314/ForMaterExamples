export default class Attribute {
    constructor(name, value, max_value = null, min_value = null , interval_function = null ) {
        this.name = name;
        this.value = value;

        this.value_max = max_value;
        this.value_min = min_value;

        this.interval = null;
        this.interval_function = null ;
    }

    getCSS(){
        return this.name+":"+this.value+";" ;
    }

    startLoop( frame_speed ) {
        this.stopLoop();

        if( this.interval_function != null ){
            this.interval = setInterval( this.interval_function , frame_speed ) ;
        }
    }

    stopLoop() {
        if (this.interval != null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    changeValue(new_value) {
        if (this.max_value != null && this.min_value != null) {
            this.value = (this.value_min <= new_value && new_value <= this.value_max) ? new_value : ((new_value < this.value_min) ? this.value_min : this.value_max);
            return;
        }

        if (this.max_value == null && this.min_value != null) {
            this.value = (this.value_min <= new_value) ? new_value : this.value_min;
            return;
        }

        if (this.max_value != null && this.min_value == null) {
            this.value = (new_value <= this.value_max) ? new_value : this.value_max;
            return;
        }

        this.value = new_value;
    }

    addValue(add_value) {
        if (this.max_value != null && this.min_value != null) {
            this.value = (this.value_min <= this.value + add_value && this.value + add_value <= this.value_max) ? this.value + add_value : ((this.value + add_value < this.value_min) ? this.value_min : this.value_max);
            return;
        }

        if (this.max_value == null && this.min_value != null) {
            this.value = (this.value_min <= this.value + add_value) ? this.value + add_value : this.value_min;
            return;
        }

        if (this.max_value != null && this.min_value == null) {
            this.value = (this.value + add_value <= this.value_max) ? this.value + add_value : this.value_max;
            return;
        }

        this.value += add_value;
    }
}