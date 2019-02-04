class People {
    constructor() {
        this.walk = this.walk.bind(this);
    }
    run = () => console.log("running");
    walk() {
        console.log("walking");
    }
}
