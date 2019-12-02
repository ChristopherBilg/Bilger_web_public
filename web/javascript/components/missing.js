"use strict";

function missing(id) {
    var content = `
      <p>
        Error: The link that got you here is broken.
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}