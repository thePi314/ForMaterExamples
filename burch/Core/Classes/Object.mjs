import { default as Position } from './Position.mjs';
import { default as Attribute } from './Attribute.mjs' ;

export default class Object extends Position {
    constructor(type, id, name = 'object', innerHTML = '', children = null) {
        super(0, 0, 0, 0);
        this.id = id;
        this.name = name;
        this.type = type;

        this.attributes = [];
        this.children = children;
        this.parent = null;

        this.innerHTML = ''
    }

    /*color
     *
     * Event List:
     *   onclick
     *   mousedown
     *   mouseup
     *   mousemove
     *   keydown
     *   keyup
     * 
     */

    attachChildren(object) {
        if (this.children == null) {
            this.children = [];
        }
        this.children.parent = this;
        this.children.push(object);
    }

    attachAttribute(attribute) {
        this.attributes.push(attribute);
    }

    getAttributesStyle() {
        let style = "";

        if (this.attributes.length != 0) {
            for (let ind = 0; ind < this.attributes.length; ind++)
                style += this.attributes[ind].getCSS();
        }

        return style;
    }

    attachEvents(events_json) {
        let id_dom = document.getElementById(String(this.id));
        for (key in events_json) {
            id_dom.addEventListener(key, events_json[events_json], false);
        }
    }

    getHTML(width, height) {
        return '<' + this.type + ' id ="' + this.id + '" style = "' + this.getAttributesStyle() + this.inStyle(width, height, width, height) + '" >' + this.innerHTML + this.getChildrenHTML(width, height) + '</' + this.type + '>';
    }

    getChildrenHTML(width, height) {
        if (this.children != null) {
            let html_data = ''
            for (let ind = 0; ind < this.children.length; ind++) {
                html_data += this.children[ind].getHTML(width, height, width, height);
            }

            return html_data;
        }

        return ''
    }
}