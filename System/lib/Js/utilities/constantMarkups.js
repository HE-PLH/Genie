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

let ctxmenu = `
<div class="do" title="done">
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
<div class="create" title="github">
    <div class="headings" title="done">
            <div class="h1" title="done"></div>
            <div class="h2" title="done"></div>
            <div class="h3" title="done"></div>
            <div class="h4" title="done"></div>
            <div class="h5" title="done"></div>
            <div class="h6" title="done"></div>
            <div class="address" title="done"></div>
     </div>
    <div class="block elements" title="done">
        <div class="poly1" title="done"></div>
        <div class="div" title="done"></div>
        <div class="p" title="done"></div>       
        <div class="hr" title="done"></div>
        <div class="pagination" title="done">
            <div class="nav" title="done"></div>
            <div class="article" title="done"></div>
            <div class="article" title="done"></div>
        </div>
        <div class="lists" title="done">
            <div class="ol" title="done"></div>
            <div class="ul" title="done"></div>
            <div class="li" title="done"></div>
        </div>
        <div class="pre" title="done"></div>
        <div class="blockquote" title="done"></div>
        <div class="form" title="done"></div>
        <div class="table" title="done"></div>
    </div>
    <div class="inline elements" title="twitter">
        <div class="text elements" title="done">
            <div class="phrase markup" title="done">
                <div class="em" title="done"></div>
                <div class="strong" title="done"></div>
                <div class="den" title="done"></div>
                <div class="code" title="done"></div>
                <div class="samp" title="done"></div>
                <div class="kbd" title="done"></div>
                <div class="var" title="done"></div>
                <div class="site" title="done"></div>
            </div>
            <div class="font markup" title="done">
                <div class="tt" title="done"></div>
                <div class="i" title="done"></div>
                <div class="b" title="done"></div>
                <div class="u" title="done"></div>
                <div class="strike" title="done"></div>
                <div class="big" title="done"></div>
                <div class="small" title="done"></div>
                <div class="sub" title="done"></div>
                <div class="sup" title="done"></div>
            </div>
            <div class="special elements" title="done">
                <div class="a" title="done"></div>
                <div class="img" title="done"></div>
                <div class="applet" title="done"></div>
                <div class="font" title="done"></div>
                <div class="basefont" title="done"></div>
                <div class="br" title="done"></div>
                <div class="script" title="done"></div>
                <div class="map" title="done"></div>
            </div>
        </div>
        <div class="a" title="done"></div>
        <div class="img" title="done"></div>
    </div>
</div>
`;

/*tools*/
let RotationalTool = `<div id="rot-resize-cont" class="rot-resize-cont align_center normal_drag _tool rot">
    <div id="rotate_z" class="rot-resize normal_drag"></div>
    <div id="rotate_x" class="rot-resize normal_drag"></div>
    <div id="rotate_y" class="rot-resize normal_drag"></div>
    </div>`;
