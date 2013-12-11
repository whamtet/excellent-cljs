goog.provide('excellent.io');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('himera.client.repl');
excellent.io.map__GT_js = (function map__GT_js(m){
var out = {};
var seq__18135_18141 = cljs.core.seq.call(null,m);
var chunk__18136_18142 = null;
var count__18137_18143 = 0;
var i__18138_18144 = 0;
while(true){
if((i__18138_18144 < count__18137_18143))
{var vec__18139_18145 = cljs.core._nth.call(null,chunk__18136_18142,i__18138_18144);
var k_18146 = cljs.core.nth.call(null,vec__18139_18145,0,null);
var v_18147 = cljs.core.nth.call(null,vec__18139_18145,1,null);
(out[cljs.core.name.call(null,k_18146)] = v_18147);
{
var G__18148 = seq__18135_18141;
var G__18149 = chunk__18136_18142;
var G__18150 = count__18137_18143;
var G__18151 = (i__18138_18144 + 1);
seq__18135_18141 = G__18148;
chunk__18136_18142 = G__18149;
count__18137_18143 = G__18150;
i__18138_18144 = G__18151;
continue;
}
} else
{var temp__4092__auto___18152 = cljs.core.seq.call(null,seq__18135_18141);
if(temp__4092__auto___18152)
{var seq__18135_18153__$1 = temp__4092__auto___18152;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18135_18153__$1))
{var c__3039__auto___18154 = cljs.core.chunk_first.call(null,seq__18135_18153__$1);
{
var G__18155 = cljs.core.chunk_rest.call(null,seq__18135_18153__$1);
var G__18156 = c__3039__auto___18154;
var G__18157 = cljs.core.count.call(null,c__3039__auto___18154);
var G__18158 = 0;
seq__18135_18141 = G__18155;
chunk__18136_18142 = G__18156;
count__18137_18143 = G__18157;
i__18138_18144 = G__18158;
continue;
}
} else
{var vec__18140_18159 = cljs.core.first.call(null,seq__18135_18153__$1);
var k_18160 = cljs.core.nth.call(null,vec__18140_18159,0,null);
var v_18161 = cljs.core.nth.call(null,vec__18140_18159,1,null);
(out[cljs.core.name.call(null,k_18160)] = v_18161);
{
var G__18162 = cljs.core.next.call(null,seq__18135_18153__$1);
var G__18163 = null;
var G__18164 = 0;
var G__18165 = 0;
seq__18135_18141 = G__18162;
chunk__18136_18142 = G__18163;
count__18137_18143 = G__18164;
i__18138_18144 = G__18165;
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
/**
* Slurp contents from tab i.
*/
excellent.io.slurp = (function slurp(i){
return jQuery([cljs.core.str("#workspace"),cljs.core.str(i)].join('')).val();
});
goog.exportSymbol('excellent.io.slurp', excellent.io.slurp);
/**
* Spit val into tab i.
*/
excellent.io.spit = (function spit(i,val){
if(cljs.core.truth_(cljs.core.deref.call(null,excellent.io.tabs).call(null,i)))
{return jQuery([cljs.core.str("#workspace"),cljs.core.str(i)].join('')).val(val);
} else
{return excellent.io.add_tab.call(null,val);
}
});
goog.exportSymbol('excellent.io.spit', excellent.io.spit);
excellent.io.split_line = (function split_line(line){
var or__3943__auto__ = cljs.core.re_seq.call(null,/[\w\.]+/,line);
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.List.EMPTY;
}
});
excellent.io.double_map = (function double_map(f,grid){
return cljs.core.map.call(null,(function (p1__18166_SHARP_){
return cljs.core.map.call(null,f,p1__18166_SHARP_);
}),grid);
});
/**
* Slurp tab i into a two-dimensional grid.
*/
excellent.io.grid_slurp = (function grid_slurp(i){
return cljs.core.map.call(null,excellent.io.split_line,excellent.io.slurp.call(null,i).split("\n"));
});
goog.exportSymbol('excellent.io.grid_slurp', excellent.io.grid_slurp);
/**
* Slurp tab i into a two-dimensional grid of numbers.
*/
excellent.io.grid_slurp_num = (function grid_slurp_num(i){
return excellent.io.double_map.call(null,Number,excellent.io.grid_slurp.call(null,i));
});
goog.exportSymbol('excellent.io.grid_slurp_num', excellent.io.grid_slurp_num);
excellent.io.apply_interpose = (function apply_interpose(delimiter,seq){
return cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,delimiter,seq));
});
excellent.io.convert_list = (function convert_list(l){
var l__$1 = cljs.reader.read_string.call(null,l);
if(cljs.core.coll_QMARK_.call(null,cljs.core.first.call(null,l__$1)))
{return excellent.io.apply_interpose.call(null,"\n",cljs.core.map.call(null,(function (p1__18167_SHARP_){
return excellent.io.apply_interpose.call(null," ",p1__18167_SHARP_);
}),l__$1));
} else
{return excellent.io.apply_interpose.call(null," ",l__$1);
}
});
/**
* Download excel spreadsheet with contents from tab i.
*/
excellent.io.excel = (function excel(i,is_list_QMARK_){
jQuery("#exceltext").val((cljs.core.truth_(is_list_QMARK_)?excellent.io.convert_list.call(null,excellent.io.slurp.call(null,i)):excellent.io.slurp.call(null,i)));
return jQuery("#excelform").submit();
});
goog.exportSymbol('excellent.io.excel', excellent.io.excel);
excellent.io.tabs = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
excellent.io.save_map = (function save_map(){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__3008__auto__ = (function iter__18172(s__18173){
return (new cljs.core.LazySeq(null,false,(function (){
var s__18173__$1 = s__18173;
while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__18173__$1);
if(temp__4092__auto__)
{var s__18173__$2 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__18173__$2))
{var c__3006__auto__ = cljs.core.chunk_first.call(null,s__18173__$2);
var size__3007__auto__ = cljs.core.count.call(null,c__3006__auto__);
var b__18175 = cljs.core.chunk_buffer.call(null,size__3007__auto__);
if((function (){var i__18174 = 0;
while(true){
if((i__18174 < size__3007__auto__))
{var i = cljs.core._nth.call(null,c__3006__auto__,i__18174);
cljs.core.chunk_append.call(null,b__18175,cljs.core.PersistentVector.fromArray([i,excellent.io.slurp.call(null,i)], true));
{
var G__18176 = (i__18174 + 1);
i__18174 = G__18176;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__18175),iter__18172.call(null,cljs.core.chunk_rest.call(null,s__18173__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__18175),null);
}
} else
{var i = cljs.core.first.call(null,s__18173__$2);
return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([i,excellent.io.slurp.call(null,i)], true),iter__18172.call(null,cljs.core.rest.call(null,s__18173__$2)));
}
} else
{return null;
}
break;
}
}),null));
});
return iter__3008__auto__.call(null,cljs.core.deref.call(null,excellent.io.tabs));
})());
});
excellent.io.test = (function test(){
return console.log(cljs.core.pr_str.call(null,excellent.io.save_map.call(null)));
});
goog.exportSymbol('excellent.io.test', excellent.io.test);
excellent.io.close_tab = (function close_tab(i){
return cljs.core.swap_BANG_.call(null,excellent.io.tabs,(function (p1__18177_SHARP_){
return cljs.core.disj.call(null,p1__18177_SHARP_,i);
}));
});
goog.exportSymbol('excellent.io.close_tab', excellent.io.close_tab);
excellent.io.open_tab = (function open_tab(i){
return cljs.core.swap_BANG_.call(null,excellent.io.tabs,(function (p1__18178_SHARP_){
return cljs.core.conj.call(null,p1__18178_SHARP_,i);
}));
});
goog.exportSymbol('excellent.io.open_tab', excellent.io.open_tab);
/**
* Download contents of tabs to preserve your work.
*/
excellent.io.save = (function save(){
jQuery("#savetext").val(cljs.core.pr_str.call(null,excellent.io.save_map.call(null)));
return jQuery("#saveform").submit();
});
goog.exportSymbol('excellent.io.save', excellent.io.save);
excellent.io.set_latest_tab = (function set_latest_tab(val){
return jQuery([cljs.core.str("#workspace"),cljs.core.str(total_tabs)].join('')).val(val);
});
goog.exportSymbol('excellent.io.set_latest_tab', excellent.io.set_latest_tab);
excellent.io.add_tab = (function add_tab(val){
jQuery("#addtab").click();
return excellent.io.set_latest_tab.call(null,val);
});
goog.exportSymbol('excellent.io.add_tab', excellent.io.add_tab);
/**
* Load contents of tab i as clojurescript.
*/
excellent.io.load = (function load(i){
return eval(himera.client.repl.simple_compile.call(null,excellent.io.slurp.call(null,i)));
});
goog.exportSymbol('excellent.io.load', excellent.io.load);
/**
* Load contents of tab i as javascript.
*/
excellent.io.js_load = (function js_load(i){
return eval(excellent.io.slurp.call(null,i));
});
goog.exportSymbol('excellent.io.js_load', excellent.io.js_load);
excellent.io.list_files = (function list_files(){
var data = cljs.core.atom.call(null,null);
var params = excellent.io.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/listfiles","\uFDD0:async",false,"\uFDD0:type","GET","\uFDD0:success",((function (data){
return (function (p1__18179_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__18179_SHARP_);
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
goog.exportSymbol('excellent.io.list_files', excellent.io.list_files);
excellent.io.db_spit = (function db_spit(name,val){
var params = excellent.io.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/spit","\uFDD0:data",excellent.io.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:name",name,"\uFDD0:str",val], true)),"\uFDD0:type","POST"], true));
return jQuery.ajax(params);
});
goog.exportSymbol('excellent.io.db_spit', excellent.io.db_spit);
excellent.io.db_slurp = (function db_slurp(name){
var data = cljs.core.atom.call(null,null);
var params = excellent.io.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url",[cljs.core.str("/slurp?name="),cljs.core.str(name)].join(''),"\uFDD0:async",false,"\uFDD0:type","GET","\uFDD0:success",((function (data){
return (function (p1__18180_SHARP_){
return cljs.core.reset_BANG_.call(null,data,p1__18180_SHARP_);
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
goog.exportSymbol('excellent.io.db_slurp', excellent.io.db_slurp);
