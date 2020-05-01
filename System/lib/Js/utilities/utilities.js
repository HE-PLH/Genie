
/*
***************************************
 ==== 7. CONSTANT VARIABLES
***************************************
*/
const CTRL = 17;
const SHIFT = 16;
const DEL = 46;
const D = 68;
const Z = 90;


/*
***************************************
 ==== 7. GLOBAL VARIABLES
***************************************
*/
let focusedElements = [];
let currentBeingTyped = [];
let deleted = [];
let redone = [];
let sequencedKeys = [];
let g_timer=false;
let seprator={
    pw: 0,
    lftw: 0,
},h;
let dragger={
    pl: 0,
    pt: 0,
};
let lft;
let right;
let mouse = {
    clicking: {
        status:false,
        point:{
            x:0,
            y:0
        },
    },
    dragging: {
        status:false,
        offset:{
            x:0,
            y:0
        },
        draggable : false,
        drag_start: {
            status: false,
            element: "",
        },
        elementClass:"",
    },
    hovering: {
        status: false,
        point: {
            x: 0,
            y: 0
        },
        droppable:"",
        dropUl:"",
        carrying:false,
    },
    releasing: {
        status: false,
        point: {
            x: 0,
            y: 0
        },
    },
    moving: {
        status: false,
        point: {
            x: 0,
            y: 0
        },
    },
};
let global_log_depth = 5;
let Methods = {
    edit  : {
        allow: (el)=>{
            el.readOnly = false;
            el.style.cursor = "auto";
            el.style.color = "blue";
            currentBeingTyped = el;
        },
        block: (el)=>{
            el.readOnly = true;
            for (let i=0;i<focusedElements.length;i++) {
                focusedElements[i].readOnly = true;
                focusedElements[i].style.cursor = "pointer";
                focusedElements[i].style.color = "black";
                currentBeingTyped = [];
            }
        }
    },
    find : function(array,item) {
        if (array.length > 0) {
            return array.find(i => i === item) === item;
        }
    },
    remove : function(array,item){
        if (Methods.find(array,item)) {
            array.splice(array.indexOf(item), 1);
        }
    },

    removeNode : function(element){
        element.parentNode.removeChild(element);
    },
    reverse : function(str,separator,joiner,fromRight) {
        return str.split(`${separator||" "}`).reverse().join(`${joiner||" "}`)//.substr(0,str.length-1-(fromRight||0));
    },
    presert : function(concernedNode,concerned_parent,nodeAfter) {
        try {
            nodeAfter = concerned_parent.contains(nodeAfter)?nodeAfter:null;
            concerned_parent.insertBefore(concernedNode,nodeAfter)
        }catch (e) {
            console.log("shit, a parent on a child?")
        }
    },
    getClassProperty : function(cls,property) {
        document.querySelectorAll(`${cls}`).forEach(function (el) {
            return el.style[`${property}`];
        })
    },
    changeClassProperty : function(cls,elements,property,newValue,oldValue) {
        document.querySelectorAll(`${cls}`).forEach(function (el) {
            Methods.find(elements,el)?el.style[`${property}`] = newValue:el.style[`${property}`]=oldValue||el.style[`${property}`];
        })
    },
    toogle : {
        display: function (element) {
            let display = element.style.display;
            display = display === "none"?"block":"none";
            element.style.display = display;
        },
        classes: function (element,class1,class2) {
            let cls = element.classList;
            if (cls.contains(`${class1}`)) {
                element.classList.remove(`${class1}`);
                element.classList.add(`${class2}`);
            } else if (cls.contains(`${class2}`)) {
                element.classList.remove(`${class2}`);
                element.classList.add(`${class1}`);
            }else{
                console.log("what?")
            }
        }
    },
    getIndex : (element)=>{
        let i = 0;
        while ((element = element.previousSibling) !== null){i++}
        return i;
    }
};



