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
        <div class="table" title="done">
            <div class="table" title="done"></div>
            <div class="thead" title="done"></div>
            <div class="tbody" title="done"></div>
            <div class="th" title="done"></div>
            <div class="tr" title="done"></div>
            <div class="td" title="done"></div>
        </div>
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
let uploadedImages = [];
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

const IMAGE_LINK = API + "/singlemedia";
let SHAPES = {};

function appendAllImageToUploadArea(data, area, imgCls = "tile-img", imgParentCls, imgName = "name") {
    for (let item in data) {
        appendImageToUploadArea(area, item, imgCls, imgParentCls, imgName)
    }

}

function appendImageToUploadArea(area, img, imgCls, imgParentCls) {

    let upload_dir = document.getElementById(area);
    let _temp = `
        <div class="${imgParentCls}">
            <img class="${imgCls || "tile-img"}" src="${IMAGE_LINK + "/" + img}" alt="${img}">
        </div>`

    upload_dir.innerHTML += _temp

    console.log(img)
}


function loadAllUserImages(cb) {
    //load currently uploaded images by user
    sendGet("http://localhost:2727/data/get-all/media", (e) => {
        uploadedImages = Methods.groupObjArrayBy(e.response, "name");
        cb();
    })
}


let select_layouts = {
    Design: {
        markup: `
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
    <div id="genie-left-nav-main" class="genie-style-mains fill_width tab-body-active">
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
                <div id="image-box-inner" class="image-box-inner box-inner">
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
        actions: function () {

        }
    },
    Uploads: {
        markup: `
${searchTool}
<div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
<div class="double-item-cont upload-cont">
    <button class="double-item-main upload-btn">
    <span>Upload files</span>
    <input type='file' id="getFile" name="file" multiple='multiple' accept='image/*' style="display:none">
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
    <div id="genie-left-nav-main" class="genie-style-mains uploads-main-body fill_width tab-body-active">
    <div id="upload-area" class="image-list-container">
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
            <img class="tile-img" src="../sources/imgs/logo.png" alt="logo.png">
        </div>
        <div class="image-tile">
            <img class="tile-img" src="../sources/imgs/letterhead.png" alt="letterhead.png">
        </div>
        <div class="image-tile">
            <img class="tile-img" src="../sources/imgs/footer.png" alt="footer.png">
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
        actions: function () {

            // bind upload button to upload event
            document.getElementById("getFile").addEventListener("change", (e) => {
                console.log(e)
                let photos = e.target.files;
                let formData = new FormData();

                for (let i = 0; i < photos.length; i++) {
                    const photo = photos[i];
                    formData.append('file', photo);
                }

                // formData.append("file", photo);

                sendFile(formData, API + "/data/media", (response) => {
                    console.log(response);
                })
                /*fetch("http://localhost:2727/data/media", {method: "POST", body: formData}).then((response)=>{
                    console.log(response);
                });*/
            })

            loadAllUserImages(() => {
                appendAllImageToUploadArea(uploadedImages, "upload-area", "tile-img", "image-tile");
            })

        }
    },
    Elements: {
        markup: `
${searchTool}
<div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
<div id="genie-left-nav-main" class="genie-style-mains fill_width tab-body-active">
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
                    <div class="thumb align-center">Lines</div>
                    <div class="thumb align-center">Arrow</div>
                    <div class="thumb align-center">Circle</div>
                    <div class="thumb align-center">Heart</div>
                    <div class="thumb align-center">Square</div>
                    <div class="thumb align-center">Rectangle</div>
                    <div class="thumb align-center">Box</div>
                    <div class="thumb align-center">Star</div>
                    <div class="thumb align-center">Table</div>
                    <div class="thumb align-center">Phone</div>
                    
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
                <div id="image-box-inner" class="image-box-inner box-inner">
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
            `,
        actions: function () {
            sendGet(API + "/data/get-all/elements", (e) => {
                //render first 10 elements;
                SHAPES = Methods.groupObjArrayBy(e.response, "icon_image");
                appendAllImageToUploadArea(SHAPES, "image-box-inner", "tab-img", "image-thumb align-center", "icon_image");
            })
        }
    },
    Fields: {
        markup: `
    ${searchTool}
    <div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
            <div class="image-list-container">
        <div class="image-tile field-img-tile">
            <img class="field-img" src="../sources/imgs/fields/field1.png" alt="field1.png">
        </div>
        <div class="image-tile field-img-tile">
            <img class="field-img" src="../sources/imgs/fields/field2.png" alt="field2.png">
        </div>
        <div class="image-tile field-img-tile">
            <img class="field-img" src="../sources/imgs/fields/field3.png" alt="field3.png">
        </div>
        </div>
    `,
        actions: function () {

        }
    },
    Text: {
        markup: `
${searchTool}
<div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
<div class="button-cont">
    <button id="add-text-btn" class="text-btn">
    <span>Add a Textbox</span>
</button>
    
</div>
<div class="button-cont">
    <button id="add-heading-text-btn" class="text-btn">
    <span>Add a heading</span>
</button>
    
</div>
<div class="button-cont">
    <button id="add-sub-heading-text-btn" class="text-btn">
    <span>Add a sub heading</span>
</button>    
</div>
<div class="button-cont">
    <button id="add-little-text-btn" class="text-btn">
    <span>Add a little bit of text</span>
</button>    
</div>
<div id="genie-left-nav-styles-top" class="tab-top">
                <div id="genie-left-nav-left-tab-title" class="tab-btn tab align_center">Images</div>
<div id="genie-left-nav-right-tab-title" class="tab-btn tab align_center">Videos</div>
<div id="genie-left-nav-right-tab-title" class="tab-btn tab align_center">Audio</div>
</div>
<div id="genie-left-nav-styles-body" class="tab-body tab-main-body fill_width">
    <div id="genie-left-nav-main" class="genie-style-mains uploads-main-body fill_width tab-body-active">
    <div class="image-list-container">
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text1.webp" alt="text1.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text2.webp" alt="text2.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text3.webp" alt="text3.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text4.webp" alt="text4.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text5.webp" alt="text5.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text6.webp" alt="text6.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text7.webp" alt="text7.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text8.webp" alt="text8.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text9.webp" alt="text9.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text10.webp" alt="text10.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text11.webp" alt="text11.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text12.webp" alt="text12.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text13.webp" alt="text13.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text14.webp" alt="text14.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text15.webp" alt="text15.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text16.webp" alt="text16.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text17.webp" alt="text17.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text18.webp" alt="text18.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text19.webp" alt="text19.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img class="m_tile-img" src="../sources/imgs/text/text20.webp" alt="text20.webp">
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
        actions: function () {

        }
    },
    Tables: {
        markup: `
${searchTool}
<div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>


<div class="button-cont">
    <button id="normal-table" class="text-btn">
    <span>Add normal table</span>
</button>
</div>
<div class="button-cont">
    <button id="add-framed-element-btn" class="text-btn">
    <span>Add Framed</span>
</button>
</div>
<div class="button-cont">
    <button id="add-appended-img-element-btn" class="text-btn">
    <span>Add Appended Img</span>
</button>
</div>
<div class="button-cont">
    <button id="add-text-element-btn" class="text-btn">
    <span>Add Texts</span>
</button>    
</div>

<div id="genie-left-nav-styles-top" class="tab-top">
                <div id="genie-left-nav-left-tab-title" class="tab-btn tab align_center">Images</div>
<div id="genie-left-nav-right-tab-title" class="tab-btn tab align_center">Videos</div>
<div id="genie-left-nav-right-tab-title" class="tab-btn tab align_center">Audio</div>
</div>
<div id="genie-left-nav-styles-body" class="tab-body tab-main-body fill_width">
    <div id="genie-left-nav-main" class="genie-style-mains uploads-main-body fill_width tab-body-active">
    <div class="image-list-container">
        <div class="image-thumb text-img-cont align-center">
            <img id="create-clipped-tile" src="../sources/imgs/text/text1.webp" alt="text1.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img  id="create-framed-tile" src="../sources/imgs/text/text2.webp" alt="text2.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img id="create-appended-img-tile" src="../sources/imgs/text/text3.webp" alt="text3.webp">
        </div>
        <div class="image-thumb text-img-cont align-center">
            <img id="create-text-tile" src="../sources/imgs/text/text4.webp" alt="text3.webp">
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
        actions: function () {

        }
    },
    fontFamily: {
        markup: `
${searchTool}
            <div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: RoxboroughCF Bold" class="font-family-item-text">
                    RoxboroughCF Bold
                </div>
                <div class="font-family-icon-cont">
                   <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                      <use xlink:href="../sources/svg_icons.svg#done"></use>
                   </svg>
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: DM Sans" class="font-family-item-text">
                    DM Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Hanuman" class="font-family-item-text">
                    Hanuman
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Open Sans" class="font-family-item-text">
                    Open Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Alata" class="font-family-item-text">
                    Alata
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Helvetica" class="font-family-item-text">
                    Helvetica
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Verdana" class="font-family-item-text">
                    Verdana
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Calibri" class="font-family-item-text">
                    Calibri
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Noto" class="font-family-item-text">
                    Noto
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Sans" class="font-family-item-text">
                    Lucida Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gill Sans" class="font-family-item-text">
                    Gill Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Century Gothic" class="font-family-item-text">
                    Century Gothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Candara" class="font-family-item-text">
                    Candara
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Futara" class="font-family-item-text">
                    Futara
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Franklin Gothic Medium" class="font-family-item-text">
                    Franklin Gothic Medium
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Trebuchet MS" class="font-family-item-text">
                    Trebuchet MS
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Geneva" class="font-family-item-text">
                    Geneva
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Segoe UI" class="font-family-item-text">
                    Segoe UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Optima" class="font-family-item-text">
                    Optima
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Avanta Garde" class="font-family-item-text">
                    Avanta Garde
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: SERIF FONT FAMILY" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Times New Roman" class="font-family-item-text">
                    Times New Roman
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Big Caslon" class="font-family-item-text">
                    Big Caslon
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bodoni MT" class="font-family-item-text">
                    Bodoni MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Book Antiqua" class="font-family-item-text">
                    Book Antiqua
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bookman" class="font-family-item-text">
                    Bookman
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: New Century Schoolbook" class="font-family-item-text">
                    New Century Schoolbook
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Calisto MT" class="font-family-item-text">
                    Calisto MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cambria" class="font-family-item-text">
                    Cambria
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Didot" class="font-family-item-text">
                    Didot
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Garamond" class="font-family-item-text">
                    Garamond
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cambria Math" class="font-family-item-text">
                    Cambria Math
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Goudy Old Style" class="font-family-item-text">
                    Goudy Old Style
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Hoefler Text" class="font-family-item-text">
                    Hoefler Text
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Bright" class="font-family-item-text">
                    Lucida Bright
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Palatino" class="font-family-item-text">
                    Palatino
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Perpetua" class="font-family-item-text">
                    Perpetua
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell" class="font-family-item-text">
                    Rockwell
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell Extra Bold" class="font-family-item-text">
                    Rockwell Extra Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Baskerville" class="font-family-item-text">
                    Baskerville
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MONOSPACE FONT FAMILY" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Consolas" class="font-family-item-text">
                    Consolas
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Courier" class="font-family-item-text">
                    Courier
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Courier New" class="font-family-item-text">
                    Courier New
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Console" class="font-family-item-text">
                    Lucida Console
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucidatypewriter" class="font-family-item-text">
                    Lucidatypewriter
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Sans Typewriter" class="font-family-item-text">
                    Lucida Sans Typewriter
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Monaco" class="font-family-item-text">
                    Monaco
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Andale Mono" class="font-family-item-text">
                    Andale Mono
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: CURSIVE FONT FAMILY" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Comic Sans" class="font-family-item-text">
                    Comic Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Comic Sans MS" class="font-family-item-text">
                    Comic Sans MS
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Apple Chancery" class="font-family-item-text">
                    Apple Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Zapf Chancery" class="font-family-item-text">
                    Zapf Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bradley Hand" class="font-family-item-text">
                    Bradley Hand
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brush Script MT" class="font-family-item-text">
                    Brush Script MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brush Script Std" class="font-family-item-text">
                    Brush Script Std
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Snell Roundhan" class="font-family-item-text">
                    Snell Roundhan
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: URW Chancery" class="font-family-item-text">
                    URW Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Coronet script" class="font-family-item-text">
                    Coronet script
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Florence" class="font-family-item-text">
                    Florence
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Parkavenue" class="font-family-item-text">
                    Parkavenue
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: FANTASY FONT FAMILY" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Impact" class="font-family-item-text">
                    Impact
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brushstroke" class="font-family-item-text">
                    Brushstroke
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Luminari" class="font-family-item-text">
                    Luminari
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Chalkduster" class="font-family-item-text">
                    Chalkduster
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Jazz LET" class="font-family-item-text">
                    Jazz LET
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Blippo" class="font-family-item-text">
                    Blippo
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Stencil Std" class="font-family-item-text">
                    Stencil Std
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Marker Felt" class="font-family-item-text">
                    Marker Felt
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Trattatello" class="font-family-item-text">
                    Trattatello
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arnoldboecklin" class="font-family-item-text">
                    Arnoldboecklin
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Oldtown" class="font-family-item-text">
                    Oldtown
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Copperplate" class="font-family-item-text">
                    Copperplate
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: papyrus" class="font-family-item-text">
                    papyrus
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: CSS Fonts List" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Abadi MT Condensed Light" class="font-family-item-text">
                    Abadi MT Condensed Light
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Aharoni" class="font-family-item-text">
                    Aharoni
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Aharoni Bold" class="font-family-item-text">
                    Aharoni Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Aldhabi" class="font-family-item-text">
                    Aldhabi
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: AlternateGothic2 BT" class="font-family-item-text">
                    AlternateGothic2 BT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Andale Mono" class="font-family-item-text">
                    Andale Mono
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Andalus" class="font-family-item-text">
                    Andalus
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Angsana New" class="font-family-item-text">
                    Angsana New
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: AngsanaUPC" class="font-family-item-text">
                    AngsanaUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Aparajita" class="font-family-item-text">
                    Aparajita
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Apple Chancery" class="font-family-item-text">
                    Apple Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arabic Typesetting" class="font-family-item-text">
                    Arabic Typesetting
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial" class="font-family-item-text">
                    Arial
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial Black" class="font-family-item-text">
                    Arial Black
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial narrow" class="font-family-item-text">
                    Arial narrow
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial Nova" class="font-family-item-text">
                    Arial Nova
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial Rounded MT Bold" class="font-family-item-text">
                    Arial Rounded MT Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arnoldboecklin" class="font-family-item-text">
                    Arnoldboecklin
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Avanta Garde" class="font-family-item-text">
                    Avanta Garde
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bahnschrift" class="font-family-item-text">
                    Bahnschrift
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bahnschrift Light" class="font-family-item-text">
                    Bahnschrift Light
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bahnschrift SemiBold" class="font-family-item-text">
                    Bahnschrift SemiBold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bahnschrift SemiLight" class="font-family-item-text">
                    Bahnschrift SemiLight
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Baskerville" class="font-family-item-text">
                    Baskerville
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Batang" class="font-family-item-text">
                    Batang
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: BatangChe" class="font-family-item-text">
                    BatangChe
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Big Caslon" class="font-family-item-text">
                    Big Caslon
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: BIZ UDGothic" class="font-family-item-text">
                    BIZ UDGothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: BIZ UDMincho Medium" class="font-family-item-text">
                    BIZ UDMincho Medium
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Blippo" class="font-family-item-text">
                    Blippo
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bodoni MT" class="font-family-item-text">
                    Bodoni MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Book Antiqua" class="font-family-item-text">
                    Book Antiqua
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Book Antiqua" class="font-family-item-text">
                    Book Antiqua
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bookman" class="font-family-item-text">
                    Bookman
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bradley Hand" class="font-family-item-text">
                    Bradley Hand
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Browallia New" class="font-family-item-text">
                    Browallia New
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: BrowalliaUPC" class="font-family-item-text">
                    BrowalliaUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brush Script MT" class="font-family-item-text">
                    Brush Script MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brush Script Std" class="font-family-item-text">
                    Brush Script Std
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brushstroke" class="font-family-item-text">
                    Brushstroke
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Calibri" class="font-family-item-text">
                    Calibri
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Calibri Light" class="font-family-item-text">
                    Calibri Light
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Calisto MT" class="font-family-item-text">
                    Calisto MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cambodian" class="font-family-item-text">
                    Cambodian
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cambria" class="font-family-item-text">
                    Cambria
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Candara" class="font-family-item-text">
                    Candara
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Goudy Old Style" class="font-family-item-text">
                    Goudy Old Style
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Hoefler Text" class="font-family-item-text">
                    Hoefler Text
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Bright" class="font-family-item-text">
                    Lucida Bright
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Palatino" class="font-family-item-text">
                    Palatino
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Perpetua" class="font-family-item-text">
                    Perpetua
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell" class="font-family-item-text">
                    Rockwell
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell Extra Bold" class="font-family-item-text">
                    Rockwell Extra Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Baskerville" class="font-family-item-text">
                    Baskerville
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MONOSPACE FONT FAMILY" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Consolas" class="font-family-item-text">
                    Consolas
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Courier" class="font-family-item-text">
                    Courier
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Courier New" class="font-family-item-text">
                    Courier New
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Console" class="font-family-item-text">
                    Lucida Console
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucidatypewriter" class="font-family-item-text">
                    Lucidatypewriter
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Sans Typewriter" class="font-family-item-text">
                    Lucida Sans Typewriter
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Monaco" class="font-family-item-text">
                    Monaco
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Andale Mono" class="font-family-item-text">
                    Andale Mono
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: CURSIVE FONT FAMILY" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Comic Sans" class="font-family-item-text">
                    Comic Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Comic Sans MS" class="font-family-item-text">
                    Comic Sans MS
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Apple Chancery" class="font-family-item-text">
                    Apple Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Zapf Chancery" class="font-family-item-text">
                    Zapf Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bradley Hand" class="font-family-item-text">
                    Bradley Hand
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brush Script MT" class="font-family-item-text">
                    Brush Script MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brush Script Std" class="font-family-item-text">
                    Brush Script Std
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Snell Roundhan" class="font-family-item-text">
                    Snell Roundhan
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: URW Chancery" class="font-family-item-text">
                    URW Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Coronet script" class="font-family-item-text">
                    Coronet script
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Florence" class="font-family-item-text">
                    Florence
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Parkavenue" class="font-family-item-text">
                    Parkavenue
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: FANTASY FONT FAMILY" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Impact" class="font-family-item-text">
                    Impact
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brushstroke" class="font-family-item-text">
                    Brushstroke
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Luminari" class="font-family-item-text">
                    Luminari
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Chalkduster" class="font-family-item-text">
                    Chalkduster
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Jazz LET" class="font-family-item-text">
                    Jazz LET
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Blippo" class="font-family-item-text">
                    Blippo
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Stencil Std" class="font-family-item-text">
                    Stencil Std
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Marker Felt" class="font-family-item-text">
                    Marker Felt
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Trattatello" class="font-family-item-text">
                    Trattatello
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arnoldboecklin" class="font-family-item-text">
                    Arnoldboecklin
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Oldtown" class="font-family-item-text">
                    Oldtown
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Copperplate" class="font-family-item-text">
                    Copperplate
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: papyrus" class="font-family-item-text">
                    papyrus
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: CSS Fonts List" class="font-family-item-text">
                    FONT FAMILY	APPEARANCE
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Abadi MT Condensed Light" class="font-family-item-text">
                    Abadi MT Condensed Light
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Aharoni" class="font-family-item-text">
                    Aharoni
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Aharoni Bold" class="font-family-item-text">
                    Aharoni Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Aldhabi" class="font-family-item-text">
                    Aldhabi
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: AlternateGothic2 BT" class="font-family-item-text">
                    AlternateGothic2 BT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Andale Mono" class="font-family-item-text">
                    Andale Mono
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Andalus" class="font-family-item-text">
                    Andalus
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Angsana New" class="font-family-item-text">
                    Angsana New
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: AngsanaUPC" class="font-family-item-text">
                    AngsanaUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Aparajita" class="font-family-item-text">
                    Aparajita
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Apple Chancery" class="font-family-item-text">
                    Apple Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arabic Typesetting" class="font-family-item-text">
                    Arabic Typesetting
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial" class="font-family-item-text">
                    Arial
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial Black" class="font-family-item-text">
                    Arial Black
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial narrow" class="font-family-item-text">
                    Arial narrow
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial Nova" class="font-family-item-text">
                    Arial Nova
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arial Rounded MT Bold" class="font-family-item-text">
                    Arial Rounded MT Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Arnoldboecklin" class="font-family-item-text">
                    Arnoldboecklin
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Avanta Garde" class="font-family-item-text">
                    Avanta Garde
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bahnschrift" class="font-family-item-text">
                    Bahnschrift
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bahnschrift Light" class="font-family-item-text">
                    Bahnschrift Light
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bahnschrift SemiBold" class="font-family-item-text">
                    Bahnschrift SemiBold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bahnschrift SemiLight" class="font-family-item-text">
                    Bahnschrift SemiLight
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Baskerville" class="font-family-item-text">
                    Baskerville
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Batang" class="font-family-item-text">
                    Batang
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: BatangChe" class="font-family-item-text">
                    BatangChe
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Big Caslon" class="font-family-item-text">
                    Big Caslon
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: BIZ UDGothic" class="font-family-item-text">
                    BIZ UDGothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: BIZ UDMincho Medium" class="font-family-item-text">
                    BIZ UDMincho Medium
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Blippo" class="font-family-item-text">
                    Blippo
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bodoni MT" class="font-family-item-text">
                    Bodoni MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Book Antiqua" class="font-family-item-text">
                    Book Antiqua
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Book Antiqua" class="font-family-item-text">
                    Book Antiqua
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bookman" class="font-family-item-text">
                    Bookman
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Bradley Hand" class="font-family-item-text">
                    Bradley Hand
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Browallia New" class="font-family-item-text">
                    Browallia New
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: BrowalliaUPC" class="font-family-item-text">
                    BrowalliaUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brush Script MT" class="font-family-item-text">
                    Brush Script MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brush Script Std" class="font-family-item-text">
                    Brush Script Std
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Brushstroke" class="font-family-item-text">
                    Brushstroke
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Calibri" class="font-family-item-text">
                    Calibri
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Calibri Light" class="font-family-item-text">
                    Calibri Light
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Calisto MT" class="font-family-item-text">
                    Calisto MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cambodian" class="font-family-item-text">
                    Cambodian
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cambria" class="font-family-item-text">
                    Cambria
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cambria Math" class="font-family-item-text">
                    Cambria Math
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Candara" class="font-family-item-text">
                    Candara
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Century Gothic" class="font-family-item-text">
                    Century Gothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Chalkduster" class="font-family-item-text">
                    Chalkduster
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cherokee" class="font-family-item-text">
                    Cherokee
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Comic Sans" class="font-family-item-text">
                    Comic Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Comic Sans MS" class="font-family-item-text">
                    Comic Sans MS
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Consolas" class="font-family-item-text">
                    Consolas
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Constantia" class="font-family-item-text">
                    Constantia
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Copperplate" class="font-family-item-text">
                    Copperplate
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Copperplate Gothic Light" class="font-family-item-text">
                    Copperplate Gothic Light
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Copperplate Gothic Bold" class="font-family-item-text">
                    Copperplate Gothic Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Corbel" class="font-family-item-text">
                    Corbel
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Cordia New" class="font-family-item-text">
                    Cordia New
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: CordiaUPC" class="font-family-item-text">
                    CordiaUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Coronetscript" class="font-family-item-text">
                    Coronetscript
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Courier" class="font-family-item-text">
                    Courier
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Courier New" class="font-family-item-text">
                    Courier New
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: DaunPenh" class="font-family-item-text">
                    DaunPenh
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: David" class="font-family-item-text">
                    David
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: DengXian" class="font-family-item-text">
                    DengXian
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: DFKai-SB" class="font-family-item-text">
                    DFKai-SB
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Didot" class="font-family-item-text">
                    Didot
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: DilleniaUPC" class="font-family-item-text">
                    DilleniaUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: DokChampa" class="font-family-item-text">
                    DokChampa
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Dotum" class="font-family-item-text">
                    Dotum
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: DotumChe" class="font-family-item-text">
                    DotumChe
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Ebrima" class="font-family-item-text">
                    Ebrima
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Estrangelo Edessa" class="font-family-item-text">
                    Estrangelo Edessa
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: EucrosiaUPC" class="font-family-item-text">
                    EucrosiaUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Euphemia" class="font-family-item-text">
                    Euphemia
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: FangSong" class="font-family-item-text">
                    FangSong
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Florence" class="font-family-item-text">
                    Florence
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Franklin Gothic Medium" class="font-family-item-text">
                    Franklin Gothic Medium
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: FrankRuehl" class="font-family-item-text">
                    FrankRuehl
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: FreesiaUPC" class="font-family-item-text">
                    FreesiaUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Futara" class="font-family-item-text">
                    Futara
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gabriola" class="font-family-item-text">
                    Gabriola
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gadugi" class="font-family-item-text">
                    Gadugi
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Garamond" class="font-family-item-text">
                    Garamond
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gautami" class="font-family-item-text">
                    Gautami
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Geneva" class="font-family-item-text">
                    Geneva
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Georgia" class="font-family-item-text">
                    Georgia
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Georgia Pro" class="font-family-item-text">
                    Georgia Pro
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gill Sans" class="font-family-item-text">
                    Gill Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gill Sans Nova" class="font-family-item-text">
                    Gill Sans Nova
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gisha" class="font-family-item-text">
                    Gisha
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Goudy Old Style" class="font-family-item-text">
                    Goudy Old Style
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gulim" class="font-family-item-text">
                    Gulim
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: GulimChe" class="font-family-item-text">
                    GulimChe
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Gungsuh" class="font-family-item-text">
                    Gungsuh
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: GungsuhChe" class="font-family-item-text">
                    GungsuhChe
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Hebrew" class="font-family-item-text">
                    Hebrew
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Hoefler Text" class="font-family-item-text">
                    Hoefler Text
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: HoloLens MDL2 Assets" class="font-family-item-text">
                    HoloLens MDL2 Assets
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Impact" class="font-family-item-text">
                    Impact
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Ink Free" class="font-family-item-text">
                    Ink Free
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: IrisUPC" class="font-family-item-text">
                    IrisUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Iskoola Pota" class="font-family-item-text">
                    Iskoola Pota
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Japanese" class="font-family-item-text">
                    Japanese
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: JasmineUPC" class="font-family-item-text">
                    JasmineUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Javanese Text" class="font-family-item-text">
                    Javanese Text
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Jazz LET" class="font-family-item-text">
                    Jazz LET
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: KaiTi" class="font-family-item-text">
                    KaiTi
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Kalinga" class="font-family-item-text">
                    Kalinga
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Kartika" class="font-family-item-text">
                    Kartika
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Khmer UI" class="font-family-item-text">
                    Khmer UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: KodchiangUPC" class="font-family-item-text">
                    KodchiangUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Kokila" class="font-family-item-text">
                    Kokila
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Korean" class="font-family-item-text">
                    Korean
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lao" class="font-family-item-text">
                    Lao
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lao UI" class="font-family-item-text">
                    Lao UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Latha" class="font-family-item-text">
                    Latha
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Leelawadee" class="font-family-item-text">
                    Leelawadee
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Leelawadee UI" class="font-family-item-text">
                    Leelawadee UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Leelawadee UI Semilight" class="font-family-item-text">
                    Leelawadee UI Semilight
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Levenim MT" class="font-family-item-text">
                    Levenim MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: LilyUPC" class="font-family-item-text">
                    LilyUPC
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Bright" class="font-family-item-text">
                    Lucida Bright
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Console" class="font-family-item-text">
                    Lucida Console
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Handwriting" class="font-family-item-text">
                    Lucida Handwriting
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Sans" class="font-family-item-text">
                    Lucida Sans
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Sans Typewriter" class="font-family-item-text">
                    Lucida Sans Typewriter
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucida Sans Unicode" class="font-family-item-text">
                    Lucida Sans Unicode
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Lucidatypewriter" class="font-family-item-text">
                    Lucidatypewriter
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Luminari" class="font-family-item-text">
                    Luminari
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Malgun Gothic" class="font-family-item-text">
                    Malgun Gothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Malgun Gothic Semilight" class="font-family-item-text">
                    Malgun Gothic Semilight
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Mangal" class="font-family-item-text">
                    Mangal
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Marker Felt" class="font-family-item-text">
                    Marker Felt
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Marlett" class="font-family-item-text">
                    Marlett
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Meiryo" class="font-family-item-text">
                    Meiryo
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Meiryo UI" class="font-family-item-text">
                    Meiryo UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft Himalaya" class="font-family-item-text">
                    Microsoft Himalaya
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft JhengHei" class="font-family-item-text">
                    Microsoft JhengHei
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft JhengHei UI" class="font-family-item-text">
                    Microsoft JhengHei UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft New Tai Lue" class="font-family-item-text">
                    Microsoft New Tai Lue
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft PhagsPa" class="font-family-item-text">
                    Microsoft PhagsPa
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft Sans Serif" class="font-family-item-text">
                    Microsoft Sans Serif
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft Tai Le" class="font-family-item-text">
                    Microsoft Tai Le
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft Uighur" class="font-family-item-text">
                    Microsoft Uighur
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft YaHei" class="font-family-item-text">
                    Microsoft YaHei
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft YaHei UI" class="font-family-item-text">
                    Microsoft YaHei UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Microsoft Yi Baiti" class="font-family-item-text">
                    Microsoft Yi Baiti
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MingLiU" class="font-family-item-text">
                    MingLiU
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MingLiU_HKSCS" class="font-family-item-text">
                    MingLiU_HKSCS
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MingLiU_HKSCS-ExtB" class="font-family-item-text">
                    MingLiU_HKSCS-ExtB
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MingLiU-ExtB" class="font-family-item-text">
                    MingLiU-ExtB
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Miriam" class="font-family-item-text">
                    Miriam
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Monaco" class="font-family-item-text">
                    Monaco
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Mongolian Baiti" class="font-family-item-text">
                    Mongolian Baiti
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MoolBoran" class="font-family-item-text">
                    MoolBoran
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MS Gothic" class="font-family-item-text">
                    MS Gothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MS Mincho" class="font-family-item-text">
                    MS Mincho
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MS PGothic" class="font-family-item-text">
                    MS PGothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MS PMincho" class="font-family-item-text">
                    MS PMincho
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MS UI Gothic" class="font-family-item-text">
                    MS UI Gothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: MV Boli" class="font-family-item-text">
                    MV Boli
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Myanmar Text" class="font-family-item-text">
                    Myanmar Text
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Narkisim" class="font-family-item-text">
                    Narkisim
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Neue Haas Grotesk Text Pro" class="font-family-item-text">
                    Neue Haas Grotesk Text Pro
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: New Century Schoolbook" class="font-family-item-text">
                    New Century Schoolbook
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: News Gothic MT" class="font-family-item-text">
                    News Gothic MT
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Nirmala UI" class="font-family-item-text">
                    Nirmala UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: No automatic language associations" class="font-family-item-text">
                    No automatic language associations
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Noto" class="font-family-item-text">
                    Noto
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: NSimSun" class="font-family-item-text">
                    NSimSun
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Nyala" class="font-family-item-text">
                    Nyala
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Oldtown" class="font-family-item-text">
                    Oldtown
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Optima" class="font-family-item-text">
                    Optima
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Palatino" class="font-family-item-text">
                    Palatino
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Palatino Linotype" class="font-family-item-text">
                    Palatino Linotype
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: papyrus" class="font-family-item-text">
                    papyrus
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Parkavenue" class="font-family-item-text">
                    Parkavenue
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Perpetua" class="font-family-item-text">
                    Perpetua
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Plantagenet Cherokee" class="font-family-item-text">
                    Plantagenet Cherokee
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: PMingLiU" class="font-family-item-text">
                    PMingLiU
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Raavi" class="font-family-item-text">
                    Raavi
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell" class="font-family-item-text">
                    Rockwell
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell Extra Bold" class="font-family-item-text">
                    Rockwell Extra Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell Nova" class="font-family-item-text">
                    Rockwell Nova
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell Nova Cond" class="font-family-item-text">
                    Rockwell Nova Cond
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rockwell Nova Extra Bold" class="font-family-item-text">
                    Rockwell Nova Extra Bold
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Rod" class="font-family-item-text">
                    Rod
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Sakkal Majalla" class="font-family-item-text">
                    Sakkal Majalla
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Sanskrit Text" class="font-family-item-text">
                    Sanskrit Text
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Segoe MDL2 Assets" class="font-family-item-text">
                    Segoe MDL2 Assets
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Segoe Print" class="font-family-item-text">
                    Segoe Print
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Segoe Script" class="font-family-item-text">
                    Segoe Script
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Segoe UI" class="font-family-item-text">
                    Segoe UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Segoe UI Emoji" class="font-family-item-text">
                    Segoe UI Emoji
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Segoe UI Historic" class="font-family-item-text">
                    Segoe UI Historic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Segoe UI Symbol" class="font-family-item-text">
                    Segoe UI Symbol
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Shonar Bangla" class="font-family-item-text">
                    Shonar Bangla
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Shruti" class="font-family-item-text">
                    Shruti
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: SimHei" class="font-family-item-text">
                    SimHei
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: SimKai" class="font-family-item-text">
                    SimKai
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Simplified Arabic" class="font-family-item-text">
                    Simplified Arabic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Simplified Chinese" class="font-family-item-text">
                    Simplified Chinese
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: SimSun" class="font-family-item-text">
                    SimSun
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: SimSun-ExtB" class="font-family-item-text">
                    SimSun-ExtB
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Sitka" class="font-family-item-text">
                    Sitka
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Snell Roundhan" class="font-family-item-text">
                    Snell Roundhan
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Stencil Std" class="font-family-item-text">
                    Stencil Std
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Sylfaen" class="font-family-item-text">
                    Sylfaen
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Symbol" class="font-family-item-text">
                    Symbol
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Tahoma" class="font-family-item-text">
                    Tahoma
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Thai" class="font-family-item-text">
                    Thai
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Times New Roman" class="font-family-item-text">
                    Times New Roman
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Traditional Arabic" class="font-family-item-text">
                    Traditional Arabic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Traditional Chinese" class="font-family-item-text">
                    Traditional Chinese
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Trattatello" class="font-family-item-text">
                    Trattatello
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Trebuchet MS" class="font-family-item-text">
                    Trebuchet MS
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Tunga" class="font-family-item-text">
                    Tunga
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: UD Digi Kyokasho" class="font-family-item-text">
                    UD Digi Kyokasho
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: UD Digi KyoKasho NK-R" class="font-family-item-text">
                    UD Digi KyoKasho NK-R
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: UD Digi KyoKasho NP-R" class="font-family-item-text">
                    UD Digi KyoKasho NP-R
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: UD Digi KyoKasho N-R" class="font-family-item-text">
                    UD Digi KyoKasho N-R
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Urdu Typesetting" class="font-family-item-text">
                    Urdu Typesetting
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: URW Chancery" class="font-family-item-text">
                    URW Chancery
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Utsaah" class="font-family-item-text">
                    Utsaah
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Vani" class="font-family-item-text">
                    Vani
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Verdana" class="font-family-item-text">
                    Verdana
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Verdana Pro" class="font-family-item-text">
                    Verdana Pro
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Vijaya" class="font-family-item-text">
                    Vijaya
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Vrinda" class="font-family-item-text">
                    Vrinda
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Webdings" class="font-family-item-text">
                    Webdings
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Westminster" class="font-family-item-text">
                    Westminster
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Wingdings" class="font-family-item-text">
                    Wingdings
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Yu Gothic" class="font-family-item-text">
                    Yu Gothic
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Yu Gothic UI" class="font-family-item-text">
                    Yu Gothic UI
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Yu Mincho" class="font-family-item-text">
                    Yu Mincho
                </div>
            </div>
            <div class="selected-font-family font-family-item-cont">
                <div style="font-family: Zapf Chancery" class="font-family-item-text">
                    Zapf Chancery
                </div>
            </div>
            
            `,
        actions: function () {

        }
    },
    clipped: {
        markup: `${searchTool}
            <div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
            <div class="vl-item">
                <div class="vl-top">Clip path</div>
                <div class="vl-bottom">
                    <textarea id="clip-text-area" class="clip-text-area always-type"></textarea>
                </div>
            </div>
            
            <div class="vl-item">
                <div class="vl-top">Select icon Image</div>
                <div class="vl-bottom full-btn-cont">
                    <div class="full-btn-cont">
                    <button class="from-uploads-btn full-btn">
                        From uploads
                    </button>
                    </div>
                    <img id="actual-select-img"/>
                </div>
            </div>
                        
            <div class="vl-item">
                <div class="vl-top">Element Name</div>
                <div class="vl-bottom">
                    <input id="element-brand-tag" class="always-type" />
                </div>
            </div>
            <div class="vl-item">
                <div class="vl-top">Save New Element</div>
                <div class="vl-bottom full-btn-cont">
                <div class="full-btn-cont">
                    <button id="save-clip-path" class="full-btn save-new-element">Save New</button>
                    </div>
                </div>
            </div>
`,
        actions: function () {

        }
    },
    graphic: {
        markup: `${searchTool}
            <div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
            
            <div class="vl-item">
                <div class="vl-top">Select Image</div>
                <div class="vl-bottom full-btn-cont">
                    <div class="full-btn-cont">
                    <button class="from-uploads-btn full-btn">
                        From uploads
                    </button>
                    </div>
                    <img id="actual-select-img"/>
                </div>
            </div>
                        
            <div class="vl-item">
                <div class="vl-top">Element Name</div>
                <div class="vl-bottom">
                    <input id="element-brand-tag" class="always-type" />
                </div>
            </div>
            <div class="vl-item">
                <div class="vl-top">Save New Element</div>
                <div class="vl-bottom full-btn-cont">
                <div class="full-btn-cont">
                    <button id="save-graphic-path" class="full-btn save-new-element">Save New</button>
                    </div>
                </div>
            </div>
`,
        actions: function () {

        }
    },
    framed: {
        markup: `${searchTool}
            <div class="my-collapse">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#arrow-back"></use>
                </svg>
            </div>
            <div class="vl-item">
                <div class="vl-top">Frame Path</div>
                <div class="vl-bottom">
                    <textarea id="clip-text-area" class="clip-text-area always-type"></textarea>
                </div>
            </div>
            
            <div class="vl-item">
                <div class="vl-top">Select icon Image</div>
                <div class="vl-bottom full-btn-cont">
                    
                    <div class="full-btn-cont">
                    <button class="from-uploads-btn full-btn">
                        From uploads
                    </button>
                    </div>
                    <img id="actual-select-img"/>
                </div>
            </div>
            
            <div class="vl-item">
                <div class="vl-top">Select Frame Image</div>
                <div class="vl-bottom full-btn-cont">
                    <div class="full-btn-cont">
                        <button class="from-uploads-btn1 full-btn">
                            From uploads
                        </button>
                    </div>
                    <img id="actual-select-img1"/>
                </div>
            </div>
            
            <div class="vl-item">
                <div class="vl-top">Element Name</div>
                <div class="vl-bottom">
                    <input id="element-brand-tag" class="always-type" />
                </div>
            </div>
            <div class="vl-item">
                <div class="vl-top">Save New Element</div>
                <div class="vl-bottom full-btn-cont">
                <div class="full-btn-cont">
                    <button id="save-clip-path" class="full-btn save-new-element">Save New</button>
                    </div>
                </div>
            </div>
`,
        actions: function () {

        }
    },
    colorAdjust: {
        markup: `
${searchTool}
<div class="btn-options-container">
    <div class="btn-options-top">
        Document Colors
    </div>
    <div class="btn-options-bottom">
    
        <div class="single-btn-item add-own-color-btn">
            <input type="color" class="add-own-color"/>
            <div class="icon-cont">
                <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                    <use xlink:href="../sources/svg_icons.svg#plus"></use>
                </svg>
            </div>
                    
            </div>
            
        <div id="single-btn-item-editable" class="single-btn-item" style="background: red"></div>
        <div class="single-btn-item" style="background: green"></div>
        <div class="single-btn-item" style="background: blue"></div>
        <div class="single-btn-item" style="background: purple"></div>
        <div class="single-btn-item" style="background: rgb(211, 183, 20)"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(45, 139, 186) 0%, rgb(45, 139, 186) 100%)"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(108, 229, 232) 0%, rgb(108, 229, 232) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0))"></div>
    </div>
    <div class="btn-options-top">
        Default Colors
    </div>
    <div class="btn-options-bottom">
        <div class="single-btn-item" style="background: black"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(84, 84, 84) 0%, rgb(84, 84, 84) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(166, 166, 166) 0%, rgb(166, 166, 166) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(217, 217, 217) 0%, rgb(217, 217, 217) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(255, 22, 22) 0%, rgb(255, 22, 22) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(255, 87, 87) 0%, rgb(255, 87, 87) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(255, 102, 196) 0%, rgb(255, 102, 196) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(203, 108, 230) 0%, rgb(203, 108, 230) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(140, 82, 255) 0%, rgb(140, 82, 255) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(94, 23, 235) 0%, rgb(94, 23, 235) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(3, 152, 158) 0%, rgb(3, 152, 158) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(0, 194, 203) 0%, rgb(0, 194, 203) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(92, 225, 230) 0%, rgb(92, 225, 230) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(56, 182, 255) 0%, rgb(56, 182, 255) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(82, 113, 255) 0%, rgb(82, 113, 255) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(0, 74, 173) 0%, rgb(0, 74, 173) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(0, 128, 55) 0%, rgb(0, 128, 55) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(126, 217, 87) 0%, rgb(126, 217, 87) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(201, 226, 101) 0%, rgb(201, 226, 101) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(255, 222, 89) 0%, rgb(255, 222, 89) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(255, 189, 89) 0%, rgb(255, 189, 89) 100%);"></div>
        <div class="single-btn-item" style="background: linear-gradient(to right, rgb(255, 145, 77) 0%, rgb(255, 145, 77) 100%);"></div>
        
    </div>
</div>
`,
        actions: function () {

        }
    }
}


