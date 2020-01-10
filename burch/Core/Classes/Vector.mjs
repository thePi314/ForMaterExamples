import { round } from '../Calculations/Basic.mjs' ;

var pi = 3.1415962;

export default class Vector {
    constructor(angle, length, x, y) {
        this.length = length;
        this.angle = angle;

        this.x = x;
        this.y = y;
    }

    /* Returne cos(this.angle) in degrees */
    cos() {
        return round(Math.cos((this.angle * pi) / 180), 2);
    }

    /* Returne sin(this.angle) in degrees */
    sin() {
        return round(Math.sin((((this.angle + 180) * pi) / 180)), 2);
    }

    /* Returnes vector image on x axis */
    xImage() {
        return this.cos() * this.length;
    }

    /* Returnes vector image on y axis */
    yImage() {
        return this.sin() * this.length;
    }

    getInfo() {
        let info = {
            properties: {
                length: this.length,
                angle: this.angle + 90,
            },
            position: {
                x: this.x,
                y: this.y,
            },
            calculation: {
                image_on_x: this.xImage(),
                image_on_y: this.yImage(),
                sin_of_angle: this.sin(),
                cos_of_angle: this.cos()
            }
        }

        console.log('vector data!');
        console.log(info);
    }

    /* Draws Vector In Browser */
    drawHTML(detail, color, line_width) {
        //detail: 0-100 [%]
        detail = 100 - Math.min(detail, 100);

        let html_data = '<div style="position:absolute" class="vector">';
        //*init_height/height

        let len = 0;
        while (len < this.length) {
            let x = this.x + this.cos() * len;
            let y = this.y + this.sin() * len;

            html_data += '<span style="position: absolute;top: ' + y + 'px;left:' + x + 'px;width:' + line_width + 'px;height:' + line_width + 'px;background-color:' + color + ';border-radius:50%;text-align:center"></span>';

            len += (detail / 100);
        }
        html_data += '</div>';

        return html_data;
    }

    drawSVG(color, line_width) {
        //let html_data = '<svg height="' + height + '" width="' + width + '" style="position:absolute" class="vector">'
        let html_data = '<line x1="' + this.x + '" y1="' + this.y + '" x2="' + (this.x + this.cos() * this.length) + '" y2="' + (this.y + this.sin() * this.length) + '" style="stroke:' + color + ';stroke-width:' + line_width + '" />';
        //html_data += '</svg>'
        return html_data;
    }
}