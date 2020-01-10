/* Modules */
import * as Core from './Core/Module.mjs';

/* Objects */
import * as Objects from './Objects/Modules.mjs';
import { irandom_range } from './Core/Calculations/Random.mjs';

var init_width = 0;
var init_height = 0;
var width = 0;
var height = 0;

var main_window = null;

let main_object = new Objects.Main('div');

let burch_pic = new Core.Object('div', 'burch');
burch_pic.y = 68;
burch_pic.x = 39;
burch_pic.width = 1091;
burch_pic.height = 728;

burch_pic.attachAttribute(new Core.Attribute('background-image', "url('./Assets/jus_building.png')"));
burch_pic.attachAttribute(new Core.Attribute('background-repeat', "no-repeat"));

let full_black = new Core.Object('div', 'black');
full_black.attachAttribute(new Core.Attribute('opacity', 0));
full_black.attachAttribute(new Core.Attribute('background-color', "darkblue"));

let text_object = new Core.Object('div', 'title');
text_object.attachAttribute(new Core.Attribute('color', 'white'));
text_object.attachAttribute(new Core.Attribute('text-align', 'left'));
text_object.attachAttribute(new Core.Attribute('font-size', '48px'));

let text_object2 = new Core.Object('div', 'description');
text_object2.attachAttribute(new Core.Attribute('color', 'white'));
text_object2.attachAttribute(new Core.Attribute('text-align', 'left'));
text_object2.attachAttribute(new Core.Attribute('font-size', '24px'));


let texts = ['Welcome to Internaciolan Burch University!', 'Here, everything is possible', '   Your wildests dreams...', '      Nightmares as well!'];
let text_index = 1;
let text_speed = 3 / 8;
let text_cursor = 0;

window.onresize = async function () {
    width = window.innerWidth;
    height = window.innerHeight;
    applyStyle(main_object);
}

/* Constructor */
window.addEventListener('load', (event) => {
    init_width = width = window.innerWidth;
    init_height = height = window.innerHeight;

    burch_pic.attachAttribute(new Core.Attribute('background-size', (1091 * init_width / 1882) + "px " + (441 * init_height / 728) + "px"));
    burch_pic.width = (1091 * init_width / 1882);
    burch_pic.height = (441 * init_height / 728);
    burch_pic.y = init_height * 182 / 1079;
    burch_pic.x = init_width * 41 / 1920;

    full_black.width = init_width;
    full_black.height = init_height;

    text_object.x = init_width * 64 / 1920;
    text_object.y = init_height * 32 / 1079;
    text_object.width = 'max-content';

    text_object2.x = init_width/2;
    text_object2.y = init_height * 92 / 1079;
    text_object2.width = 'max-content';
    text_object2.height = 'max-content';


    main_window = document.getElementById('application');
    main_window.innerHTML = Core.parser_normal([main_object, full_black, burch_pic, text_object , text_object2], init_width, init_height, init_width, init_height);

    let animation_interval = null;
    let animation_step = 0;

    document.addEventListener('click', function (event) {
        main_window.innerHTML = Core.parser_normal([main_object, full_black, burch_pic, text_object , text_object2], init_width, init_height, init_width, init_height);

        if (animation_interval == null) {
            animation_interval = setInterval(function () {
                let breakk = false;

                switch (animation_step) {
                    case 0:
                        if (full_black.attributes[0].value + 0.004 <= 0.7) {
                            full_black.attributes[0].value += 0.004;
                        }
                        else {
                            animation_step++ ;
                            full_black.attributes[0].value = 0.7;
                        }
                        break;

                    case 1:
                        if (Math.round(text_cursor + text_speed) < texts[0].length) {
                            text_cursor += text_speed;

                            text_object.innerHTML = "<b>" + texts[0].slice(0, Math.round(text_cursor)) + '</b>';
                        }
                        else {
                            animation_step++ ;
                            text_object.innerHTML = "<b>" + texts[0] + "</b>";
                            text_cursor = 0 ; 
                        }
                        break;

                    case 2:
                        if (text_index < texts.length) {
                            text_object2.innerHTML = "" ;
                            for( let ind = 1 ; ind < text_index ; ind++ ){
                                text_object2.innerHTML += texts[ind] + "</br>" 
                            }

                            if (Math.round(text_cursor + text_speed) < texts[text_index].length) {
                                text_cursor += text_speed ;
                                text_object2.innerHTML += texts[text_index].slice(0, Math.round(text_cursor))
                            }
                            else {
                                text_object2.innerHTML += texts[text_index] ;
                                text_cursor = 0 ;
                                text_index++ ;
                            }
                        }
                        else{
                            breakk = true;
                        }
                        break ;


                }

                main_window.innerHTML = Core.parser_normal([main_object, full_black, burch_pic, text_object , text_object2 ], init_width, init_height, init_width, init_height);
                if (breakk) {
                    animation_step++;
                    clearInterval(animation_interval);
                    animation_interval = null ;
                }
            }, 30);
        }
    });
});