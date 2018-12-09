var o = {
    a: {
      m: {
        x: "1",
        y: "2"
      }
    },
    b: "3",
    c: {
      m: "4"
    }
  };
    const arr = [];
    let prefix = "";
    function loopThrough (obj){
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] !== null && typeof obj[key] === "object") {
                    prefix = prefix === "" ? key : `${prefix}.${key}`;
                    loopThrough(obj[key]);
                    prefix = "";
                } else {
                    const part = `${key}: ${obj[key]}`;
                    prefix = prefix === "" ? part : `${prefix}.${part}`;
                    arr.push(prefix);
                    prefix = prefix.substring(0, prefix.lastIndexOf(part) - 1);
                }
            }
        }
    }
    function printObject(obj){
        loopThrough(o);
        console.log(arr.join("\n"));
    }
    printObject(o);
    
    /*
  
  output:
  
  a.m.x: 1
  a.m.y: 2
  b: 3
  c.m: 4
  
  */