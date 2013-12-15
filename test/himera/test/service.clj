(ns himera.test.service
  (:use clojure.test
        himera.server.service
        ring.mock.request)
  (:require [excellent.excel :as excel]))

(deftest simple-compile-test
  (is (= (-> (request :post "/simplecompile")
             (body "(+ 1 2)")
             app
             :body)
         "cljs.core._PLUS_.call(null,1,2)")))

(deftest compile-test
  (is (=
       (-> (request :post "/compile")
         (content-type "application/clojure; charset=UTF-8")
         (body "{:expr (+ 1 2)}")
         app
         :body)
       "cljs.core._PLUS_.call(null,1,2)")))

(def multipart-body "------WebKitFormBoundaryPRI2g39TqYU3GCRD\r\nContent-Disposition: form-data; name=\"savetext\"\r\n\r\n{1 \"1 2\", 2 \"3 4\"}\r\n------WebKitFormBoundaryPRI2g39TqYU3GCRD--\r\n")
(def multipart-content-type "multipart/form-data; boundary=----WebKitFormBoundaryPRI2g39TqYU3GCRD")
(def save-result (slurp "test/resources/save.clj"))


(deftest save-test
  (is (=
    (-> (request :post "/save.clj")
        (content-type multipart-content-type)
        (body multipart-body)
        app :body) save-result
       )))

(def multipart-body2 "------WebKitFormBoundaryjj5dL8XwBHoAeWkR\r\nContent-Disposition: form-data; name=\"exceltext\"\r\n\r\n1 2\r\n------WebKitFormBoundaryjj5dL8XwBHoAeWkR--\r\n")
(def multipart-content-type2 "multipart/form-data; boundary=----WebKitFormBoundaryjj5dL8XwBHoAeWkR")

(deftest excel-test
  (is (=
       (-> (request :post "/excel.xls")
    (content-type multipart-content-type2)
    (body multipart-body2)
    app
    :body
    excel/workbook-hssf
    excel/lazy-workbook
    ) {"Sheet1" '((1.0 2.0))})))

(run-tests)
