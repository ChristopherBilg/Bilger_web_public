"use strict";

function home(id) {
    var content = `
      <p style="font-weight: bold;">
        Welcome to my testing page for CIS 3308! This will hopefully one day be
        a nice looking To-Do List webpage.
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}