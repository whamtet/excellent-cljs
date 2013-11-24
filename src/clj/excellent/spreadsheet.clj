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

(def f "resources/public/main.js")
(def lines (-> f slurp (.split "\n")))

(defn make-cells [lines-to-add]
  (let [
        ;lines (filter #(not (.contains % "alert")) (-> f slurp (.split "\n")))
        lines (concat lines lines-to-add)
        ]
    (list* [(count lines)] (map vector lines))))

(defn hssf []
  (try (excel/workbook-hssf "numbers.xls")
    (catch java.io.FileNotFoundException e (excel/workbook-hssf))))

(defn make-excel
  ([] (excel/save (make-excel nil) "numbers.xls"))
  ([lines-to-add] (excel/build-workbook (hssf) {"Numbers" (make-cells lines-to-add)})))

(defn get-excel-bytes [s]
  (let [os (java.io.ByteArrayOutputStream.)
        ;book (excel/build-workbook (excel/workbook-xssf) {"Plan" (make-grid state)})
        custom-js (clj-str->js s)
        book (make-excel custom-js)
        ]
    (excel/save book os)
    (.close os)
    (.toByteArray os)))

(defn get-excel [s]
  {:status 200
   ;:headers {"Content-Type" "application/msexcel"}
   :body (java.io.ByteArrayInputStream. (get-excel-bytes s))
   })
