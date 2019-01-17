"use strict";

var fs = require("fs");

class KeyController {
    constructor() {
        this.keys = [];
    }

    keyExists(key) {
        for (let k in this.keys) {
            if (key === k) {
                return true;
            }
        }
        return false;
    }

    loadKeys() {
        //query db for keys
        if(false) { //db found

        } else if(fs.existsSync("../../../data/keys.json")){ //file
            let keys = fs.readFileSync("../../../data/keys.json");
            this.keys = JSON.parse(keys);
        } else {
            let keys = JSON.stringify(this.keys);
            fs.writeFileSync("../../../data/keys.json", keys);
        }
    }

    saveKeys() {
        let keys = JSON.stringify(this.keys);
        fs.writeFileSync("../../../data/keys.json", keys);
    }

    //Remove key by using key. Prevents those without key from deleting the key.
    removeKey(key) { 
        let length = Object.keys(this.keys).length;
        for(let k = 0; k < length; k++) {
            if(key === this.keys[k]) {
                this.keys.splice(k);
                return key;
            }
        }
        return null;
    }

}

module.exports = KeyController;