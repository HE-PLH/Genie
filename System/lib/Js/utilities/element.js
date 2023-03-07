let currentResize = "Q", center = {x: 0, y: 0};
let parentWidth = 0, parentHeight = 0;
let virtual_appender = createDomElement({name: "div"});
let boundary = {
    el: document.getElementById("paint-field-container"),
    x: 0,
    y: 0
}, ml = 0, mt = 0, mw = 0, mh = 0, unitX = "", unitY = "", percX = false, percY = false;

boundary.el.style.transform = "scaleX(0.37) scaleY(0.37)";
handleSliderTransform(38)
let Elements = {};
let ruleIndex = 1;
let transformScaleX;
let transformScaleY;
let child_top;
let child_left;
let pathValues;

let Styling = {
    deleteRule: (index) => {
        styleElement.sheet.deleteRule(index);
    },
    changeRule: (rule, index) => {
        Styling.deleteRule(index);
        styleElement.sheet.insertRule(rule, index);
    },
    commentRuleProperty: (property, value, index) => {
        property = property.split(":")[0];
        if (property.match(/\b/g)) {
            let t = Styling.get_style("", "", index, true).cssText;
            value = value.split(";")[0];
            let r = t.replace(new RegExp(`\\b(?:${property}\\s*?:\\s*([^;>]*?)(?=[;">}]))`), `/*${property}:${value}*/`);
            Styling.changeRule(r, index);
        } else {
            console.log("empty")
        }
    },
    UncommentRuleProperty: (property, value, index) => {
        property = property.split(":")[0];
        value = value.split(";")[0];
        if (!(property === "" || value === "")) {
            Styling.edit_style("", property, value, index)
        }
    },
    init_style: (rules) => {
        let styleSheet = styleElement.sheet;
        ruleIndex = styleSheet.cssRules.length;
        rules = rules.split("}");
        for (let st = -1; st < rules.length; st++) {
            if (rules.hasOwnProperty(st) && rules[st] !== "") {
                console.log(rules[st])
                styleSheet.insertRule(`${rules[st]}`, ruleIndex);
            }
        }

    },
    edit_style: (cls, property, value, ruleI) => {
        let rules = styleElement.sheet.cssRules || styleElement.rules;
        rules[ruleI].style[property] = value;
        return rules[ruleI];
    },
    edit_styles: (cls, propValueObject, ruleI) => {
        let rules = styleElement.sheet.cssRules || styleElement.rules;
        for (let item in propValueObject) {
            rules[ruleI].style[item] = propValueObject[item];
        }
        return rules[ruleI];
    },
    get_style: (cls, property, index, get_all) => {
        let rules = styleElement.sheet.cssRules || styleElement.rules;
        if (ruleIndex !== null) {
            if (get_all) {
                return rules[index];
            } else {
                // console.log(rules[index])
                return rules[index].style[property];
            }
        } else {
            for (let i = 0; i < rules.length; i++) {
                if (rules[i].selectorText === cls) {
                    return (rules[i].style[property]);
                }
            }
        }
    },
    changeClass(el, newId, is_class) {
        let sep = is_class ? "." : "#";
        let c = Styling.get_style(el.id, null, el.ruleIndex, true).cssText.split("{");
        Styling.changeRule(Methods.replace(c[0].split(" "), `${sep + el.id}`, `${newId}`).join(" ") + "{" + c[1], el.ruleIndex);
        el.id = `${newId.split(sep)[1]}`;
    }
};


function getTransform({originalTransform, originalX, originalY, newX, newY}) {
    /*if (originalX === newX) {
        //Return scalex 1
    }
    if (originalY === newY) {
        //Return scaley 1
    }*/
    let theta_s_x = newX / originalX;
    let theta_l = theta_s_x * ((newX - originalY) / 2);
    let theta_s_y = newY / originalY;
    let theta_t = theta_s_y * ((newY - originalY) / 2);

    let transformX, transformY, left, top, width, height;

    if (theta_s_y > 0 && theta_s_x > 0) {
        transformX = theta_s_x;
        transformY = theta_s_y;
        if (theta_s_x >= 1 && theta_s_y >= 1) {
            left = theta_l;
            top = theta_t;
            width = originalX * theta_s_x;
            height = originalY * theta_s_y;
        } else {
            if (theta_s_x >= 1) {
                left = theta_s_x * ((theta_s_x - 1) * originalX / 2);
            } else {
                left = ((theta_s_x - 1) * originalX / 2)
            }

            if (theta_s_y >= 1) {
                top = theta_s_y * ((theta_s_y - 1) * originalY / 2);
            } else {
                top = (theta_s_y - 1) * originalY / 2
            }
            width = originalX;
            height = originalY;
        }
    }

    return {transformX, transformY, left, top, width, height}
}


function ff(el, id, s) {
    let l = "", t = "", a, b, c, d;
    if (s) {
        l = "width";
        t = "height";
    } else {
        l = "left";
        t = "top";
    }
    a = Styling.get_style(id, l, el.ruleIndex);
    b = Styling.get_style(id, t, el.ruleIndex);
    c = (a.split(`${parseFloat(a)}`));
    d = (b.split(`${parseFloat(b)}`));
    unitX = c[1];
    unitY = d[1];
    percX = unitX === "%";
    percY = unitY === "%";/*
    left_display.style.width = (a.length + 1) * 6 + "px";
    top_display.style.width = (b.length + 1) * 6 + "px";*/
    if (percX) {
        parentWidth = el.parentElement.clientWidth;
        a = parseFloat(parseFloat(a) * parseFloat(parentWidth / 100));
    }
    if (percY) {
        parentHeight = el.parentElement.clientHeight;
        b = parseFloat(parseFloat(b) * parseFloat(parentHeight / 100));
    }
    return [parseFloat(a), parseFloat(b)];
}

