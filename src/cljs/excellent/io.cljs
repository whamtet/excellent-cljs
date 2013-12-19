(ns excellent.io
  (:require [himera.client.repl :as repl]
            [cljs.reader :as reader]))

(defn- map->js [m]
  (let [out (js-obj)]
    (doseq [[k v] m]
      (aset out (name k) v))
    out))

(defn ^:export slurp
  "Slurp contents from tab i."
  [i]
  (->> i (str "#workspace") js/jQuery .val))

(defn ^:export spit
  "Spit val into tab i."
  [i val]
  (if (@tabs i)
    (.val (js/jQuery (str "#workspace" i)) val)
    (add-tab val)))

(defn split-line [line]
  (or (re-seq #"[\w\.]+" line) ()))

(defn double-map [f grid]
  (map #(map f %) grid))

(defn ^:export grid-slurp
  "Slurp tab i into a two-dimensional grid."
  [i]
  (map split-line (.split (slurp i) "\n")))

(defn ^:export grid-slurp-num
  "Slurp tab i into a two-dimensional grid of numbers."
  [i]
  (double-map js/Number (grid-slurp i)))

(defn apply-interpose [delimiter seq]
  (apply str (interpose delimiter seq)))

(defn convert-list [l]
  (let [
        l (reader/read-string l)
        ]
    (if (coll? (first l))
      (apply-interpose "\n" (map #(apply-interpose " " %) l))
      (apply-interpose " " l))))

(defn ^:export excel
  "Download excel spreadsheet with contents from tab i."
  [i is-list?]
  (.val (js/jQuery "#exceltext") (if is-list? (convert-list (slurp i)) (slurp i)))
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

(defn ^:export save
  "Download contents of tabs to preserve your work."
  []
  (.val (js/jQuery "#savetext") (pr-str (save-map)))
  (.submit (js/jQuery "#saveform")))



(defn ^:export set-latest-tab [val]
  (.val (js/jQuery (str "#workspace" js/total_tabs)) val))

(defn ^:export add-tab [val]
  (.click (js/jQuery "#addtab"))
  (set-latest-tab val))

(defn ^:export load
  "Load contents of tab i as clojurescript."
  [s]
  (js/eval (repl/simple-compile s)))


(defn ^:export list-files []
  (let [data (atom nil)
        params (map->js {:url "/listfiles"
                         :async false
                         :type "GET"
                         :success #(reset! data %)})]
    (.ajax js/jQuery params)
    @data))

(defn ^:export db-spit [name val]
  (let [
        params (map->js {:url "/spit"
                         :data (map->js {:name name :str val})
                         :type "POST"
                         }
                        )]
    (.ajax js/jQuery params)))

(defn ^:export db-delete [name]
  (let [
        params (map->js {:url "/delete"
                         :data (map->js {:name name})
                         :type "POST"}
                        )
        ]
    (.ajax js/jQuery params)))


(defn ^:export db-slurp [name]
  (let [data (atom nil)
        params (map->js {
                         :url (str "/slurp?name=" name)
                         :async false
                         :type "GET"
                         :success #(reset! data %)
                         })]
    (.ajax js/jQuery params)
    @data))