let fontFamilyObject = {
    body: `
            <div class="ffamily-cont double-item-cont gti-item">
                <button class="double-item-main ffamily-text">
                    <span>Cambria Math</span>
                </button>
                    <div class="double-item-minor ffamily-icon">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                          <use xlink:href="../sources/svg_icons.svg#done"></use>
                        </svg>
                    </div>
            </div>`,
    action: function (el) {
        //change font-family of el
        console.log("heeey")
        displaySecLayout(select_layouts["fontFamily"])
        let family = Styling.get_style(el.id, "font-family", el.ruleIndex);
        let tmp1 = document.querySelector(".selected-font-family").querySelector(".font-family-item-text");
        tmp1.style.fontFamily = family;
        tmp1.innerHTML = family;
    },
    size: 100
}

let fontSizeObject = {
    body: `
            <div class="font-size-cont gti-item">
                <button class="font-size-minus gti-item-clickable">
                    -
                </button>
                
                    <input class="font-size-input gti-item-clickable"/>
                
                    <button class="font-size-plus gti-item-clickable">
                        +
                    </button>
            </div>`,
    action: function (el) {
        //change font-size of el
    },
    size: 100
}
let colorAdjustObject = {
    body: `<div class="color-adjust gti-item">
                        <div class="color-adjust-letter">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#letterA"></use>
                        </svg>
                        </div>
                        <div class="color-adjust-img">
                            
                        </div>
                    </div>`,
    action: function (el) {
        //bold el
        displaySecLayout(select_layouts["colorAdjust"]);
        document.querySelector(".add-own-color").addEventListener("input", (e) => {
            document.getElementById("single-btn-item-editable").style.background = e.currentTarget.value;
        });
    },
    size: 20
};
let boldObject = {
    body: `<div class="gti-item bold-adjust">B</div>`,
    action: function (el) {
        //bold el

        let b = Styling.get_style(el.id, "font-weight", el.ruleIndex);
        Styling.edit_style(el.id, "font-weight", b === "bold" ? "" : "bold", el.ruleIndex);
    },
    size: 20
};
let italicsObject = {
    body: `<div class="gti-item italics-adjust">I</div>`,
    action: function (el) {
        //italicise el
        let b = Styling.get_style(el.id, "font-style", el.ruleIndex);
        Styling.edit_style(el.id, "font-style", b === "italic" ? "" : "italic", el.ruleIndex);

    },
    size: 20
};
let underlineObject = {
    body: `<div class="gti-item underline-adjust">U</div>`,
    action: function (el) {
        //underline el
        if (el.classList.contains("clip-parent")) {
            el = el.querySelector("._clippath")
        }
        let b = Styling.get_style(el.id, "text-decoration", el.ruleIndex);
        Styling.edit_style(el.id, "text-decoration", b === "underline" ? "" : "underline", el.ruleIndex);
    },
    size: 20
};
let centerObject = {
    body: `<div class="gti-item center-adjust">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#center-icon"></use>
                        </svg>
                    </div>`,
    action: function (el) {
        //bold el


        if (el.classList.contains("clip-parent")) {
            el = el.querySelector("._clippath")
        }
        if (el.classList.contains("align-center")) {
            el.classList.remove("align-center")
        } else {
            el.classList.add("align-center")
        }
    },
    size: 20
};
let bulletObject = {
    body: `<div class="gti-item bullet-adjust">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#bullet"></use>
                        </svg>
                    </div>`,
    action: function (el) {
        //bold el
    },
    size: 20
};
let lineHeightObject = {
    body: `<div class="gti-item line-height-adjust">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#line-height"></use>
                        </svg>
                    </div>`,
    action: function (el) {
        //lineheight el
        /*if (el.classList.contains("clip-parent")) {
            el = el.querySelector("._clippath")
        }
        let b = Styling.get_style(el.id, "text-decoration", el.ruleIndex);
        Styling.edit_style(el.id, "text-decoration", b==="underline"?"":"underline", el.ruleIndex);*/
    },
    size: 20
};
let effectsObject = {
    body: `<button class="gti-item effects-adjust">
                        <span>Effects</span>
                    </button>`,
    action: function (el) {
        //bold el
    },
    size: 60
};
let moreObject = {
    body: `<div class="gti-item more">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#more"></use>
                        </svg>
                    </div>`,
    action: function (el) {
        //bold el
    },
    size: 20
};
let transparentObject = {
    body: `<div class="gti-item transparent">
                        <svg viewBox="0 0 24 24" class="ic" width="100%" height="100%">
                            <use xlink:href="../sources/svg_icons.svg#transparent"></use>
                        </svg>
                    </div>`,
    action: function (el) {
        //bold el
        if (el.classList.contains("clip-parent")) {
            el = el.querySelector("._clippath")
        }
        let b = Styling.get_style(el.id, "background", el.ruleIndex);
        Styling.edit_style(el.id, "background", b === "transparent" ? "" : "transparent", el.ruleIndex);
    },
    size: 20
};
let caseAdjustObject = {
    body: `<div class="gti-item case-adjust">
                        <div class="case-adjust-img"></div>
                    </div>`,
    action: function (el) {
        //bold el
    },
    size: 20
}
let structureObject = {
    body: `<div class="gti-item structure-adjust">
                        <div class="structure-adjust-img">STRUCTURE</div>
                    </div>`,
    action: function (el) {
        //bold el
        console.log("heeey")
        let temp_el = el.querySelector("._clippath")
        // console.log(temp_el)
        displaySecLayout(select_layouts["clipped"])
        let clip = Styling.get_style(temp_el.id, "clip-path", temp_el.ruleIndex);
        let tmp1 = document.querySelector(".clip-text-area");
        tmp1.innerHTML = clip;
        loadAllUserImages();
        /*tmp1.addEventListener("change", ()=>{
            Styling.edit_style(temp_el.id, "clip-path", tmp1.innerHTML, temp_el.ruleIndex);
        })*/
    },
    size: 110
}

