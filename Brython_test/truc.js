var $B = __BRYTHON__;
var $bltns = __BRYTHON__.InjectBuiltins();eval($bltns);

var $locals = $locals___main__;
$locals___main__.__package__ = ""
$locals.__annotations__ = _b_.dict.$factory()
var $top_frame = ["__main__", $locals___main__, "__main__", $locals___main__]
$locals.$f_trace = $B.enter_frame($top_frame)
var $stack_length = $B.frames_stack.length;
try{
    ;$locals.$line_info = "1,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var module = $B.$import("browser",["$$document","html"], {}, {}, true);
$locals["$$document"] = $B.$getattr($B.imported["browser"], "$$document");
$locals["html"] = $B.$getattr($B.imported["browser"], "html");
None;;
    ;$locals.$line_info = "4,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    $locals___main__["calc"] = $B.$call($B.$getattr($locals___main__["html"],"TABLE"))();
    ;$locals.$line_info = "5,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    $B.rich_comp("__le__",$locals___main__["calc"],$B.$call($B.$getattr($locals___main__["html"],"TR"))($B.add($B.$call($B.$getattr($locals___main__["html"],"TH"))($B.$call($B.$getattr($locals___main__["html"],"DIV"))("0",{$nat:"kw",kw:{id:"result"}}),{$nat:"kw",kw:{colspan:3}}), $B.$call($B.$getattr($locals___main__["html"],"TD"))("C"))));
    ;$locals.$line_info = "7,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    $locals___main__["lines"] = $B.$list(["789/","456*","123-","0.=+"]);
    ;$locals.$line_info = "9,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    $B.rich_comp("__le__",$locals___main__["calc"],(function($locals___ge8){var $B = __BRYTHON__;
var $bltns = __BRYTHON__.InjectBuiltins();eval($bltns);

var $locals = $locals___ge8;
$locals___ge8.__package__ = ""
var $top_frame = ["__ge8", $locals___ge8, "__ge8", $locals___ge8]
$locals.$f_trace = $B.enter_frame($top_frame)
var $stack_length = $B.frames_stack.length;
try{
    var __ge810 = $locals___ge8["__ge8"] = $B.genfunc("__ge8", undefined, {"$locals___ge8": $B.clone($locals___ge8),"$locals___main__": $B.clone($locals___main__)},[function($defaults){function __ge810(){
 for(var attr in this.blocks){eval("var " + attr + " = this.blocks[attr]")};
var $locals___ge8___ge8_9 = this.env = {},
    $local_name = "__ge8___ge8_9",
    $locals = $locals___ge8___ge8_9;$locals.$parent = $locals___ge8;
 var $nb_defaults = Object.keys($defaults).length,
     $parent = $locals.$parent
 var $len = arguments.length;
 if($len > 0 && arguments[$len - 1].$nat !== undefined){
    var $ns = $B.args("__ge8", 0, {}, [], arguments, $defaults, null, null);
    for(var $var in $ns){$locals[$var] = $ns[$var]};

 }
 else{
    if($len == 0){
         //

    }
    else if($len > 0){$B.wrong_nb_args("__ge8", $len, 0, [])}

 }
 $locals.$line_info = "9,__ge8"
 var $top_frame = [$local_name, $locals,"__main__", $locals___main__, __ge810]
 $locals.$f_trace = $B.enter_frame($top_frame)
 var $stack_length = $B.frames_stack.length;
 $locals.__annotations__ = _b_.dict.$factory()
 $top_frame[1] = $locals
 $locals.$parent = $parent
 $locals.$name = "__ge8"
 $B.js_this = this;
 ;$locals.$line_info = "9,__ge8";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var sent_value = this.sent_value === undefined ? _b_.None : this.sent_value;
this.sent_value = _b_.None
if(sent_value.__class__ === $B.$GeneratorSendError){sent_value.err.$stack.splice(0, 0, $B.freeze([$top_frame])[0]); throw sent_value.err};
 ;$locals.$line_info = "10,__ge8";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var $iter11 = $B.$check_def("lines",$locals___main__["lines"]);$locals["$next11"] = $B.$getattr($B.$iter($iter11),"__next__")
 while(true){
    try{
         $locals___ge8___ge8_9["line"] = $locals["$next11"]();

    }
    catch($err){if($B.is_exc($err, [StopIteration])){break;}else{throw($err)}}
    ;$locals.$line_info = "11,__ge8";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    return [$B.$call($B.$getattr($B.$check_def("html",$locals___main__["html"]),"TR"))((function($locals___ge10){var $B = __BRYTHON__;
var $bltns = __BRYTHON__.InjectBuiltins();eval($bltns);

var $locals = $locals___ge10;
$locals___ge10.__package__ = ""
var $top_frame = ["__ge10", $locals___ge10, "__ge10", $locals___ge10]
$locals.$f_trace = $B.enter_frame($top_frame)
var $stack_length = $B.frames_stack.length;
try{
    var __ge1012 = $locals___ge10["__ge10"] = $B.genfunc("__ge10", undefined, {"$locals___ge10": $B.clone($locals___ge10),"$locals___ge8___ge8_9": $B.clone($locals___ge8___ge8_9),"$locals___ge8": $B.clone($locals___ge8),"$locals___main__": $B.clone($locals___main__)},[function($defaults){function __ge1012(){
 for(var attr in this.blocks){eval("var " + attr + " = this.blocks[attr]")};
var $locals___ge10___ge10_11 = this.env = {},
    $local_name = "__ge10___ge10_11",
    $locals = $locals___ge10___ge10_11;$locals.$parent = $locals___ge10;
 var $nb_defaults = Object.keys($defaults).length,
     $parent = $locals.$parent
 var $len = arguments.length;
 if($len > 0 && arguments[$len - 1].$nat !== undefined){
    var $ns = $B.args("__ge10", 0, {}, [], arguments, $defaults, null, null);
    for(var $var in $ns){$locals[$var] = $ns[$var]};

 }
 else{
    if($len == 0){
         //

    }
    else if($len > 0){$B.wrong_nb_args("__ge10", $len, 0, [])}

 }
 $locals.$line_info = "11,__ge10"
 var $top_frame = [$local_name, $locals,"__main__", $locals___main__, __ge1012]
 $locals.$f_trace = $B.enter_frame($top_frame)
 var $stack_length = $B.frames_stack.length;
 $locals.__annotations__ = _b_.dict.$factory()
 $top_frame[1] = $locals
 $locals.$parent = $parent
 $locals.$name = "__ge10"
 $B.js_this = this;
 ;$locals.$line_info = "11,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var sent_value = this.sent_value === undefined ? _b_.None : this.sent_value;
this.sent_value = _b_.None
if(sent_value.__class__ === $B.$GeneratorSendError){sent_value.err.$stack.splice(0, 0, $B.freeze([$top_frame])[0]); throw sent_value.err};
 ;$locals.$line_info = "12,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var $iter13 = $B.$check_def_free1("line", "__ge8___ge8_9");$locals["$next13"] = $B.$getattr($B.$iter($iter13),"__next__")
 while(true){
    try{
         $locals___ge10___ge10_11["x"] = $locals["$next13"]();

    }
    catch($err){if($B.is_exc($err, [StopIteration])){break;}else{throw($err)}}
    ;$locals.$line_info = "13,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    return [$B.$call($B.$getattr($B.$check_def("html",$locals___main__["html"]),"TD"))($B.$check_def_local("x",$locals["x"])), 0]

 }

}
return __ge1012},function __ge1012(){
 for(var attr in this.blocks){eval("var " + attr + " = this.blocks[attr]")};
var $locals___ge10___ge10_11 = this.env,
    $local_name = "__ge10___ge10_11",
    $locals = $locals___ge10___ge10_11;
 var $top_frame = ["__ge10___ge10_11",$locals,"__ge10",$locals___ge10];$B.frames_stack.push($top_frame); var $stack_length = $B.frames_stack.length;$locals.$is_generator = true;$locals.$yield_node_id = 0;
 ;$locals.$line_info = "13,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var sent_value = this.sent_value === undefined ? _b_.None : this.sent_value;
     this.sent_value = _b_.None
     if(sent_value.__class__ === $B.$GeneratorSendError){sent_value.err.$stack.splice(0, 0, $B.freeze([$top_frame])[0]); throw sent_value.err};
 $locals.$line_info = "12,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};None;
 while(true){
    try{
         $locals___ge10___ge10_11["x"] = $locals["$next13"]();

    }
    catch($err){if($B.is_exc($err, [StopIteration])){break;}else{throw($err)}}
    ;$locals.$line_info = "13,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    return [$B.$call($B.$getattr($B.$check_def("html",$locals___main__["html"]),"TD"))($B.$check_def_local("x",$locals["x"])), 0]

 }

}
],{})
    __ge1012.$is_func = true
    __ge1012.$infos = {
        __name__:"__ge10",
        __qualname__:"__ge10",
        __annotations__: {},
        __dict__: _b_.dict.__new__(_b_.dict),
        __doc__: None,
        __module__ : "__ge10",
        __code__:{
            co_argcount:0,
            co_filename:$locals___ge10["__file__"],
            co_firstlineno:11,
            co_flags:99,
            co_freevars: ["line","html"],
            co_kwonlyargcount:0,
            co_name: "__ge10",
            co_nlocals: 0,
            co_posonlyargcount: 0,
            co_varnames: $B.fast_tuple([]
        )}
    };None;
    $B.leave_frame({value: _b_.None})
}
catch(err){
    $B.leave_frame({value: _b_.None})
    throw err
}

var $res = $locals___ge10["__ge10"]();
$res.is_gen_expr = true;
return $res
})({})
), 0]

 }

}
return __ge810},function __ge810(){
 for(var attr in this.blocks){eval("var " + attr + " = this.blocks[attr]")};
var $locals___ge8___ge8_9 = this.env,
    $local_name = "__ge8___ge8_9",
    $locals = $locals___ge8___ge8_9;
 var $top_frame = ["__ge8___ge8_9",$locals,"__ge8",$locals___ge8];$B.frames_stack.push($top_frame); var $stack_length = $B.frames_stack.length;$locals.$is_generator = true;$locals.$yield_node_id = 0;
 ;$locals.$line_info = "11,__ge8";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var sent_value = this.sent_value === undefined ? _b_.None : this.sent_value;
     this.sent_value = _b_.None
     if(sent_value.__class__ === $B.$GeneratorSendError){sent_value.err.$stack.splice(0, 0, $B.freeze([$top_frame])[0]); throw sent_value.err};
 $locals.$line_info = "10,__ge8";if($locals.$f_trace !== _b_.None){$B.trace_line()};None;
 while(true){
    try{
         $locals___ge8___ge8_9["line"] = $locals["$next11"]();

    }
    catch($err){if($B.is_exc($err, [StopIteration])){break;}else{throw($err)}}
    ;$locals.$line_info = "11,__ge8";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    return [$B.$call($B.$getattr($B.$check_def("html",$locals___main__["html"]),"TR"))((function($locals___ge10){var $B = __BRYTHON__;
var $bltns = __BRYTHON__.InjectBuiltins();eval($bltns);

var $locals = $locals___ge10;
$locals___ge10.__package__ = ""
var $top_frame = ["__ge10", $locals___ge10, "__ge10", $locals___ge10]
$locals.$f_trace = $B.enter_frame($top_frame)
var $stack_length = $B.frames_stack.length;
try{
    var __ge1012 = $locals___ge10["__ge10"] = $B.genfunc("__ge10", undefined, {"$locals___ge10": $B.clone($locals___ge10),"$locals___ge8___ge8_9": $B.clone($locals___ge8___ge8_9),"$locals___ge8": $B.clone($locals___ge8),"$locals___main__": $B.clone($locals___main__)},[function($defaults){function __ge1012(){
 for(var attr in this.blocks){eval("var " + attr + " = this.blocks[attr]")};
var $locals___ge10___ge10_11 = this.env = {},
    $local_name = "__ge10___ge10_11",
    $locals = $locals___ge10___ge10_11;$locals.$parent = $locals___ge10;
 var $nb_defaults = Object.keys($defaults).length,
     $parent = $locals.$parent
 var $len = arguments.length;
 if($len > 0 && arguments[$len - 1].$nat !== undefined){
    var $ns = $B.args("__ge10", 0, {}, [], arguments, $defaults, null, null);
    for(var $var in $ns){$locals[$var] = $ns[$var]};

 }
 else{
    if($len == 0){
         //

    }
    else if($len > 0){$B.wrong_nb_args("__ge10", $len, 0, [])}

 }
 $locals.$line_info = "11,__ge10"
 var $top_frame = [$local_name, $locals,"__main__", $locals___main__, __ge1012]
 $locals.$f_trace = $B.enter_frame($top_frame)
 var $stack_length = $B.frames_stack.length;
 $locals.__annotations__ = _b_.dict.$factory()
 $top_frame[1] = $locals
 $locals.$parent = $parent
 $locals.$name = "__ge10"
 $B.js_this = this;
 ;$locals.$line_info = "11,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var sent_value = this.sent_value === undefined ? _b_.None : this.sent_value;
this.sent_value = _b_.None
if(sent_value.__class__ === $B.$GeneratorSendError){sent_value.err.$stack.splice(0, 0, $B.freeze([$top_frame])[0]); throw sent_value.err};
 ;$locals.$line_info = "12,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var $iter13 = $B.$check_def_free1("line", "__ge8___ge8_9");$locals["$next13"] = $B.$getattr($B.$iter($iter13),"__next__")
 while(true){
    try{
         $locals___ge10___ge10_11["x"] = $locals["$next13"]();

    }
    catch($err){if($B.is_exc($err, [StopIteration])){break;}else{throw($err)}}
    ;$locals.$line_info = "13,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    return [$B.$call($B.$getattr($B.$check_def("html",$locals___main__["html"]),"TD"))($B.$check_def_local("x",$locals["x"])), 0]

 }

}
return __ge1012},function __ge1012(){
 for(var attr in this.blocks){eval("var " + attr + " = this.blocks[attr]")};
var $locals___ge10___ge10_11 = this.env,
    $local_name = "__ge10___ge10_11",
    $locals = $locals___ge10___ge10_11;
 var $top_frame = ["__ge10___ge10_11",$locals,"__ge10",$locals___ge10];$B.frames_stack.push($top_frame); var $stack_length = $B.frames_stack.length;$locals.$is_generator = true;$locals.$yield_node_id = 0;
 ;$locals.$line_info = "13,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
 var sent_value = this.sent_value === undefined ? _b_.None : this.sent_value;
     this.sent_value = _b_.None
     if(sent_value.__class__ === $B.$GeneratorSendError){sent_value.err.$stack.splice(0, 0, $B.freeze([$top_frame])[0]); throw sent_value.err};
 $locals.$line_info = "12,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};None;
 while(true){
    try{
         $locals___ge10___ge10_11["x"] = $locals["$next13"]();

    }
    catch($err){if($B.is_exc($err, [StopIteration])){break;}else{throw($err)}}
    ;$locals.$line_info = "13,__ge10";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    return [$B.$call($B.$getattr($B.$check_def("html",$locals___main__["html"]),"TD"))($B.$check_def_local("x",$locals["x"])), 0]

 }

}
],{})
    __ge1012.$is_func = true
    __ge1012.$infos = {
        __name__:"__ge10",
        __qualname__:"__ge10",
        __annotations__: {},
        __dict__: _b_.dict.__new__(_b_.dict),
        __doc__: None,
        __module__ : "__ge10",
        __code__:{
            co_argcount:0,
            co_filename:$locals___ge10["__file__"],
            co_firstlineno:11,
            co_flags:99,
            co_freevars: ["line","html"],
            co_kwonlyargcount:0,
            co_name: "__ge10",
            co_nlocals: 0,
            co_posonlyargcount: 0,
            co_varnames: $B.fast_tuple([]
        )}
    };None;
    $B.leave_frame({value: _b_.None})
}
catch(err){
    $B.leave_frame({value: _b_.None})
    throw err
}

var $res = $locals___ge10["__ge10"]();
$res.is_gen_expr = true;
return $res
})({})
), 0]

 }

}
],{})
    __ge810.$is_func = true
    __ge810.$infos = {
        __name__:"__ge8",
        __qualname__:"__ge8",
        __annotations__: {},
        __dict__: _b_.dict.__new__(_b_.dict),
        __doc__: None,
        __module__ : "__ge8",
        __code__:{
            co_argcount:0,
            co_filename:$locals___ge8["__file__"],
            co_firstlineno:9,
            co_flags:99,
            co_freevars: ["lines","html"],
            co_kwonlyargcount:0,
            co_name: "__ge8",
            co_nlocals: 0,
            co_posonlyargcount: 0,
            co_varnames: $B.fast_tuple([]
        )}
    };None;
    $B.leave_frame({value: _b_.None})
}
catch(err){
    $B.leave_frame({value: _b_.None})
    throw err
}

var $res = $locals___ge8["__ge8"]();
$res.is_gen_expr = true;
return $res
})({})
);
    ;$locals.$line_info = "11,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    typeof $locals___main__["$$document"]!="object" && typeof $locals___main__["$$document"]!="function" && typeof $locals___main__["$$document"] == typeof $locals___main__["calc"] ? $locals___main__["$$document"]<=$locals___main__["calc"] : $B.rich_comp("__le__",$locals___main__["$$document"],$locals___main__["calc"]);
    ;$locals.$line_info = "13,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    $locals___main__["result"] = $B.$getitem($locals___main__["$$document"],"result");
    ;$locals.$line_info = "15,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var action$0 = function($defaults){function action0(event){
        var $locals___main___action_2 = {},
            $local_name = "__main___action_2",
            $locals = $locals___main___action_2;
        var $nb_defaults = Object.keys($defaults).length,
            $parent = $locals.$parent
        var $len = arguments.length;
        if($len > 0 && arguments[$len - 1].$nat !== undefined){
            $locals___main___action_2 = $locals = $B.args("action", 1, {event:null}, ["event"], arguments, $defaults, null, null);
        }
        else{
            if($len == 1){
                $locals___main___action_2 = $locals = {event:event}
            }
            else if($len > 1){$B.wrong_nb_args("action", $len, 1, ["event"])}
            else if($len + $nb_defaults < 1){$B.wrong_nb_args("action", $len, 1, ["event"])}
            else{
                $locals___main___action_2 = $locals = {event:event}
                var defparams = ["event"]
                for(var i=$len; i < defparams.length;i++){$locals[defparams[i]] = $defaults[defparams[i]]}
            }
        }
        $locals.$line_info = "15,__main__"
        var $top_frame = [$local_name, $locals,"__main__", $locals___main__, action0]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
            $locals.__annotations__ = _b_.dict.$factory()
            $top_frame[1] = $locals
            $locals.$parent = $parent
            $locals.$name = "action"
            $B.js_this = this;
            ;$locals.$line_info = "16,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            "Gère l'événement \"click\" sur un bouton de la calculatrice.";
            ;$locals.$line_info = "19,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $locals___main___action_2["element"] = $B.$getattr($locals["event"],"target");
            ;$locals.$line_info = "21,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $locals___main___action_2["value"] = $B.$getattr($locals["element"],"text");
            ;$locals.$line_info = "22,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            if($B.$bool(!$B.$is_member($locals["value"],"=C"))){
                ;$locals.$line_info = "24,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                if($B.$bool($B.$is_member($B.$getattr($locals___main__["result"],"text"),$B.$list(["0","erreur"])))){
                    ;$locals.$line_info = "25,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    $B.$setattr($locals___main__["result"],"text",$locals["value"]);None;;
                }
                else{
                    ;$locals.$line_info = "27,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    $B.$setattr($locals___main__["result"],"text",$B.add($B.$getattr($locals___main__["result"],"text"), $locals["value"]));None;;
                }
            }
            else if($B.$bool(($B.set_line("28,__main___action_2")) && (typeof $locals["value"] == "string" ? $locals["value"]=="C" : $B.rich_comp("__eq__",$locals["value"],"C")))){
                ;$locals.$line_info = "30,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                $B.$setattr($locals___main__["result"],"text","0");None;;
            }
            else if($B.$bool(($B.set_line("31,__main___action_2")) && (typeof $locals["value"] == "string" ? $locals["value"]=="=" : $B.rich_comp("__eq__",$locals["value"],"=")))){
                ;$locals.$line_info = "33,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                $locals.$failed4 = false;
            try{
                    ;$locals.$line_info = "34,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    $locals___main___action_2["x"] = $B.$call($B.builtins.$$eval)($B.$getattr($locals___main__["result"],"text"));
                    ;$locals.$line_info = "35,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                    $B.$setattr($locals___main__["result"],"text",$locals["x"]);None;;
                }
                catch($err3){
                    $B.set_exc($err3)
                    if($locals.$f_trace !== _b_.None){$locals.$f_trace = $B.trace_exception()}
                    $locals.$failed4 = true;$B.pmframe = $B.last($B.frames_stack);if(false){}
                    else{
                        ;$locals.$line_info = "36,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                        void(0)
                        ;$locals.$line_info = "37,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
                        $B.$setattr($locals___main__["result"],"text","erreur");None;;
                        $B.del_exc()
                    }
                }
            }
            ;$locals.$line_info = "39,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $B.$call($B.$check_def("toto",$locals___main__["toto"]))();
            if($locals.$f_trace !== _b_.None){
                $B.trace_return(_b_.None)
            }
            $B.leave_frame();return _b_.None
        }
        catch(err){
            $B.set_exc(err)
            if($locals.$f_trace !== _b_.None){$locals.$f_trace = $B.trace_exception()}
            $B.leave_frame();throw err
        }
    }
    action0.$is_func = true
    action0.$infos = {
        __name__:"action",
        __qualname__:"action",
        __defaults__ : _b_.None,
        __kwdefaults__ : _b_.None,
        __annotations__: {},
        __dict__: _b_.dict.__new__(_b_.dict),
        __doc__: "Gère l'événement \"click\" sur un bouton de la calculatrice.",
        __module__ : "__main__",
        __code__:{
            co_argcount:1,
            co_filename:$locals___main__["__file__"],
            co_firstlineno:15,
            co_flags:67,
            co_freevars: ["result","toto"],
            co_kwonlyargcount:0,
            co_name: "action",
            co_nlocals: 1,
            co_posonlyargcount: 0,
            co_varnames: $B.fast_tuple(["event"]
        )}
    };None;
    return action0}
    $locals___main__["action"] = action$0({})
    $locals___main__["action"].$set_defaults = function(value){return $locals___main__["action"] = action$0(value)}
    ;$locals.$line_info = "42,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var toto$1 = function($defaults){function toto1(){
        var $locals___main___toto_3 = {},
            $local_name = "__main___toto_3",
            $locals = $locals___main___toto_3;
        var $nb_defaults = Object.keys($defaults).length,
            $parent = $locals.$parent
        var $len = arguments.length;
        if($len > 0 && arguments[$len - 1].$nat !== undefined){
            $locals___main___toto_3 = $locals = $B.args("toto", 0, {}, [], arguments, $defaults, null, null);
        }
        else{
            if($len == 0){
                $locals___main___toto_3 = $locals = {}
            }
            else if($len > 0){$B.wrong_nb_args("toto", $len, 0, [])}
        }
        $locals.$line_info = "42,__main__"
        var $top_frame = [$local_name, $locals,"__main__", $locals___main__, toto1]
        $locals.$f_trace = $B.enter_frame($top_frame)
        var $stack_length = $B.frames_stack.length;
        try{
            $locals.__annotations__ = _b_.dict.$factory()
            $top_frame[1] = $locals
            $locals.$parent = $parent
            $locals.$name = "toto"
            $B.js_this = this;
            ;$locals.$line_info = "43,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            (typeof $locals___main__["$$document"] == "string" ? $locals___main__["$$document"]<="couille" : $B.rich_comp("__le__",$locals___main__["$$document"],"couille"));
            ;$locals.$line_info = "44,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $B.$call($B.builtins.print)($B.$check_def("__name__",$locals___main__["__name__"]));
            ;$locals.$line_info = "45,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
            $B.$call($B.builtins.print)($B.$getattr($locals___main__["toto"],"__name__"));
            if($locals.$f_trace !== _b_.None){
                $B.trace_return(_b_.None)
            }
            $B.leave_frame();return _b_.None
        }
        catch(err){
            $B.set_exc(err)
            if($locals.$f_trace !== _b_.None){$locals.$f_trace = $B.trace_exception()}
            $B.leave_frame();throw err
        }
    }
    toto1.$is_func = true
    toto1.$infos = {
        __name__:"toto",
        __qualname__:"toto",
        __defaults__ : _b_.None,
        __kwdefaults__ : _b_.None,
        __annotations__: {},
        __dict__: _b_.dict.__new__(_b_.dict),
        __doc__: None,
        __module__ : "__main__",
        __code__:{
            co_argcount:0,
            co_filename:$locals___main__["__file__"],
            co_firstlineno:42,
            co_flags:67,
            co_freevars: ["$$document","__name__","toto"],
            co_kwonlyargcount:0,
            co_name: "toto",
            co_nlocals: 0,
            co_posonlyargcount: 0,
            co_varnames: $B.fast_tuple([]
        )}
    };None;
    return toto1}
    $locals___main__["toto"] = toto$1({})
    $locals___main__["toto"].$set_defaults = function(value){return $locals___main__["toto"] = toto$1(value)}
    ;$locals.$line_info = "49,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
    var $iter2 = $B.$call($B.$getattr($locals___main__["$$document"],"select"))("td");$locals["$next2"] = $B.$getattr($B.$iter($iter2),"__next__")
    while(true){
        try{
            $locals___main__["button"] = $locals["$next2"]();
        }
        catch($err){if($B.is_exc($err, [StopIteration])){break;}else{throw($err)}}
        ;$locals.$line_info = "50,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};_b_.None;
        $B.$call($B.$getattr($B.$check_def("button",$locals___main__["button"]),"bind"))("click", $B.$check_def("action",$locals___main__["action"]));
        $locals.$line_info = "49,__main__";if($locals.$f_trace !== _b_.None){$B.trace_line()};None;
    }
    $B.leave_frame({value: _b_.None})
}
catch(err){
    $B.leave_frame({value: _b_.None})
    throw err
}
brython.js:5172:25
