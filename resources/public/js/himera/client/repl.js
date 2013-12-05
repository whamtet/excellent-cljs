goog.provide('himera.client.repl');
goog.require('cljs.core');
goog.require('clojure.zip');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('cljs.reader');
himera.client.repl.map__GT_js = (function map__GT_js(m){
var out = {};
var seq__5270_5276 = cljs.core.seq.call(null,m);
var chunk__5271_5277 = null;
var count__5272_5278 = 0;
var i__5273_5279 = 0;
while(true){
if((i__5273_5279 < count__5272_5278))
{var vec__5274_5280 = cljs.core._nth.call(null,chunk__5271_5277,i__5273_5279);
var k_5281 = cljs.core.nth.call(null,vec__5274_5280,0,null);
var v_5282 = cljs.core.nth.call(null,vec__5274_5280,1,null);
(out[cljs.core.name.call(null,k_5281)] = v_5282);
{
var G__5283 = seq__5270_5276;
var G__5284 = chunk__5271_5277;
var G__5285 = count__5272_5278;
var G__5286 = (i__5273_5279 + 1);
seq__5270_5276 = G__5283;
chunk__5271_5277 = G__5284;
count__5272_5278 = G__5285;
i__5273_5279 = G__5286;
continue;
}
} else
{var temp__4092__auto___5287 = cljs.core.seq.call(null,seq__5270_5276);
if(temp__4092__auto___5287)
{var seq__5270_5288__$1 = temp__4092__auto___5287;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5270_5288__$1))
{var c__3039__auto___5289 = cljs.core.chunk_first.call(null,seq__5270_5288__$1);
{
var G__5290 = cljs.core.chunk_rest.call(null,seq__5270_5288__$1);
var G__5291 = c__3039__auto___5289;
var G__5292 = cljs.core.count.call(null,c__3039__auto___5289);
var G__5293 = 0;
seq__5270_5276 = G__5290;
chunk__5271_5277 = G__5291;
count__5272_5278 = G__5292;
i__5273_5279 = G__5293;
continue;
}
} else
{var vec__5275_5294 = cljs.core.first.call(null,seq__5270_5288__$1);
var k_5295 = cljs.core.nth.call(null,vec__5275_5294,0,null);
var v_5296 = cljs.core.nth.call(null,vec__5275_5294,1,null);
(out[cljs.core.name.call(null,k_5295)] = v_5296);
{
var G__5297 = cljs.core.next.call(null,seq__5270_5288__$1);
var G__5298 = null;
var G__5299 = 0;
var G__5300 = 0;
seq__5270_5276 = G__5297;
chunk__5271_5277 = G__5298;
count__5272_5278 = G__5299;
i__5273_5279 = G__5300;
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
return (function (p1__5301_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__5301_SHARP_);
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
himera.client.repl.simple_compile = (function simple_compile(code){
var data = cljs.core.atom.call(null,null);
var params = himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/simplecompile","\uFDD0:data",code,"\uFDD0:contentType","shit","\uFDD0:async",false,"\uFDD0:type","POST","\uFDD0:dataType","text","\uFDD0:success",((function (data){
return (function (p1__5302_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__5302_SHARP_);
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
himera.client.repl.is_comment_QMARK_ = (function is_comment_QMARK_(p1__5303_SHARP_){
return himera.client.repl.starts_with_QMARK_.call(null,";",p1__5303_SHARP_);
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
}catch (e5305){if((e5305 instanceof Error))
{var e = e5305;
return himera.client.repl.build_msg.call(null,"Compilation error: ",e,"jquery-console-message-error");
} else
{if("\uFDD0:else")
{throw e5305;
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
return controller = (function (){var G__5307 = jQuery("#console");
G__5307.console(himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:welcomeMessage","Excellent REPL v0.2.5","\uFDD0:promptLabel","go buddy> ","\uFDD0:commandValidate",himera.client.repl.on_validate,"\uFDD0:commandHandle",himera.client.repl.on_handle,"\uFDD0:autofocus",true,"\uFDD0:animateScroll",true,"\uFDD0:promptHistory",true], true)));
return G__5307;
})();
}));
});
goog.exportSymbol('himera.client.repl.go', himera.client.repl.go);