let projectObject = `
<div class="project" title="Genie">
    <div class="lib">
        <div class="css"><div class="Genie.css">Hi there css</div></div>
        <div class="Js">
            <div class="external">nothing</div>
            <div class="utilities">
                <div class="utilities.js">Hi there utilities.js</div>
                <div class="Genie.js">Hi there Genie.js</div>
            </div>      
        </div>
       
    </div>
</div>
`;



/*
***************************************
 ==== 7. GLOBAL FUNCTIONS
 ***************************************
*/
function CreateWindow() {
    h = createDomElement({name:"div"});
    h.innerHTML = projectObject;
    new Compressed_layout("window_body_left_bottom","container",h).init();
}
function NormalCss(rules) {
    let styleEl = document.createElement("style");
    styleEl.id = "mon_style";
    document.head.appendChild(styleEl);
    let styleSheet = styleEl.sheet;

    rules = rules.split("}");
    for (let st = rules.length;st>-1;st--) {
        if (rules.hasOwnProperty(st)&&rules[st]!=="") {
            styleSheet.insertRule(`${rules[st]}`, 0);
        }
    }

}

function getHtml(element,deep) {
    if (!element||element.tagName) return "";
    let txt,ax,el = document.createElement("div");
    el.appendChild(element.cloneNode(false));
    txt = el.innerHTML;
    if (deep){
        ax = txt.indexOf('>')+1;
        txt = txt.substring(0, ax)+element.innerHTML+txt.substring(ax);
    }
    el = null;
    return txt;
}


function setAttributesTo(attr,el1,el2) {
    function f(el1,el2) {
        for (let i in el1){ if (el1.hasOwnProperty(i)) {
             el1[i][`${attr}`] = el2[i];
              if (el1[i].querySelector("ul")&&el1[i].querySelector("ul")["children"].length > 0) {
                  f(el1[i].querySelector("ul")["children"], el2[i]["children"]);
              }
            }
        }
    }
    el1[`${attr}`] = el2;
    f(el1.querySelector("ul")["children"], el2["children"]);
}

function createDomElement(args) {
    let el = document.createElement(args.name);
    args.class?el.classList+=args.class:"";
    args.id?el.id = args.id:"";
    args.creator?el.creator = args.creator:"";
    args.innerHTML?el.innerHTML = args.innerHTML:"";
    args.value?el.value = args.value:"";
    args.appendTo?args.appendTo.appendChild(el):"";
    args.prependTo?args.prependTo.prepend(el):"";
    return el;
}
function Compressed_layout(parentClass,cls,data) {
    this.currentWindowClass =  cls;
    this.parentContainer = document.querySelector(`.${parentClass}`);
    this.currentWindowData =  data||document.querySelector(`.${cls}`);
    this.listContainer = createDomElement({name:"ul",class:"ul_main"});
    this.depths = "";
    this.init = ()=>{
        this.parentContainer.style.overflow = "scroll";
        let cont = createDomElement({name:"div",class:"compressed_layout"});
        loop(this.currentWindowData['children'], this.listContainer);
        cont.appendChild(this.listContainer);
        this.parentContainer.appendChild(cont);

        let my_con= document.querySelector('.compressed_layout');

        // Expand or collapse
        my_con.querySelectorAll('.list_item').forEach(function (element) {
            element.classList.contains('carrying')?element.querySelector("ul").style.display = "none":"";

        });

        console.log(this.listContainer)
    };
    function loop(links, ul) {
        for (let obj in links){
            if (links.hasOwnProperty(obj)) {
                let li = createDomElement({name: "li", class:"list_item", appendTo: ul,creator:links[obj]}),
                    title = links[obj]["title"] ? links[obj]["title"] : links[obj].className;
                let sp = createDomElement({name: "input", class: "layout_title editable clickable normal_drag", appendTo: li, value: title});
                sp.setAttribute("readonly","true");
                sp.setAttribute("draggable","true");
                createDomElement({name: "div", class: "icon", prependTo: li});
                if (links[obj]['children'] && links[obj]['children'].length > 0) {
                    createDomElement({name: "div", class: "arrow collapsed", prependTo: li});
                    let ul2 = createDomElement({name: "ul", appendTo: li});
                    li.classList+=" carrying";
                    loop(links[obj]['children'], ul2);
                } else {
                    //createDomElement({name: "div", class: "leaf_node", prependTo: li});
                }
            }
        }
    }
}

