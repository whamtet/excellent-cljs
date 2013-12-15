goog.provide('himera.client.repl');
goog.require('cljs.core');
goog.require('clojure.zip');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('cljs.reader');
himera.client.repl.map__GT_js = (function map__GT_js(m){
var out = {};
var seq__4126_4132 = cljs.core.seq.call(null,m);
var chunk__4127_4133 = null;
var count__4128_4134 = 0;
var i__4129_4135 = 0;
while(true){
if((i__4129_4135 < count__4128_4134))
{var vec__4130_4136 = cljs.core._nth.call(null,chunk__4127_4133,i__4129_4135);
var k_4137 = cljs.core.nth.call(null,vec__4130_4136,0,null);
var v_4138 = cljs.core.nth.call(null,vec__4130_4136,1,null);
(out[cljs.core.name.call(null,k_4137)] = v_4138);
{
var G__4139 = seq__4126_4132;
var G__4140 = chunk__4127_4133;
var G__4141 = count__4128_4134;
var G__4142 = (i__4129_4135 + 1);
seq__4126_4132 = G__4139;
chunk__4127_4133 = G__4140;
count__4128_4134 = G__4141;
i__4129_4135 = G__4142;
continue;
}
} else
{var temp__4092__auto___4143 = cljs.core.seq.call(null,seq__4126_4132);
if(temp__4092__auto___4143)
{var seq__4126_4144__$1 = temp__4092__auto___4143;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4126_4144__$1))
{var c__3039__auto___4145 = cljs.core.chunk_first.call(null,seq__4126_4144__$1);
{
var G__4146 = cljs.core.chunk_rest.call(null,seq__4126_4144__$1);
var G__4147 = c__3039__auto___4145;
var G__4148 = cljs.core.count.call(null,c__3039__auto___4145);
var G__4149 = 0;
seq__4126_4132 = G__4146;
chunk__4127_4133 = G__4147;
count__4128_4134 = G__4148;
i__4129_4135 = G__4149;
continue;
}
} else
{var vec__4131_4150 = cljs.core.first.call(null,seq__4126_4144__$1);
var k_4151 = cljs.core.nth.call(null,vec__4131_4150,0,null);
var v_4152 = cljs.core.nth.call(null,vec__4131_4150,1,null);
(out[cljs.core.name.call(null,k_4151)] = v_4152);
{
var G__4153 = cljs.core.next.call(null,seq__4126_4144__$1);
var G__4154 = null;
var G__4155 = 0;
var G__4156 = 0;
seq__4126_4132 = G__4153;
chunk__4127_4133 = G__4154;
count__4128_4134 = G__4155;
i__4129_4135 = G__4156;
continue;
}
}
} else
{}
}
break;
}
return out;
});
himera.client.repl.ajax = (function ajax(m){
return jQuery.ajax(himera.client.repl.map__GT_js.call(null,m));
});
himera.client.repl.go_compile = (function go_compile(code){
var data = cljs.core.atom.call(null,null);
var params = himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/compile","\uFDD0:data",[cljs.core.str("{:expr "),cljs.core.str(code),cljs.core.str("}")].join(''),"\uFDD0:contentType","application/clojure; charset=utf-8","\uFDD0:async",false,"\uFDD0:type","POST","\uFDD0:dataType","text","\uFDD0:success",((function (data){
return (function (p1__4157_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__4157_SHARP_);
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
himera.client.repl.simple_compile = (function simple_compile(code){
var data = cljs.core.atom.call(null,null);
var params = himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/simplecompile","\uFDD0:data",code,"\uFDD0:contentType","shit","\uFDD0:async",false,"\uFDD0:type","POST","\uFDD0:dataType","text","\uFDD0:success",((function (data){
return (function (p1__4158_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__4158_SHARP_);
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
himera.client.repl.load_workspace = (function load_workspace(){
var code = jQuery("#workspace").val();
return eval(himera.client.repl.simple_compile.call(null,code));
});
himera.client.repl.on_validate = (function on_validate(input){
return !(cljs.core.empty_QMARK_.call(null,input));
});
himera.client.repl.build_msg = (function build_msg(title,msg,klass){
return [himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:msg",[cljs.core.str(title),cljs.core.str(msg)].join(''),"\uFDD0:className",klass], true))];
});
himera.client.repl.starts_with_QMARK_ = (function starts_with_QMARK_(o,s){
return cljs.core._EQ_.call(null,clojure.string.trim.call(null,s).slice(0,o.length),o);
});
himera.client.repl.is_comment_QMARK_ = (function is_comment_QMARK_(p1__4159_SHARP_){
return himera.client.repl.starts_with_QMARK_.call(null,";",p1__4159_SHARP_);
});
himera.client.repl.on_handle = (function on_handle(line,report){
if(cljs.core.truth_(himera.client.repl.is_comment_QMARK_.call(null,line)))
{return himera.client.repl.build_msg.call(null,"","","jquery-console-message-value");
} else
{var input = jQuery.trim(line);
var compiled = himera.client.repl.go_compile.call(null,input);
var temp__4090__auto__ = (function (){var and__3941__auto__ = compiled;
if(cljs.core.truth_(and__3941__auto__))
{return (new cljs.core.Keyword("\uFDD0:error")).call(null,compiled);
} else
{return and__3941__auto__;
}
})();
if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;
return himera.client.repl.build_msg.call(null,"Compilation error: ",err,"jquery-console-message-error");
} else
{try{return himera.client.repl.build_msg.call(null,"",cljs.core.pr_str.call(null,eval(compiled)),"jquery-console-message-value");
}catch (e4161){if((e4161 instanceof Error))
{var e = e4161;
return himera.client.repl.build_msg.call(null,"Compilation error: ",e,"jquery-console-message-error");
} else
{if("\uFDD0:else")
{throw e4161;
} else
{return null;
}
}
}}
}
});
himera.client.repl.on_handle2 = (function on_handle2(line,report){
console.log(line);
console.log(report);
return himera.client.repl.on_handle.call(null,line,report);
});
himera.client.repl.go = (function go(){
return jQuery(document).ready((function (){
return controller = (function (){var G__4163 = jQuery("#console");
G__4163.console(himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:welcomeMessage","Excellent REPL v0.2.5","\uFDD0:promptLabel","go buddy> ","\uFDD0:commandValidate",himera.client.repl.on_validate,"\uFDD0:commandHandle",himera.client.repl.on_handle,"\uFDD0:autofocus",true,"\uFDD0:animateScroll",true,"\uFDD0:promptHistory",true], true)));
return G__4163;
})();
}));
});
goog.exportSymbol('himera.client.repl.go', himera.client.repl.go);
