class Pizzada{
    constructor(string){
        this.target = string;
    }
    static section( str ){
        $("section").hide();
        $("#"+str).show();
    }
    static init(){
        var pizza;
        Pizzada.section("pizzada-game");
        let start = Date.now();
        let count = 0, point = 0;
        pizza = new Pizzada("constructor");
        $("#pizzada-target").text( pizza.target );
        //bind
        $(document).on("keydown", (event) => {
            if( pizza.target[count] == event.key ){
                $("#pizzada-enter").append( event.key.toLowerCase() );
                count++;
            }
            if( count == pizza.target.length ){
                alert("time:" + Number( Date.now() - start ) );
                return;
            }
        })
    }
}
$(function(){
    Pizzada.section("pizzada-title");
});