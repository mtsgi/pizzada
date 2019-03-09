class Pizzada{
    constructor(){
        this.pizza = 0;
    }
    static section( str ){
        $("section").hide();
        $("#"+str).show();
    }
    static init(){
        return new Date();
    }
}
$(function(){
    Pizzada.section("pizzada-title");
});