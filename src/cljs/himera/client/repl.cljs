; Copyright (c) 2012, 2013 Fogus and Relevance Inc. All rights reserved.  The
; use and distribution terms for this software are covered by the Eclipse
; Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
; which can be found in the file COPYING the root of this
; distribution.  By using this software in any fashion, you are
; agreeing to be bound by the terms of this license.  You must not
; remove this notice, or any other, from this software.

(ns himera.client.repl
  (:require [cljs.reader :as reader]
            [clojure.string :as str]
            [clojure.set :as set]
            [clojure.walk :as walk]
            [clojure.zip :as zip]))

(defn- map->js [m]
  (let [out (js-obj)]
    (doseq [[k v] m]
      (aset out (name k) v))
    out))

(defn ajax [m]
  (.ajax js/jQuery (map->js m)))

(defn go-compile [code]
  (let [data (atom nil)
        params (map->js {:url "/compile"
                         :data (str "{:expr " code "}")
                         :contentType "application/clojure; charset=utf-8"
                         :async false
                         :type "POST"
                         :dataType "text"
                         :success #(reset! data %)
                         ;:success #(reset! data (reader/read-string %))
                         })]
    (.ajax js/jQuery params)
    @data))

(defn simple-compile [code]
  (let [data (atom nil)
        params (map->js {:url "/simplecompile"
                         :data code
                         :contentType "shit"
                         :async false
                         :type "POST"
                         :dataType "text"
                         :success #(reset! data % #_(reader/read-string %))})]
    (.ajax js/jQuery params)
    @data))


(defn load-workspace []
  (let [
        code (.val (js/jQuery "#workspace"))
        ]
    (js/eval (simple-compile code))))

(defn- on-validate [input]
  (not (empty? input)))

(defn- build-msg
  [title msg klass]
  (array
   (map->js {:msg (str title msg)
             :className klass})))

(defn- starts-with? [o s]
  (= (.slice (clojure.string/trim s)
             0
             (.-length o))
     o))

(def ^:private is-comment? #(starts-with? ";" %))

(defn- on-handle [line report]
  (if (is-comment? line)
    (build-msg "" "" "jquery-console-message-value")
    (let [input (.trim js/jQuery line)
          compiled (go-compile input)]
      (if-let [err (and compiled (:error compiled))]
        (build-msg "Compilation error: " err "jquery-console-message-error")
        (try
          (build-msg "" (-> compiled js/eval pr-str) #_(pr-str (js/eval compiled #_(:js compiled))) "jquery-console-message-value")
          (catch js/Error e
            (build-msg "Compilation error: " e "jquery-console-message-error")))))))

(defn- on-handle2 [line report]
  (.log js/console line)
  (.log js/console report)
  (on-handle line report))

(defn ^:export go []
  (.ready (js/jQuery js/document)
          (fn []
            (set! js/controller
                  (doto (js/jQuery "#console")
                    (.console (map->js {:welcomeMessage "Excellent REPL v0.2.5"
                                        :promptLabel "go buddy> "
                                        :commandValidate on-validate
                                        :commandHandle on-handle
                                        :autofocus true
                                        :animateScroll true
                                        :promptHistory true}))))

            )))

#_(defn ^:export save []
  (ajax {:url "/save"
         :data (.val (js/jQuery "#workspace"))
         :contentType "application/clojure; charset=utf-8"
         :type "POST"
         :dataType "text"
         }))
