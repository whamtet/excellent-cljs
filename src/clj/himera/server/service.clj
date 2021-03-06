; Copyright (c) 2012, 2013 Fogus and Relevance Inc. All rights reserved.  The
; use and distribution terms for this software are covered by the Eclipse
; Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
; which can be found in the file COPYING the root of this
; distribution.  By using this software in any fashion, you are
; agreeing to be bound by the terms of this license.  You must not
; remove this notice, or any other, from this software.

(ns himera.server.service
  (:use compojure.core
        clojure.repl)
  (:require compojure.handler)
  (:require [excellent.multipart :as multipart])
  (:require [clojure.string :as string])
  (:require clojure.edn)
  (:require [himera.server.cljs :as cljs]
            [compojure.route :as route]
            [ring.util.response :as resp]
            [excellent.spreadsheet :as spreadsheet]
            [excellent.db :as db]
            [excellent.save :as save]
            )
  (:use [ring.middleware params
                         keyword-params
                         nested-params
                         multipart-params
         ])
  )
(defn generate-response [transformer data & [status]]
  (let [ret-val (transformer data)]
    {:status (or status 200)
     :headers {"Content-Type" "application/clojure; charset=utf-8"}
     :body ret-val}))

(def generate-js-response (partial generate-response
                                   (fn [data]
                                     (let [code (or (:result data) "'HIMERA ERROR: NOTHING GENERATED'")]
                                       ;(pr-str {:js (string/trim-newline code)})
                                       code
                                       ))))

(def generate-ast-response (partial generate-response
                                    (fn [data]
                                      (pr-str {:ast (:result data)}))))


(defn straight-js [js]
  {:status 200
   :headers {"Content-Type" "application/clojure; charset=utf-8"}
   :body (string/trim-newline js)})

(defn redirect [url]
  (straight-js (format "window.location = '%s'" url)))

(defn apply-interpose [i s]
  (apply str (interpose i s)))

(defn call-function [f & args]
  (format "himera.client.repl.%s(%s)" f (apply-interpose ", " args)))

(def index (slurp "resources/public/index.html"))
(defn index2 [] (slurp "resources/public/index.html"))

(defn get-html [code]
  (format (index2) code)
  ;(index2)
  )

(defn pr-str2 [s]
  (let [
        s (pr-str s)
        ]
    (.substring s 1 (dec (count s)))))

(defn tab-js [vals]
  (if (> (count vals) 0)
    (apply str
      (cons
       (format "excellent.io.set_latest_tab('%s');\n" (pr-str2 (first vals)))
       (map #(format "excellent.io.add_tab('%s');\n" (pr-str2 %)) (rest vals))))
    ""))

(defn tab-js2 [file]
  (let [m (clojure.edn/read-string file)]
    (tab-js (vals m))))

(defn doc-str [f]
  (eval `(with-out-str (doc ~f))))

#_(defn doc-str-js [f]
  (format "alert(%s)" (pr-str (doc-str f))))

(defn doc-str-js [f]
  (-> f doc-str (.replace "\n" " ") (.replace "-" "") .trim pr-str))

(defroutes handler
  ;(GET "/env" [] (pr-str (for [[k v] (System/getenv)] (str k ": " v))))
  ;(GET "/getenv" [env] (System/getenv env))
  (GET "/" [] (get-html ""))
  (POST "/" [file] (get-html (tab-js2 file)))

  (POST "/simplecompile" [s]
        (apply-interpose "\n" (spreadsheet/clj-str->js s)))

  (GET "/listfiles" [] (apply-interpose " " (db/get-all)))

  (POST "/spit" [name str]
        ;(println name)
        ;(println str)
        (db/insert name str)
        "")

  (GET "/slurp" [name]
       (db/select name))

  (POST "/compile" [expr]
        (println (list? expr))
        (if (list? expr)
          (let [[doc f :as expr] expr]
            (if (= 'doc doc)
              ;"console.log('hi\nthere')"
              ;(pr-str (doc-str f))
              (doc-str-js f)
              (generate-js-response (cljs/compilation expr))))
          (generate-js-response (cljs/compilation expr)))
        )
  (POST "/save.clj" [savetext] (save/save savetext))

  (POST "/excel.xls" [exceltext] (spreadsheet/get-excel2 exceltext))

  (POST "/delete" [name] (db/delete name) "")

  ;(POST "/spreadsheet.xls" [toappend] (spreadsheet/get-excel toappend))

  (route/resources "/"))

#_(defn wrap-spy [handler]
  (fn [request]
    (println "-------------------------------")
    (println "Incoming Request:")
    (clojure.pprint/pprint request)
    (let [response (handler request)]
      (println "Outgoing Response Map:")
      (clojure.pprint/pprint response)
      (println "-------------------------------")
      response)))

(defn- clj-request?
  [req]
  (if-let [^String type (:content-type req)]
    (not (empty? (re-find #"^application/(vnd.+)?clojure" type)))))

(defn wrap-clj-params
  [handler]
  (fn [req]
    (if-let [body (and (clj-request? req) (:body req))]
      (let [bstr (slurp body)
 ;           _ (println bstr)
            clj-params (binding [*read-eval* false] (read-string bstr))
            req* (assoc req
                   :clj-params clj-params
                   :params (merge (:params req) clj-params))
            ]
        (handler req*))
      (do ;(-> req :body slurp println)
        (handler req))
      )))

(defn- shit-request?
  [req]
  (= "shit" (-> req :content-type)))

(defn my-wrapper
  [handler]
  (fn [req]
    (if (-> req :uri (= "/simplecompile"))
      (handler (assoc req :params {:s (slurp (:body req))}))
      (handler req))))

(defn wrap-body
  [handler]
  (fn [req]
    (let [
          body (-> req :body slurp)
          stream (-> body .getBytes java.io.ByteArrayInputStream.)
          ]
      (spit "body.txt" body)
      (handler (assoc req :body stream :body2 body)))))

(def app
  (-> handler
      ;wrap-spy
      wrap-keyword-params
      ;wrap-nested-params
      wrap-params
      multipart/wrap-multipart-params
      wrap-clj-params
      my-wrapper
      wrap-body
      ))

(load "service")
