export default function parser_normal(objects = [],width,height) {
    /* Creates HTMLDoc */
    let html_add = '';
    for (let ind_obj = 0; ind_obj < objects.length; ind_obj++) {
        html_add += objects[ind_obj].getHTML(width,height,width,height);
    }

    return html_add ;
}
