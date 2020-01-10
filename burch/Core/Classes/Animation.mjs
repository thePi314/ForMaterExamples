export default class Animation {
    constructor(value, min, max, speed, add, type) {
        this.animation_interval = null;
        this.value_default = value;
        this.value_min = min;
        this.value_max = max;
        this.value_add = add;
        this.type = type;


        /*
         * types:
         * 'repeat'         : from default to max, from max to default
         * '-repeat'        : from default to min, from min to default
         * 'value'          : from default to max
         * '-value'         : from default to min 
         * 'loop':          : from default to max, from max to min
         * '-loop':         : from default to min, from min to max 
         * 'loop repeat'    : from default to max, from max to min, from min to default
         * '-loop repeat'   : from default to min, from min to max , from max to default 
         *
         */

        this.speed = speed;
    }

    animate() {
        this.animation_interval = setInterval(function () {
            loop();
        }, this.speed);
    }

    inProgress() {
        return (this.animation_interval == 0);
    }

    /* Override */
    loop() {

    }
}