goog.provide('himera.client.repl');
goog.require('cljs.core');
goog.require('clojure.zip');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('cljs.reader');
himera.client.repl.map__GT_js = (function map__GT_js(m){
var out = {};
var seq__4702_4708 = cljs.core.seq.call(null,m);
var chunk__4703_4709 = null;
var count__4704_4710 = 0;
var i__4705_4711 = 0;
while(true){
if((i__4705_4711 < count__4704_4710))
{var vec__4706_4712 = cljs.core._nth.call(null,chunk__4703_4709,i__4705_4711);
var k_4713 = cljs.core.nth.call(null,vec__4706_4712,0,null);
var v_4714 = cljs.core.nth.call(null,vec__4706_4712,1,null);
(out[cljs.core.name.call(null,k_4713)] = v_4714);
{
var G__4715 = seq__4702_4708;
var G__4716 = chunk__4703_4709;
var G__4717 = count__4704_4710;
var G__4718 = (i__4705_4711 + 1);
seq__4702_4708 = G__4715;
chunk__4703_4709 = G__4716;
count__4704_4710 = G__4717;
i__4705_4711 = G__4718;
continue;
}
} else
{var temp__4092__auto___4719 = cljs.core.seq.call(null,seq__4702_4708);
if(temp__4092__auto___4719)
{var seq__4702_4720__$1 = temp__4092__auto___4719;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4702_4720__$1))
{var c__3039__auto___4721 = cljs.core.chunk_first.call(null,seq__4702_4720__$1);
{
var G__4722 = cljs.core.chunk_rest.call(null,seq__4702_4720__$1);
var G__4723 = c__3039__auto___4721;
var G__4724 = cljs.core.count.call(null,c__3039__auto___4721);
var G__4725 = 0;
seq__4702_4708 = G__4722;
chunk__4703_4709 = G__4723;
count__4704_4710 = G__4724;
i__4705_4711 = G__4725;
continue;
}
} else
{var vec__4707_4726 = cljs.core.first.call(null,seq__4702_4720__$1);
var k_4727 = cljs.core.nth.call(null,vec__4707_4726,0,null);
var v_4728 = cljs.core.nth.call(null,vec__4707_4726,1,null);
(out[cljs.core.name.call(null,k_4727)] = v_4728);
{
var G__4729 = cljs.core.next.call(null,seq__4702_4720__$1);
var G__4730 = null;
var G__4731 = 0;
var G__4732 = 0;
seq__4702_4708 = G__4729;
chunk__4703_4709 = G__4730;
count__4704_4710 = G__4731;
i__4705_4711 = G__4732;
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
return (function (p1__4733_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__4733_SHARP_);
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
himera.client.repl.simple_compile = (function simple_compile(code){
var data = cljs.core.atom.call(null,null);
var params = himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/simplecompile","\uFDD0:data",code,"\uFDD0:contentType","shit","\uFDD0:async",false,"\uFDD0:type","POST","\uFDD0:dataType","text","\uFDD0:success",((function (data){
return (function (p1__4734_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__4734_SHARP_);
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
himera.client.repl.is_comment_QMARK_ = (function is_comment_QMARK_(p1__4735_SHARP_){
return himera.client.repl.starts_with_QMARK_.call(null,";",p1__4735_SHARP_);
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
}catch (e4737){if((e4737 instanceof Error))
{var e = e4737;
return himera.client.repl.build_msg.call(null,"Compilation error: ",e,"jquery-console-message-error");
} else
{if("\uFDD0:else")
{throw e4737;
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
return controller = (function (){var G__4739 = jQuery("#console");
G__4739.console(himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:welcomeMessage","Excellent REPL v0.2.5","\uFDD0:promptLabel","go buddy> ","\uFDD0:commandValidate",himera.client.repl.on_validate,"\uFDD0:commandHandle",himera.client.repl.on_handle,"\uFDD0:autofocus",true,"\uFDD0:animateScroll",true,"\uFDD0:promptHistory",true], true)));
return G__4739;
})();
}));
});
goog.exportSymbol('himera.client.repl.go', himera.client.repl.go);
