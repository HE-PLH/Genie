function sendRequest(info,URL) {
    //alter(info)
    $.ajax({
        type: "post",
        url: URL||"../../../server/serverRequests",
        data:info,
        success: function f(e) {
            console.log()
            //success();
            //reset()
        },
        error:function (e) {
            console.log(e)
            //Error();
        }
    })
}

function alter(info,URL,g) {
    $.ajax({
        type: "post",
        url: URL,
        data:info,
        success: function f(e) {
            let r=($(".log tbody tr").length);
            success(e,r,g);
        },
        error:function () {
            console.log("wrong")
        }
    })
}

function Error() {
    cl("error","red");
}
function success(w,y,g) {
    let p = w === "" ? "successful - nothing from the server" : w;
    if (g) {
        let len = y - 1;
        if ($.parseJSON(p).column === "error-id already exists") {
            let nodes=`<td class="err">Error!! repeated id</td>`;
            $("#logs .log tr:eq(" + len + ")").append(nodes);
        } else {
            cl(y, "blue");
            ($("#logs .log tr:eq(" + len + ")").remove());
            if (len === 0) {
                $("#logs").hide()
            }
            cl(p, "purple")
        }
    }
}