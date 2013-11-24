goog.provide('himera.client.repl');
goog.require('cljs.core');
goog.require('clojure.zip');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('cljs.reader');
himera.client.repl.map__GT_js = (function map__GT_js(m){
var out = {};
var seq__7956_7962 = cljs.core.seq.call(null,m);
var chunk__7957_7963 = null;
var count__7958_7964 = 0;
var i__7959_7965 = 0;
while(true){
if((i__7959_7965 < count__7958_7964))
{var vec__7960_7966 = cljs.core._nth.call(null,chunk__7957_7963,i__7959_7965);
var k_7967 = cljs.core.nth.call(null,vec__7960_7966,0,null);
var v_7968 = cljs.core.nth.call(null,vec__7960_7966,1,null);
(out[cljs.core.name.call(null,k_7967)] = v_7968);
{
var G__7969 = seq__7956_7962;
var G__7970 = chunk__7957_7963;
var G__7971 = count__7958_7964;
var G__7972 = (i__7959_7965 + 1);
seq__7956_7962 = G__7969;
chunk__7957_7963 = G__7970;
count__7958_7964 = G__7971;
i__7959_7965 = G__7972;
continue;
}
} else
{var temp__4092__auto___7973 = cljs.core.seq.call(null,seq__7956_7962);
if(temp__4092__auto___7973)
{var seq__7956_7974__$1 = temp__4092__auto___7973;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7956_7974__$1))
{var c__3039__auto___7975 = cljs.core.chunk_first.call(null,seq__7956_7974__$1);
{
var G__7976 = cljs.core.chunk_rest.call(null,seq__7956_7974__$1);
var G__7977 = c__3039__auto___7975;
var G__7978 = cljs.core.count.call(null,c__3039__auto___7975);
var G__7979 = 0;
seq__7956_7962 = G__7976;
chunk__7957_7963 = G__7977;
count__7958_7964 = G__7978;
i__7959_7965 = G__7979;
continue;
}
} else
{var vec__7961_7980 = cljs.core.first.call(null,seq__7956_7974__$1);
var k_7981 = cljs.core.nth.call(null,vec__7961_7980,0,null);
var v_7982 = cljs.core.nth.call(null,vec__7961_7980,1,null);
(out[cljs.core.name.call(null,k_7981)] = v_7982);
{
var G__7983 = cljs.core.next.call(null,seq__7956_7974__$1);
var G__7984 = null;
var G__7985 = 0;
var G__7986 = 0;
seq__7956_7962 = G__7983;
chunk__7957_7963 = G__7984;
count__7958_7964 = G__7985;
i__7959_7965 = G__7986;
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
return (function (p1__7987_SHARP_){
return cljs.core.reset_BANG_.call(null,data,cljs.reader.read_string.call(null,p1__7987_SHARP_));
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
himera.client.repl.simple_compile = (function simple_compile(code){
var data = cljs.core.atom.call(null,null);
var params = himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/simplecompile","\uFDD0:data",code,"\uFDD0:contentType","shit","\uFDD0:async",false,"\uFDD0:type","POST","\uFDD0:dataType","text","\uFDD0:success",((function (data){
return (function (p1__7988_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__7988_SHARP_);
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
himera.client.repl.is_comment_QMARK_ = (function is_comment_QMARK_(p1__7989_SHARP_){
return himera.client.repl.starts_with_QMARK_.call(null,";",p1__7989_SHARP_);
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
{try{return himera.client.repl.build_msg.call(null,"",cljs.core.pr_str.call(null,eval((new cljs.core.Keyword("\uFDD0:js")).call(null,compiled))),"jquery-console-message-value");
}catch (e7991){if((e7991 instanceof Error))
{var e = e7991;
return himera.client.repl.build_msg.call(null,"Compilation error: ",e,"jquery-console-message-error");
} else
{if("\uFDD0:else")
{throw e7991;
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
return controller = (function (){var G__7993 = jQuery("#console");
G__7993.console(himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:welcomeMessage","Excellent REPL v0.2.5","\uFDD0:promptLabel","go buddy> ","\uFDD0:commandValidate",himera.client.repl.on_validate,"\uFDD0:commandHandle",himera.client.repl.on_handle,"\uFDD0:autofocus",true,"\uFDD0:animateScroll",true,"\uFDD0:promptHistory",true], true)));
return G__7993;
})();
}));
});
goog.exportSymbol('himera.client.repl.go', himera.client.repl.go);
