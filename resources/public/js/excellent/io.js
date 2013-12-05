goog.provide('excellent.io');
goog.require('cljs.core');
goog.require('himera.client.repl');
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
return cljs.core.map.call(null,(function (p1__3533_SHARP_){
return cljs.core.map.call(null,f,p1__3533_SHARP_);
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
/**
* Download excel spreadsheet with contents from tab i.
*/
excellent.io.excel = (function excel(i){
jQuery("#exceltext").val(excellent.io.slurp.call(null,i));
return jQuery("#excelform").submit();
});
goog.exportSymbol('excellent.io.excel', excellent.io.excel);
excellent.io.tabs = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
excellent.io.save_map = (function save_map(){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__3008__auto__ = (function iter__3538(s__3539){
return (new cljs.core.LazySeq(null,false,(function (){
var s__3539__$1 = s__3539;
while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__3539__$1);
if(temp__4092__auto__)
{var s__3539__$2 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__3539__$2))
{var c__3006__auto__ = cljs.core.chunk_first.call(null,s__3539__$2);
var size__3007__auto__ = cljs.core.count.call(null,c__3006__auto__);
var b__3541 = cljs.core.chunk_buffer.call(null,size__3007__auto__);
if((function (){var i__3540 = 0;
while(true){
if((i__3540 < size__3007__auto__))
{var i = cljs.core._nth.call(null,c__3006__auto__,i__3540);
cljs.core.chunk_append.call(null,b__3541,cljs.core.PersistentVector.fromArray([i,excellent.io.slurp.call(null,i)], true));
{
var G__3542 = (i__3540 + 1);
i__3540 = G__3542;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3541),iter__3538.call(null,cljs.core.chunk_rest.call(null,s__3539__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__3541),null);
}
} else
{var i = cljs.core.first.call(null,s__3539__$2);
return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([i,excellent.io.slurp.call(null,i)], true),iter__3538.call(null,cljs.core.rest.call(null,s__3539__$2)));
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
return cljs.core.swap_BANG_.call(null,excellent.io.tabs,(function (p1__3543_SHARP_){
return cljs.core.disj.call(null,p1__3543_SHARP_,i);
}));
});
goog.exportSymbol('excellent.io.close_tab', excellent.io.close_tab);
excellent.io.open_tab = (function open_tab(i){
return cljs.core.swap_BANG_.call(null,excellent.io.tabs,(function (p1__3544_SHARP_){
return cljs.core.conj.call(null,p1__3544_SHARP_,i);
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