let graphicStructureObject = {
    body: `<div class="gti-item structure-adjust">
                        <div class="structure-adjust-img">STRUCTURE</div>
                    </div>`,
    action: function (el) {
        //bold el
        let temp = el.querySelector(".element-daughter");
        displaySecLayout(select_layouts["graphic"])
        let tmp = document.getElementById("actual-select-img");
        tmp.setAttribute("src", temp.getAttribute("src"))
        tmp.setAttribute("alt", temp.getAttribute("alt"))
        loadAllUserImages();
        /*tmp1.addEventListener("change", ()=>{
            Styling.edit_style(temp_el.id, "clip-path", tmp1.innerHTML, temp_el.ruleIndex);
        })*/
    },
    size: 110
}

let frameStructureObject = {
    body: `<div class="gti-item structure-adjust">
                        <div class="structure-adjust-img">STRUCTURE</div>
                    </div>`,
    action: function (el) {
        //bold el
        console.log("heeey")
        let temp_el = el.querySelector("._clippath")
        // console.log(temp_el)
        displaySecLayout(select_layouts["framed"])
        let clip = Styling.get_style(temp_el.id, "clip-path", temp_el.ruleIndex);
        let tmp1 = document.querySelector(".clip-text-area");
        tmp1.innerHTML = clip;
        loadAllUserImages();
        /*tmp1.addEventListener("change", ()=>{
            Styling.edit_style(temp_el.id, "clip-path", tmp1.innerHTML, temp_el.ruleIndex);
        })*/
    },
    size: 110
}


