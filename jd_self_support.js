// ==UserScript==
// @name         隐藏京东非自营商品
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Andforce
// @match        https://*.jd.com/*
// @match        http://*.jd.com/*
// @grant        none
// ==/UserScript==

function removeNotSelSupport() {
    var J_goodsList = document.getElementById("J_main");
    var gls = J_goodsList.getElementsByClassName("gl-item");

    console.log("总商品数量：" + gls.length);

    var remove = 0;

    var length = gls.length - 1;
    for (var i = length; i > -1; i--) {
        var item = gls[i];
        var is = item.getElementsByClassName("p-icons");
        if (is != null && is.length > 0) {
            var picons = is[0];
            var selfSupport = picons.firstElementChild;

            if (selfSupport == null || selfSupport.textContent !== "自营") {
                item.remove();
                remove++;
            }
        } else {
            item.remove();
            remove++;
        }
    }

    console.log("隐藏非自营数量：" + remove);
}


(function () {
    'use strict';

    window.onload = removeNotSelSupport;

    window.addEventListener('DOMNodeInserted', function (e) {
        var node = e.target;

        if (e.target instanceof HTMLDivElement) {
            if (node.id === "J_goodsList") {
                removeNotSelSupport();
            }
        } else if (e.target instanceof HTMLLIElement) {
            if (node.className === "gl-item") {
                removeNotSelSupport();
            }
        }
    });
})();