let BRICK = {
    multiple_drag_start: function () {
        let r = getFocusedClasses("hi");
        mouse.dragging.id = r[0];
        mouse.dragging.position = [];
        dragger.pt = [];
        dragger.pl = [];
        dragger.angle = [];
        wnd = r[1];
        for (let i = 0, len = mouse.dragging.id.length; i < len; i++) {
            Styling.edit_style(mouse.dragging.id[i], "position", "absolute", wnd[i].ruleIndex);
            switch (currentResize) {
                case "Q":
                    let a = ff(wnd[i], mouse.dragging.id[i]);
                    dragger.pl.push(a[0]);
                    dragger.pt.push(a[1]);
                    dragger.check = false;
                    break;
                case "W":
                    let w = ff(wnd[i], mouse.dragging.id, true);
                    dragger.pl.push(w[0]);
                    dragger.pt.push(w[1]);
                    dragger.check = true;
                    break;
                case "E":
                    dragger.pt.push(wnd.getBoundingClientRect());
                    let str = (Styling.get_style(mouse.dragging.id[i], "transform", wnd[i].ruleIndex)).split(" ");
                    dragger.angle.push({x: 0, y: 0, z: 0});
                    for (let i in str) {
                        if (str.hasOwnProperty(i)) {
                            let t = /[XYZ][(].+[)]/g.exec(str[i])[0];
                            if (t[0] === "X") {
                                dragger.angle[i].x = parseFloat(t.substring(2, t.length - 1));
                            } else if (t[0] === "Y") {
                                dragger.angle[i].y = parseFloat(t.substring(2, t.length - 1));
                            } else if (t[0] === "Z") {
                                dragger.angle[i].z = parseFloat(t.substring(2, t.length - 1));
                            }
                        }
                    }
                    dragger.check = null;
                    break;
                case "T":
                    let b = ff(wnd[i], mouse.dragging.id[i]);
                    dragger.pl.push(b[0]);
                    dragger.pt.push(b[1]);
                    dragger.check = false;
                    break;
            }
        }
    },
    drag_start: function () {
        mouse.dragging.id = `${mouse.dragging.element.id}`;
        wnd = mouse.dragging.element;
        dragger.clip_drag = wnd.classList.contains("clip-parent");
        // mouse.dragging.position = Styling.get_style(mouse.dragging.id, "position", wnd.ruleIndex);
        // Styling.edit_style(mouse.dragging.id, "position", "absolute", wnd.ruleIndex);
        switch (currentResize) {
            case "Q":
                let a = ff(wnd, mouse.dragging.id);
                dragger.pl = a[0];
                dragger.pt = a[1];
                dragger.check = false;
                break;
            case "W":
                let w = ff(wnd, mouse.dragging.id, true);
                dragger.pl = w[0];
                dragger.pt = w[1];
                dragger.check = true;
                dragger.originalD = wnd.getBoundingClientRect();
                if (wnd.classList.contains("clip-parent")) {
                    clip_child = (wnd.querySelector("._clippath"))
                    let temp_scale = getAllGroups(/scaleX\((\d.*)\)\s+scaleY\((\d.*)\)/g, Styling.get_style(clip_child.id, "transform", clip_child.ruleIndex));
                    transformScaleX = parseFloat(temp_scale[0][1]);
                    transformScaleY = parseFloat(temp_scale[0][2]);
                }
                break;
            case "T":
                let b = ff(wnd, mouse.dragging.id);
                dragger.check = false;
                dragger.pl = b[0];
                dragger.pt = b[1];
                break;
            case "E":
                dragger.pt = wnd.getBoundingClientRect();
                let str = (Styling.get_style(mouse.dragging.id, "transform", wnd.ruleIndex)).split(" ");
                dragger.angle = {x: 0, y: 0, z: 0};
                for (let i in str) {
                    if (str.hasOwnProperty(i)) {
                        let t = /[XYZ][(].+[)]/g.exec(str[i])[0];
                        if (t[0] === "X") {
                            dragger.angle.x = parseFloat(t.substring(2, t.length - 1));
                        } else if (t[0] === "Y") {
                            dragger.angle.y = parseFloat(t.substring(2, t.length - 1));
                        } else if (t[0] === "Z") {
                            dragger.angle.z = parseFloat(t.substring(2, t.length - 1));
                        }
                    }
                }
                dragger.check = null;
                break;
        }

    },
    click: function (el) {
        //the shitty negating part
        // wnd = el;
        if (dragger.angle) {
            let str = Styling.get_style(el.id, "transform", el.ruleIndex).split(" ");
            let t = "";
            for (let i in str) {
                if (str.hasOwnProperty(i)) {
                    t += " " + str[i].toString().replace(new RegExp("[(]"), "(-");
                }
            }
            /*document.getElementById("size-resize").style.transform = t;
            document.getElementById("position-resize").style.transform = t;
            document.getElementById("rot-resize-cont").style.transform = t;*/
        }
        hightlightAll();
        el.done.scrollIntoView(false);
        BRICK.handleToolbar(el);
    },
    typing: false,
    handleToolbar(el) {
        let toolbar_cont = displayInstantToolbar(), opt = "", temp;
        if (tool_for !== el) {
            toolbar_cont.innerHTML = "";
            console.log(el["data-styles"])
            if ((opt = el["data-styles"])) {
                let style_items = InstantTools[opt];
                for (let item in style_items) {
                    temp = createDomElement({
                        name: `div`,
                        appendTo: toolbar_cont,
                        id: `${item}`,
                        class: `gti`,
                        innerHTML: `${style_items[item].body}`,
                        contentEditable: false,
                    });
                    temp.style.width = `${style_items[item].size}px`;
                }
                let family = Styling.get_style(el.id, "font-family", el.ruleIndex);
                document.querySelector(".ffamily-text").innerHTML = family || "Calibri";

                let size = Styling.get_style(el.id, "font-size", el.ruleIndex);
                document.querySelector(".font-size-input").value = size || "12px";

                let my_wnd = el;
                if (el.classList.contains("clip-parent")) {
                    my_wnd = el.querySelector("._clippath");
                }
                let background = Styling.get_style(my_wnd.id, "background", my_wnd.ruleIndex);
                document.querySelector(".color-adjust-img").style.background = background || "url(../sources/imgs/color-adjust.webp)";

            }

        }
        tool_for = el;
    }
};