let PositionTool = `
    <div id="position-resize" class="position-resize _tool">
        <div id="top_resize" class="appendedTool normal_drag verticalAppendedTool position">
            <div class="point tool" id="top_resize_point" style="border-bottom-color: lightblue"></div>
            <div class="point_tail tool" id="top_resize_point_tail" style="border-bottom-color: lightblue"></div>
        </div>
        <div id="left_resize" class="appendedTool normal_drag horizontalAppendedTool position">
            <div class="point tool" id="left_resize_point" style="border-right-color: lightblue"></div>
            <div class="point_tail tool" id="left_resize_point_tail" style="border-right-color: lightblue"></div>
        </div>
    </div>
`;
let SizeTool = `
    <div id="size-resize" class="size-resize _tool">
        <div id="height_resize" class="appendedTool normal_drag verticalAppendedTool size">
            <div class="point tool" id="height_resize_point" style="border-bottom-color: lightblue"></div>
            <div class="point_tail tool" id="height_resize_point_tail" style="border-bottom-color: lightblue"></div>
        </div>
        <div id="width_resize" class="appendedTool normal_drag horizontalAppendedTool size">
            <div class="point tool" id="width_resize_point" style="border-right-color: lightblue"></div>
            <div class="point_tail tool" id="width_resize_point_tail" style="border-right-color: lightblue"></div>
        </div>
    </div>
`;
let traditionalTool = `
    <g id="traditional" class="traditional _tool">
        <rect id="t_top_left" class="t_tool normal_drag "></rect>
        <rect id="t_top_left_top" class="t_tool normal_drag "></rect>
        <rect id="t_top" class=" t_tool normal_drag "></rect>
        <rect id="t_top_right_top" class=" t_tool normal_drag "></rect>
        <rect id="t_top_right" class=" t_tool normal_drag "></rect>
        <rect id="t_top_right_top_right" class=" t_tool normal_drag "></rect>
        <rect id="t_right" class=" t_tool normal_drag "></rect>
        <rect id="t_bottom_right_right" class=" t_tool normal_drag "></rect>              
        <rect id="t_bottom_right" class=" t_tool normal_drag "></rect>              
        <rect id="t_bottom_bottom_right" class=" t_tool normal_drag "></rect>              
        <rect id="t_bottom" class=" t_tool normal_drag "></rect>              
        <rect id="t_bottom_left_bottom" class=" t_tool normal_drag "></rect>
        <rect id="t_bottom_left" class=" t_tool normal_drag "></rect>
        <rect id="t_left_bottom_left" class=" t_tool normal_drag "></rect>
        <rect id="t_left" class=" t_tool normal_drag "></rect>
        <rect id="t_left_top" class="t_tool normal_drag "></rect>
        <rect id="t_rot" class=" t_tool normal_drag ">
            <path id="t_rot_neck" style="position:absolute;"></path>
        </rect>
    </g>
`;
let searchTool = `
<div class="double-item-cont search-cont">
<input class="double-item-main search-input" placeholder="Search..."/>
<div class="double-item-minor search-icon">
<svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#search"></use>
                    </svg>
</div>
</div>
`

