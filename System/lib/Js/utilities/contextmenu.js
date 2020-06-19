let svg_list = ["twitter","arrow","done","success","facebook","github","info"];

function ContextMenu(parentClass,cls,data) {
    this.parentContainer = document.querySelector(`.${parentClass}`);
    this.cont_class = "contextmenu";
    this.currentWindowData =  data||document.querySelector(`.${cls}`);
    this.listContainer = createDomElement({name:"ul",class:"ul_main"});
    this.init = ()=>{
        this.parentContainer.style.overflow = "hidden";
        let cont = createDomElement({name:"div",class:`${this.cont_class}`});
        loop(this.currentWindowData['children'], this.listContainer);
        cont.appendChild(this.listContainer);
        this.parentContainer.appendChild(cont);
        let my_con= document.querySelector(`.${this.cont_class}`);
    };
    function loop(links, ul) {
        for (let obj in links){
            if (links.hasOwnProperty(obj)) {
                let li = createDomElement({name: "li", class:"list_item cm", appendTo: ul,creator:links[obj]}),
                    title = links[obj].classList[0],
                    svg_title = links[obj]["title"] ? links[obj]["title"] : "";
                createDomElement({name: "span", class: "_layout_title clickable align_center_left", appendTo: li, innerHTML: title});
                let ic = createDomElement({name: "div", class: "icon align_center", prependTo: li});
                if (Methods.find(svg_list,svg_title)) {
                    let svg = `<svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                                <use xlink:href="../sources/icons.svg#${svg_title}"></use>
                            </svg>`;
                    ic.innerHTML += (svg);
                }
                if (links[obj]['children'] && links[obj]['children'].length > 0) {
                    createDomElement({name: "div", class: "arrow", prependTo: li});
                    let ul2 = createDomElement({name: "ul", appendTo: li});
                    li.classList+=" carrying";
                    loop(links[obj]['children'], ul2);
                }

            }
        }
    }
}

let b = createDomElement({name:"div"});
b.innerHTML = ctxmenu;
new ContextMenu("container","hi",b).init();