let TraditionalTool = {
    methods: {
        t_top_left: (ml, mt, sw, sh, wnd) => {
            mw = sw - mouse.dragging.offset.x;
            mh = sh - mouse.dragging.offset.y;
            if (percX) {
                ml = `${100 * ml / parentWidth}`;
                mw = `${100 * mw / parentWidth}`;
            }
            if (percY) {
                mt = `${100 * mt / parentHeight}`;
                mh = `${100 * mh / parentHeight}`;
            }
            let flag = true;
            if (mw > 0) {
                drag_style(wnd, "left", `${ml + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            } else {
                flag = false;
            }
            if (mh > 0) {
                drag_style(wnd, "top", `${mt + unitY}`);
                drag_style(wnd, "height", `${mh + unitY}`);
            } else {
                flag = false
            }
            if (flag) {
                Resizers.drag_clip_all(clip_child, wnd, "both_w_h", mw, mh, unitX, unitY);
            }


            height_display.value = `${mh + unitY}`;
            width_display.value = `${mw + unitX}`;
            top_display.value = `${mt + unitY}`;
            left_display.value = `${ml + unitX}`;
        },

        t_top_left_top: (ml, mt, sw, sh, wnd) => {
            mh = sh - mouse.dragging.offset.y;
            let pyChange = mh;
            if (percY) {
                mt = `${100 * mt / parentHeight}`;
                mh = `${100 * mh / parentHeight}`;
            }
            if (mh > 0) {
                drag_style(wnd, "top", `${mt + unitY}`);
                drag_style(wnd, "height", `${mh + unitY}`);
            }
            height_display.value = `${mh + unitY}`;
            Resizers.drag_clip(clip_child, wnd, "height", pyChange, unitY);
            top_display.value = `${mt + unitY}`;
        },
        t_top: (ml, mt, sw, sh, wnd) => {
            mh = sh - mouse.dragging.offset.y;
            let pyChange = mh;
            if (percY) {
                mt = `${100 * mt / parentHeight}`;
                mh = `${100 * mh / parentHeight}`;
            }
            if (mh > 0) {
                drag_style(wnd, "top", `${mt + unitY}`);
                drag_style(wnd, "height", `${mh + unitY}`);
            }
            height_display.value = `${mh + unitY}`;
            Resizers.drag_clip(clip_child, wnd, "height", pyChange, unitY);
            top_display.value = `${mt + unitY}`;
        },
        t_top_right_top: (ml, mt, sw, sh, wnd) => {
            mh = sh - mouse.dragging.offset.y;
            let pyChange = mh;
            if (percY) {
                mt = `${100 * mt / parentHeight}`;
                mh = `${100 * mh / parentHeight}`;
            }
            if (mh > 0) {
                drag_style(wnd, "top", `${mt + unitY}`);
                drag_style(wnd, "height", `${mh + unitY}`);
            }
            height_display.value = `${mh + unitY}`;
            Resizers.drag_clip(clip_child, wnd, "height", pyChange, unitY);
            top_display.value = `${mt + unitY}`;
        },
        t_top_right: (ml, mt, sw, sh, wnd) => {
            mh = sh - mouse.dragging.offset.y;
            mw = sw + mouse.dragging.offset.x;
            let pxChange = mw, pyChange = mh;
            if (percX) {
                mw = `${100 * mw / parentWidth}`;
            }
            if (percY) {
                mt = `${100 * mt / parentHeight}`;
                mh = `${100 * mh / parentHeight}`;
            }
            let flag = true;
            if (mh > 0) {
                drag_style(wnd, "top", `${mt + unitY}`);
                drag_style(wnd, "height", `${mh + unitY}`);
            } else {
                flag = false;
            }
            if (mw > 0) {
                drag_style(wnd, "width", `${mw + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            } else {
                flag = false;
            }
            if (flag) {
                Resizers.drag_clip_all(clip_child, wnd, "both_w_h", pxChange, pyChange, unitX, unitY);
            }
            height_display.value = `${mh + unitY}`;
            width_display.value = `${mw + unitX}`;
            top_display.value = `${mt + unitY}`;
        },
        t_top_right_top_right: (ml, mt, sw, sh, wnd) => {
            mw = sw + mouse.dragging.offset.x;
            let pxChange = mw;
            if (percX) {
                mw = `${100 * mw / parentWidth}`;
            }
            drag_style(wnd, "width", `${mw + unitX}`);
            Resizers.drag_clip(clip_child, wnd, "width", pxChange, unitX);
            width_display.value = `${mw + unitX}`;
        },
        t_right: (ml, mt, sw, sh, wnd) => {
            mw = sw + mouse.dragging.offset.x;
            let pxChange = mw;
            if (percX) {
                mw = `${100 * mw / parentWidth}`;
            }
            drag_style(wnd, "width", `${mw + unitX}`);
            Resizers.drag_clip(clip_child, wnd, "width", pxChange, unitX);
            width_display.value = `${mw + unitX}`;

        },
        t_bottom_right_right: (ml, mt, sw, sh, wnd) => {
            mw = sw + mouse.dragging.offset.x;
            let pxChange = mw;
            if (percX) {
                mw = `${100 * mw / parentWidth}`;
            }
            drag_style(wnd, "width", `${mw + unitX}`);
            Resizers.drag_clip(clip_child, wnd, "width", pxChange, unitX);
            width_display.value = `${mw + unitX}`;
        },
        t_bottom_right: (ml, mt, sw, sh, wnd) => {
            mw = sw + mouse.dragging.offset.x;
            mh = sh + mouse.dragging.offset.y;
            let pxChange = mw, pyChange = mh;
            if (percX) {
                mw = `${100 * mw / parentWidth}`;
            }
            if (percY) {
                mh = `${100 * mh / parentHeight}`;
            }
            drag_style(wnd, "width", `${mw + unitX}`);
            drag_style(wnd, "height", `${mh + unitY}`);
            height_display.value = `${mh + unitY}`;
            width_display.value = `${mw + unitX}`;

            Resizers.drag_clip_all(clip_child, wnd, "both_w_h", pxChange, pyChange, unitX, unitY);

        },
        t_bottom_bottom_right: (ml, mt, sw, sh, wnd) => {
            mh = sh + mouse.dragging.offset.y;
            let pyChange = mh;
            if (percY) {
                mh = `${100 * mh / parentHeight}`;
            }
            drag_style(wnd, "height", `${mh + unitY}`);
            Resizers.drag_clip(clip_child, wnd, "height", pyChange, unitY);
            height_display.value = `${mh + unitY}`;
        },
        t_bottom: (ml, mt, sw, sh, wnd) => {
            mh = sh + mouse.dragging.offset.y;
            let pyChange = mh;
            if (percY) {
                mh = `${100 * mh / parentHeight}`;
            }
            drag_style(wnd, "height", `${mh + unitY}`);
            Resizers.drag_clip(clip_child, wnd, "height", pyChange, unitY);
            height_display.value = `${mh + unitY}`;
        },
        t_bottom_left_bottom: (ml, mt, sw, sh, wnd) => {
            mh = sh + mouse.dragging.offset.y;
            let pyChange = mh;
            if (percY) {
                mh = `${100 * mh / parentHeight}`;
            }
            drag_style(wnd, "height", `${mh + unitY}`);
            Resizers.drag_clip(clip_child, wnd, "height", pyChange, unitY);
            height_display.value = `${mh + unitY}`;
        },
        t_bottom_left: (ml, mt, sw, sh, wnd) => {
            mw = sw - mouse.dragging.offset.x;
            mh = sh + mouse.dragging.offset.y;
            let pxChange = mw, pyChange = mh;
            if (percX) {
                ml = `${100 * ml / parentWidth}`;
                mw = `${100 * mw / parentWidth}`;
            }
            if (percY) {
                mh = `${100 * mh / parentHeight}`;
            }
            let flag = true;
            if (mw > 0) {
                drag_style(wnd, "left", `${ml + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            } else {
                flag = false;
            }
            if (mh > 0) {
                drag_style(wnd, "height", `${mh + unitY}`);
            } else {
                flag = false;
            }

            if (flag) {
                Resizers.drag_clip_all(clip_child, wnd, "both_w_h", pxChange, pyChange, unitX, unitY);
            }

            height_display.value = `${mh + unitY}`;
            width_display.value = `${mw + unitX}`;
            left_display.value = `${ml + unitX}`;
        },
        t_left_bottom_left: (ml, mt, sw, sh, wnd) => {
            mw = sw - mouse.dragging.offset.x;
            let pxChange = mw;
            if (percX) {
                ml = `${100 * ml / parentWidth}`;
                mw = `${100 * mw / parentWidth}`;
            }
            if (mw > 0) {
                drag_style(wnd, "left", `${ml + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            }
            width_display.value = `${mw + unitX}`;
            Resizers.drag_clip(clip_child, wnd, "width", pxChange, unitX);
            left_display.value = `${ml + unitX}`;
        },
        t_left: (ml, mt, sw, sh, wnd) => {
            mw = sw - mouse.dragging.offset.x;
            let pxChange = mw;
            if (percX) {
                ml = `${100 * ml / parentWidth}`;
                mw = `${100 * mw / parentWidth}`;
            }
            if (mw > 0) {
                drag_style(wnd, "left", `${ml + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            }
            width_display.value = `${mw + unitX}`;
            Resizers.drag_clip(clip_child, wnd, "width", pxChange, unitX);
            left_display.value = `${ml + unitX}`;
        },
        t_left_top: (ml, mt, sw, sh, wnd) => {
            mw = sw - mouse.dragging.offset.x;
            let pxChange = mw;
            if (percX) {
                ml = `${100 * ml / parentWidth}`;
                mw = `${100 * mw / parentWidth}`;
            }
            if (mw > 0) {
                drag_style(wnd, "left", `${ml + unitX}`);
                drag_style(wnd, "width", `${mw + unitX}`);
            }
            width_display.value = `${mw + unitX}`;
            Resizers.drag_clip(clip_child, wnd, "width", pxChange, unitX);
            left_display.value = `${ml + unitX}`;
        },
        t_rot: (ml, mt, sw, sh, wnd) => {
            //rotate
            ml = get_angle(dragger.angle, {
                x: (mouse.moving.point.x - dragger.originalD.left) - center.x,
                y: (mouse.moving.point.y - dragger.originalD.top) - center.y
            });
            Styling.edit_style(mouse.dragging.id, "transform", `rotateZ(${ml}deg)`, wnd.ruleIndex)
        },
    },
    drag_start: () => {
        mouse.dragging.id = `${mouse.dragging.element.parentNode.parentElement.id}`;
        wnd = mouse.dragging.element.parentNode.parentElement;
        dragger.method = mouse.dragging.element.id;
        let a = ff(wnd, mouse.dragging.id);
        dragger.pl = a[0];
        dragger.pt = a[1];
        let w = ff(wnd, mouse.dragging.id, true);
        dragger.sw = w[0];
        dragger.sh = w[1];

        dragger.originalD = wnd.getBoundingClientRect();

        if ((dragger.clip_drag = wnd.classList.contains("clip-parent"))) {
            mouse.dragging.clipdrag = true;
            clip_child = (wnd.querySelector("._clippath"))
            let temp_scale = getAllGroups(/scaleX\((\d.*)\)\s+scaleY\((\d.*)\)/g, Styling.get_style(clip_child.id, "transform", clip_child.ruleIndex));
            transformScaleX = parseFloat(temp_scale[0][1]);
            transformScaleY = parseFloat(temp_scale[0][2]);
        }
        /*let t = ((Styling.get_style(mouse.dragging.id, "transform", wnd.ruleIndex)).match(new RegExp("[Z][(].+[)]"))[0]);
        dragger.angle = (parseFloat(t.substring(2, t.length - 1)));
        dragger.originalD = wnd.getBoundingClientRect();*/
    },
    multiple_drag_start: () => {
        let r = getFocusedClasses("hi");
        mouse.dragging.id = r[0];
        mouse.dragging.position = [];
        dragger.method = mouse.dragging.element.id;
        dragger.pt = [];
        dragger.pl = [];
        dragger.sw = [];
        dragger.sh = [];
        wnd = r[1];
        for (let i = 0, len = mouse.dragging.id.length; i < len; i++) {
            let a = ff(wnd[i], mouse.dragging.id[i]);
            dragger.pl.push(a[0]);
            dragger.pt.push(a[1]);

            let w = ff(wnd[i], mouse.dragging.id[i], true);
            dragger.sw.push(w[i][0]);
            dragger.sh.push(w[i][1]);
        }
    },
    handle_traditional_appendTools: () => {
        if (no) {
            /*
                    multiple
            */

            for (let i = 0; i < mouse.dragging.id.length; i++) {
                TraditionalTool.methods[dragger.method](ml[i], mt[i], dragger.sw[i], dragger.sh[i], wnd[i]);
            }
        } else {
            /*
                    single
            */
            TraditionalTool.methods[dragger.method](ml, mt, dragger.sw, dragger.sh, wnd);
        }
    }
};

function buildPathTable(t) {
    console.log(t.split(/[[ \w]{10 }]/g));
}

const PATH_COMMANDS = {
    M: ["x", "y"],
    m: ["dx", "dy"],
    L: ["x", "y"],
    l: ["dx", "dy"],
    C: ["x1", "y1", "x2", "y2", "x", "y"],
    c: ["dx1", "dy1", "dx2", "dy2", "dx", "dy"],
    H: ["x"],
    h: ["dx"],
    V: ["y"],
    v: ["dy"],

    Z: [],

    S: ["x2", "y2", "x", "y"],
    s: ["dx2", "dy2", "dx", "dy"],
    Q: ["x1", "y1", "x", "y"],
    q: ["dx1", "dy1", "dx", "dy"],
    T: ["x", "y"],
    t: ["dx", "dy"],
    A: ["rx", "ry", "rotation", "large-arc", "sweep", "x", "y"],
    a: ["rx", "ry", "rotation", "large-arc", "sweep", "dx", "dy"]
};

function fromPathToArray(path) {
    const items = path.toString().replace(/[\n\r]/g, '').replace(/-/g, ' -').replace(/(\d*\.)(\d+)(?=\.)/g, '$1$2 ').trim().split(/\s*,|\s+/);

    console.log(items)
    const segments = [];
    let currentCommand = '';
    let currentElement = {};
    while (items.length > 0) {
        let it = items.shift();
        if (PATH_COMMANDS.hasOwnProperty(it)) {
            currentCommand = it;
        } else {
            items.unshift(it);
        }
        currentElement = {type: currentCommand};
        console.log(currentCommand)
        PATH_COMMANDS[currentCommand].forEach((prop) => {
            it = items.shift();
            currentElement[prop] = it;
        });
        if (currentCommand === 'M') {
            currentCommand = 'L';
        } else if (currentCommand === 'm') {
            currentCommand = 'l';
        }
        segments.push(currentElement);
    }

    console.log(segments)
    return segments
}

function getAllGroups(regexp, str) {
    return Array.from(str.matchAll(regexp), m => m);
}

let Resizers = {
    drag_start: () => {

        //mouse.dragging.element.style.transform = "rotate(0deg)";
        wnd = mouse.dragging.element.parentElement.parentElement;
        dragger.originalD = wnd.getBoundingClientRect();
        // wnd.classList.add("noselect");
        if ((dragger.clip_drag = wnd.classList.contains("clip-parent"))) {
            clip_child = (wnd.querySelector("._clippath"));
            let temp_scale = getAllGroups(/scaleX\((\d.*)\)\s+scaleY\((\d.*)\)/g,
                Styling.get_style(clip_child.id, "transform", clip_child.ruleIndex));
            transformScaleX = parseFloat(temp_scale[0][1]);
            transformScaleY = parseFloat(temp_scale[0][2]);
            child_top = Styling.get_style(clip_child.id, "top", clip_child.ruleIndex);
            child_left = Styling.get_style(clip_child.id, "left", clip_child.ruleIndex);
            // console.log(transformScaleX, transformScaleY)

        }
        mouse.dragging.id = `${wnd.id}`;
        if (mouse.dragging.element.classList.contains("size")) {
            dragger.height_resize = mouse.dragging.element.id === "height_resize";
            dragger.width_resize = mouse.dragging.element.id === "width_resize";
            let w = ff(wnd, mouse.dragging.id, true);
            dragger.pl = w[0];
            dragger.pt = w[1];
            dragger.check = true;
        } else if (mouse.dragging.element.classList.contains("position")) {
            dragger.top_resize = mouse.dragging.element.id === "top_resize";
            dragger.left_resize = mouse.dragging.element.id === "left_resize";
            let a = ff(wnd, mouse.dragging.id);
            dragger.pl = a[0];
            dragger.pt = a[1];
        }
        // let t = ((Styling.get_style(mouse.dragging.id, "transform", wnd.ruleIndex)).match(new RegExp("[Z][(].+[)]"))[0]);
        // dragger.angle = parseFloat(t.substring(2,t.length-1));
    },
    multiple_drag_start: () => {
        let r = getFocusedClasses("hi");
        mouse.dragging.id = r[0];
        mouse.dragging.position = [];
        dragger.pt = [];
        dragger.pl = [];
        dragger.angle = [];
        wnd = r[1];
        dragger.height_resize = mouse.dragging.element.id === "height_resize";
        dragger.width_resize = mouse.dragging.element.id === "width_resize";
        dragger.top_resize = mouse.dragging.element.id === "top_resize";
        dragger.left_resize = mouse.dragging.element.id === "left_resize";
        let size = mouse.dragging.element.classList.contains("size");
        let position = mouse.dragging.element.classList.contains("position");
        for (let i = 0, len = mouse.dragging.id.length; i < len; i++) {
            //mouse.dragging.element.style.transform = "rotate(0deg)";
            // wnd.push(mouse.dragging.element.parentElement.parentElement);
            if (size) {
                let w = ff(wnd[i], mouse.dragging.id, true);
                dragger.pl.push(w[0]);
                dragger.pt.push(w[1]);
                dragger.check = true;
            } else if (position) {
                let a = ff(wnd[i], mouse.dragging.id[i]);
                dragger.pl.push(a[0]);
                dragger.pt.push(a[1]);
            }
            let t = ((Styling.get_style(mouse.dragging.id[i], "transform", wnd[i].ruleIndex)).match(new RegExp("[Z][(].+[)]"))[0]);
            dragger.angle.push(parseFloat(t.substring(2, t.length - 1)));
        }
    },
    drag_clip(clip_child, wnd, direction, change, unitsOfChange, pxChange) {
        if (dragger.clip_drag) {

            let str = "";
            switch (direction) {
                case "top":
                    // console.log("top");
                    // console.log(change / dragger.originalD.top)

                    break;
                case "height":
                    // console.log("height");

                    let theta_s_y = change / clip_child.y;

                    if (theta_s_y > 0) {
                        if (theta_s_y >= 1) {
                            Styling.edit_styles(clip_child.id, {
                                "transform": `scaleX(${transformScaleX}) scaleY(${theta_s_y})`,
                                "top": `${theta_s_y * ((change - clip_child.y) / 2)}${unitsOfChange}`,
                                "height": `${clip_child.y * theta_s_y}${unitsOfChange}`
                            }, clip_child.ruleIndex)
                        } else {
                            unitsOfChange = "px";
                            Styling.edit_styles(clip_child.id, {
                                "transform": `scaleX(${transformScaleX}) scaleY(${theta_s_y})`,
                                "top": `${(theta_s_y - 1) * clip_child.y / 2}px`,
                                "height": `${clip_child.y}px`
                            }, clip_child.ruleIndex)
                        }
                    }
                    break;
                case "left":
                    // console.log("left");
                    break;
                case "width":
                    // console.log("width");
                    let theta_s_x = change / clip_child.x;
                    if (theta_s_x > 0) {
                        let theta_l = theta_s_x * ((change - clip_child.x) / 2);
                        if (theta_s_x >= 1) {
                            Styling.edit_styles(clip_child.id, {
                                "transform": `scaleX(${theta_s_x}) scaleY(${transformScaleY})`,
                                "left": `${theta_s_x * ((change - clip_child.x) / 2)}${unitsOfChange}`,
                                "width": `${clip_child.x * theta_s_x}${unitsOfChange}`
                            }, clip_child.ruleIndex)
                        } else {
                            unitsOfChange = "px";
                            Styling.edit_styles(clip_child.id, {
                                "transform": `scaleX(${theta_s_x}) scaleY(${transformScaleY})`,
                                "left": `${(theta_s_x - 1) * clip_child.x / 2}${unitsOfChange}`,
                                "width": `${clip_child.x}${unitsOfChange}`
                            }, clip_child.ruleIndex)
                        }
                    }
                    break;
            }
        }
    },
    drag_clip_all(clip_child, wnd, direction, changeX, changeY, unitsOfChangeX, unitsOfChangeY, pxChange, pyChange) {

        if (dragger.clip_drag) {
            let str = "";
            switch (direction) {
                case "both_w_h":
                    let theta_s_x = changeX / clip_child.x;
                    let theta_s_y = changeY / clip_child.y;
                    if (theta_s_y > 0 && theta_s_x > 0) {
                        Styling.edit_style(clip_child.id, "transform", `scaleX(${theta_s_x}) scaleY(${theta_s_y})`, clip_child.ruleIndex)
                        if (theta_s_x >= 1 && theta_s_y >= 1) {
                            Styling.edit_styles(clip_child.id, {
                                "transform": `scaleX(${theta_s_x}) scaleY(${theta_s_y})`,
                                "top": `${theta_s_y * ((changeY - clip_child.y) / 2)}${unitsOfChangeY}`,
                                "left": `${theta_s_x * ((changeX - clip_child.x) / 2)}${unitsOfChangeX}`,
                                "height": `${clip_child.y * theta_s_y}${unitsOfChangeY}`,
                                "width": `${clip_child.x * theta_s_x}${unitsOfChangeX}`
                            }, clip_child.ruleIndex)
                        } else {
                            unitsOfChangeX = "px";
                            unitsOfChangeY = "px";
                            Styling.edit_styles(clip_child.id, {
                                "transform": `scaleX(${theta_s_x}) scaleY(${theta_s_y})`,
                                "top": `${(theta_s_y - 1) * clip_child.y / 2}${unitsOfChangeY}`,
                                "left": `${(theta_s_x - 1) * clip_child.x / 2}${unitsOfChangeX}`,
                                // "height": `${clip_child.y}px`,
                                "height": `${clip_child.y}${unitsOfChangeY}`,
                                // "width": `${clip_child.x}px`
                                "width": `${clip_child.x}${unitsOfChangeX}`
                            }, clip_child.ruleIndex)
                        }
                    }
                    break;
            }
        }
    }
};

function initiateStyle(parentPath, id, custom) {
    console.log(custom)
    Styling.init_style(`
        #${id}{${custom || "left:0;top:0;width: 64px; height: 64px;}"}`
    );
}


function G(id, params) {
    this.tagName = "div";
    this.id = id || "div";
    this.clip_path = params ? params.clipPath : null;
    this.appended_img = params ? params.appended_img : null;
    this.framed = params ? params.framed : null;
    this.xml = params ? params.xml : null;
    this.vertical_text_layout = params ? params.vertical_text_layout : null;
    this.file_img = params ? params.file_img : null;
    this.target = document.getElementById(`.${this.id}`);
    this.parentPath = null;
    this.parent = null;
}

G.prototype.bindings = function () {
    this.target.addEventListener("mouseenter", function (e) {
        mouse.hover.status = true;
        new MouseEventHandler(e);
        mouse.hover.status = false;
    });
    this.target.addEventListener("mouseleave", function (e) {
        mouse.hover.status = false;
    })
};

function getImgSize(imgSrc, _img, f) {
    const img = new Image();
    img.onload = function () {
        f({x: this.width, y: this.height});
    }
    img.src = imgSrc;

}

function getViewBox(clip_path) {
    let s = fromPathToArray(clip_path);
    let y_large = 0;
    let x_large = 0;
    let y_smallest = 0;
    let x_smallest = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j in s[i]) {
            if (j !== "type") {

                if (j.indexOf("x") > -1) {
                    if (parseFloat(s[i][j]) > x_large) {
                        x_large = parseFloat(s[i][j])
                    }
                    if (parseFloat(s[i][j]) < x_smallest) {
                        x_smallest = parseFloat(s[i][j])
                    }
                } else {
                    if (j.indexOf("y") > -1) {
                        if (parseFloat(s[i][j]) > y_large) {
                            y_large = parseFloat(s[i][j])
                        }
                        if (parseFloat(s[i][j]) < y_smallest) {
                            y_smallest = parseFloat(s[i][j])
                        }
                    }
                }
            }

        }
    }

    let temp_x = x_large + Math.abs(x_smallest);
    let temp_y = y_large + Math.abs(y_smallest);
    if (temp_y > temp_x) {
        temp_x = temp_x * temp_y / temp_x;
    } else if (temp_x > temp_y) {
        temp_y = temp_y * temp_x / temp_y;
    }
    return {x: temp_x, y: temp_y}
}

function createGenieElement(trg, el) {
    let childId = `ch${Math.floor(Math.random() * 10000)}`
    // child elements
    let cls = el.classList.contains("separator")?`${el.className} normal_drag fill-height fill_height`:`${el.className} no-cursor`;

    let child = createDomElement({
        name: `div`,
        appendTo: trg,
        id: `${childId}`,
        class: `${cls}`,
        innerHTML: `${getElementText(el)}`,
        contentEditable: false,
        "data-styles": "normal",
    })
    initiateStyle(trg, childId, el.getAttribute("data-styles"));

    child.ruleIndex = ruleIndex;
    return child;
}

function getTabStyle(el) {
    for (let i = el.classList.length - 1; i >= 0; i--) {
        const className = el.classList[i];
        if (className.startsWith('dts')) {
            return className.split("dts")[1];
        }
    }
    return "";
}
function getElementText(el){
    let child = el.firstChild,
    texts = [];

while (child) {
    if (child.nodeType == 3) {
        texts.push(child.data);
    }
    child = child.nextSibling;
}

let text = texts.join("");
return text;
}


G.prototype.create = function (tag_name, parent_path, parent) {
    this.parentPath = parent_path || "genie-paint-field";
    this.tagName = tag_name || "div";

    parent = parent ? parent.classList.contains("hi") ? parent : null : null;
    this.parent = parent || document.getElementById(`${this.parentPath}`);

    if (this.xml) {
        let temp = createDomElement({
            name: `div`,
            appendTo: document.querySelector("body"),
            id: `${"temp-struct"}`,
            class: `hide`,
            innerHTML: this.xml.markup
        })

        temp = temp.children[0];

        let f = (trg, el, children) => {
            let child;
            for (let i = 0; i < children.length; i++) {
                child = children[i];
                let new_trg = createGenieElement(trg, child)
                if (child["children"] && child["children"].length > 0) {
                    f(new_trg, child, child["children"]);
                }
            }

        };
        this.target = createDomElement({
                name: `div`,
                appendTo: this.parent,
                id: `${this.id}`,
                class: `${temp.className}`,
                innerHTML: ``,
                contentEditable: false,
                "data-styles": getTabStyle(temp),
            });
            initiateStyle(this.parentPath, this.id, temp.getAttribute("data-styles"));
            this.target.ruleIndex = ruleIndex;
        if (temp["children"].length) {
             f(this.target, temp, temp["children"]);
        }

    } else if (this.clip_path) {
        this.childId = `poly${Math.floor(Math.random() * 10000)}`;
        this.target = createDomElement({
            name: `div`,
            appendTo: this.parent,
            id: `${this.id}`,
            class: `hi normal_drag initial clip-parent element-mother`,
            innerHTML: ``,
            contentEditable: false,
            "data-styles": "clipped",
        });

        this.child = createDomElement({
            name: `div`,
            appendTo: this.target,
            id: `${this.childId}`,
            class: `hi initial _clippath no-cursor`,
            innerHTML: ``,
            contentEditable: false,
        });

        let s = getAllGroups(/path\("(.*)"\)/g, (this.clip_path["clip_path"]));
        let cl = s.length ? s[0][1] : this.clip_path["clip_path"];
        let temp = getViewBox(cl);

        console.log(temp)

        this.child.x = temp.x;
        this.child.y = temp.y;

        let test = 50;


        let e = getTransform({
            originalTransform: 1,
            originalX: temp.x,
            originalY: temp.y,
            newX: test,
            newY: test,
        })
        initiateStyle(this.parentPath, this.childId, `
                clip-path: ${`path("${cl}")`};
                width: ${e.width}px;
                height: ${e.height}px;
                border: 0;
                transform: scaleX(${e.transformX}) scaleY(${e.transformY});
                top:${e.top}px;
                left:${e.left}px;
            `);
        this.child.ruleIndex = ruleIndex;
        initiateStyle(this.parentPath, this.id, `left:0;top:0;width: ${test}px; height: ${test}px;border: 0;`);
        this.target.ruleIndex = ruleIndex;
    } else {
        if (this.framed) {
            this.childId = `poly${Math.floor(Math.random() * 10000)}`;
            this.target = createDomElement({
                name: `div`,
                appendTo: this.parent,
                id: `${this.id}`,
                class: `hi normal_drag initial clip-parent element-mother frame-parent`,
                innerHTML: ``,
                contentEditable: false,
                "data-styles": "framed",
            });

            this.child = createDomElement({
                name: `div`,
                appendTo: this.target,
                id: `${this.childId}`,
                class: `hi initial _clippath no-cursor`,
                innerHTML: ``,
                contentEditable: false,
            });

            let temp = (getViewBox(this.framed.clip_path));

            this.child.x = temp.x;
            this.child.y = temp.y;

            let test = 50;
            let e = getTransform({
                originalTransform: 1,
                originalX: temp.x,
                originalY: temp.y,
                newX: test,
                newY: test,
            })
            initiateStyle(this.parentPath, this.childId, `
                clip-path: ${`path("${this.framed.clip_path}")`};
                width: ${e.width}px;
                height: ${e.height}px;
                border: 0;
                transform: scaleX(${e.transformX}) scaleY(${e.transformY});
                top:${e.top}px;
                left:${e.left}px;
            `);
            this.child.ruleIndex = ruleIndex;
            initiateStyle(this.parentPath, this.id, `left:0%;top:0%;width: ${test}px; height: ${test}px;border: 0;`);

            this.target.ruleIndex = ruleIndex;
            //second child === image coontainer

            let _temp_id = `${this.id}${Math.floor(Math.random() * 10000)}`
            this.target2 = createDomElement({
                name: `div`,
                appendTo: this.child,
                id: `${_temp_id}`,
                class: `frame-child inner-mother normal_drag hi element-daughter no-cursor`,
                innerHTML: ``,
                contentEditable: false,
                "data-styles": "appended_img",
            });

            this.child2 = createDomElement({
                name: `img`,
                appendTo: this.target2,
                id: `{${this.childId}${Math.floor(Math.random() * 10000)}`,
                class: `element-daughter`,
                innerHTML: ``,
                contentEditable: false,
            });
            this.child2.setAttribute("alt", this.tagName)
            this.child2.setAttribute("src", "../sources/imgs/" + this.framed.appended_img)
            temp = {x: 50, y: 50};
            initiateStyle(this.parentPath, _temp_id, `left:0%;top:0%;width: ${100}%; height: ${100}%;background-color: transparent;border:0;position: absolute`);
            this.target2.ruleIndex = ruleIndex;
            /*getImgSize("../sources/imgs/"+this.framed.appended_img, this.child2, (t) => {
                let ratio = (t.x / t.y) || 1;
                Styling.edit_style(_temp_id, "width", `${temp.x * ratio}px`, ruleIndex)
            })*/

        } else if (this.appended_img) {
            this.childId = `poly${Math.floor(Math.random() * 10000)}`;

            this.target = createDomElement({
                name: `div`,
                appendTo: this.parent,
                id: `${this.id}`,
                class: `hi normal_drag graphic initial element-mother image-mother`,
                innerHTML: ``,
                contentEditable: false,
                "data-styles": "appended_img",
            });
            this.child = createDomElement({
                name: `img`,
                appendTo: this.target,
                id: `${this.childId}`,
                class: `element-daughter`,
                innerHTML: ``,
                contentEditable: false,
            });
            this.child.setAttribute("alt", this.tagName)
            this.child.setAttribute("src", this.appended_img)

            let temp = {x: 50, y: 50};
            initiateStyle(this.parentPath, this.id, `left:0;top:0;width: ${temp.x}px; height: ${temp.y}px;background-color: transparent;border:0`);
            this.target.ruleIndex = ruleIndex;
            getImgSize(this.appended_img, this.child, (t) => {
                let ratio = (t.x / t.y) || 1;
                Styling.edit_style(this.id, "width", `${temp.x * ratio}px`, ruleIndex)
            })
        } else if (this.file_img) {
            if (this.file_img.children.length) {
                this.target = createDomElement({
                    name: `${"div"}`,
                    appendTo: this.parent,
                    id: `${this.id}`,
                    class: `hi normal_drag initial vertical-parent`,
                    contentEditable: false,
                    "data-styles": "normal",
                });
                this.file_img.children.map(({name, innerHTML, class_additional, style}) => {
                    console.log(innerHTML)
                    this.childId = `poly${Math.floor(Math.random() * 10000)}`;
                    this.child = createDomElement({
                        name: `${name}`,
                        appendTo: this.target,
                        id: `${this.childId}`,
                        class: `hi normal_drag initial no-cursor vertical-child ${class_additional}`,
                        innerHTML: `${innerHTML}`,
                        contentEditable: false,
                        "data-styles": "normal",
                    });
                    initiateStyle(this.parentPath, this.childId, `left:0%;width: ${style.width}; height: ${style.height};background-color: transparent;border:0;position: absolute;` + style.others);
                    this.child.ruleIndex = ruleIndex;
                });
            } else {

                this.target = createDomElement({
                    name: `${"div"}`,
                    appendTo: this.parent,
                    innerHTML: `${this.file_img.target.innerHTML}`,
                    id: `${this.id}`,
                    class: `hi normal_drag initial ` + this.file_img.target.class_additional,
                    contentEditable: false,
                    "data-styles": "normal",
                });

            }
            initiateStyle(this.parentPath, this.id, `left:0;top:0;width: ${this.file_img.target.style.width}px; height: ${this.file_img.target.style.height}px;` + this.file_img.target.style.others)
            this.target.ruleIndex = ruleIndex;

        } else if (this.vertical_text_layout) {
            if (this.vertical_text_layout.children.length) {
                this.target = createDomElement({
                    name: `${"div"}`,
                    appendTo: this.parent,
                    id: `${this.id}`,
                    class: `hi normal_drag initial vertical-parent`,
                    contentEditable: false,
                    "data-styles": "normal",
                });
                this.vertical_text_layout.children.map(({name, innerHTML, class_additional, style}) => {
                    console.log(innerHTML)
                    this.childId = `poly${Math.floor(Math.random() * 10000)}`;
                    this.child = createDomElement({
                        name: `${name}`,
                        appendTo: this.target,
                        id: `${this.childId}`,
                        class: `hi normal_drag initial no-cursor vertical-child ${class_additional}`,
                        innerHTML: `${innerHTML}`,
                        contentEditable: false,
                        "data-styles": "normal",
                    });
                    initiateStyle(this.parentPath, this.childId, `left:0%;width: ${style.width}; height: ${style.height};background-color: transparent;border:0;position: absolute;` + style.others);
                    this.child.ruleIndex = ruleIndex;
                });
            } else {

                this.target = createDomElement({
                    name: `${"div"}`,
                    appendTo: this.parent,
                    innerHTML: `${this.vertical_text_layout.target.innerHTML}`,
                    id: `${this.id}`,
                    class: `hi normal_drag initial ` + this.vertical_text_layout.target.class_additional,
                    contentEditable: false,
                    "data-styles": "normal",
                });

            }
            initiateStyle(this.parentPath, this.id, `left:0;top:0;width: ${this.vertical_text_layout.target.style.width}px; height: ${this.vertical_text_layout.target.style.height}px;` + this.vertical_text_layout.target.style.others)
            this.target.ruleIndex = ruleIndex;

        } else {
            switch (this.tagName) {
                case "poly1":
                    this.target = createDomElement({
                        name: `div`,
                        appendTo: this.parent,
                        id: `${this.id}`,
                        class: `hi normal_drag initial clip-parent`,
                        innerHTML: `<div id='poly${Math.floor(Math.random() * 10000)}' class="no-cursor hi star initial _clippath"></div>`,
                        contentEditable: false,
                        "data-styles": "normal",
                    });
                    /*let tmp = createDomElement({
                        name: `div`,
                        appendTo: this.target,
                        id: `${this.id}`,
                        class: `hi initial _clippath no-cursor`,
                        innerHTML: "",
                        contentEditable: false
                    });*/
                    break;
                default:
                    this.target = createDomElement({
                        name: `${this.tagName}`,
                        appendTo: this.parent,
                        id: `${this.id}`,
                        class: `hi normal_drag initial`,
                        innerHTML: "hi there",
                        contentEditable: false,
                        "data-styles": "normal",
                    });
                    break;
            }
            initiateStyle(this.parentPath, this.id);
            this.target.ruleIndex = ruleIndex;
        }
    }


    //this.bindings();
    reload_compressed_layout();
    return this.target;
    //Styling.edit_style(`div#${this.parentPath} .${this.className}`,"background-color","blue",this.target.ruleIndex)
};


//new G().create();
