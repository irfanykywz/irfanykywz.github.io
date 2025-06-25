var colour = "#1bb5f3",
    sparkles = 100,
    x = ox = 400,
    y = oy = 300,
    swide = 800,
    shigh = 600,
    sleft = sdown = 0,
    tiny = new Array,
    star = new Array,
    starv = new Array,
    starx = new Array,
    stary = new Array,
    tinyx = new Array,
    tinyy = new Array,
    tinyv = new Array;

function sparkle() {
    var t;
    if (x != ox || y != oy)
        for (ox = x, oy = y, t = 0; t < sparkles; t++)
            if (!starv[t]) {
                star[t].style.left = (starx[t] = x) + "px", star[t].style.top = (stary[t] = y) + "px", star[t].style.clip = "rect(0px, 5px, 5px, 0px)", star[t].style.visibility = "visible", starv[t] = 50;
                break
            } for (t = 0; t < sparkles; t++) starv[t] && update_star(t), tinyv[t] && update_tiny(t);
    setTimeout("sparkle()", 40)
}

function update_star(t) {
    if (25 == --starv[t] && (star[t].style.clip = "rect(1px, 4px, 4px, 1px)"), starv[t]) {
        if (stary[t] += 1 + 3 * Math.random(), !(stary[t] < shigh + sdown)) return star[t].style.visibility = "hidden", void(starv[t] = 0);
        star[t].style.top = stary[t] + "px", starx[t] += (t % 5 - 2) / 5, star[t].style.left = starx[t] + "px"
    } else tinyv[t] = 50, tiny[t].style.top = (tinyy[t] = stary[t]) + "px", tiny[t].style.left = (tinyx[t] = starx[t]) + "px", tiny[t].style.width = "2px", tiny[t].style.height = "2px", star[t].style.visibility = "hidden", tiny[t].style.visibility = "visible"
}

function update_tiny(t) {
    if (25 == --tinyv[t] && (tiny[t].style.width = "1px", tiny[t].style.height = "1px"), tinyv[t]) {
        if (tinyy[t] += 1 + 3 * Math.random(), !(tinyy[t] < shigh + sdown)) return tiny[t].style.visibility = "hidden", void(tinyv[t] = 0);
        tiny[t].style.top = tinyy[t] + "px", tinyx[t] += (t % 5 - 2) / 5, tiny[t].style.left = tinyx[t] + "px"
    } else tiny[t].style.visibility = "hidden"
}

function mouse(t) {
    set_scroll(), y = t ? t.pageY : event.y + sdown, x = t ? t.pageX : event.x + sleft
}

function set_scroll() {
    "number" == typeof self.pageYOffset ? (sdown = self.pageYOffset, sleft = self.pageXOffset) : document.body.scrollTop || document.body.scrollLeft ? (sdown = document.body.scrollTop, sleft = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft) ? (sleft = document.documentElement.scrollLeft, sdown = document.documentElement.scrollTop) : (sdown = 0, sleft = 0)
}

function set_width() {
    "number" == typeof self.innerWidth ? (swide = self.innerWidth, shigh = self.innerHeight) : document.documentElement && document.documentElement.clientWidth ? (swide = document.documentElement.clientWidth, shigh = document.documentElement.clientHeight) : document.body.clientWidth && (swide = document.body.clientWidth, shigh = document.body.clientHeight)
}

function createDiv(t, e) {
    var i = document.createElement("div");
    return i.style.position = "absolute", i.style.height = t + "px", i.style.width = e + "px", i.style.overflow = "hidden", i.style.backgroundColor = colour, i
}
window.onload = function() {
    if (document.getElementById) {
        for (var t = 0; t < sparkles; t++) {
            var e;
            (e = createDiv(3, 3)).style.visibility = "hidden", document.body.appendChild(tiny[t] = e), starv[t] = 0, tinyv[t] = 0, (e = createDiv(5, 5)).style.backgroundColor = "transparent", e.style.visibility = "hidden";
            var i = createDiv(1, 5),
                n = createDiv(5, 1);
            e.appendChild(i), e.appendChild(n), i.style.top = "3px", i.style.left = "0px", n.style.top = "0px", n.style.left = "3px", document.body.appendChild(star[t] = e)
        }
        set_width(), sparkle()
    }
}, document.onmousemove = mouse, window.onresize = set_width;