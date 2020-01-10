import * as Core from '../Core/Module.mjs';
import Attribute from '../Core/Classes/Attribute.mjs';

export default class Main extends Core.Object {
    constructor(type) {
        super(type);

        // main object
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        let bcgclr = new Attribute('background-image', "url('./Assets/burch.png')");
        this.attachAttribute(bcgclr);

        bcgclr = new Attribute('background-repeat', "round");
        this.attachAttribute(bcgclr);
    }

    setInnerHTML(value) {
        this.innerHTML = value;
    }
}