let InstantTools = {
    normal: {
        fontFamily: fontFamilyObject,
        fontSize: fontSizeObject,
        colorAdjust: colorAdjustObject,
        bold: boldObject,
        italics: italicsObject,
        underline: underlineObject,
        center: centerObject,
        bullet: bulletObject,
        lineHeight: lineHeightObject,
        effects: effectsObject,
        more: moreObject,
        transparent: transparentObject,
        caseAdjust: caseAdjustObject,
    },
    clipped: {
        fontFamily: {
            body: fontFamilyObject.body,
            action: function (el) {
                el = el.querySelector("._clippath");
                //change font-family of el
                displaySecLayout(select_layouts["fontFamily"])
                let family = Styling.get_style(el.id, "font-family", el.ruleIndex);
                let tmp1 = document.querySelector(".selected-font-family").querySelector(".font-family-item-text");
                tmp1.style.fontFamily = family;
                tmp1.innerHTML = family;
            },
            size: fontFamilyObject.size
        },
        fontSize: fontSizeObject,
        colorAdjust: {
            body: colorAdjustObject.body,
            action: function (el) {
                el = el.querySelector("._clippath");
                displaySecLayout(select_layouts["colorAdjust"]);
                document.querySelector(".add-own-color").addEventListener("input", (e) => {
                    document.getElementById("single-btn-item-editable").style.background = e.currentTarget.value;
                });
            },
            size: colorAdjustObject.size
        },
        bold: boldObject,
        italics: italicsObject,
        underline: underlineObject,
        center: centerObject,
        bullet: bulletObject,
        lineHeight: lineHeightObject,
        effects: effectsObject,
        more: moreObject,
        transparent: transparentObject,
        caseAdjust: caseAdjustObject,
        structure: structureObject
    },
    appended_img: {
        colorAdjust: {
            body: colorAdjustObject.body,
            action: function (el) {
                el = el.querySelector("._clippath");
                displaySecLayout(select_layouts["colorAdjust"]);
                document.querySelector(".add-own-color").addEventListener("input", (e) => {
                    document.getElementById("single-btn-item-editable").style.background = e.currentTarget.value;
                });
            },
            size: colorAdjustObject.size,
        },

        effects: effectsObject,
        more: moreObject,
        transparent: transparentObject,
        structure: graphicStructureObject
    },
    graphic: {
        colorAdjust: {
            body: colorAdjustObject.body,
            action: function (el) {
                el = el.querySelector("._clippath");
                displaySecLayout(select_layouts["colorAdjust"]);
                document.querySelector(".add-own-color").addEventListener("input", (e) => {
                    document.getElementById("single-btn-item-editable").style.background = e.currentTarget.value;
                });
            },
            size: colorAdjustObject.size,
        },

        effects: effectsObject,
        more: moreObject,
        transparent: transparentObject,
        structure: graphicStructureObject
    },
    framed: {
        colorAdjust: {
            body: colorAdjustObject.body,
            action: function (el) {
                displaySecLayout(select_layouts["colorAdjust"]);
                document.querySelector(".add-own-color").addEventListener("input", (e) => {
                    document.getElementById("single-btn-item-editable").style.background = e.currentTarget.value;
                });
            },
            size: colorAdjustObject.size,
        },

        effects: effectsObject,
        more: moreObject,
        transparent: transparentObject,
        structure: frameStructureObject
    }
}

