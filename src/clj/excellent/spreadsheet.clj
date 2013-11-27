(ns excellent.spreadsheet
  (:require
   ;[excellent.core :as core]
   [excellent.excel :as excel]
   [himera.server.cljs :as cljs]))

(def windows? (-> "os.name" System/getProperty .toLowerCase (.contains "windows")))
#_(def f
  (str (if windows? "Z:/" "/Users/matthewmolloy/")
       "clojure/lein-cljsbuild/example-projects/simple/main.js"
       ))

(defn read-form [r v]
  (try
    (read-form r (cons (read r) v))
    (catch RuntimeException e v)))

(defn read-strings [s]
  (with-open
    [r (java.io.PushbackReader.
         (java.io.StringReader. s))]
      (binding [*read-eval* false]
        (read-form r ()))))

(defn clj-str->js [s]
  (map cljs/simple-compile (read-strings s)))
(defn spit-slurp [f]
  (.split (slurp f) "\n"))

(def f "resources/public/basis.js")
(def g "resources/public/supplementary.js")

(def lines (concat (spit-slurp g) (spit-slurp f)))

(defn make-cells [lines-to-add]
  (let [
        ;lines (filter #(not (.contains % "alert")) (-> f slurp (.split "\n")))
        lines (concat lines lines-to-add)
        ]
    (list* [(+ 20 (count lines))] (map vector lines))))

(def hssf (excel/workbook-hssf "resources/public/numbers.xls"))

(defn make-excel
  ([] (excel/save (make-excel nil) "numbers.xls"))
  ([lines-to-add] (excel/build-workbook hssf {"Sheet1" (make-cells lines-to-add)})))


(defn get-excel-bytes [s]
  (let [os (java.io.ByteArrayOutputStream.)
        ;_ (println "s" s)
        split (.split s "js-here")
        compiled-js (cons "cljs.user = {}" (clj-str->js (first split)))
        ;_ (println "compiled-js" compiled-js)
        straight-js (if (second split) (.trim (second split)))
        ;_ (println "straight-js" straight-js)
        book (make-excel (cons straight-js compiled-js))
        ]
    (excel/save book os)
    (.close os)
    (.toByteArray os)))

(defn get-excel [s]
  (let [bytes (get-excel-bytes s)]
    {:status 200
     :headers {"Content-Type" "application/msexcel" "Content-Length" (str (alength bytes))}
     :body (java.io.ByteArrayInputStream. bytes)
     }))

;;new spreadsheet stuff

(defn try-double [d]
  (try (Double/parseDouble d)
    (catch java.lang.NumberFormatException e d)))

(defn split-line [line]
  (map try-double (re-seq #"\w+" line)))

(defn split-lines [s]
  (map split-line (.split s "\n")))

(defn get-excel2 [s]
  (let [os (java.io.ByteArrayOutputStream.)
        book (excel/build-workbook (excel/workbook-hssf) {"Sheet1" (split-lines s)})
        ]
    (excel/save book os)
    (.close os)
    (let [
          bytes (.toByteArray os)]
      {:status 200
       :headers {"Content-Type" "application/msexcel" "Content-Length" (str (alength bytes))}
       :body (java.io.ByteArrayInputStream. bytes)
       })))