/*
***************************************
 ==== 7. EVENTS
 ***************************************
 */


function Events() {
    this.default = ()=> {
        window.addEventListener("keydown", function (e) {
            new KeyEventHandler(e,"key_down");
        });
        window.addEventListener("keyup", function (e) {
            new KeyEventHandler(e,"key_up");
        });
        window.addEventListener("mousedown", function (e) {
            new MouseEventHandler(e,"mouse_down");
        });
        window.onclick = (e)=>{
            new MouseEventHandler(e,"mouse_click");
        };
        window.addEventListener("mousemove", function (e) {
            new MouseEventHandler(e,"mouse_move");
        });
        window.addEventListener("mouseup", function (e) {
            new MouseEventHandler(e,"mouse_up");
        });
        window.addEventListener("mouseover", function (e) {
            new MouseEventHandler(e,"mouse_over");
        });

        if(document.querySelector(".code_display")) {
            document.querySelector(".code_display").onkeyup = function (e) {
                let p = e.target.creator.parentNode.creator;
                p.innerHTML = "";
                p.innerHTML = e.target.value;
            }
        }
    };
    function KeyEventHandler (element,event){
        this.handleDelete=()=> {
            let lst = [];
            for (let i = 0; i < focusedElements.length; i++) {
                if (focusedElements[i].parentNode.classList.contains("list_item")) {
                    lst.push(focusedElements[i]);
                }
            }
            this.delete(lst)
        };
        this.delete = (elements)=>{
            let temp = [],element;
            for (let i = 0; i < elements.length; i++) {
                element = elements[i];
                if (deleted.length < global_log_depth) {
                    temp.push({
                        elem: element,
                        parent: element.parentNode.parentNode,
                        concerned: element.parentNode,
                        next: element.parentNode.nextElementSibling,
                        creator_parent: element.parentNode.creator.parentNode,
                        creator_concerned: element.parentNode.creator,
                        next_parent: element.parentNode.creator.nextElementSibling
                    });
                }
                Methods.removeNode(element.parentNode.creator);
                Methods.removeNode(element.parentNode);
            }
            deleted.push(temp);
        };

        this.handleUndoDelete=()=>{
            if (deleted.length>0) {
                let d = deleted[deleted.length - 1],lst = [],e,p,n,ce,cp,np,t;
                for (let i = 0; i < d.length; i++) {
                    t = d[i];e = t.concerned;p = t.parent;n = t.next;ce = t.creator_concerned;cp = t.creator_parent;np = t.next_parent;
                    Methods.presert(e, p, n);
                    Methods.presert(ce, cp, np);
                    lst.push(t);
                }
                Methods.remove(deleted, d);
                redone.push(lst);
            }
        };

        this.handleRedoDelete=()=>{
            if (redone.length>0) {
                let r = redone[0], element,lst = [],t;
                for (let i = 0; i < r.length; i++) {
                    t = r[i];
                    element = t.elem;
                    lst.push(element)
                }
                this.delete(lst);
                Methods.remove(redone, r);
            }
        };

        this.handleDuplicate=()=>{
            element.preventDefault();
            let lst = [];
            for (let i = 0; i < focusedElements.length; i++) {
                if (focusedElements[i].parentNode.classList.contains("list_item")) {
                    lst.push(focusedElements[i].parentNode);
                }
            }
            this.duplicate(lst);
        };

        this.duplicate = (elems)=>{
            let elem,c,cc,len = elems.length;
            for (let i = 0; i < len; i++) {
                elem= elems[i];
                c = elem.cloneNode(true);
                cc = elem.creator.cloneNode(true);
                Methods.presert(c, elem.parentNode, elem.nextElementSibling);
                Methods.presert(cc, elem.creator.parentNode, elem.creator.nextElementSibling);
                setAttributesTo("creator", c, cc);
            }
            this.delete([c])
        };

        this.handleKeys=()=>{
            if (sequencedKeys[0] === DEL) {
                this.handleDelete();
            }else if (sequencedKeys.length === 2&&(sequencedKeys[0] === CTRL&&sequencedKeys[1] === Z)){
                this.handleUndoDelete();
            }else if (sequencedKeys.length === 3&&(sequencedKeys[0] === CTRL&&sequencedKeys[1] === SHIFT&&sequencedKeys[2] === Z)){
                this.handleRedoDelete();
            }else if (sequencedKeys.length === 2&&(sequencedKeys[0] === CTRL&&sequencedKeys[1] === 68)){
                this.handleDuplicate();
            }
        };
        this.def=()=>{
            this.key = element.keyCode;
            if (event === "key_down") {
                if (!Methods.find(sequencedKeys,this.key)) {
                    sequencedKeys.push(this.key);
                }
                this.handleKeys();
            }else if (event === "key_up"){
                Methods.remove(sequencedKeys,this.key)
            }
        };
        this.def();
    }

    function MouseEventHandler (element,event){
        this.el = element.target;
        this.event = event;

        this.handleHovering = ()=>{
            if (this.el.classList.contains("separator")){
                if (this.el.classList.contains("fill_width")) {
                    this.el.style.cursor = "row-resize"
                }else if (this.el.classList.contains("fill_height")) {
                    this.el.style.cursor = "col-resize"
                }
            }

            //append tool
            if (this.el.classList.contains("appendedTool")){
                if (this.el.id ==="left_resize") {
                    document.getElementById("left_resize_point").style.borderRightColor = "red";
                    document.getElementById("left_resize_point_tail").style.backgroundColor = "red";
                }else if(this.el.id ==="top_resize"){
                    document.getElementById("top_resize_point").style.borderBottomColor = "red";
                    document.getElementById("top_resize_point_tail").style.backgroundColor = "red";
                }
            }else {
                if (document.getElementById("left_resize_point")!==null) {
                    document.getElementById("left_resize_point").style.borderRightColor = "lightblue";
                    document.getElementById("top_resize_point").style.borderBottomColor = "lightblue";
                    document.getElementById("left_resize_point_tail").style.backgroundColor = "lightblue";
                    document.getElementById("top_resize_point_tail").style.backgroundColor = "lightblue";
                }
            }

            //list_item

            mouse.hovering.droppable = "";
            mouse.hovering.carrying = false;
            if (mouse.dragging.status&&this.el.classList.contains("layout_title")){
                let parent = this.el.parentElement;
                if (parent.classList.contains("carrying")) {
                    let arrow = parent.querySelector(".arrow"),ul = parent.querySelector("ul");
                    ul.style.display = "block";
                    if (arrow.classList.contains("collapsed")){
                        arrow.classList.remove("collapsed");
                        arrow.classList.add("expanded");
                    }
                    arrow.scrollIntoView(true);
                    mouse.hovering.droppable = ul;
                }
                mouse.hovering.carrying = true;
            }
        };

        this.separatedWindowDrag = (orientation,direction)=> {
            if (mouse.dragging.drag_start) {
                right = this.el.nextElementSibling;
                lft = this.el.previousElementSibling;
                seprator.rightw = right[`client${orientation}`];
                seprator.lftw = lft[`client${orientation}`];
                seprator.pw = lft.parentElement[`client${orientation}`];
            }

            let  lft_w = seprator.lftw + mouse.dragging.offset[direction],
                right_w = seprator.rightw - mouse.dragging.offset[direction];
            if ((right_w > 0 && lft_w > 0)) {
                lft.style[orientation.toLowerCase()]=`${100*lft_w/seprator.pw}%`;
                right.style[orientation.toLowerCase()]=`${100*right_w/seprator.pw}%`;
            }

        };
        this.handleEditing = ()=>{
            if (Methods.find(focusedElements,this.el)){
                //on double clicking list_title

                for (let i=0;i<focusedElements.length;i++){
                    if (this.el.classList.contains("editable")) {
                        if(!Methods.find(currentBeingTyped,this.el)) {
                            Methods.edit.allow(this.el);
                        }
                    }
                }
            }else {
                Methods.edit.block(this.el);
                if (sequencedKeys[0]!==CTRL) {
                    focusedElements = [];
                }
                focusedElements.push(this.el);
            }
        };

        this.handleCodePreview=()=> {
            if (this.el.classList.contains("layout_title")) {
                let cd = document.querySelector(".code_display");
                if (cd) {
                    cd.value = this.el.parentNode.creator.innerHTML;
                    cd.creator = this.el;
                }
            }
        };

        this.mouse_down = ()=>{
            this.handleCodePreview();
            this.handleEditing();

            if (!g_timer) {
                if (this.el["draggable"]) {
                    mouse.dragging.drag_start = true;
                    mouse.dragging.draggable = true;
                    mouse.dragging.element = this.el;
                }else {
                    mouse.dragging.draggable = false;
                }

            }else{
                mouse.dragging.drag_start = false;
            }

            if (this.el.classList.contains("cancel")||this.el.classList.contains("window_close")){
                document.querySelector(".window").style.display = "none";
            }
            if (this.el.classList.contains("code_display")){
                let cd = document.querySelector(".code_display");
                cd.readOnly = false;
                cd.style.cursor = "auto";
            }
        };


        this.released = ()=> {
            //if (mouse.hovering.droppable.classList.contains("layout_title")) {
            if (mouse.hovering.carrying) {

                let has_ul = mouse.dragging.element.parentNode.querySelector("ul");
                let has_dest_ul =this.el.parentNode.querySelector("ul");
                if (!(has_ul === null ? mouse.dragging.element : has_ul).isEqualNode(this.el)) {
                    if (has_dest_ul!==null) {
                        Methods.presert(mouse.dragging.element.parentNode, mouse.hovering.droppable, mouse.hovering.droppable.nextElementSibling);
                        Methods.presert(mouse.dragging.element.parentNode.creator, mouse.hovering.droppable.parentNode.creator, null);
                    }else {
                        let element = createDomElement({name:"ul",appendTo:this.el.parentNode});
                        createDomElement({name: "div", class: "arrow collapsed", prependTo: this.el.parentNode});
                        createDomElement({name: "div", class: "icon", prependTo: this.el.parentNode});
                        this.el.parentNode.classList+=" carrying";
                        element.append(mouse.dragging.element.parentNode);
                        this.el.parentNode.creator.prepend(mouse.dragging.element.parentNode.creator);
                    }
                }
            }
            mouse.hovering.dropUl = "";
            // }
        };

        this.click = ()=>{
            if (this.el.classList.contains("layout_title")) {
                //compressed layout title focus
                Methods.changeClassProperty(".compressed_layout li .layout_title",focusedElements,"background", "lightblue","white");
            }else if (this.el.classList.contains("arrow")&&this.el.parentNode.classList.contains("carrying")){
                //if compressed layout list_item has other list_items

                Methods.toogle.classes(this.el,"expanded","collapsed");
                Methods.toogle.display(this.el.parentNode.querySelector("ul"));
            }
        };

        this.normal_drag = function () {
            let wnd, isWindow, isInsideElement,isAppendedTool,isListItem;
            isWindow = mouse.dragging.element.classList.contains("window_title");
            isInsideElement = mouse.dragging.element.classList.contains("insideElement");
            isAppendedTool = mouse.dragging.element.classList.contains("appendedTool");
            isListItem = mouse.dragging.element.classList.contains("layout_title");
            if (isListItem){
                mouse.dragging.elementClass = "layout_title";
            }
            if (mouse.dragging.drag_start){
                if (isWindow) {
                    mouse.dragging.elementClass = "window";
                    wnd = mouse.dragging.element.parentNode.parentElement;
                } else if (isInsideElement) {
                    mouse.dragging.elementClass = "insideElement";
                    wnd = mouse.dragging.element;
                } else if (isAppendedTool){
                    mouse.dragging.elementClass = "isAppendedTool";
                    wnd = mouse.dragging.element.parentElement;
                }

                if(!isListItem) {
                    dragger.pl = wnd.offsetLeft;
                    dragger.pt = wnd.offsetTop;
                }else if (isListItem){
                    mouse.hovering.dropUl = createDomElement({name:"ul"});
                }
            }
            if(!isListItem) {
                wnd = document.querySelector(`.${mouse.dragging.elementClass}`);
                Methods.changeClassProperty(`.${mouse.dragging.elementClass}`, [wnd], "left", `${100 * (dragger.pl + mouse.dragging.offset.x) / window.innerWidth}%`);
                Methods.changeClassProperty(`.${mouse.dragging.elementClass}`, [wnd], "top", `${100 * (dragger.pt + mouse.dragging.offset.y) / window.innerHeight}%`);
            }
            //Methods.changeClassProperty(`.${element}`,[document.querySelector(`.${element}`)],"left",`${100*right_w/seprator.pw}%`);
        };


        this.drag = ()=>{
            element.preventDefault();
            if (mouse.dragging.draggable === true) {
                mouse.dragging.offset = {
                    x: mouse.moving.point.x - mouse.clicking.point.x,
                    y: mouse.moving.point.y - mouse.clicking.point.y
                };

                if (mouse.dragging.element) {

                    //two window separator
                    if (mouse.dragging.element.classList.contains("separator")) {
                        if (mouse.dragging.element.classList.contains("fill_width")) {
                            this.separatedWindowDrag("Height","y");
                        }else if (mouse.dragging.element.classList.contains("fill_height")) {
                            this.separatedWindowDrag("Width","x");
                        }
                    }

                    //normal drag on element
                    if (mouse.dragging.element.classList.contains("normal_drag")) {
                        this.normal_drag(this.el);
                    }
                }

            }
        };


        this.init=(event,element)=> {
            if (event === "mouse_down") {
                mouse.releasing.status = false;
                mouse.clicking.status = true;
                mouse.clicking.point = {x:element.clientX,y:element.clientY};



            }else if (event === "mouse_move") {
                mouse.moving.status = true;
                mouse.moving.point = {x:element.clientX,y:element.clientY};
            }else if (event === "mouse_up") {
                g_timer = false;
                mouse.hovering.status = false;
                mouse.moving.status = false;
                mouse.dragging.status = false;
                mouse.clicking.point = {x:element.clientX,y:element.clientY};
                mouse.releasing.status = true;
                mouse.clicking.status = false;

            }else if (event === "mouse_over") {
                mouse.hovering.status = true;
                mouse.hovering.point = {x:element.clientX,y:element.clientY};
            }else if (event === "mouse_click") {
                this.click();
            }
            //mouseup
            if (mouse.releasing.status&&!mouse.moving.status) {
                this.released();
            }

            //mousedown
            if (mouse.clicking.status) {
                this.mouse_down();
            }
            //drag
            if (mouse.moving.status && mouse.clicking.status &&
                !((mouse.moving.point.x === mouse.clicking.point.x) &&
                    (mouse.moving.point.y === mouse.clicking.point.y))) {
                mouse.dragging.status = true;
                g_timer = true;
                this.drag();
            }
            //hovering
            if (mouse.hovering.status) {
                this.handleHovering();
            }
        };
        this.init(this.event,element);

    }
}

function rqst() {
    sendRequest({project_name:h["children"][0]["title"],project:h.innerHTML});
}

/*
***************************************
 ==== 7. ELEMENTS
 ***************************************
*/
function Element(element,cls) {
    this.element = createDomElement({name:element,class:cls});
}


