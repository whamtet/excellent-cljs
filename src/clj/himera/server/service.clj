; Copyright (c) 2012, 2013 Fogus and Relevance Inc. All rights reserved.  The
; use and distribution terms for this software are covered by the Eclipse
; Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
; which can be found in the file COPYING the root of this
; distribution.  By using this software in any fashion, you are
; agreeing to be bound by the terms of this license.  You must not
; remove this notice, or any other, from this software.

(ns himera.server.service
  (:use compojure.core)
  ;(:use ring.middleware.params)
  (:require compojure.handler)
  ;(:require [ring.middleware.multipart-params :as multipart-params])
  (:require [excellent.multipart :as multipart])
;  (:use ring.middleware.clj-params)
  (:require [clojure.string :as string])
  (:require [himera.server.cljs :as cljs]
            [compojure.route :as route]
            [ring.util.response :as resp]
            [excellent.spreadsheet :as spreadsheet]
            [excellent.save :as save]))

(defn generate-response [transformer data & [status]]
  (let [ret-val (transformer data)]
    {:status (or status 200)
     :headers {"Content-Type" "application/clojure; charset=utf-8"}
     :body ret-val}))
(load "service")
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
  (format (index2) "width: 100%;" code))

(defroutes handler
  (GET "/" [oldcode] (get-html (or oldcode "")))
  (POST "/" [file] (get-html file))

  (PUT "/" [name]
       (generate-response {:hello name}))

  (POST "/simplecompile" [s]
        (apply-interpose "\n" (spreadsheet/clj-str->js s)))

  (POST "/compile" [expr]
        (condp = (-> expr str .trim)
          ;"excel" (redirect "/spreadsheet.xls")
          "excel" (straight-js "spreadsheet()")
          "save" (straight-js "save()")
          "load" (straight-js "himera.client.repl.load_workspace()")
          "copy" (straight-js "s = jQuery('#workspace').val()")
          "clear-save" (straight-js "save(); jQuery('#workspace').val('')")
          "clear" (straight-js "jQuery('#workspace').val('')")
          (generate-js-response (cljs/compilation expr)))
        )
  (POST "/save.clj" [savetext] (save/save savetext))

  #_(GET "/spreadsheet.xls" []
       (spreadsheet/get-excel))

  (POST "/spreadsheet.xls" [toappend] (spreadsheet/get-excel toappend))

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
    (if (shit-request? req)
      (handler (assoc req :params {:s (slurp (:body req))}))
      (handler req))))

(def app
  (-> handler
     ; wrap-spy
      multipart/wrap-multipart-params
      wrap-clj-params
      my-wrapper
      ))

