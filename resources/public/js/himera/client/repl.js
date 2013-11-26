goog.provide('himera.client.repl');
goog.require('cljs.core');
goog.require('clojure.zip');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('cljs.reader');
himera.client.repl.map__GT_js = (function map__GT_js(m){
var out = {};
var seq__7228_7234 = cljs.core.seq.call(null,m);
var chunk__7229_7235 = null;
var count__7230_7236 = 0;
var i__7231_7237 = 0;
while(true){
if((i__7231_7237 < count__7230_7236))
{var vec__7232_7238 = cljs.core._nth.call(null,chunk__7229_7235,i__7231_7237);
var k_7239 = cljs.core.nth.call(null,vec__7232_7238,0,null);
var v_7240 = cljs.core.nth.call(null,vec__7232_7238,1,null);
(out[cljs.core.name.call(null,k_7239)] = v_7240);
{
var G__7241 = seq__7228_7234;
var G__7242 = chunk__7229_7235;
var G__7243 = count__7230_7236;
var G__7244 = (i__7231_7237 + 1);
seq__7228_7234 = G__7241;
chunk__7229_7235 = G__7242;
count__7230_7236 = G__7243;
i__7231_7237 = G__7244;
continue;
}
} else
{var temp__4092__auto___7245 = cljs.core.seq.call(null,seq__7228_7234);
if(temp__4092__auto___7245)
{var seq__7228_7246__$1 = temp__4092__auto___7245;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7228_7246__$1))
{var c__3039__auto___7247 = cljs.core.chunk_first.call(null,seq__7228_7246__$1);
{
var G__7248 = cljs.core.chunk_rest.call(null,seq__7228_7246__$1);
var G__7249 = c__3039__auto___7247;
var G__7250 = cljs.core.count.call(null,c__3039__auto___7247);
var G__7251 = 0;
seq__7228_7234 = G__7248;
chunk__7229_7235 = G__7249;
count__7230_7236 = G__7250;
i__7231_7237 = G__7251;
continue;
}
} else
{var vec__7233_7252 = cljs.core.first.call(null,seq__7228_7246__$1);
var k_7253 = cljs.core.nth.call(null,vec__7233_7252,0,null);
var v_7254 = cljs.core.nth.call(null,vec__7233_7252,1,null);
(out[cljs.core.name.call(null,k_7253)] = v_7254);
{
var G__7255 = cljs.core.next.call(null,seq__7228_7246__$1);
var G__7256 = null;
var G__7257 = 0;
var G__7258 = 0;
seq__7228_7234 = G__7255;
chunk__7229_7235 = G__7256;
count__7230_7236 = G__7257;
i__7231_7237 = G__7258;
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
return (function (p1__7259_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__7259_SHARP_);
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
himera.client.repl.simple_compile = (function simple_compile(code){
var data = cljs.core.atom.call(null,null);
var params = himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/simplecompile","\uFDD0:data",code,"\uFDD0:contentType","shit","\uFDD0:async",false,"\uFDD0:type","POST","\uFDD0:dataType","text","\uFDD0:success",((function (data){
return (function (p1__7260_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__7260_SHARP_);
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
himera.client.repl.is_comment_QMARK_ = (function is_comment_QMARK_(p1__7261_SHARP_){
return himera.client.repl.starts_with_QMARK_.call(null,";",p1__7261_SHARP_);
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
{try{return himera.client.repl.build_msg.call(null,"",cljs.core.pr_str.call(null,eval(eval(compiled))),"jquery-console-message-value");
}catch (e7263){if((e7263 instanceof Error))
{var e = e7263;
return himera.client.repl.build_msg.call(null,"Compilation error: ",e,"jquery-console-message-error");
} else
{if("\uFDD0:else")
{throw e7263;
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
return controller = (function (){var G__7265 = jQuery("#console");
G__7265.console(himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:welcomeMessage","Excellent REPL v0.2.5","\uFDD0:promptLabel","go buddy> ","\uFDD0:commandValidate",himera.client.repl.on_validate,"\uFDD0:commandHandle",himera.client.repl.on_handle,"\uFDD0:autofocus",true,"\uFDD0:animateScroll",true,"\uFDD0:promptHistory",true], true)));
return G__7265;
})();
}));
});
goog.exportSymbol('himera.client.repl.go', himera.client.repl.go);
