var time = 0, point = 0;

class Pizzada{
    constructor(string){
        this.target = string;
        this.count = 0;
    }
    static section( str ){
        $("section").hide();
        $("#"+str).show();
    }
    static pizza(){
        if( point == 3 ){
            Pizzada.section("pizzada-result");
            $("#pizzada-time").text(time);
            point = 0;
            return time;
        }
        var p;
        Pizzada.section("pizzada-game");
        //START
        let start = Date.now();
        p = new Pizzada("constructor");
        $("#pizzada-target").text( p.target );
        $("#pizzada-enter").text("");
        //BIND
        $(document).on("keydown", (event) => {
            if( p.target[p.count] == event.key ){
                $("#pizzada-enter").append( event.key.toLowerCase() );
                p.count++;
            }
            if( p.count == p.target.length ){
                time += Number( Date.now() - start );
                alert("time:" + time );
                point++;
                $(document).off();
                Pizzada.pizza();
            }
        })
    }
}
$(function(){
    Pizzada.section("pizzada-title");
});