(ns excellent.io
  (:require [himera.client.repl :as repl]))

(defn ^:export slurp [i]
  (->> i (str "#workspace") js/jQuery .val))

(defn ^:export spit [i val]
  (if (@tabs i)
    (.val (js/jQuery (str "#workspace" i)) val)
    (add-tab val)))

(defn split-line [line]
  (re-seq #"\w+" line))

(defn ^:export grid-slurp [i]
  (map split-line (.split (slurp i) "\n")))

(defn ^:export excel [i]
  (.val (js/jQuery "#exceltext") (slurp i))
  (.submit (js/jQuery "#excelform")))


(def tabs (atom #{}))

(defn save-map []
  (into {}
        (for [i @tabs]
          [i (slurp i)])))

(defn ^:export test []
  (.log js/console (pr-str (save-map))))

(defn ^:export close-tab [i]
  (swap! tabs #(disj % i)))

(defn ^:export open-tab [i]
  (swap! tabs #(conj % i)))

(defn ^:export save []
  (.val (js/jQuery "#savetext") (pr-str (save-map)))
  (.submit (js/jQuery "#saveform")))

(defn ^:export set-latest-tab [val]
  (.val (js/jQuery (str "#workspace" js/total_tabs)) val))

(defn ^:export add-tab [val]
  (.click (js/jQuery "#addtab"))
  (set-latest-tab val))

(defn ^:export load [i]
  (js/eval (repl/simple-compile (slurp i))))

(defn ^:export js-load [i]
  (js/eval (slurp i)))
