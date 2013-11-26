goog.provide('domina');
goog.require('cljs.core');
goog.require('domina.support');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.dom.xml');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('goog.style');
goog.require('cljs.core');
domina.re_html = /<|&#?\w+;/;
domina.re_leading_whitespace = /^\s+/;
domina.re_xhtml_tag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/i;
domina.re_tag_name = /<([\w:]+)/;
domina.re_no_inner_html = /<(?:script|style)/i;
domina.re_tbody = /<tbody/i;
var opt_wrapper_4773 = cljs.core.PersistentVector.fromArray([1,"<select multiple='multiple'>","</select>"], true);
var table_section_wrapper_4774 = cljs.core.PersistentVector.fromArray([1,"<table>","</table>"], true);
var cell_wrapper_4775 = cljs.core.PersistentVector.fromArray([3,"<table><tbody><tr>","</tr></tbody></table>"], true);
domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["col","\uFDD0:default","tfoot","caption","optgroup","legend","area","td","thead","th","option","tbody","tr","colgroup"],[cljs.core.PersistentVector.fromArray([2,"<table><tbody></tbody><colgroup>","</colgroup></table>"], true),cljs.core.PersistentVector.fromArray([0,"",""], true),table_section_wrapper_4774,table_section_wrapper_4774,opt_wrapper_4773,cljs.core.PersistentVector.fromArray([1,"<fieldset>","</fieldset>"], true),cljs.core.PersistentVector.fromArray([1,"<map>","</map>"], true),cell_wrapper_4775,table_section_wrapper_4774,cell_wrapper_4775,opt_wrapper_4773,table_section_wrapper_4774,cljs.core.PersistentVector.fromArray([2,"<table><tbody>","</tbody></table>"], true),table_section_wrapper_4774]);
domina.remove_extraneous_tbody_BANG_ = (function remove_extraneous_tbody_BANG_(div,html,tag_name,start_wrap){
var no_tbody_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_tbody,html));
var tbody = (((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,tag_name,"table");
if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?(function (){var and__3941__auto__ = div.firstChild;
if(cljs.core.truth_(and__3941__auto__))
{return div.firstChild.childNodes;
} else
{return and__3941__auto__;
}
})():(((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,start_wrap,"<table>");
if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?divchildNodes:cljs.core.PersistentVector.EMPTY));
var seq__4780 = cljs.core.seq.call(null,tbody);
var chunk__4781 = null;
var count__4782 = 0;
var i__4783 = 0;
while(true){
if((i__4783 < count__4782))
{var child = cljs.core._nth.call(null,chunk__4781,i__4783);
if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__4784 = seq__4780;
var G__4785 = chunk__4781;
var G__4786 = count__4782;
var G__4787 = (i__4783 + 1);
seq__4780 = G__4784;
chunk__4781 = G__4785;
count__4782 = G__4786;
i__4783 = G__4787;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__4780);
if(temp__4092__auto__)
{var seq__4780__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4780__$1))
{var c__3039__auto__ = cljs.core.chunk_first.call(null,seq__4780__$1);
{
var G__4788 = cljs.core.chunk_rest.call(null,seq__4780__$1);
var G__4789 = c__3039__auto__;
var G__4790 = cljs.core.count.call(null,c__3039__auto__);
var G__4791 = 0;
seq__4780 = G__4788;
chunk__4781 = G__4789;
count__4782 = G__4790;
i__4783 = G__4791;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__4780__$1);
if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__4792 = cljs.core.next.call(null,seq__4780__$1);
var G__4793 = null;
var G__4794 = 0;
var G__4795 = 0;
seq__4780 = G__4792;
chunk__4781 = G__4793;
count__4782 = G__4794;
i__4783 = G__4795;
continue;
}
}
} else
{return null;
}
}
break;
}
});
domina.restore_leading_whitespace_BANG_ = (function restore_leading_whitespace_BANG_(div,html){
return div.insertBefore(document.createTextNode(cljs.core.first.call(null,cljs.core.re_find.call(null,domina.re_leading_whitespace,html))),div.firstChild);
});
/**
* takes an string of html and returns a NodeList of dom fragments
*/
domina.html_to_dom = (function html_to_dom(html){
var html__$1 = clojure.string.replace.call(null,html,domina.re_xhtml_tag,"<$1></$2>");
var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html__$1)))].join('').toLowerCase();
var vec__4797 = cljs.core.get.call(null,domina.wrap_map,tag_name,(new cljs.core.Keyword("\uFDD0:default")).call(null,domina.wrap_map));
var depth = cljs.core.nth.call(null,vec__4797,0,null);
var start_wrap = cljs.core.nth.call(null,vec__4797,1,null);
var end_wrap = cljs.core.nth.call(null,vec__4797,2,null);
var div = (function (){var wrapper = (function (){var div = document.createElement("div");
div.innerHTML = [cljs.core.str(start_wrap),cljs.core.str(html__$1),cljs.core.str(end_wrap)].join('');
return div;
})();
var level = depth;
while(true){
if((level > 0))
{{
var G__4798 = wrapper.lastChild;
var G__4799 = (level - 1);
wrapper = G__4798;
level = G__4799;
continue;
}
} else
{return wrapper;
}
break;
}
})();
if(cljs.core.truth_(domina.support.extraneous_tbody_QMARK_))
{domina.remove_extraneous_tbody_BANG_.call(null,div,html__$1,tag_name,start_wrap);
} else
{}
if(cljs.core.truth_((function (){var and__3941__auto__ = cljs.core.not.call(null,domina.support.leading_whitespace_QMARK_);
if(and__3941__auto__)
{return cljs.core.re_find.call(null,domina.re_leading_whitespace,html__$1);
} else
{return and__3941__auto__;
}
})()))
{domina.restore_leading_whitespace_BANG_.call(null,div,html__$1);
} else
{}
return div.childNodes;
});
domina.string_to_dom = (function string_to_dom(s){
if(cljs.core.truth_(cljs.core.re_find.call(null,domina.re_html,s)))
{return domina.html_to_dom.call(null,s);
} else
{return document.createTextNode(s);
}
});
domina.DomContent = {};
domina.nodes = (function nodes(content){
if((function (){var and__3941__auto__ = content;
if(and__3941__auto__)
{return content.domina$DomContent$nodes$arity$1;
} else
{return and__3941__auto__;
}
})())
{return content.domina$DomContent$nodes$arity$1(content);
} else
{var x__2908__auto__ = (((content == null))?null:content);
return (function (){var or__3943__auto__ = (domina.nodes[goog.typeOf(x__2908__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.nodes["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.nodes",content);
}
}
})().call(null,content);
}
});
domina.single_node = (function single_node(nodeseq){
if((function (){var and__3941__auto__ = nodeseq;
if(and__3941__auto__)
{return nodeseq.domina$DomContent$single_node$arity$1;
} else
{return and__3941__auto__;
}
})())
{return nodeseq.domina$DomContent$single_node$arity$1(nodeseq);
} else
{var x__2908__auto__ = (((nodeseq == null))?null:nodeseq);
return (function (){var or__3943__auto__ = (domina.single_node[goog.typeOf(x__2908__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.single_node["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.single-node",nodeseq);
}
}
})().call(null,nodeseq);
}
});
domina._STAR_debug_STAR_ = true;
/**
* @param {...*} var_args
*/
domina.log_debug = (function() { 
var log_debug__delegate = function (mesg){
if(cljs.core.truth_((function (){var and__3941__auto__ = domina._STAR_debug_STAR_;
if(cljs.core.truth_(and__3941__auto__))
{return !(cljs.core._EQ_.call(null,window.console,undefined));
} else
{return and__3941__auto__;
}
})()))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log_debug = function (var_args){
var mesg = null;
if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return log_debug__delegate.call(this, mesg);
};
log_debug.cljs$lang$maxFixedArity = 0;
log_debug.cljs$lang$applyTo = (function (arglist__4800){
var mesg = cljs.core.seq(arglist__4800);
return log_debug__delegate(mesg);
});
log_debug.cljs$core$IFn$_invoke$arity$variadic = log_debug__delegate;
return log_debug;
})()
;
/**
* @param {...*} var_args
*/
domina.log = (function() { 
var log__delegate = function (mesg){
if(cljs.core.truth_(window.console))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log = function (var_args){
var mesg = null;
if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return log__delegate.call(this, mesg);
};
log.cljs$lang$maxFixedArity = 0;
log.cljs$lang$applyTo = (function (arglist__4801){
var mesg = cljs.core.seq(arglist__4801);
return log__delegate(mesg);
});
log.cljs$core$IFn$_invoke$arity$variadic = log__delegate;
return log;
})()
;
/**
* Returns content containing a single node by looking up the given ID
*/
domina.by_id = (function by_id(id){
return goog.dom.getElement(cljs.core.name.call(null,id));
});
/**
* Returns content containing nodes which have the specified CSS class.
*/
domina.by_class = (function by_class(class_name){
if((void 0 === domina.t4805))
{goog.provide('domina.t4805');

/**
* @constructor
*/
domina.t4805 = (function (class_name,by_class,meta4806){
this.class_name = class_name;
this.by_class = by_class;
this.meta4806 = meta4806;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
domina.t4805.cljs$lang$type = true;
domina.t4805.cljs$lang$ctorStr = "domina/t4805";
domina.t4805.cljs$lang$ctorPrWriter = (function (this__2849__auto__,writer__2850__auto__,opt__2851__auto__){
return cljs.core._write.call(null,writer__2850__auto__,"domina/t4805");
});
domina.t4805.prototype.domina$DomContent$ = true;
domina.t4805.prototype.domina$DomContent$nodes$arity$1 = (function (_){
var self__ = this;
return domina.normalize_seq.call(null,goog.dom.getElementsByClass(cljs.core.name.call(null,self__.class_name)));
});
domina.t4805.prototype.domina$DomContent$single_node$arity$1 = (function (_){
var self__ = this;
return domina.normalize_seq.call(null,goog.dom.getElementByClass(cljs.core.name.call(null,self__.class_name)));
});
domina.t4805.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_4807){
var self__ = this;
return self__.meta4806;
});
domina.t4805.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_4807,meta4806__$1){
var self__ = this;
return (new domina.t4805(self__.class_name,self__.by_class,meta4806__$1));
});
domina.__GT_t4805 = (function __GT_t4805(class_name__$1,by_class__$1,meta4806){
return (new domina.t4805(class_name__$1,by_class__$1,meta4806));
});
} else
{}
return (new domina.t4805(class_name,by_class,null));
});
/**
* Gets all the child nodes of the elements in a content. Same as (xpath content '*') but more efficient.
*/
domina.children = (function children(content){
return cljs.core.doall.call(null,cljs.core.mapcat.call(null,goog.dom.getChildren,domina.nodes.call(null,content)));
});
/**
* Returns the deepest common ancestor of the argument contents (which are presumed to be single nodes), or nil if they are from different documents.
* @param {...*} var_args
*/
domina.common_ancestor = (function() { 
var common_ancestor__delegate = function (contents){
return cljs.core.apply.call(null,goog.dom.findCommonAncestor,cljs.core.map.call(null,domina.single_node,contents));
};
var common_ancestor = function (var_args){
var contents = null;
if (arguments.length > 0) {
  contents = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return common_ancestor__delegate.call(this, contents);
};
common_ancestor.cljs$lang$maxFixedArity = 0;
common_ancestor.cljs$lang$applyTo = (function (arglist__4808){
var contents = cljs.core.seq(arglist__4808);
return common_ancestor__delegate(contents);
});
common_ancestor.cljs$core$IFn$_invoke$arity$variadic = common_ancestor__delegate;
return common_ancestor;
})()
;
/**
* Returns true if the first argument is an ancestor of the second argument. Presumes both arguments are single-node contents.
*/
domina.ancestor_QMARK_ = (function ancestor_QMARK_(ancestor_content,descendant_content){
return cljs.core._EQ_.call(null,domina.common_ancestor.call(null,ancestor_content,descendant_content),domina.single_node.call(null,ancestor_content));
});
/**
* Returns a deep clone of content.
*/
domina.clone = (function clone(content){
return cljs.core.map.call(null,(function (p1__4809_SHARP_){
return p1__4809_SHARP_.cloneNode(true);
}),domina.nodes.call(null,content));
});
/**
* Given a parent and child contents, appends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.append_BANG_ = (function append_BANG_(parent_content,child_content){
domina.apply_with_cloning.call(null,goog.dom.appendChild,parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, appends each of the children to all of the parents at the specified index. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.insert_BANG_ = (function insert_BANG_(parent_content,child_content,idx){
domina.apply_with_cloning.call(null,(function (p1__4810_SHARP_,p2__4811_SHARP_){
return goog.dom.insertChildAt(p1__4810_SHARP_,p2__4811_SHARP_,idx);
}),parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, prepends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.prepend_BANG_ = (function prepend_BANG_(parent_content,child_content){
domina.insert_BANG_.call(null,parent_content,child_content,0);
return parent_content;
});
/**
* Given a content and some new content, inserts the new content immediately before the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_before_BANG_ = (function insert_before_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4813_SHARP_,p2__4812_SHARP_){
return goog.dom.insertSiblingBefore(p2__4812_SHARP_,p1__4813_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4815_SHARP_,p2__4814_SHARP_){
return goog.dom.insertSiblingAfter(p2__4814_SHARP_,p1__4815_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4817_SHARP_,p2__4816_SHARP_){
return goog.dom.replaceNode(p2__4816_SHARP_,p1__4817_SHARP_);
}),old_content,new_content);
return old_content;
});
/**
* Removes all the nodes in a content from the DOM and returns them.
*/
domina.detach_BANG_ = (function detach_BANG_(content){
return cljs.core.doall.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the nodes in a content from the DOM. Returns nil.
*/
domina.destroy_BANG_ = (function destroy_BANG_(content){
return cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the child nodes in a content from the DOM. Returns the original content.
*/
domina.destroy_children_BANG_ = (function destroy_children_BANG_(content){
cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeChildren,domina.nodes.call(null,content)));
return content;
});
/**
* Gets the value of a CSS property. Assumes content will be a single node. Name may be a string or keyword. Returns nil if there is no value set for the style.
*/
domina.style = (function style(content,name){
var s = goog.style.getStyle(domina.single_node.call(null,content),cljs.core.name.call(null,name));
if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return null;
} else
{return s;
}
});
/**
* Gets the value of an HTML attribute. Assumes content will be a single node. Name may be a stirng or keyword. Returns nil if there is no value set for the style.
*/
domina.attr = (function attr(content,name){
return domina.single_node.call(null,content).getAttribute(cljs.core.name.call(null,name));
});
/**
* Sets the value of a CSS property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (content,name,value){
var seq__4822_4826 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4823_4827 = null;
var count__4824_4828 = 0;
var i__4825_4829 = 0;
while(true){
if((i__4825_4829 < count__4824_4828))
{var n_4830 = cljs.core._nth.call(null,chunk__4823_4827,i__4825_4829);
goog.style.setStyle(n_4830,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4831 = seq__4822_4826;
var G__4832 = chunk__4823_4827;
var G__4833 = count__4824_4828;
var G__4834 = (i__4825_4829 + 1);
seq__4822_4826 = G__4831;
chunk__4823_4827 = G__4832;
count__4824_4828 = G__4833;
i__4825_4829 = G__4834;
continue;
}
} else
{var temp__4092__auto___4835 = cljs.core.seq.call(null,seq__4822_4826);
if(temp__4092__auto___4835)
{var seq__4822_4836__$1 = temp__4092__auto___4835;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4822_4836__$1))
{var c__3039__auto___4837 = cljs.core.chunk_first.call(null,seq__4822_4836__$1);
{
var G__4838 = cljs.core.chunk_rest.call(null,seq__4822_4836__$1);
var G__4839 = c__3039__auto___4837;
var G__4840 = cljs.core.count.call(null,c__3039__auto___4837);
var G__4841 = 0;
seq__4822_4826 = G__4838;
chunk__4823_4827 = G__4839;
count__4824_4828 = G__4840;
i__4825_4829 = G__4841;
continue;
}
} else
{var n_4842 = cljs.core.first.call(null,seq__4822_4836__$1);
goog.style.setStyle(n_4842,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4843 = cljs.core.next.call(null,seq__4822_4836__$1);
var G__4844 = null;
var G__4845 = 0;
var G__4846 = 0;
seq__4822_4826 = G__4843;
chunk__4823_4827 = G__4844;
count__4824_4828 = G__4845;
i__4825_4829 = G__4846;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_style_BANG_ = function (content,name,var_args){
var value = null;
if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return set_style_BANG___delegate.call(this, content, name, value);
};
set_style_BANG_.cljs$lang$maxFixedArity = 2;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__4847){
var content = cljs.core.first(arglist__4847);
arglist__4847 = cljs.core.next(arglist__4847);
var name = cljs.core.first(arglist__4847);
var value = cljs.core.rest(arglist__4847);
return set_style_BANG___delegate(content, name, value);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
/**
* Sets the value of an HTML property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_attr_BANG_ = (function() { 
var set_attr_BANG___delegate = function (content,name,value){
var seq__4852_4856 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4853_4857 = null;
var count__4854_4858 = 0;
var i__4855_4859 = 0;
while(true){
if((i__4855_4859 < count__4854_4858))
{var n_4860 = cljs.core._nth.call(null,chunk__4853_4857,i__4855_4859);
n_4860.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4861 = seq__4852_4856;
var G__4862 = chunk__4853_4857;
var G__4863 = count__4854_4858;
var G__4864 = (i__4855_4859 + 1);
seq__4852_4856 = G__4861;
chunk__4853_4857 = G__4862;
count__4854_4858 = G__4863;
i__4855_4859 = G__4864;
continue;
}
} else
{var temp__4092__auto___4865 = cljs.core.seq.call(null,seq__4852_4856);
if(temp__4092__auto___4865)
{var seq__4852_4866__$1 = temp__4092__auto___4865;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4852_4866__$1))
{var c__3039__auto___4867 = cljs.core.chunk_first.call(null,seq__4852_4866__$1);
{
var G__4868 = cljs.core.chunk_rest.call(null,seq__4852_4866__$1);
var G__4869 = c__3039__auto___4867;
var G__4870 = cljs.core.count.call(null,c__3039__auto___4867);
var G__4871 = 0;
seq__4852_4856 = G__4868;
chunk__4853_4857 = G__4869;
count__4854_4858 = G__4870;
i__4855_4859 = G__4871;
continue;
}
} else
{var n_4872 = cljs.core.first.call(null,seq__4852_4866__$1);
n_4872.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4873 = cljs.core.next.call(null,seq__4852_4866__$1);
var G__4874 = null;
var G__4875 = 0;
var G__4876 = 0;
seq__4852_4856 = G__4873;
chunk__4853_4857 = G__4874;
count__4854_4858 = G__4875;
i__4855_4859 = G__4876;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_attr_BANG_ = function (content,name,var_args){
var value = null;
if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return set_attr_BANG___delegate.call(this, content, name, value);
};
set_attr_BANG_.cljs$lang$maxFixedArity = 2;
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__4877){
var content = cljs.core.first(arglist__4877);
arglist__4877 = cljs.core.next(arglist__4877);
var name = cljs.core.first(arglist__4877);
var value = cljs.core.rest(arglist__4877);
return set_attr_BANG___delegate(content, name, value);
});
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___delegate;
return set_attr_BANG_;
})()
;
/**
* Removes the specified HTML property for each node in the content. Name may be a string or keyword.
*/
domina.remove_attr_BANG_ = (function remove_attr_BANG_(content,name){
var seq__4882_4886 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4883_4887 = null;
var count__4884_4888 = 0;
var i__4885_4889 = 0;
while(true){
if((i__4885_4889 < count__4884_4888))
{var n_4890 = cljs.core._nth.call(null,chunk__4883_4887,i__4885_4889);
n_4890.removeAttribute(cljs.core.name.call(null,name));
{
var G__4891 = seq__4882_4886;
var G__4892 = chunk__4883_4887;
var G__4893 = count__4884_4888;
var G__4894 = (i__4885_4889 + 1);
seq__4882_4886 = G__4891;
chunk__4883_4887 = G__4892;
count__4884_4888 = G__4893;
i__4885_4889 = G__4894;
continue;
}
} else
{var temp__4092__auto___4895 = cljs.core.seq.call(null,seq__4882_4886);
if(temp__4092__auto___4895)
{var seq__4882_4896__$1 = temp__4092__auto___4895;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4882_4896__$1))
{var c__3039__auto___4897 = cljs.core.chunk_first.call(null,seq__4882_4896__$1);
{
var G__4898 = cljs.core.chunk_rest.call(null,seq__4882_4896__$1);
var G__4899 = c__3039__auto___4897;
var G__4900 = cljs.core.count.call(null,c__3039__auto___4897);
var G__4901 = 0;
seq__4882_4886 = G__4898;
chunk__4883_4887 = G__4899;
count__4884_4888 = G__4900;
i__4885_4889 = G__4901;
continue;
}
} else
{var n_4902 = cljs.core.first.call(null,seq__4882_4896__$1);
n_4902.removeAttribute(cljs.core.name.call(null,name));
{
var G__4903 = cljs.core.next.call(null,seq__4882_4896__$1);
var G__4904 = null;
var G__4905 = 0;
var G__4906 = 0;
seq__4882_4886 = G__4903;
chunk__4883_4887 = G__4904;
count__4884_4888 = G__4905;
i__4885_4889 = G__4906;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Parses a CSS style string and returns the properties as a map.
*/
domina.parse_style_attributes = (function parse_style_attributes(style){
return cljs.core.reduce.call(null,(function (acc,pair){
var vec__4908 = pair.split(/\s*:\s*/);
var k = cljs.core.nth.call(null,vec__4908,0,null);
var v = cljs.core.nth.call(null,vec__4908,1,null);
if(cljs.core.truth_((function (){var and__3941__auto__ = k;
if(cljs.core.truth_(and__3941__auto__))
{return v;
} else
{return and__3941__auto__;
}
})()))
{return cljs.core.assoc.call(null,acc,cljs.core.keyword.call(null,k.toLowerCase()),v);
} else
{return acc;
}
}),cljs.core.PersistentArrayMap.EMPTY,style.split(/\s*;\s*/));
});
/**
* Returns a map of the CSS styles/values. Assumes content will be a single node. Style names are returned as keywords.
*/
domina.styles = (function styles(content){
var style = domina.attr.call(null,content,"style");
if(cljs.core.string_QMARK_.call(null,style))
{return domina.parse_style_attributes.call(null,style);
} else
{if(cljs.core.truth_(style.cssText))
{return domina.parse_style_attributes.call(null,style.cssText);
} else
{return null;
}
}
});
/**
* Returns a map of the HTML attributes/values. Assumes content will be a single node. Attribute names are returned as keywords.
*/
domina.attrs = (function attrs(content){
var node = domina.single_node.call(null,content);
var attrs__$1 = node.attributes;
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,(function (p1__4909_SHARP_){
var attr = attrs__$1.item(p1__4909_SHARP_);
var value = attr.nodeValue;
if((function (){var and__3941__auto__ = cljs.core.not_EQ_.call(null,null,value);
if(and__3941__auto__)
{return cljs.core.not_EQ_.call(null,"",value);
} else
{return and__3941__auto__;
}
})())
{return cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,attr.nodeName.toLowerCase()),attr.nodeValue], true);
} else
{return null;
}
}),cljs.core.range.call(null,attrs__$1.length))));
});
/**
* Sets the specified CSS styles for each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_styles_BANG_ = (function set_styles_BANG_(content,styles){
var seq__4916_4922 = cljs.core.seq.call(null,styles);
var chunk__4917_4923 = null;
var count__4918_4924 = 0;
var i__4919_4925 = 0;
while(true){
if((i__4919_4925 < count__4918_4924))
{var vec__4920_4926 = cljs.core._nth.call(null,chunk__4917_4923,i__4919_4925);
var name_4927 = cljs.core.nth.call(null,vec__4920_4926,0,null);
var value_4928 = cljs.core.nth.call(null,vec__4920_4926,1,null);
domina.set_style_BANG_.call(null,content,name_4927,value_4928);
{
var G__4929 = seq__4916_4922;
var G__4930 = chunk__4917_4923;
var G__4931 = count__4918_4924;
var G__4932 = (i__4919_4925 + 1);
seq__4916_4922 = G__4929;
chunk__4917_4923 = G__4930;
count__4918_4924 = G__4931;
i__4919_4925 = G__4932;
continue;
}
} else
{var temp__4092__auto___4933 = cljs.core.seq.call(null,seq__4916_4922);
if(temp__4092__auto___4933)
{var seq__4916_4934__$1 = temp__4092__auto___4933;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4916_4934__$1))
{var c__3039__auto___4935 = cljs.core.chunk_first.call(null,seq__4916_4934__$1);
{
var G__4936 = cljs.core.chunk_rest.call(null,seq__4916_4934__$1);
var G__4937 = c__3039__auto___4935;
var G__4938 = cljs.core.count.call(null,c__3039__auto___4935);
var G__4939 = 0;
seq__4916_4922 = G__4936;
chunk__4917_4923 = G__4937;
count__4918_4924 = G__4938;
i__4919_4925 = G__4939;
continue;
}
} else
{var vec__4921_4940 = cljs.core.first.call(null,seq__4916_4934__$1);
var name_4941 = cljs.core.nth.call(null,vec__4921_4940,0,null);
var value_4942 = cljs.core.nth.call(null,vec__4921_4940,1,null);
domina.set_style_BANG_.call(null,content,name_4941,value_4942);
{
var G__4943 = cljs.core.next.call(null,seq__4916_4934__$1);
var G__4944 = null;
var G__4945 = 0;
var G__4946 = 0;
seq__4916_4922 = G__4943;
chunk__4917_4923 = G__4944;
count__4918_4924 = G__4945;
i__4919_4925 = G__4946;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Sets the specified CSS styles fpr each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_attrs_BANG_ = (function set_attrs_BANG_(content,attrs){
var seq__4953_4959 = cljs.core.seq.call(null,attrs);
var chunk__4954_4960 = null;
var count__4955_4961 = 0;
var i__4956_4962 = 0;
while(true){
if((i__4956_4962 < count__4955_4961))
{var vec__4957_4963 = cljs.core._nth.call(null,chunk__4954_4960,i__4956_4962);
var name_4964 = cljs.core.nth.call(null,vec__4957_4963,0,null);
var value_4965 = cljs.core.nth.call(null,vec__4957_4963,1,null);
domina.set_attr_BANG_.call(null,content,name_4964,value_4965);
{
var G__4966 = seq__4953_4959;
var G__4967 = chunk__4954_4960;
var G__4968 = count__4955_4961;
var G__4969 = (i__4956_4962 + 1);
seq__4953_4959 = G__4966;
chunk__4954_4960 = G__4967;
count__4955_4961 = G__4968;
i__4956_4962 = G__4969;
continue;
}
} else
{var temp__4092__auto___4970 = cljs.core.seq.call(null,seq__4953_4959);
if(temp__4092__auto___4970)
{var seq__4953_4971__$1 = temp__4092__auto___4970;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4953_4971__$1))
{var c__3039__auto___4972 = cljs.core.chunk_first.call(null,seq__4953_4971__$1);
{
var G__4973 = cljs.core.chunk_rest.call(null,seq__4953_4971__$1);
var G__4974 = c__3039__auto___4972;
var G__4975 = cljs.core.count.call(null,c__3039__auto___4972);
var G__4976 = 0;
seq__4953_4959 = G__4973;
chunk__4954_4960 = G__4974;
count__4955_4961 = G__4975;
i__4956_4962 = G__4976;
continue;
}
} else
{var vec__4958_4977 = cljs.core.first.call(null,seq__4953_4971__$1);
var name_4978 = cljs.core.nth.call(null,vec__4958_4977,0,null);
var value_4979 = cljs.core.nth.call(null,vec__4958_4977,1,null);
domina.set_attr_BANG_.call(null,content,name_4978,value_4979);
{
var G__4980 = cljs.core.next.call(null,seq__4953_4971__$1);
var G__4981 = null;
var G__4982 = 0;
var G__4983 = 0;
seq__4953_4959 = G__4980;
chunk__4954_4960 = G__4981;
count__4955_4961 = G__4982;
i__4956_4962 = G__4983;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns true if the node has the specified CSS class. Assumes content is a single node.
*/
domina.has_class_QMARK_ = (function has_class_QMARK_(content,class$){
return goog.dom.classes.has(domina.single_node.call(null,content),class$);
});
/**
* Adds the specified CSS class to each node in the content.
*/
domina.add_class_BANG_ = (function add_class_BANG_(content,class$){
var seq__4988_4992 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4989_4993 = null;
var count__4990_4994 = 0;
var i__4991_4995 = 0;
while(true){
if((i__4991_4995 < count__4990_4994))
{var node_4996 = cljs.core._nth.call(null,chunk__4989_4993,i__4991_4995);
goog.dom.classes.add(node_4996,class$);
{
var G__4997 = seq__4988_4992;
var G__4998 = chunk__4989_4993;
var G__4999 = count__4990_4994;
var G__5000 = (i__4991_4995 + 1);
seq__4988_4992 = G__4997;
chunk__4989_4993 = G__4998;
count__4990_4994 = G__4999;
i__4991_4995 = G__5000;
continue;
}
} else
{var temp__4092__auto___5001 = cljs.core.seq.call(null,seq__4988_4992);
if(temp__4092__auto___5001)
{var seq__4988_5002__$1 = temp__4092__auto___5001;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4988_5002__$1))
{var c__3039__auto___5003 = cljs.core.chunk_first.call(null,seq__4988_5002__$1);
{
var G__5004 = cljs.core.chunk_rest.call(null,seq__4988_5002__$1);
var G__5005 = c__3039__auto___5003;
var G__5006 = cljs.core.count.call(null,c__3039__auto___5003);
var G__5007 = 0;
seq__4988_4992 = G__5004;
chunk__4989_4993 = G__5005;
count__4990_4994 = G__5006;
i__4991_4995 = G__5007;
continue;
}
} else
{var node_5008 = cljs.core.first.call(null,seq__4988_5002__$1);
goog.dom.classes.add(node_5008,class$);
{
var G__5009 = cljs.core.next.call(null,seq__4988_5002__$1);
var G__5010 = null;
var G__5011 = 0;
var G__5012 = 0;
seq__4988_4992 = G__5009;
chunk__4989_4993 = G__5010;
count__4990_4994 = G__5011;
i__4991_4995 = G__5012;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Removes the specified CSS class from each node in the content.
*/
domina.remove_class_BANG_ = (function remove_class_BANG_(content,class$){
var seq__5017_5021 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5018_5022 = null;
var count__5019_5023 = 0;
var i__5020_5024 = 0;
while(true){
if((i__5020_5024 < count__5019_5023))
{var node_5025 = cljs.core._nth.call(null,chunk__5018_5022,i__5020_5024);
goog.dom.classes.remove(node_5025,class$);
{
var G__5026 = seq__5017_5021;
var G__5027 = chunk__5018_5022;
var G__5028 = count__5019_5023;
var G__5029 = (i__5020_5024 + 1);
seq__5017_5021 = G__5026;
chunk__5018_5022 = G__5027;
count__5019_5023 = G__5028;
i__5020_5024 = G__5029;
continue;
}
} else
{var temp__4092__auto___5030 = cljs.core.seq.call(null,seq__5017_5021);
if(temp__4092__auto___5030)
{var seq__5017_5031__$1 = temp__4092__auto___5030;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5017_5031__$1))
{var c__3039__auto___5032 = cljs.core.chunk_first.call(null,seq__5017_5031__$1);
{
var G__5033 = cljs.core.chunk_rest.call(null,seq__5017_5031__$1);
var G__5034 = c__3039__auto___5032;
var G__5035 = cljs.core.count.call(null,c__3039__auto___5032);
var G__5036 = 0;
seq__5017_5021 = G__5033;
chunk__5018_5022 = G__5034;
count__5019_5023 = G__5035;
i__5020_5024 = G__5036;
continue;
}
} else
{var node_5037 = cljs.core.first.call(null,seq__5017_5031__$1);
goog.dom.classes.remove(node_5037,class$);
{
var G__5038 = cljs.core.next.call(null,seq__5017_5031__$1);
var G__5039 = null;
var G__5040 = 0;
var G__5041 = 0;
seq__5017_5021 = G__5038;
chunk__5018_5022 = G__5039;
count__5019_5023 = G__5040;
i__5020_5024 = G__5041;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns a seq of all the CSS classes currently applied to a node. Assumes content is a single node.
*/
domina.classes = (function classes(content){
return cljs.core.seq.call(null,goog.dom.classes.get(domina.single_node.call(null,content)));
});
/**
* Sets the class attribute of the content nodes to classes, which can
* be either a class attribute string or a seq of classname strings.
*/
domina.set_classes_BANG_ = (function set_classes_BANG_(content,classes){
var classes_5050__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);
var seq__5046_5051 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5047_5052 = null;
var count__5048_5053 = 0;
var i__5049_5054 = 0;
while(true){
if((i__5049_5054 < count__5048_5053))
{var node_5055 = cljs.core._nth.call(null,chunk__5047_5052,i__5049_5054);
goog.dom.classes.set(node_5055,classes_5050__$1);
{
var G__5056 = seq__5046_5051;
var G__5057 = chunk__5047_5052;
var G__5058 = count__5048_5053;
var G__5059 = (i__5049_5054 + 1);
seq__5046_5051 = G__5056;
chunk__5047_5052 = G__5057;
count__5048_5053 = G__5058;
i__5049_5054 = G__5059;
continue;
}
} else
{var temp__4092__auto___5060 = cljs.core.seq.call(null,seq__5046_5051);
if(temp__4092__auto___5060)
{var seq__5046_5061__$1 = temp__4092__auto___5060;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5046_5061__$1))
{var c__3039__auto___5062 = cljs.core.chunk_first.call(null,seq__5046_5061__$1);
{
var G__5063 = cljs.core.chunk_rest.call(null,seq__5046_5061__$1);
var G__5064 = c__3039__auto___5062;
var G__5065 = cljs.core.count.call(null,c__3039__auto___5062);
var G__5066 = 0;
seq__5046_5051 = G__5063;
chunk__5047_5052 = G__5064;
count__5048_5053 = G__5065;
i__5049_5054 = G__5066;
continue;
}
} else
{var node_5067 = cljs.core.first.call(null,seq__5046_5061__$1);
goog.dom.classes.set(node_5067,classes_5050__$1);
{
var G__5068 = cljs.core.next.call(null,seq__5046_5061__$1);
var G__5069 = null;
var G__5070 = 0;
var G__5071 = 0;
seq__5046_5051 = G__5068;
chunk__5047_5052 = G__5069;
count__5048_5053 = G__5070;
i__5049_5054 = G__5071;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the text of a node. Assumes content is a single node. For consistency across browsers, will always trim whitespace of the beginning and end of the returned text.
*/
domina.text = (function text(content){
return goog.string.trim(goog.dom.getTextContent(domina.single_node.call(null,content)));
});
/**
* Sets the text value of all the nodes in the given content.
*/
domina.set_text_BANG_ = (function set_text_BANG_(content,value){
var seq__5076_5080 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5077_5081 = null;
var count__5078_5082 = 0;
var i__5079_5083 = 0;
while(true){
if((i__5079_5083 < count__5078_5082))
{var node_5084 = cljs.core._nth.call(null,chunk__5077_5081,i__5079_5083);
goog.dom.setTextContent(node_5084,value);
{
var G__5085 = seq__5076_5080;
var G__5086 = chunk__5077_5081;
var G__5087 = count__5078_5082;
var G__5088 = (i__5079_5083 + 1);
seq__5076_5080 = G__5085;
chunk__5077_5081 = G__5086;
count__5078_5082 = G__5087;
i__5079_5083 = G__5088;
continue;
}
} else
{var temp__4092__auto___5089 = cljs.core.seq.call(null,seq__5076_5080);
if(temp__4092__auto___5089)
{var seq__5076_5090__$1 = temp__4092__auto___5089;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5076_5090__$1))
{var c__3039__auto___5091 = cljs.core.chunk_first.call(null,seq__5076_5090__$1);
{
var G__5092 = cljs.core.chunk_rest.call(null,seq__5076_5090__$1);
var G__5093 = c__3039__auto___5091;
var G__5094 = cljs.core.count.call(null,c__3039__auto___5091);
var G__5095 = 0;
seq__5076_5080 = G__5092;
chunk__5077_5081 = G__5093;
count__5078_5082 = G__5094;
i__5079_5083 = G__5095;
continue;
}
} else
{var node_5096 = cljs.core.first.call(null,seq__5076_5090__$1);
goog.dom.setTextContent(node_5096,value);
{
var G__5097 = cljs.core.next.call(null,seq__5076_5090__$1);
var G__5098 = null;
var G__5099 = 0;
var G__5100 = 0;
seq__5076_5080 = G__5097;
chunk__5077_5081 = G__5098;
count__5078_5082 = G__5099;
i__5079_5083 = G__5100;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the value of a node (presumably a form field). Assumes content is a single node.
*/
domina.value = (function value(content){
return goog.dom.forms.getValue(domina.single_node.call(null,content));
});
/**
* Sets the value of all the nodes (presumably form fields) in the given content.
*/
domina.set_value_BANG_ = (function set_value_BANG_(content,value){
var seq__5105_5109 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5106_5110 = null;
var count__5107_5111 = 0;
var i__5108_5112 = 0;
while(true){
if((i__5108_5112 < count__5107_5111))
{var node_5113 = cljs.core._nth.call(null,chunk__5106_5110,i__5108_5112);
goog.dom.forms.setValue(node_5113,value);
{
var G__5114 = seq__5105_5109;
var G__5115 = chunk__5106_5110;
var G__5116 = count__5107_5111;
var G__5117 = (i__5108_5112 + 1);
seq__5105_5109 = G__5114;
chunk__5106_5110 = G__5115;
count__5107_5111 = G__5116;
i__5108_5112 = G__5117;
continue;
}
} else
{var temp__4092__auto___5118 = cljs.core.seq.call(null,seq__5105_5109);
if(temp__4092__auto___5118)
{var seq__5105_5119__$1 = temp__4092__auto___5118;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5105_5119__$1))
{var c__3039__auto___5120 = cljs.core.chunk_first.call(null,seq__5105_5119__$1);
{
var G__5121 = cljs.core.chunk_rest.call(null,seq__5105_5119__$1);
var G__5122 = c__3039__auto___5120;
var G__5123 = cljs.core.count.call(null,c__3039__auto___5120);
var G__5124 = 0;
seq__5105_5109 = G__5121;
chunk__5106_5110 = G__5122;
count__5107_5111 = G__5123;
i__5108_5112 = G__5124;
continue;
}
} else
{var node_5125 = cljs.core.first.call(null,seq__5105_5119__$1);
goog.dom.forms.setValue(node_5125,value);
{
var G__5126 = cljs.core.next.call(null,seq__5105_5119__$1);
var G__5127 = null;
var G__5128 = 0;
var G__5129 = 0;
seq__5105_5109 = G__5126;
chunk__5106_5110 = G__5127;
count__5107_5111 = G__5128;
i__5108_5112 = G__5129;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the innerHTML of a node. Assumes content is a single node.
*/
domina.html = (function html(content){
return domina.single_node.call(null,content).innerHTML;
});
domina.replace_children_BANG_ = (function replace_children_BANG_(content,inner_content){
return domina.append_BANG_.call(null,domina.destroy_children_BANG_.call(null,content),inner_content);
});
domina.set_inner_html_BANG_ = (function set_inner_html_BANG_(content,html_string){
var allows_inner_html_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_no_inner_html,html_string));
var leading_whitespace_QMARK_ = cljs.core.re_find.call(null,domina.re_leading_whitespace,html_string);
var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html_string)))].join('').toLowerCase();
var special_tag_QMARK_ = cljs.core.contains_QMARK_.call(null,domina.wrap_map,tag_name);
if(cljs.core.truth_((function (){var and__3941__auto__ = allows_inner_html_QMARK_;
if(and__3941__auto__)
{var and__3941__auto____$1 = (function (){var or__3943__auto__ = domina.support.leading_whitespace_QMARK_;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.not.call(null,leading_whitespace_QMARK_);
}
})();
if(cljs.core.truth_(and__3941__auto____$1))
{return !(special_tag_QMARK_);
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{var value_5140 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");
try{var seq__5136_5141 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5137_5142 = null;
var count__5138_5143 = 0;
var i__5139_5144 = 0;
while(true){
if((i__5139_5144 < count__5138_5143))
{var node_5145 = cljs.core._nth.call(null,chunk__5137_5142,i__5139_5144);
goog.events.removeAll(node_5145);
node_5145.innerHTML = value_5140;
{
var G__5146 = seq__5136_5141;
var G__5147 = chunk__5137_5142;
var G__5148 = count__5138_5143;
var G__5149 = (i__5139_5144 + 1);
seq__5136_5141 = G__5146;
chunk__5137_5142 = G__5147;
count__5138_5143 = G__5148;
i__5139_5144 = G__5149;
continue;
}
} else
{var temp__4092__auto___5150 = cljs.core.seq.call(null,seq__5136_5141);
if(temp__4092__auto___5150)
{var seq__5136_5151__$1 = temp__4092__auto___5150;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5136_5151__$1))
{var c__3039__auto___5152 = cljs.core.chunk_first.call(null,seq__5136_5151__$1);
{
var G__5153 = cljs.core.chunk_rest.call(null,seq__5136_5151__$1);
var G__5154 = c__3039__auto___5152;
var G__5155 = cljs.core.count.call(null,c__3039__auto___5152);
var G__5156 = 0;
seq__5136_5141 = G__5153;
chunk__5137_5142 = G__5154;
count__5138_5143 = G__5155;
i__5139_5144 = G__5156;
continue;
}
} else
{var node_5157 = cljs.core.first.call(null,seq__5136_5151__$1);
goog.events.removeAll(node_5157);
node_5157.innerHTML = value_5140;
{
var G__5158 = cljs.core.next.call(null,seq__5136_5151__$1);
var G__5159 = null;
var G__5160 = 0;
var G__5161 = 0;
seq__5136_5141 = G__5158;
chunk__5137_5142 = G__5159;
count__5138_5143 = G__5160;
i__5139_5144 = G__5161;
continue;
}
}
} else
{}
}
break;
}
}catch (e5135){if((e5135 instanceof Error))
{var e_5162 = e5135;
domina.replace_children_BANG_.call(null,content,value_5140);
} else
{if("\uFDD0:else")
{throw e5135;
} else
{}
}
}} else
{domina.replace_children_BANG_.call(null,content,html_string);
}
return content;
});
/**
* Sets the innerHTML value for all the nodes in the given content.
*/
domina.set_html_BANG_ = (function set_html_BANG_(content,inner_content){
if(cljs.core.string_QMARK_.call(null,inner_content))
{return domina.set_inner_html_BANG_.call(null,content,inner_content);
} else
{return domina.replace_children_BANG_.call(null,content,inner_content);
}
});
/**
* Returns data associated with a node for a given key. Assumes
* content is a single node. If the bubble parameter is set to true,
* will search parent nodes if the key is not found.
*/
domina.get_data = (function() {
var get_data = null;
var get_data__2 = (function (node,key){
return get_data.call(null,node,key,false);
});
var get_data__3 = (function (node,key,bubble){
var m = domina.single_node.call(null,node).__domina_data;
var value = (cljs.core.truth_(m)?cljs.core.get.call(null,m,key):null);
if(cljs.core.truth_((function (){var and__3941__auto__ = bubble;
if(cljs.core.truth_(and__3941__auto__))
{return (value == null);
} else
{return and__3941__auto__;
}
})()))
{var temp__4092__auto__ = domina.single_node.call(null,node).parentNode;
if(cljs.core.truth_(temp__4092__auto__))
{var parent = temp__4092__auto__;
return get_data.call(null,parent,key,true);
} else
{return null;
}
} else
{return value;
}
});
get_data = function(node,key,bubble){
switch(arguments.length){
case 2:
return get_data__2.call(this,node,key);
case 3:
return get_data__3.call(this,node,key,bubble);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_data.cljs$core$IFn$_invoke$arity$2 = get_data__2;
get_data.cljs$core$IFn$_invoke$arity$3 = get_data__3;
return get_data;
})()
;
/**
* Sets a data on the node for a given key. Assumes content is a
* single node. Data should be ClojureScript values and data structures
* only; using other objects as data may result in memory leaks on some
* browsers.
*/
domina.set_data_BANG_ = (function set_data_BANG_(node,key,value){
var m = (function (){var or__3943__auto__ = domina.single_node.call(null,node).__domina_data;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return domina.single_node.call(null,node).__domina_data = cljs.core.assoc.call(null,m,key,value);
});
/**
* Takes a two-arg function, a reference DomContent and new
* DomContent. Applies the function for each reference / content
* combination. Uses clones of the new content for each additional
* parent after the first.
*/
domina.apply_with_cloning = (function apply_with_cloning(f,parent_content,child_content){
var parents = domina.nodes.call(null,parent_content);
var children = domina.nodes.call(null,child_content);
var first_child = (function (){var frag = document.createDocumentFragment();
var seq__5169_5173 = cljs.core.seq.call(null,children);
var chunk__5170_5174 = null;
var count__5171_5175 = 0;
var i__5172_5176 = 0;
while(true){
if((i__5172_5176 < count__5171_5175))
{var child_5177 = cljs.core._nth.call(null,chunk__5170_5174,i__5172_5176);
frag.appendChild(child_5177);
{
var G__5178 = seq__5169_5173;
var G__5179 = chunk__5170_5174;
var G__5180 = count__5171_5175;
var G__5181 = (i__5172_5176 + 1);
seq__5169_5173 = G__5178;
chunk__5170_5174 = G__5179;
count__5171_5175 = G__5180;
i__5172_5176 = G__5181;
continue;
}
} else
{var temp__4092__auto___5182 = cljs.core.seq.call(null,seq__5169_5173);
if(temp__4092__auto___5182)
{var seq__5169_5183__$1 = temp__4092__auto___5182;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5169_5183__$1))
{var c__3039__auto___5184 = cljs.core.chunk_first.call(null,seq__5169_5183__$1);
{
var G__5185 = cljs.core.chunk_rest.call(null,seq__5169_5183__$1);
var G__5186 = c__3039__auto___5184;
var G__5187 = cljs.core.count.call(null,c__3039__auto___5184);
var G__5188 = 0;
seq__5169_5173 = G__5185;
chunk__5170_5174 = G__5186;
count__5171_5175 = G__5187;
i__5172_5176 = G__5188;
continue;
}
} else
{var child_5189 = cljs.core.first.call(null,seq__5169_5183__$1);
frag.appendChild(child_5189);
{
var G__5190 = cljs.core.next.call(null,seq__5169_5183__$1);
var G__5191 = null;
var G__5192 = 0;
var G__5193 = 0;
seq__5169_5173 = G__5190;
chunk__5170_5174 = G__5191;
count__5171_5175 = G__5192;
i__5172_5176 = G__5193;
continue;
}
}
} else
{}
}
break;
}
return frag;
})();
var other_children = cljs.core.doall.call(null,cljs.core.repeatedly.call(null,(cljs.core.count.call(null,parents) - 1),((function (parents,children,first_child){
return (function (){
return first_child.cloneNode(true);
});})(parents,children,first_child))
));
if(cljs.core.seq.call(null,parents))
{f.call(null,cljs.core.first.call(null,parents),first_child);
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__5163_SHARP_,p2__5164_SHARP_){
return f.call(null,p1__5163_SHARP_,p2__5164_SHARP_);
}),cljs.core.rest.call(null,parents),other_children));
} else
{return null;
}
});
domina.lazy_nl_via_item = (function() {
var lazy_nl_via_item = null;
var lazy_nl_via_item__1 = (function (nl){
return lazy_nl_via_item.call(null,nl,0);
});
var lazy_nl_via_item__2 = (function (nl,n){
if((n < nl.length))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,nl.item(n),lazy_nl_via_item.call(null,nl,(n + 1)));
}),null));
} else
{return null;
}
});
lazy_nl_via_item = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_item__1.call(this,nl);
case 2:
return lazy_nl_via_item__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_item__1;
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_item__2;
return lazy_nl_via_item;
})()
;
domina.lazy_nl_via_array_ref = (function() {
var lazy_nl_via_array_ref = null;
var lazy_nl_via_array_ref__1 = (function (nl){
return lazy_nl_via_array_ref.call(null,nl,0);
});
var lazy_nl_via_array_ref__2 = (function (nl,n){
if((n < nl.length))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,(nl[n]),lazy_nl_via_array_ref.call(null,nl,(n + 1)));
}),null));
} else
{return null;
}
});
lazy_nl_via_array_ref = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_array_ref__1.call(this,nl);
case 2:
return lazy_nl_via_array_ref__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_array_ref__1;
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_array_ref__2;
return lazy_nl_via_array_ref;
})()
;
/**
* A lazy seq view of a js/NodeList, or other array-like javascript things
*/
domina.lazy_nodelist = (function lazy_nodelist(nl){
if(cljs.core.truth_(nl.item))
{return domina.lazy_nl_via_item.call(null,nl);
} else
{return domina.lazy_nl_via_array_ref.call(null,nl);
}
});
domina.array_like_QMARK_ = (function array_like_QMARK_(obj){
var and__3941__auto__ = obj;
if(cljs.core.truth_(and__3941__auto__))
{return obj.length;
} else
{return and__3941__auto__;
}
});
/**
* Some versions of IE have things that are like arrays in that they
* respond to .length, but are not arrays nor NodeSets. This returns a
* real sequence view of such objects. If passed an object that is not
* a logical sequence at all, returns a single-item seq containing the
* object.
*/
domina.normalize_seq = (function normalize_seq(list_thing){
if((list_thing == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__5195 = list_thing;
if(G__5195)
{if((function (){var or__3943__auto__ = (G__5195.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5195.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5195.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5195);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5195);
}
})())
{return cljs.core.seq.call(null,list_thing);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,list_thing)))
{return domina.lazy_nodelist.call(null,list_thing);
} else
{if("\uFDD0:default")
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([list_thing], true));
} else
{return null;
}
}
}
}
});
(domina.DomContent["_"] = true);
(domina.nodes["_"] = (function (content){
if((content == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__5196 = content;
if(G__5196)
{if((function (){var or__3943__auto__ = (G__5196.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5196.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5196.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5196);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5196);
}
})())
{return cljs.core.seq.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return domina.lazy_nodelist.call(null,content);
} else
{if("\uFDD0:default")
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([content], true));
} else
{return null;
}
}
}
}
}));
(domina.single_node["_"] = (function (content){
if((content == null))
{return null;
} else
{if((function (){var G__5197 = content;
if(G__5197)
{if((function (){var or__3943__auto__ = (G__5197.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5197.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5197.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5197);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5197);
}
})())
{return cljs.core.first.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return content.item(0);
} else
{if("\uFDD0:default")
{return content;
} else
{return null;
}
}
}
}
}));
(domina.DomContent["string"] = true);
(domina.nodes["string"] = (function (s){
return cljs.core.doall.call(null,domina.nodes.call(null,domina.string_to_dom.call(null,s)));
}));
(domina.single_node["string"] = (function (s){
return domina.single_node.call(null,domina.string_to_dom.call(null,s));
}));
if(cljs.core.truth_((typeof NodeList != 'undefined')))
{NodeList.prototype.cljs$core$ISeqable$ = true;
NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){
return domina.lazy_nodelist.call(null,nodelist);
});
NodeList.prototype.cljs$core$IIndexed$ = true;
NodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){
return nodelist.item(n);
});
NodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){
if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
NodeList.prototype.cljs$core$ICounted$ = true;
NodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){
return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof StaticNodeList != 'undefined')))
{StaticNodeList.prototype.cljs$core$ISeqable$ = true;
StaticNodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){
return domina.lazy_nodelist.call(null,nodelist);
});
StaticNodeList.prototype.cljs$core$IIndexed$ = true;
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){
return nodelist.item(n);
});
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){
if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
StaticNodeList.prototype.cljs$core$ICounted$ = true;
StaticNodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){
return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof HTMLCollection != 'undefined')))
{HTMLCollection.prototype.cljs$core$ISeqable$ = true;
HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
return domina.lazy_nodelist.call(null,coll);
});
HTMLCollection.prototype.cljs$core$IIndexed$ = true;
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
return coll.item(n);
});
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
if((coll.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,coll,n);
}
});
HTMLCollection.prototype.cljs$core$ICounted$ = true;
HTMLCollection.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
return coll.length;
});
} else
{}
