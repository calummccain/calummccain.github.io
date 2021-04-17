function loadJSON(path) {

    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open("GET", path, false);

    try {

        xhr.send();

        if (xhr.status != 200) {

            alert(`Error ${xhr.status}: ${xhr.statusText}`);

        } else {

            obj = JSON.parse(xhr.response);

        }

    } catch (err) {

        alert("Request failed");

    }

    return obj;
}


export { loadJSON }