let Tables = {
    "normal-table": {
        markup: `<div id="my-table" class="hi normal_drag dtsnormal initial" data-styles="top:0;left:0;height:240px;width:300px;display:flex;flex-direction:row;background-color: blue;">
                    <div id="my-table-col" class="hi" data-styles="height:100%;width:30%;display:flex;flex-direction:column;background-color:red">
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                    </div>
                    <div class="separator hs" data-styles="height:100%;width:20px;"></div>
                    <div id="my-table-col" class="hi" data-styles="height:100%;width:30%;display:flex;flex-direction:column;;background-color:red">
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                    </div>
                    <div class="separator hs" data-styles="height:100%;width:20px;"></div>
                    <div id="my-table-col" class="hi" data-styles="height:100%;width:30%;display:flex;flex-direction:column;;background-color:red">
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                        <div id="my-table-td" class="hi" data-styles="height:20%;width:100%;background-color:white;border: 1px solid gray"></div>
                    </div>
                </div>`
    },
    "test": {
        target: {
            name: "div",
            class_additional: "",
            style: {
                others: "color:red;background-color:white;font-family:DejaVu Sans Mono;display:flex;flex-direction:column",
                width: `550`,
                height: `520`,
            }
        },
        children: [
            {
                name: "div",
                class_additional: "",
                style: {
                    others: "background-color:transparent;" +
                        "font-family:Impact;" +
                        "font-size: 30.024px;" +
                        "color: rgb(255, 223, 43);" +
                        "letter-spacing: 0em;" +
                        "--para-spacing: 0;" +
                        "--head-indent: 0;" +
                        "--numeric-list-marker: none;" +
                        "list-style-type: none;",
                    width: `100%`,
                    height: `30%`,
                }
            },
            ]
    }

}