let designElements = {
    "Lines and Shapes": `

    <div class="nav-item-display-top align-center">
    <svg viewBox="0 0 24 24" class="small-ic" width="24px" height="24px">
        <use xlink:href="../sources/svg_icons.svg#arrow-left"></use>
    </svg>
    Lines and Shapes
    </div>
    <div class="nav-item-display-body">
    <div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
    <div class="elements-title fill_width">
        Lines    
    </div>
        <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/line1.svg" alt="line1.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/dashed-line.svg" alt="dashed-line.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/dotted-line.svg" alt="dotted-line.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/arrow1.svg" alt="arrow1.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/arrow2.svg" alt="arrow2.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/dashed-arrow.svg" alt="dashed-arrow.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-line.svg" alt="ptop-line.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-arrow.svg" alt="ptop-arrow.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-dotted-arrow.svg" alt="ptop-dotted-arrow.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-rect-line.svg" alt="ptop-rect-line.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-circle-line.svg" alt="ptop-circle-line.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-diamond-line.svg" alt="ptop-diamond-line.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-rect-empty-line.svg" alt="ptop-rect-empty-line.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-circle-empty-line.svg" alt="ptop-circle-empty-line.svg"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/ptop-diamond-empty-line.svg" alt="ptop-diamond-empty-line.svg"/>
                    </div>
    </div>
    <div class="nav-item-display-body">
    <div class="elements-title fill_width">
        Shapes    
    </div>
                <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/rectangle.webp" alt="rectangle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/rounded-rectangle.webp" alt="rounded-rectangle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/circle.webp" alt="circle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/triangle.webp" alt="triangle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/inverted-triangle.webp" alt="inverted-triangle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/diamond.webp" alt="diamond.webp"/>
                    </div>                    
                    
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/pentagon.webp" alt="pentagon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/hexagon.webp" alt="hexagon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/horizontal-hexagon.webp" alt="horizontal-hexagon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/pent-star.webp" alt="pent-star.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/horizontal-pent-star.webp" alt="horizontal-pent-star.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/box-star.webp" alt="box-star.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/octagon.webp" alt="octagon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/dozengon.webp" alt="dozengon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/manygon.webp" alt="manygon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/obtuse-octagon.webp" alt="obtuse-octagon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/small-teeth-gon.webp" alt="small-teeth-gon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/super-manygon.webp" alt="super-manygon.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/right-arrow-shape.webp" alt="right-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/left-arrow-shape.webp" alt="left-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/top-arrow-shape.webp" alt="top-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/bottom-arrow-shape.webp" alt="bottom-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/double-arrow-shape.webp" alt="double-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/wierd-right-arrow-shape.webp" alt="wierd-right-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/mkuki-right-arrow-shape.webp" alt="mkuki-right-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/double-in-arrow-shape.webp" alt="double-in-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/double-out-arrow-shape.webp" alt="double-out-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/double-circle-shape.webp" alt="double-circle-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/left-comment-shape.webp" alt="left-comment-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/left-comment-round-shape.webp" alt="left-comment-round-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/heart-shape.webp" alt="heart-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/cross-shape.webp" alt="cross-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/cloud-shape.webp" alt="cloud-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/wierd-bottom-arrow-shape.webp" alt="wierd-bottom-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/wierd-bottom-in-arrow-shape.webp" alt="wierd-bottom-in-arrow-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/base-cross-shape.webp" alt="base-cross-shape.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/base-poly.webp" alt="base-poly.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/base-side-poly.webp" alt="base-side-poly.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/parallelogram-right.webp" alt="parallelogram-right.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/parallelogram-left.webp" alt="parallelogram-left.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/trapezium.webp" alt="trapezium.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/upside-trapezium.webp" alt="upside-trapezium.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/upside-seat.webp" alt="upside-seat.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/seat.webp" alt="seat.webp"/>
                    </div>
    </div>
    `,
    "Graphics": `

    <div class="nav-item-display-top align-center">
    <svg viewBox="0 0 24 24" class="small-ic" width="24px" height="24px">
        <use xlink:href="../sources/svg_icons.svg#arrow-left"></use>
    </svg>
    Graphics
    </div>
    <div class="nav-item-display-body">
    <div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
    <div class="elements-title fill_width">
        for you
    </div>
        <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/person2.jpg" alt="person2.jpg">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/person1.jpg" alt="person1.jpg">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/person3.jpg" alt="person3.jpg">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/person4.jpg" alt="person4.jpg">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic1.webp" alt="graphic1.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic2.webp" alt="graphic2.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic3.webp" alt="graphic3.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic4.webp" alt="graphic4.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic5.webp" alt="graphic5.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic6.webp" alt="graphic6.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic7.webp" alt="graphic7.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic8.webp" alt="graphic8.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic9.webp" alt="graphic9.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic10.webp" alt="graphic10.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic11.webp" alt="graphic11.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic12.webp" alt="graphic12.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic13.webp" alt="graphic13.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic14.webp" alt="graphic14.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic15.webp" alt="graphic15.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic16.webp" alt="graphic16.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic17.webp" alt="graphic17.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic18.webp" alt="graphic18.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic19.webp" alt="graphic19.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic20.webp" alt="graphic20.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic21.webp" alt="graphic21.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic22.webp" alt="graphic22.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic23.webp" alt="graphic23.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic24.webp" alt="graphic24.webp">
                    </div>
    </div>
    `,
    "Frames": `

    <div class="nav-item-display-top align-center">
    <svg viewBox="0 0 24 24" class="small-ic" width="24px" height="24px">
        <use xlink:href="../sources/svg_icons.svg#arrow-left"></use>
    </svg>
    Frames
    </div>
    <div class="nav-item-display-body">
    <div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
    <div class="elements-title fill_width">
        for you
    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic1.webp" alt="graphic1.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic2.webp" alt="graphic2.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic3.webp" alt="graphic3.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic4.webp" alt="graphic4.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic5.webp" alt="graphic5.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic6.webp" alt="graphic6.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic7.webp" alt="graphic7.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic8.webp" alt="graphic8.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic9.webp" alt="graphic9.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic10.webp" alt="graphic10.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic11.webp" alt="graphic11.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic12.webp" alt="graphic12.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic13.webp" alt="graphic13.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic14.webp" alt="graphic14.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic15.webp" alt="graphic15.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic16.webp" alt="graphic16.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic17.webp" alt="graphic17.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic18.webp" alt="graphic18.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic19.webp" alt="graphic19.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic20.webp" alt="graphic20.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic21.webp" alt="graphic21.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic22.webp" alt="graphic22.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic23.webp" alt="graphic23.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic24.webp" alt="graphic24.webp">
                    </div>
    </div>
    
    `
}

let select_layouts = {
    Design: `
<div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
<div id="genie-left-nav-styles-top" class="tab-top">
                <div id="genie-left-nav-left-tab-title" class="tab-btn tab align_center">Templates</div>
<div id="genie-left-nav-right-tab-title" class="tab-btn tab align_center">Styles</div>
</div>
<div id="genie-left-nav-styles-body" class="tab-body tab-main-body fill_width">
    <div id="genie-left-nav-main" class="genie-style-mains fill_width">
        <div class="fill_width disp-layout-tab">
            <div class="box-outer">
                <a class="arrow-left m-arrow align-center">
                    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#arrow-left"></use>
                    </svg>
                </a>
                <a class="arrow-right m-arrow align-center">
                    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#arrow-right"></use>
                    </svg>
                </a>
                <div class="box-inner">
                    <div class="thumb align-center">Invoice</div>
                    <div class="thumb align-center">Delivery Note</div>
                    <div class="thumb align-center">Credit Note</div>
                    <div class="thumb align-center">Job Card</div>
                    <div class="thumb align-center">Logo</div>
                    <div class="thumb align-center">Letterhead</div>
                    <div class="thumb align-center">LPO</div>
                    <div class="thumb align-center">Quotation</div>
                </div>
            </div>
        </div>
        <div class="fill_width disp-layout-tab">
            <div class="fill_width disp-layout-tab-top">
                <div class="recent-used disp-btn">Lines and Shapes</div>
                <div class="see-all disp-btn">See All</div>
            </div>
            <div class="image-box-outer box-outer">
                <a class="arrow-left m-arrow align-center">
                    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#arrow-left"></use>
                    </svg>
                </a>
                <a class="arrow-right m-arrow align-center">
                    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#arrow-right"></use>
                    </svg>
                </a>
                <div class="image-box-inner box-inner">
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/rectangle.webp" alt="rectangle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/diamond.webp" alt="diamond.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/rounded-rectangle.webp" alt="rounded-rectangle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/line.svg" alt="line.svg"/>
                    </div>
                    
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/inverted-triangle.webp" alt="inverted-triangle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/triangle.webp" alt="triangle.webp"/>
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tab-img" src="../sources/imgs/elements/line1.svg" alt="line1.svg"/>
                    </div>
                    <div class="see-all-redirect-btn align-center">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#arrow-right"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="fill_width disp-layout-tab">
            <div class="fill_width disp-layout-tab-top">
                <div class="recent-used disp-btn">Graphics</div>
                <div class="see-all disp-btn">See All</div>
            </div>
            <div class="image-box-outer box-outer">
                <a class="arrow-left m-arrow align-center">
                    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#arrow-left"></use>
                    </svg>
                </a>
                <a class="arrow-right m-arrow align-center">
                    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#arrow-right"></use>
                    </svg>
                </a>
                <div class="image-box-inner box-inner">
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/person2.jpg" alt="person2.jpg">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/person1.jpg" alt="person1.jpg">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/person3.jpg" alt="person3.jpg">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/person4.jpg" alt="person4.jpg">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic1.webp" alt="graphic1.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic2.webp" alt="graphic2.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic3.webp" alt="graphic3.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic4.webp" alt="graphic4.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic5.webp" alt="graphic5.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic6.webp" alt="graphic6.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic7.webp" alt="graphic7.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic8.webp" alt="graphic8.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic9.webp" alt="graphic9.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic10.webp" alt="graphic10.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic11.webp" alt="graphic11.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic12.webp" alt="graphic12.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic13.webp" alt="graphic13.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic14.webp" alt="graphic14.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic15.webp" alt="graphic15.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic16.webp" alt="graphic16.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic17.webp" alt="graphic17.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic18.webp" alt="graphic18.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic19.webp" alt="graphic19.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic20.webp" alt="graphic20.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic21.webp" alt="graphic21.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic22.webp" alt="graphic22.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic23.webp" alt="graphic23.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="tile-img" src="../sources/imgs/graphics/graphic24.webp" alt="graphic24.webp">
                    </div>
                    
                    <div class="see-all-redirect-btn align-center">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#arrow-right"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="fill_width disp-layout-tab">
            <div class="fill_width disp-layout-tab-top">
                <div class="recent-used disp-btn">Frames</div>
                <div class="see-all disp-btn">See All</div>
            </div>
            <div class="image-box-outer box-outer">
                <a class="arrow-left m-arrow align-center">
                    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#arrow-left"></use>
                    </svg>
                </a>
                <a class="arrow-right m-arrow align-center">
                    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#arrow-right"></use>
                    </svg>
                </a>
                <div class="image-box-inner box-inner">
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame1.webp" alt="frame1.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame2.webp" alt="frame2.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame3.webp" alt="frame3.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame4.webp" alt="frame4.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame5.webp" alt="frame5.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame6.webp" alt="frame6.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame7.webp" alt="frame7.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame8.webp" alt="frame8.webp">
                    </div>
                    <div class="image-thumb align-center">
                        <img class="frame-tile-img" src="../sources/imgs/frame/frame9.webp" alt="frame9.webp">
                    </div>
                    
                    <div class="see-all-redirect-btn align-center">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#arrow-right"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    </div>
                <div id="genie-right-main" class="genie-style-mains fill_width">
                    Test
                </div>
            </div>
            `,
    Uploads: `
${searchTool}
<div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
<div class="double-item-cont upload-cont">
    <button class="double-item-main upload-btn">
    <span>Upload files</span>
</button>
    <div class="double-item-minor upload-hum">
    <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                        <use xlink:href="../sources/svg_icons.svg#list"></use>
                    </svg>
</div>
</div>
<div id="genie-left-nav-styles-top" class="tab-top">
                <div id="genie-left-nav-left-tab-title" class="tab-btn tab align_center">Images</div>
<div id="genie-left-nav-right-tab-title" class="tab-btn tab align_center">Videos</div>
<div id="genie-left-nav-right-tab-title" class="tab-btn tab align_center">Audio</div>
</div>
<div id="genie-left-nav-styles-body" class="tab-body tab-main-body fill_width">
    <div id="genie-left-nav-main" class="genie-style-mains fill_width">
    <div class="image-list-container">
        <div class="image-tile">
            <img class="tile-img" src="../sources/imgs/person2.jpg" alt="person2.jpg">
        </div>
   
        <div class="image-tile">
            <img class="tile-img" src="../sources/imgs/person1.jpg" alt="person1.jpg">
        </div>
    
        <div class="image-tile">
            <img class="tile-img" src="../sources/imgs/person3.jpg" alt="person3.jpg">
        </div>
        <div class="image-tile">
            <img class="tile-img" src="../sources/imgs/person4.jpg" alt="person4.jpg">
        </div>
        <div class="image-tile">
            <img class="tile-img" src="../sources/imgs/IMG_20200224_120902.jpg" alt="IMG_20200224_120902.jpg">
        </div>
    </div>
    </div>
     <div id="genie-right-main" class="genie-style-mains fill_width">
                    Test
                </div>
     <div id="genie-right-nost-main" class="genie-style-mains fill_width">
                    Test1
                </div>
            </div>
            `,
}
